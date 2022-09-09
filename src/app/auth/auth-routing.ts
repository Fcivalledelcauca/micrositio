import { NgModule}  from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverpassComponent } from './recoverpass/recoverpass.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';

const routes: Routes = [

    {path:'login', component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'recoverpass',component:RecoverpassComponent},
    {path:'resetpass/:email/:hash',component:ResetPassComponent}

]

@NgModule({
    declarations:[],
    imports:[
        RouterModule.forChild(routes),
        CommonModule
    ],
    exports:[RouterModule]
})

export class AuthRoutingModule{}