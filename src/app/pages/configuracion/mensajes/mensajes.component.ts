import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MensajeDisplay, MmMensaje } from 'src/app/core/interfaces/mensaje';
import { MensajesService } from 'src/app/core/services/mensajes/mensajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  constructor(private mensajeService:MensajesService) { }

  mensajes:MensajeDisplay[]=[];

  mensajesDisplay:MensajeDisplay[]=[];

  cantidadRegistrosPorPagina:number=10;
  pagina:number=1;
  cantidadRegistros:number=0;

  filtro:string='';


  ngOnInit(): void {
    this.consultarMensajes(this.cantidadRegistrosPorPagina,this.pagina);
  }

  consultarMensajes(catnRegistroporPagina:number,pag:number){
    this.mensajeService.consultarMensajes(catnRegistroporPagina,pag)
    .subscribe((res:HttpResponse<any>)=>{
      this.cantidadRegistros= res.body.cantidadPaginas*catnRegistroporPagina;
      this.mensajes=JSON.parse(res.body.respuesta);
      this.mensajesDisplay=JSON.parse(res.body.respuesta);
    })
  }

  eliminar(ev:MensajeDisplay){
    if(ev){
        Swal.fire({
          title: '¿Borrar Grupo?',
          text: `Esta seguro de Borrar el mensaje de ${ev.nombre}`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Borrar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.mensajeService.borrarMensaje(ev.idMensaje)
            .subscribe(res=>{
              if(res){
                this.consultarMensajes(this.cantidadRegistrosPorPagina,this.pagina);
                Swal.fire(
                  'Información',
                  `El menasaje ${ev.nombre} se borró con éxito.`,
                  'success');
              }
            })       
          }
        })
    }
  }

  filtrarTabla(){
    if(this.filtro==''){
      this.consultarMensajes(this.cantidadRegistrosPorPagina,this.pagina);
    }else{
      this.mensajesDisplay=this.mensajes.filter(
        res=>{
          return JSON.stringify(Object.values(res)).toLowerCase().includes(this.filtro.toLowerCase());
        }
      )
    }

  }

  CambioPagina(ev:any){
    this.pagina=ev;
    this.consultarMensajes(this.cantidadRegistrosPorPagina,this.pagina);
  }

  cambiarCantidadRegistros(ev:any){
    this.cantidadRegistrosPorPagina=ev.target.value;
    this.pagina=1;
    this.consultarMensajes(this.cantidadRegistrosPorPagina,this.pagina);
  }

}
