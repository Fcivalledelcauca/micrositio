import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Tema } from 'src/app/core/interfaces/temas';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { TemaService } from 'src/app/core/services/configuracion/tema.service';
import Swal from 'sweetalert2';

declare function customInitFunction():any;

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  temas:Tema[]=[];
  temasDisplay:Tema[]=[];
  tema:Tema;

  cantidadRegistrosPorPagina:number=10;
  pagina:number=1;
  cantidadRegistros:number=0;

  filtro:string='';

  constructor(public modalService:ModalService
              ,private temaService:TemaService) { }

  ngOnInit(): void {
    //customInitFunction();
    this.consultarTemas(this.cantidadRegistrosPorPagina,this.pagina);
  }

  consultarTemas(catnRegistroporPagina:number,pag:number){
    this.temaService.consultarTemas(catnRegistroporPagina,pag)
          .subscribe((res:HttpResponse<any>)=>{
            this.cantidadRegistros=res.body.cantidadPaginas*catnRegistroporPagina;
            this.temas=JSON.parse(res.body.respuesta);
            this.temasDisplay=JSON.parse(res.body.respuesta);
          });
  }

  abrirModal(){
    this.modalService.abrirModal();
  }

  editarTema(ev:Tema){
    this.tema=ev;
    this.abrirModal();

  }

  actualizar(ev:boolean){
    if(ev){
      this.consultarTemas(this.cantidadRegistrosPorPagina,this.pagina);
    }
  }
  eliminarTema(ev:Tema){
    Swal.fire({
          title: '¿Borrar Tema?',
          text: `Esta seguro de Borrar este Tema ${ev.Tema} `,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Borrar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.temaService.eliminarTema(ev.IdTema)
            .subscribe(
              res=>{
              Swal.fire(
                'Información',
                `El Tema ${ev.Tema} se borró con éxito.`,
                'success');
                this.consultarTemas(this.cantidadRegistrosPorPagina,this.pagina);
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

  filtrarTabla(){
    if(this.filtro==''){
      this.consultarTemas(this.cantidadRegistrosPorPagina,this.pagina);
    }else{
      this.temasDisplay = this.temas.filter(
        res=> {
          return JSON.stringify(Object.values(res)).toLowerCase().includes(this.filtro.toLowerCase());
        }
      )
    }
  }

  CambioPagina(ev:any){
    this.pagina=ev;
    this.consultarTemas(this.cantidadRegistrosPorPagina,this.pagina);
  }

  cambiarCantidadRegistros(ev:any){
    this.cantidadRegistrosPorPagina=ev.target.value;
    this.pagina=1;
    this.consultarTemas(this.cantidadRegistrosPorPagina,this.pagina);
  }
}
