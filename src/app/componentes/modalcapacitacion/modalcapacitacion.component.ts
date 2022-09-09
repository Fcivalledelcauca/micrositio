import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { CAdminService } from 'src/app/core/services/capacitacion/cadmin.service';
import { EventoArchivoDisplay } from 'src/app/core/interfaces/eventosarchivos';
import { Evento } from 'src/app/core/interfaces/evento';
import { EventoMaterial } from 'src/app/core/interfaces/eventoMaterial';
import { ExamenPresentadoService } from 'src/app/core/services/capacitacion/examenpresentado.service';
import { ExamenDisplay } from 'src/app/core/interfaces/examenPresentado';
import { ModalExamenService } from 'src/app/core/services/componentes/modalexamen.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CparticipanteService } from 'src/app/core/services/capacitacion/cparticipante.service';

@Component({
  selector: 'app-modalcapacitacion',
  templateUrl: './modalcapacitacion.component.html',
  styleUrls: ['./modalcapacitacion.component.css']
})
export class ModalcapacitacionComponent implements OnInit,OnChanges {

   
  constructor( public modalService:ModalService
              ,public modalExamenService: ModalExamenService
              ,private eventoService:CAdminService
              ,private examenPresentadoService:ExamenPresentadoService
              ,private cparticipanteService:CparticipanteService
              ,private authService:AuthService) { }


  ngOnChanges(changes: SimpleChanges): void {
     if(changes.idEvento.currentValue){
       this.cargarEvento(changes.idEvento.currentValue);
    }

  }
  //@Input() eventoConsultar!:Evento;
  @Input() idEvento:number;
  
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
    temas: [],
    direccion: ''
  };  
  mostrarIconoImagenEvento:boolean=false;
  linkImagenEvento:string='';
  archivosGuardados:EventoArchivoDisplay[]=[];
  descripcion:string='';
  //esta variable se pasa al examen para que el participante lo diligencie
  idTemaExamen:number=0;

  examen:ExamenDisplay;

  examenesPresentados:any[]=[];

  ngOnInit(): void {


  }

  cargarEvento(ev:any){
    const decription  = '';
    //const start=new Date(ev.start).toISOString().substring(0, 10);
    //const end =new Date(ev.end).toISOString().substring(0,10);
    let start:any;
    let end:any;
    //Limpiamos modal
    this.limpiar();
    //consumimos el servicio para editar el evento
    this.eventoService.consultarEventoxId(ev)
          .subscribe((res)=>{
            const decription  = res.descripcion;
            const start=new Date(res.fecha_Ini).toISOString().substring(0, 10);
            const end =new Date(res.fecha_Fin).toISOString().substring(0,10);
            this.evento=res;
            this.descripcion=res.descripcion;
          })
    //Se consume el servicio para traer los archivos por temas 
    this.eventoService.consultarArchivoGuardadosxTema(ev)
          .subscribe(res=>{
            if(res.length>0){
              this.archivosGuardados=res;
              this.consultarExamenesPresentados();
            }
          })
  }

  consultarExamenesPresentados(){
      const usuario:string = this.authService.usuario
      this.examenesPresentados=[];
      this.cparticipanteService.consultarExamentesPresentados(usuario,this.archivosGuardados[0].idTema)
              .subscribe(res=>{
                  if(res[0] !='No se encontró ningun resultado'){
                    res.forEach(res=>{
                      this.examenesPresentados.push({
                        tema:res.tema,
                        examen:res.examen,
                        puntuacionminima:res.puntuacionMinima,
                        puntuacion:res.puntuacion,
                        respuestasCorrectas:res.respuestasCorrectas,
                        respuestasIncorrectas:res.respuestasIncorrectas,
                        aprobo:res.aprobo
                      })
                    })
                  }
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

  limpiar(){
    this.evento={
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
      direccion:'',
      link: '',
      activo: false,
      temas: []
    };  
    this.descripcion='';
    this.examenesPresentados=[];
  }

  abrirModalExamen(ev:any){
    this.idTemaExamen=ev.idTema;
    this.modalExamenService.abrirModal();
  }

  cerrarModal(){
    this.modalService.cerrarModal();
  }

  openaccordion(event,id,idtema){
    let idprincipal = document.getElementById(id);
    let btncolappse =  document.getElementById("btn"+id)
    let accoolappse = document.getElementById("colappse"+idtema)
    if(event.key == "Enter"){    

      if( btncolappse.ariaExpanded == "false"){        
      btncolappse.ariaExpanded="true"  
      btncolappse.classList.remove("collapsed")
      accoolappse.className +=" show"    
       }else{
         
      btncolappse.ariaExpanded="false"
      btncolappse.className +=" collapsed"  
      accoolappse.classList.remove("show")
       }
  
    } 
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
