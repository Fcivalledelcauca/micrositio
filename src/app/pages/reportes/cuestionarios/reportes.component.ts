import { TreeNode } from 'primeng/api';
import { Component, ElementRef, OnInit } from '@angular/core';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { ReportesService } from './reportes.service';
import { ReporteCuestionario } from 'src/app/core/interfaces/reportecuestionario';
import { CuestionarioService } from 'src/app/core/services/reportes/cuestionario.service';
import { ExportexcelService } from 'src/app/core/services/help/exportexcel.service';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  files1: TreeNode[];

  files2: TreeNode[];

  cols: any[];

  resultReport:ReporteCuestionario[]=[];

  dataReport:ReporteCuestionario[]=[];

  datosFiltrados:ReporteCuestionario[]=[];

  guias:ReporteCuestionario[]=[];

  examenes:ReporteCuestionario[]=[];

  examenesPresentados:any[]=[];

  usuarios:ReporteCuestionario[]=[];

  nombreExamen:string='';

  dataDetails:ReporteCuestionario[]=[];


  constructor(private service: ReportesService
              ,private reporteCuestionarioService:CuestionarioService
              ,private exportexcelService:ExportexcelService) 
  { }

  ngOnInit() {
    this.service.getFilesystem().then(files => this.files1 = files);
    this.service.getFilesystem().then(files => this.files2 = files);

    this.cols = [
      { field: 'nombre', header: 'nombre' },
      { field: 'fecha', header: 'fecha' },
      { field: 'materia', header: 'materia' }
    ];
    //Consulta a la BD de la informacion.
    this.report();

 
  }

  report(){
    let hash={};
    this.reporteCuestionarioService.getcuestionario().subscribe((res:ReporteCuestionario[])=>{
      this.resultReport=res;
      this.dataReport=this.resultReport.filter(o => hash[o.municipio] ? false : hash[o.municipio] = true)
      this.usuarios = this.resultReport.filter(o => hash[o.usuario] ? false : hash[o.usuario] = true)
      this.guias=this.resultReport.filter(o => hash[o.guia] ? false : hash[o.guia] = true)
    })
  }

  groupBy(array: any[], f) {
    const groups = {};
    array.forEach(function (o) {
      const group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
      return groups[group];
    });
  }

  filtros(filtro:any,key:string){
    let hash={};
    let contador:number=1;
    this.examenesPresentados=[];
    if(filtro.target.value!=''){
      this.datosFiltrados=this.resultReport.filter(fila=>{
        return fila[key]==filtro.target.value
      });
      if(this.datosFiltrados.length>0){
       this.examenes = this.datosFiltrados.filter(o => hash[o.nomExamen] ? false : hash[o.nomExamen] = true)
        
      this.examenes.forEach((item)=>{
          this.examenesPresentados = [...(this.findOcc(this.datosFiltrados,'nomExamen',item.nomExamen))];
       })
      }
      else{
        this.datosFiltrados=[];
        this.nombreExamen='';
      }
    }
  }


  findOcc(arr:any[], key:string,filtro:string){
    let arr2 = [];
    console.log(key);
    arr.forEach((x)=>{
      // Checking if there is any object in arr2
      // which contains the key value
       if(arr2.some((val)=>{ return val[key] == x[key]})){
          // If yes! then increase the occurrence by 1
          arr2.forEach((k)=>{
            if(k[key] === x[key]){ 
              k["cantidad"]++;
            }
          })
       }else{
          // If not! Then create a new object initialize 
          // it with the present iteration key's value and 
          // set the occurrence to 1
          let a = {}
          a[key] = x[key]
          a["cantidad"] = 1
          arr2.push(a);
       }
    })
    return arr2
  }

  details(examen:string){
    if(examen.length>0){
      this.nombreExamen=examen;
        this.dataDetails = this.datosFiltrados.filter(row=>{
          return row.nomExamen==examen;
        })
    }
  }

  exportarExcel(reporte:any[],name:string){
    this.exportexcelService.exporTOExcel(reporte,name);
  }


}
