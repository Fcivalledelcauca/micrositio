import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Perfil } from 'src/app/core/interfaces/perfil';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UploadmagenService } from 'src/app/core/services/cargararchivos/uploadmagen.service';

declare function customInitFunction():any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfil:Perfil;
  esAdministrador:boolean=false;
  //https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470029.1604841957!2d72.29955005258641!3d23.019996818380896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C+Gujarat!5e0!3m2!1sen!2sin!4v1493204785508
  ubicacionmapa=`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAN0x-_cC7L8dX4wnN3bu9pOEUgkr4tKt0&address=${this.auth.perfil.direccion} ${this.auth.perfil.municipio}`
  public imagenSubir!:File;
 
  imagenBD:string = this.auth.perfil.imagen || '../../../../assets/images/foto-perfil.jpg';

  perfilForm!:FormGroup;
  actualizar:boolean;

  get usuario():string{
    return localStorage.getItem('email')|| '';
  }

  constructor(public auth: AuthService,
              private fb: FormBuilder,
              private uploadImagen:UploadmagenService) 
  { 
    
  }

  ngOnInit(): void {
    this.traerInformacionPerfil();
    this.perfilForm=this.fb.group({
      nombrecompleto:       ['',  [Validators.required]],
      documentoidentidad:   ['',  [Validators.required]],
      email:                ['',  [Validators.required]],
      telefono:             ['',  [Validators.required]],
      direccion:            ['',  [Validators.required]],
      idMunicipio:          ['',  [Validators.required]],
      municipio:            ['',  [Validators.required]],
      usuario:              ['',  [Validators.required]],
      imagen:               [],
    });
    //customInitFunction();
   }

  
  //consulta la informacion de los perfiles
  traerInformacionPerfil(){
    this.auth.consultaPerfil(this.usuario)
    .subscribe((res:Perfil)=>{
         this.actualizar=true;
         this.perfil=res;
         this.perfilForm.patchValue({
          nombrecompleto:       this.perfil.nombreCompleto,
          documentoidentidad:   this.perfil.documentoIdentidad,
          email:                this.perfil.email,
          telefono:             this.perfil.telefono,
          direccion:            this.perfil.direccion,
          idMunicipio:          this.perfil.idMunicipio,
          municipio:            this.perfil.municipio,
          usuario:              this.perfil.usuario,
         })
       });
    //Oculta el municipio dependiendo del rol
    if(this.auth.rol=='ADMINISTRADOR'){
      this.esAdministrador=true
    }else{
      this.esAdministrador=false
    }
  }

  idMunicipioSeleccionado(ev:number){
    if(ev!=0){
      this.perfilForm.get('idMunicipio').setValue(ev);
    }
  }

  terminoSeleccionado(ev:any){
    if(ev!=''){
      this.perfilForm.get('municipio').setValue(ev);
    }
  }
  actualizarPerfil(){
   if(!this.perfilForm.value){return}
   this.perfilForm.controls["usuario"].setValue(this.usuario);

   this.auth.ActualizarPerfil(this.perfilForm.value)
            .subscribe(res=>{
              this.auth.perfil.nombreCompleto = this.perfilForm.controls["nombrecompleto"].value;
              this.auth.perfil.email = this.perfilForm.controls["email"].value;
              this.auth.perfil.telefono = this.perfilForm.controls["telefono"].value;
              this.auth.perfil.direccion = this.perfilForm.controls["direccion"].value;
            })
  }
  //subir y setear imagen seleccionada por el usuario
  setearImagen(file:File){
  if(file){
      this.imagenSubir = file;
      this.subirImagen();
    }
  }
  
  subirImagen(){
    this.uploadImagen.actualizarFotoPerfil(this.imagenSubir,this.usuario)
        .then(resp=>{
          this.imagenBD=resp || '../../../../assets/images/foto-perfil.jpg';
          this.auth.perfil.imagen = resp || '../../../../assets/images/foto-perfil.jpg';
        });
  }

}
