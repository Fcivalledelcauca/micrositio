import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { DropzoneModule, DropzoneConfigInterface,
  DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { NgSelect2Module } from 'ng-select2';

import { ModalGruposComponent } from './grupos/modal-grupos.component';
import { ModaldocsComponent } from './modaldocs/modaldocs.component';
import { ModaldescargaComponent } from './modaldescarga/modaldescarga.component';
import { BuscarMcipiosComponent } from './buscar-mcipios/buscar-mcipios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropzoneCtrlComponent } from './dropzone/dropzone.component';
import { ModaluserComponent } from './modaluser/modaluser.component';
import { ModalcapacitacionComponent } from './modalcapacitacion/modalcapacitacion.component';
import { ModaldocenteComponent } from './modaldocente/modaldocente.component';
import { ModalmunicipioComponent } from './modalmunicipio/modalmunicipio.component';
import { ModaltemaComponent } from './modaltema/modaltema.component';
import { ModalcookieComponent } from './modalcookie/modalcookie.component';
import { ModalexamenComponent } from './modalexamen/modalexamen.component';
import { ModalexamenPresentadoComponent } from './modalcapacitacion/modalexamen/modalexamenpresentado.component';
import { PreguntaComponent } from './modalcapacitacion/modalexamen/pregunta/pregunta.component';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
 
};


@NgModule({
  declarations: [
    ModalGruposComponent,
    ModaldocsComponent,
    ModaldescargaComponent,
    BuscarMcipiosComponent,
    DropzoneCtrlComponent,
    ModaluserComponent,
    ModalcapacitacionComponent,
    ModaldocenteComponent,
    ModalmunicipioComponent,
    ModaltemaComponent,
    ModalcookieComponent,
    ModalexamenComponent,
    ModalexamenPresentadoComponent,
    PreguntaComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormsModule,
    DropzoneModule,
    NgSelect2Module
  ],
  exports:[
    ModalGruposComponent,
    ModaldocsComponent,
    ModaldescargaComponent,
    BuscarMcipiosComponent,
    DropzoneCtrlComponent,
    ModaluserComponent,
    ModalcapacitacionComponent,
    ModaldocenteComponent,
    ModalmunicipioComponent,
    ModaltemaComponent,
    ModalcookieComponent,
    ModalexamenComponent,
    ModalexamenPresentadoComponent,
    PreguntaComponent
  ],
  providers:[
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,

    },
    CookieService
  ]
})
export class ComponentesModule { }
