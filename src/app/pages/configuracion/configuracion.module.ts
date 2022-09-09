import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MunicipioComponent } from './municipio/municipio.component';
import { TemasComponent } from './temas/temas.component';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { TemasxmunicipioComponent } from './temasxmunicipio/temasxmunicipio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamenComponent } from './examen/examen.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EstadisticosComponent } from './estadisticos/estadisticos.component';



@NgModule({
  declarations: [
    MunicipioComponent,
    TemasComponent,
    TemasxmunicipioComponent,
    ExamenComponent,
    MensajesComponent,
    EstadisticosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentesModule,
    NgxPaginationModule
  ],
  exports:[
    MunicipioComponent,
    TemasComponent,
    TemasxmunicipioComponent,
    ExamenComponent,
    MensajesComponent,
    EstadisticosComponent
  ]
})
export class ConfiguracionModule { }
