import { Component, Input, OnInit, Output,EventEmitter, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarios,CrearUsuario } from 'src/app/core/interfaces/usuarios';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { UsuariosService } from 'src/app/core/services/usuarios/usuarios.service';

@Component({
  selector: 'app-modaluser',
  templateUrl: './modaluser.component.html',
  styleUrls: ['./modaluser.component.css']
})
export class ModaluserComponent implements OnInit, OnChanges {

  constructor(public smodal: ModalService,
              private fb:FormBuilder,
              private userService:UsuariosService) { }
  

 

  formSubmitted:boolean=false;
  
  actualizar:boolean=false;  
  /* formUser: FormGroup = this.fb.group({
    usuario:      ['',[Validators.required,Validators.email]],
    claveUsuario: ['',[Validators.required,Validators.minLength(6)]],
    validar:      ['',[Validators.required]],
    rol:          ['',[Validators.required]]
  },{
    Validators: this.clavesIguales('claveUsuario','validar')
  }
  ) */

  formUser: FormGroup = this.fb.group({
    usuario:      ['',[Validators.required,Validators.email]],
    rol:          ['',[Validators.required]],
    idMunicipio:  [''],
    municipio:    ['',[Validators.required]],
    activo:       [true]
  })

  @Input() userEditar!:any;
  @Output() resUsuario: EventEmitter<Usuarios> = new EventEmitter();

  municipio:string='';

  @ViewChild('selectRol') selectRol!:ElementRef;


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.userEditar.currentValue){
      this.userEditar=changes.userEditar.currentValue;
      this.cargaUsuario(changes.userEditar.currentValue);
    }
  }


  guardarUsuario(){
    this.formSubmitted=true;
    if(this.formUser.invalid){return;}
    
    const rol:string=this.formUser.get('rol')?.value;
    
    const usuarioActualizar:CrearUsuario={
      NombreUsuario       :this.userEditar.nombreUsuario,
      Email               :this.formUser.get('usuario')?.value,
      Password            :'',
      NombreCompleto      :'',
      DocumentoIdentidad  :'',
      Telefono            :'',
      Direccion           :'',
      IdMunicipio         :this.formUser.get('idMunicipio').value,
      Municipio           :this.formUser.get('municipio').value,
      idRol               :'0',
      TipoRol             :rol.trim(),
      activo              :this.formUser.get('activo')?.value

   
    }; 

    this.userService.editarUsuario(usuarioActualizar)
          .subscribe(res=>{
            this.resUsuario.emit(res);
            this.cerrarModal();
          })

  }

  terminoSeleccionado(ev:any){
    if(ev!=''){
      this.formUser.get('municipio').setValue(ev);
    }
  }

  idMunicipioSeleccionado(ev:number){
    if(ev!=0){
      this.formUser.get('idMunicipio').setValue(ev);
    }
  }

  

  limpiar(){
    this.formUser.get('usuario')?.setValue('');
    this.formUser.get('rol')?.setValue(null);
    this.formUser.get('activo')?.setValue(false);
    this.formUser.get('idMunicipio')?.setValue(0);
    this.formUser.get('municipio')?.setValue('');
  }

  
  cargaUsuario(user:any){
    this.formUser.get('usuario')?.setValue(user.email);
    this.formUser.get('rol')?.setValue(user.tiporol);
    this.formUser.get('activo')?.setValue(user.activo);
    this.formUser.get('idMunicipio')?.setValue(user.idmunicipio);
    this.formUser.get('municipio')?.setValue(user.municipio);

    this.municipio=user.municipio;

    let rol:string = user.tiporol;
    
    if (rol=='ADMINISTRADOR'){
      this.selectRol.nativeElement.options.item(1).selected = 'selected';
    }else{
      if(rol=='DOCENTE'){
        this.selectRol.nativeElement.options.item(2).selected = 'selected';
      }else{
        this.selectRol.nativeElement.options.item(3).selected = 'selected';
      }
    }
  }

  onChangeSelect(ev:any){
    console.log(ev.target[0].value);
  }

  clavesIguales(clave1nombre:string, clave2nombre:string){
    return (formGroup:FormGroup)=>{
      const campo1=formGroup.get(clave1nombre);
      const campo2=formGroup.get(clave2nombre);

      if(campo1?.value===campo1?.value){
        campo2?.setErrors(null);
      }else{
        campo2?.setErrors({noEsIgual:true});
      }
    }
  }

  cerrarModal(){
    this.smodal.cerrarModal()
  }
}
