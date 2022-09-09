import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing';
import { RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentesModule } from '../componentes/componentes.module';
import { PsharedModule } from '../publicpages/pshared/pshared.module';
import { RecoverpassComponent } from './recoverpass/recoverpass.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ResetPassComponent } from './reset-pass/reset-pass.component';



@NgModule({
  declarations: [ 
    LoginComponent,
    RegisterComponent,
    RecoverpassComponent,
    ResetPassComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentesModule,
    PsharedModule,
    NgxCaptchaModule

  ],
  exports:[
    LoginComponent,
    RegisterComponent,
    RecoverpassComponent,
    ResetPassComponent
  ]
})
export class AuthModule { }
