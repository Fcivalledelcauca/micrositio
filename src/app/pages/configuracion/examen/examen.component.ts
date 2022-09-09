import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Examen } from 'src/app/core/interfaces/examen';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { ExamenService } from 'src/app/core/services/configuracion/examen.service';
import Swal from 'sweetalert2';

declare function customInitFunction():any;

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  constructor(public modalService:ModalService
              ,private examenService:ExamenService) { }

  examenes:Examen[]=[]
  editarExamen:Examen;

  examenesDisplay:Examen[]=[];

  cantidadRegistrosPorPagina:number=10;
  pagina:number=1;
  cantidadRegistros:number=0;

  filtro:string='';


  ngOnInit(): void {
    //customInitFunction();
    this.consultar(this.cantidadRegistrosPorPagina,this.pagina);
  }

  consultar(catnRegistroporPagina:number,pag:number){
    this.examenService.consultar(catnRegistroporPagina,pag)
          .subscribe((res:HttpResponse<any>)=>{
            this.cantidadRegistros= res.body.cantidadPaginas*catnRegistroporPagina;
            this.examenes=JSON.parse(res.body.respuesta);
            this.examenesDisplay=JSON.parse(res.body.respuesta);
          })
  }

  editar(ex:Examen){
    this.editarExamen=ex;
    this.abrirModal();
  }

  eliminar(ex:Examen){
    Swal.fire({
      title: '¿Borrar Examen?',
      text: `Esta seguro de Borrar este cuestionario ${ex.Nombre} `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.examenService.eliminar(ex.IdExamen)
        .subscribe(res=>{
          Swal.fire(
            'Información',
            `El cuestionario ${ex.Nombre} se borró con éxito.`,
            'success');
            this.consultar(this.cantidadRegistrosPorPagina,this.pagina);
        },
        err=>{
          Swal.fire(
            'Información',
            err.error,
            'error');
        }
        
        
        )       
      }
    })
  }

  abrirModal(){
    this.modalService.abrirModal();
  }

  filtrarTabla(){
    if(this.filtro==''){
      this.consultar(this.cantidadRegistrosPorPagina,this.pagina);
    }else{
      this.examenesDisplay=this.examenes.filter(
        res=>{
          return JSON.stringify(Object.values(res)).toLowerCase().includes(this.filtro.toLowerCase());
        }
      )
    }

  }

  CambioPagina(ev:any){
    this.pagina=ev;
    this.consultar(this.cantidadRegistrosPorPagina,this.pagina);
  }

  cambiarCantidadRegistros(ev:any){
    this.cantidadRegistrosPorPagina=ev.target.value;
    this.pagina=1;
    this.consultar(this.cantidadRegistrosPorPagina,this.pagina);
  }
}
