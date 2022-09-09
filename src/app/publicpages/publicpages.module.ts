import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PsharedModule } from './pshared/pshared.module';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DeployComponent } from './deploy/deploy.component';
import { PublicpagesComponent } from './publicpages.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { ContactoComponent } from './contacto/contacto.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ReactiveFormsModule } from '@angular/forms';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { TemasComponent } from './temas/temas.component';
import { MunicipiosComponent } from './municipios/municipios.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapsitioComponent } from './mapsitio/mapsitio.component';

@NgModule({
  declarations: [
    PublicpagesComponent,
    HomeComponent,
    DeployComponent,
    ContactoComponent,
    EstadisticasComponent,
    TemasComponent,
    MunicipiosComponent,
    MapsitioComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PsharedModule,
    ComponentesModule,
    NgxCaptchaModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ]

})
export class PublicpagesModule { }
