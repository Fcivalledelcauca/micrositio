import { Component, Input, OnChanges, OnInit, Output, SimpleChanges,EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Temario } from 'src/app/core/interfaces/temario';
import { Tema } from 'src/app/core/interfaces/temas';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { TemaService } from 'src/app/core/services/configuracion/tema.service';
import { TemarioService } from 'src/app/core/services/configuracion/temario.service';


@Component({
  selector: 'app-modaltema',
  templateUrl: './modaltema.component.html',
  styleUrls: ['./modaltema.component.css']
})
export class ModaltemaComponent implements OnInit, OnChanges {

  @Input() TemaEditar:Tema;
  @Output() actualizar:EventEmitter<boolean>= new EventEmitter();
  @ViewChild('botontema') botonGuardarTema:ElementRef;

  botonGuardar:string="Guardar";
  botonAdicionar:string="Adicionar";
  mensaje:string ="";
  show:boolean=false;
  disabled:boolean=false;


  tema:Tema;
  temarios:Temario[]=[]
  formTema:FormGroup;
  formTemario:FormGroup;
  constructor(public modalService: ModalService
              ,private fb:FormBuilder
              ,private temaService:TemaService
              ,private temarioService:TemarioService) { }

              
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.TemaEditar.currentValue){
      this.cargarTema(changes.TemaEditar.currentValue);
    }
  }

  ngOnInit(): void {
    this.formTema=this.fb.group({
      idTema:   [''],
      tema:     ['',[Validators.required]],
      activo:   [1]
    })

    this.formTemario=this.fb.group({
      idTemario:  [''],
      idTema:     [''],
      temario:    ['',[Validators.required]],
      activo:     [1]
    })
  }

  guardarTema(){
    if(this.formTema.invalid){return}

    if(this.tema){
      this.editarTema(this.formTema.value);
    }else{
      this.temaService.crearTema(this.formTema.value)
              .subscribe(res=>{
                this.mensaje="El tema se guardó con éxito";
                this.show=true;
                this.formTema.controls['tema'].disable()
                this.botonGuardarTema.nativeElement.disabled = true;
                this.actualizar.emit(true);
                this.tema=res;
             })
    }

  }

  editarTema(tema:Tema){
    this.temaService.editarTema(tema)
        .subscribe(res=>{
          this.mensaje="El tema se actualizó con éxito";
          this.show=true;
          this.formTema.controls['tema'].disable()
          this.botonGuardarTema.nativeElement.disabled = true;
          this.actualizar.emit(true);
        })

  }

  guardarTemario(){
    if(this.formTemario.invalid){return}
    if(this.tema){
      if(this.botonAdicionar=='Adicionar'){
        this.formTemario.get('idTema').setValue(this.tema.IdTema);
          this.temarioService.crear(this.formTemario.value)
            .subscribe(res=>{
              this.show=false;
              this.formTemario.get('temario').setValue('');
              this.consultarTemarioxIdtema(this.tema.IdTema)
            })
      }else{
        this.botonAdicionar='Adicionar';
        this.editarTemario(this.formTemario.value);
        this.formTemario.get('temario').setValue('');
      }
    }
  }

  setearTemario(temario:Temario){
    this.formTemario.get('temario').setValue(temario.temario);
    this.formTemario.get('idTemario').setValue(temario.idTemario);
    this.formTemario.get('idTema').setValue(temario.idTema);
    this.formTemario.get('activo').setValue(temario.activo);
    this.botonAdicionar="Actualizar"
  }


  editarTemario(temario:Temario){
    console.log('temario',temario);
    this.temarioService.editar(temario)
      .subscribe(res=>{
        this.consultarTemarioxIdtema(temario.idTema)
      })
  }

  eliminarTemario(temario:Temario){
    this.temarioService.eliminar(temario.idTemario)
          .subscribe(res=>{
            this.consultarTemarioxIdtema(this.tema.IdTema);
          })

  }

  

  consultarTemarioxIdtema(idtema:number){
    this.temarioService.consultarxIdTema(idtema)
      .subscribe(res=>{return this.temarios=res})
  }

  cargarTema(tema:Tema){
    this.botonGuardar="Actualizar"
    this.tema=tema;
    this.formTema.patchValue({
      idTema: tema.IdTema,
      tema:   tema.Tema,
      activo: tema.Activo
    })
    this.consultarTemarioxIdtema(tema.IdTema);
  }



  consultarTemarios(idTema:number){
    //TODO: consulta los temarios de cada Tema---
  }

  limpiar(){
    this.formTema.get('idTema').setValue('');
    this.formTema.get('tema').setValue('');
    this.formTemario.get('temario').setValue('');
    this.formTemario.get('idTema').setValue('');
    this.temarios=[];
    this.tema=undefined;
    this.botonGuardar="Guardar"
    this.show=false;
    this.formTema.get('tema').enable()
    this.botonGuardarTema.nativeElement.disabled = false;
    this.botonAdicionar="Adicionar"
  }

  cerrarModal(){
    this.limpiar();
    this.modalService.cerrarModal();
  }
}
