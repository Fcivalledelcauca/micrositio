import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailPattern, NombreApellidoPattern } from 'src/app/core/pattern/pattern';
import { MensajesService } from 'src/app/core/services/mensajes/mensajes.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const siteKey = environment.siteKeyCaptcha;

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  //variable para las captchas
  siteKey:string;

  contactForm:FormGroup;

  constructor( private fb:FormBuilder
              ,private mensajeService:MensajesService
              ,private router:Router ) { 
    this.siteKey=siteKey;
  }

  ngOnInit(): void {
    this.contactForm= this.fb.group({
      idMensaje   :[0],
      nombre      :['',[Validators.required]],
      idMunicipio :['',[Validators.required]], 
      email       :['',[Validators.required,Validators.pattern(EmailPattern)]],
      telefono    :['',[Validators.required]],
      mensaje     :['',[Validators.required]],
      recaptcha   :['',[Validators.required]],
      tc          :[false,[Validators.required]]
    });
  }

  get emailErrors():string{
    const error = this.contactForm.get('email')?.errors;
    if( error?.required){
      return "El correo es un campo obligatorio.";
    }else if(error?.pattern){
      return "El correo no tiene el formato correcto"
    }
    return "";
  }

  enviar(){
    if(this.contactForm.invalid){return}
    this.mensajeService.crearMensajes(this.contactForm.value)
          .subscribe(res=>{
            Swal.fire(
              'Mensaje',
              'Su mensaje fue enviado con éxito.',
              'success'
            )
            this.router.navigateByUrl('/public/home');
          })

    
  }

  //este metodo captura el id del municipio para guardarlo en base de datos
  idMunicipioSeleccionado(ev:any){
    this.contactForm.get('idMunicipio').setValue(ev);
  }

  validarCampos(nombrec:string){
    return this.contactForm.get(nombrec)?.invalid 
              && this.contactForm.get(nombrec)?.touched
  }

}
