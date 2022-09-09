import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ModalService } from 'src/app/core/services/componentes/modal.service';

import dayGridPlugin  from '@fullcalendar/daygrid';
import timeGridPlugin  from '@fullcalendar/timegrid';
import interationPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

import { CparticipanteService } from 'src/app/core/services/capacitacion/cparticipante.service';
import { Evento } from 'src/app/core/interfaces/evento';
import { AuthService } from 'src/app/core/services/auth/auth.service';


declare function calendarinit():any;
declare function customInitFunction():any;


interface OpcionCalendario{
  plugins?: any[];
  themeSystem?: string;
  initialView?: string;
  locale?: {};
  defaultDate?: Date;
  header?: {};
  editable?:boolean;
  //dateClick: this.onDateClick.bind(this),
  events?:Evento[];
  eventDidMount?:(info:any)=>void;
  eventClick?:(calEvent:any, jsEvent:any, view:any) => void;
  dateClick?:(info:any)=>void;
  eventContent?:(info,createElement)=>void;
  eventRender?:(event,element)=>void;
  eventAfterAllRender?:(info:any)=>void;
  mouseEnterInfo?:(ev:any)=> void;
}

@Component({
  selector: 'app-capacitacion',
  templateUrl: './capacitacion.component.html',
  styleUrls: ['./capacitacion.component.css']
})
export class CapacitacionComponent implements OnInit {

  eventos:Evento[]=[];
  calEvent:ElementRef;
  optionsCalendario:OpcionCalendario;
  municipio:string='';
  constructor(  public modalService: ModalService
                ,public cparticipante:CparticipanteService
                ,private authService:AuthService) { }

  
  
  @ViewChild('calendario') calendar: any;

  idMunicipio:number=0;
  hmloption:string='';
  idEvento:number=0;

  ngOnInit(): void {
    //calendarinit();
    //1- cargar los plugin del calendario
    this.optionsCalendario={
      plugins:[interationPlugin,dayGridPlugin,timeGridPlugin]
    }

    //2- setear el idmunicipio

    const user:string = localStorage.getItem('email');
    this.authService.consultaPerfil(user)
          .subscribe(res=>{
            this.idMunicipio = res.idMunicipio;
            this.municipio = res.municipio || '';
            setTimeout(() => {
              this.construirCalendario(); 
            }, 100);
          })

    // this.idMunicipio = this.authService.perfil.idMunicipio;
    // this.municipio = this.authService.perfil.municipio || ''
    // //console.log('municipio capacitacion: ',this.idMunicipio);
    // //3- se construye el calendario
    // //console.log('1-',this.optionsCalendario);
    // setTimeout(() => {
    //   this.construirCalendario();  
    // }, 500);
  }

  construirCalendario(){
    this.cparticipante.consultarEventos(this.idMunicipio)
    .subscribe(res=>{
      if(res){
        this.eventos = [...res];
        this.optionsCalendario = this.escribirEventos(this.eventos);
        //customInitFunction();
      }else{
        this.optionsCalendario = this.escribirEventos([]);
        //customInitFunction();
 
        this.calendar.render()
      }
    },(err)=>{
      this.optionsCalendario = this.escribirEventos([]);
      //customInitFunction();
      this.calendar.render();
    }

    )
  }
  
  funcionkey(calEvent:any){
    //console.log('funcionkey',calEvent.target.attributes[2].value)
    //this.calEvent=calEvent;
    this.idEvento=calEvent.target.attributes[2].value
   
    //hacer el metodo para traer el tema por municipios
    this.modalService.abrirModal()
  }
  escribirEventos(eventos:Evento[]):OpcionCalendario{
    return this.optionsCalendario={
      themeSystem: 'bootstrap',
      initialView: 'dayGridMonth',
      locale: esLocale,
      defaultDate: new Date(),
      header:{
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
    
    eventRender: function(info) {
      $(info.el).attr('tabindex','11');
      $(info.el).attr('data-id',info.event.id);
     
    },

      events:eventos,
      editable:true,
      //dateClick: this.onDateClick.bind(this),
      //events:this.cparticipante.Eventos,
      //events:{},
    eventClick:(calEvent:any, jsEvent:any, view:any)=>{
      this.idEvento=calEvent.event.id;
      
      //hacer el metodo para traer el tema por municipios
      this.modalService.abrirModal()
    },

  
      
      mouseEnterInfo:(ev:any)=>{
      
      }

       
    }//termina

  }
  
  onDateClick(res:any){
    this.modalService.abrirModal()
  }

  eventclic(){
    this.modalService.abrirModal()
  }

  updateEvent(ev:any){
  
  }

  clickButton(ev:any){
   

  }

}
