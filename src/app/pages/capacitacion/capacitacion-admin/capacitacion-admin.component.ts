import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import dayGridPlugin  from '@fullcalendar/daygrid';
import timeGridPlugin  from '@fullcalendar/timegrid';
import interationPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { CAdminService } from 'src/app/core/services/capacitacion/cadmin.service';
import { Evento } from 'src/app/core/interfaces/evento';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LimpiarService } from 'src/app/core/services/limpiar.service';

declare function customInitFunction():any;

interface OpcionCalendario{
  plugins?: any[];
  themeSystem?: string;
  initialView?: string;
  locale?: {};
  defaultDate?: Date;
  header?: {};
  editable?:boolean;
  eventRender?:(event,element)=>void;
  //dateClick: this.onDateClick.bind(this),
  events?:Evento[];
  eventClick?:(calEvent:any, jsEvent:any, view:any) => void;
}

@Component({
  selector: 'app-capacitacion-admin',
  templateUrl: './capacitacion-admin.component.html',
  styleUrls: ['./capacitacion-admin.component.css'],
})
export class CapacitacionAdminComponent implements OnInit {
  eventos: any[] = [];
  optionsCalendario = {};
  contador: number = 0;
  idMunicipio: number = 0;
  municipio: string = '';
  limpiarTitulo: boolean = false;
  limpiarcamposhtml;
  idEvento:number=0;
  filtro: string = '';

  @ViewChild('calendario') calendario: ElementRef;
  calEvent: ElementRef;
  constructor(
    public modalService: ModalService,
    public cadmin: CAdminService,
    public authService: AuthService,
    private limpiarService:LimpiarService
  ) {}

  ngOnInit(): void {
    //1- cargar los plugin del calendario
    this.optionsCalendario = {
      plugins: [interationPlugin, dayGridPlugin, timeGridPlugin],
    };

    //2- setear el idmunicipio
    const user: string = localStorage.getItem('email');
    this.authService.consultaPerfil(user).subscribe((res) => {
      this.idMunicipio = res.idMunicipio;
      this.municipio = res.municipio || '';
      setTimeout(() => {
        this.construirCalendario();
      }, 100);
    });

    //3- se construye el calendario
    //console.log('1-',this.optionsCalendario);
  }

  construirCalendario() {
    this.cadmin.consultarEventos(this.idMunicipio).subscribe(
      (res) => {
        if (res) {
          this.eventos = [...res];
          this.optionsCalendario = this.escribirEventos(this.eventos);
          //customInitFunction();
        } else {
          this.optionsCalendario = this.escribirEventos([]);
          //customInitFunction();
        }
      },
      (err) => {
        this.optionsCalendario = this.escribirEventos([]);
        //customInitFunction();
      }
    );
  }
   
  funcionkey(calEvent:any){
    this.idEvento=calEvent.target.attributes[2].value    
    this.modalService.abrirModal()
    this.limpiarTitulo = false
  }
  escribirEventos(eventos: Evento[]): OpcionCalendario {
    return (this.optionsCalendario = {
      themeSystem: 'bootstrap',
      initialView: 'dayGridMonth',
      locale: esLocale,
      defaultDate: new Date(),
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },

      eventRender: function (info) {
        $(info.el).attr('tabindex', '11');
        $(info.el).attr('data-id', info.event.id);
      },
      events: eventos,
      editable: false,
      //dateClick: this.onDateClick.bind(this),
      //events:this.cparticipante.Eventos,
      //events:{},
      eventClick: (calEvent: any, jsEvent: any, view: any) => {
        this.idEvento=calEvent.event.id;
        this.limpiarTitulo = false
                 //hacer el metodo para traer el tema por municipios
        this.modalService.abrirModal()
      },
      // eventDidMount: (info)=>{
      //   var tooltip = new Tooltip(info.el, {
      //     title: info.event.extendedProps.description,
      //     placement: 'top',
      //     trigger: 'hover',
      //     container: 'body'
      //   });
      // },
    });
  }

  // opcionesCalendario(){
  //   this.optionsCalendario={
  //     plugins: [interationPlugin,dayGridPlugin,timeGridPlugin],
  //     themeSystem: 'bootstrap',
  //     initialView: 'dayGridMonth',
  //     locale: esLocale,
  //     defaultDate: new Date(),
  //     header:{
  //       left: 'prev,next',
  //       center: 'title',
  //       right: 'dayGridMonth,timeGridWeek,timeGridDay'
  //     },
  //     editable:true,
  //     eventMouseover:function(event,jsEvent,view){
  //             var str = "Nombre de la tarea:" + event.title + "\ nHora de inicio:" + moment(event.start_time) + "\ nHora de finalización:" + moment(event.end_time) + "\ nDescripción de la tarea:" + event.task_desc + "\ nIniciador:" + event.create_name + "\ nProcessor:" + event.do_name;
  //             $(this).attr('title',str);
  //             $(this).css('font-weight','normal');
  //     },
  //     dateClick: this.onDateClick.bind(this),
  //     events:this.cadmin.eventos,
  //     eventClick:(calEvent:any, jsEvent:any, view:any)=>{
  //       this.calEvent=calEvent;
  //       this.idMunicipio=this.authService.perfil.idMunicipio
  //       this.limpiarTitulo=true;
  //       this.modalService.abrirModal();
  //     }
  //   }
  // }

  consultarEventos() {
    this.cadmin.consultarEventos(this.idMunicipio).subscribe((res) => {
      if (res) {
        this.eventos = [...res];
      } else {
        this.eventos = [];
      }
    });
  }

  clickNext() {
    //var botonNext= document.querySelector('.fc-next-button');
    //botonNext.addEventListener('click',this.evento)
  }

  eliminarEventos(ev: Evento) {
    const idEvento: number = +ev.id;

    this.cadmin.eliminarEvento(idEvento).subscribe((res) => {
      Swal.fire('Información', res + 'título ' + ev.title, 'success');
      this.construirCalendario();
    });
  }

  crearNuevoEvento(ev: any) {
   if(this.limpiarTitulo ==  false){
    this.limpiarTitulo = true
   }
   this.modalService.abrirModal();
  }

  onDateClick(ev: any) {
    //console.log(ev);
  }

  updateEvent(ev: any) {}
  clickButton(ev: any) {}

  // filtrarTabla(){
  //   if(this.filtro==''){
  //     this.consultarDocumento(this.cantidadRegistrosPorPagina,this.pagina);
  //   }else{
  //     this.listadoDocumentos=this.listadoDocumentos.filter(
  //       res=>{
  //         return JSON.stringify(res).toLowerCase().includes(this.filtro.toLocaleLowerCase());
  //       }
  //     )
  //   }

  // }

  // CambioPagina(ev:any){
  //   this.pagina=ev;
  //   this.consultarDocumento(this.cantidadRegistrosPorPagina,this.pagina);
  // }

  // cambiarCantidadRegistros(ev:any){
  //   this.cantidadRegistrosPorPagina=ev.target.value;
  //   this.pagina=1;
  //   this.consultarDocumento(this.cantidadRegistrosPorPagina,this.pagina);
  // }
}
