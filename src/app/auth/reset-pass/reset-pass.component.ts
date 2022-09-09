import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActualizarUsuario } from 'src/app/core/interfaces/usuarios';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

  formReset:FormGroup;

  email:string='';
  hash:string='';
  constructor(private fb:FormBuilder
              ,private rutaActiva: ActivatedRoute
              ,private authService: AuthService
              ,private router:Router) { }


  ngOnInit(): void {
    console.log('Parametros: ',this.rutaActiva.snapshot.params)
    this.email=this.rutaActiva.snapshot.params.email;
    this.hash = this.rutaActiva.snapshot.params.hash;
    this.formReset = this.fb.group({
      email       :[this.email,[Validators.required]],
      clave       :['',[Validators.required,,Validators.minLength(6)]],
      validar     :['',[Validators.required]]  
    },{
      validators:[this.validacionPassword('clave','validar')]
    })
  }

  resetClave(){
    if(this.formReset.invalid){return}
    //Construccion de parametros para el consumo del servicio
        const user:ActualizarUsuario={
      email: this.formReset.get('email').value,
      clave: this.formReset.get('clave').value,
      hash: this.hash
    }
    console.log('resetclave',user);
    //Consumo del servicio
    this.authService.resetClave(user)
        .subscribe(res=>{
          Swal.fire(
            'Información',
            res,
            'success'
          )
          this.router.navigateByUrl('/login');
        },(error:HttpErrorResponse)=>{
          if(error.status==404)
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Este Link ha caducado, por favor envie denuevo la solicitud.',
            })
            this.router.navigateByUrl('/login');
          }
        }
        );


  }


  validacionPassword( campo1: string, campo2: string ) {
    return ( formGroup: AbstractControl ): ValidationErrors | null => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;
      if ( pass1 !== pass2 ) {
        formGroup.get(campo2)?.setErrors({ noIguales: true });
        return { noIguales: true }
      } 
      formGroup.get(campo2)?.setErrors(null);
      return null
    }
  }

  validarCampos(nombreCampo:string){
    return this.formReset.get(nombreCampo)?.invalid 
            && this.formReset.get(nombreCampo)?.touched 
  }


}
