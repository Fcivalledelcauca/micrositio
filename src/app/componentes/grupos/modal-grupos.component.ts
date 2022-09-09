import { Component, OnInit, Output,EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Grupo } from 'src/app/core/interfaces/grupos';
import { ModalGrupoService } from 'src/app/core/services/componentes/modal-grupo.service';
import { GrupoService } from 'src/app/core/services/grupos/grupos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modalgrupos',
  templateUrl: './modal-grupos.component.html',
  styleUrls: ['./modal-grupos.component.css']
})
export class ModalGruposComponent implements OnInit, OnChanges {

  @Input() grupoEditar!:Grupo;
  @Output() grupo: EventEmitter<Grupo> = new EventEmitter();

  grupi!:Grupo;

  formGrupo!: FormGroup

  constructor(public smodalgrupo: ModalGrupoService,
              private grupoService:GrupoService,
              private fb: FormBuilder) 
  { 
     
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.grupoEditar.currentValue){
      this.grupoEditar=changes.grupoEditar.currentValue;
      this.cargarGrupo(this.grupoEditar);
    }
  }

  ngOnInit(): void {
       
    this.formGrupo = this.fb.group({
      idGrupo:      [0],
      idCia:        [0],
      orden:        ['',[Validators.required]],
      nombre_Grupo: ['',[Validators.required]],
      descripcion:  ['',[Validators.required]],
      icono:        ['',[Validators.required]],
      activo:       [1]
    });

  }

  cerrarModal(){
    this.limpiar();
    this.smodalgrupo.cerrarModal() 
  }

  guardarGrupo(){
    if(this.formGrupo.invalid){
      return;
    }
    if(this.formGrupo.controls['idGrupo'].value){
      this.grupoService.actaulizarGrupo(this.formGrupo.value).subscribe(res=>{
        //Swal.fire('Informacion', 'El Grupo se ha actualizado con éxito', 'success');
        this.grupo.emit(res.value);
        this.limpiar();
      })
    }else{
      this.grupoService.crearGrupo(this.formGrupo.value).subscribe((res:any)=>{
        //Swal.fire('Informacion', 'El Grupo se creó con éxito', 'success');
        this.grupo.emit(res.value);
        this.limpiar();
      })
    }

  }

  limpiar(){
    this.formGrupo.controls["idGrupo"].setValue(0);  
    this.formGrupo.controls["orden"].setValue('');
    this.formGrupo.controls["nombre_Grupo"].setValue('');
    this.formGrupo.controls["descripcion"].setValue('');
    this.formGrupo.controls["icono"].setValue('');
  }

  cargarGrupo(grupo:Grupo){
    if(this.formGrupo.value){
      this.formGrupo.get('idGrupo')!.setValue(grupo.IdGrupo)
      this.formGrupo.patchValue({
        orden:          grupo.Orden.toString(),     
        nombre_Grupo:   grupo.Nombre_Grupo.toString(),     
        descripcion:    grupo.Descripcion.toString(),     
        icono:          grupo.Icono.toString(),     
        activo:         1
      })
     
    }
  }
}


