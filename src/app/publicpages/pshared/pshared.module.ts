import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PheaderComponent } from './pheader/pheader.component';
import { PfooterComponent } from './pfooter/pfooter.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PheaderComponent,
    PfooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    PheaderComponent,
    PfooterComponent,

  ]
})
export class PsharedModule { }
