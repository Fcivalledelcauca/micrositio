import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesComponent } from './cuestionarios/reportes.component';
import { DataTablesModule } from "angular-datatables";
import { TreeTableModule } from 'primeng/treetable';

@NgModule({
  declarations: [ReportesComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    TreeTableModule,
  ],
  bootstrap: [ReportesModule]
})
export class ReportesModule { }
