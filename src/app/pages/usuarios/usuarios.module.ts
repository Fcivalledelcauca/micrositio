import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosListComponent } from './usuarios-list/usuarios-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [PerfilComponent, UsuariosListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentesModule,
    NgxPaginationModule
  ],
  exports:[PerfilComponent,UsuariosListComponent]
})
export class UsuariosModule { }
