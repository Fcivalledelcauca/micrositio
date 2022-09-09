import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentesModule } from 'src/app/componentes/componentes.module';
import {NgxPaginationModule} from 'ngx-pagination'

import { GruposComponent } from './grupos/grupos.component';
import { DocsComponent } from './docs/docs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    GruposComponent,
    DocsComponent
  ],
  imports: [
    CommonModule,
    ComponentesModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    GruposComponent,
    DocsComponent
  ]
})
export class DifusionModule { }
