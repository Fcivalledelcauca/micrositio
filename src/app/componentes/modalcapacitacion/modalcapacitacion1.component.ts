import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { CAdminService } from 'src/app/core/services/capacitacion/cadmin.service';
import { EventoArchivoDisplay } from 'src/app/core/interfaces/eventosarchivos';
import { Evento } from 'src/app/core/interfaces/evento';
import { EventoMaterial } from 'src/app/core/interfaces/eventoMaterial';
import { ExamenPresentadoService } from 'src/app/core/services/capacitacion/examenpresentado.service';
import { ExamenDisplay } from 'src/app/core/interfaces/examenPresentado';
import { ModalExamenService } from 'src/app/core/services/componentes/modalexamen.service';

@Component({
  selector: 'app-modalcapacitacion1',
  templateUrl: './modalcapacitacion1.component.html',
  styleUrls: ['./modalcapacitacion1.component.css']
})
export class ModalcapacitacionComponent1 implements OnInit,OnChanges {

   
  constructor( public modalService:ModalService
              ,public modalExamenService: ModalExamenService
              ,private eventoService:CAdminService
              ,private examenPresentadoService:ExamenPresentadoService) { }


  ngOnChanges(changes: SimpleChanges): void {
     if(changes.eventoConsultar.currentValue){
      this.idTemaExamen=changes.idTema.currentValue; 
      this.cargarEvento(changes.eventoConsultar.currentValue.event);
    }
  }
  @Input() eventoConsultar!:Evento;
  @Input() idTema:number=0;

  evento:EventoMaterial={
    idCia: 0,
    idMunicipio: 0,
    titulo: '',
    descripcion: '',
    fecha_Ini: undefined,
    fecha_Fin: undefined,
    todoElDia: 0,
    colorEvento: '',
    imagen: '',
    nombreArchivo: '',
    link: '',
    activo: false,
    temas: []
  };  
  mostrarIconoImagenEvento:boolean=false;
  linkImagenEvento:string='';
  archivosGuardados:EventoArchivoDisplay[]=[];
  descripcion:string='';
  //esta variable se pasa al examen para que el participante lo diligencie
  idTemaExamen:number=0;

  examen:ExamenDisplay;

  ngOnInit(): void {


  }

  cargarEvento(ev:any){
    const {  decription } = ev.extendedProps
    const start=new Date(ev.start).toISOString().substring(0, 10);
    const end =new Date(ev.end).toISOString().substring(0,10);

    //consumimos el servicio para editar el evento
    this.eventoService.consultarEventoxId(ev.id)
          .subscribe((res)=>{
            this.evento=res;
            this.descripcion=res.descripcion;
          })
    //Se consume el servicio para traer los archivos por temas 
    this.eventoService.consultarArchivoGuardadosxTema(ev.id)
          .subscribe(res=>{
            this.archivosGuardados=res;
          })
  }


  descargarArchivo(doc: any){
    const refArchivo = document.createElement('a');
    refArchivo.href=doc.archivo;
    refArchivo.setAttribute('download',doc.nombreArchivo);
    refArchivo.target='_blank';
    document.body.appendChild(refArchivo);
    refArchivo.click()
  }

  abrirModalExamen(ev:any){
    this.idTemaExamen=ev.idTema;
    this.cerrarModal();
    this.modalExamenService.abrirModal();
  }

  cerrarModal(){
    this.modalService.cerrarModal();
  }

  // groupBy:any = (array, key) => {
  //   // Return the end result
  //   return array.reduce((result, currentValue) => {
  //     // If an array already present for key, push it to the array. Else create an array and push the object
  //     (result[currentValue[key]] = result[currentValue[key]] || []).push(
  //       currentValue
  //     );
  //     // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
  //     return result;
  //   }, {}); // empty object is the initial value for result object
  // };

}
