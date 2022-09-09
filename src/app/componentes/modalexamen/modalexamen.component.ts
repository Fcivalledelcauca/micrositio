import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamenBD } from 'src/app/core/interfaces/examen';
import { Pregunta } from 'src/app/core/interfaces/pregunta';
import { Tema } from 'src/app/core/interfaces/temas';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { ExamenService } from 'src/app/core/services/configuracion/examen.service';
import { PreguntaService } from 'src/app/core/services/configuracion/preguntas.service';
import { RespuestasService } from 'src/app/core/services/configuracion/respuesta.service';
import { TemaService } from 'src/app/core/services/configuracion/tema.service';
import Swal from 'sweetalert2';

interface Resp{
  id:number;
  respuesta:string;
}

@Component({
  selector: 'app-modalexamen',
  templateUrl: './modalexamen.component.html',
  styleUrls: ['./modalexamen.component.css']
})
export class ModalexamenComponent implements OnInit,OnChanges {

  constructor(public modalService:ModalService
              ,private fb:FormBuilder
              ,private temasService:TemaService
              ,private examenService:ExamenService
              ,private preguntaService:PreguntaService
              ,private respuestaService:RespuestasService) { }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes.editarEx.currentValue){
      this.idExamen=changes.editarEx.currentValue.IdExamen;
      this.cargarExamen(changes.editarEx.currentValue);
      this.cargarPreguntasGuardadas(changes.editarEx.currentValue.IdExamen);
    }
  }

  @Input() editarEx:ExamenBD={
    IdExamen: 0,
    IdTema: 0,
    Nombre: '',
    Puntuacion: 0,
    Instrucciones: '',
    Activo: false
  }

  @Output() actualizar:EventEmitter<boolean>=new EventEmitter();
  
  

  formExamen:FormGroup;
  formPregunta:FormGroup;
  formRespuesta:FormGroup;

  //se llena esta variable cuando se da en siguiente y se crea el 
  //Examen
  idExamen:number=0;
  //variable para recoger el idPregunta 
  idPregunta:number=0;
  //variable para recoger el idrespuesta
  idRespuesta:number=0;  
  //cuando se va a editar se carga esta variable
  preguntasGuardadas:Pregunta[]=[];


  //variable para mostrar mensaje de satisfactorio
  idmensaje:boolean=false;

  temas:Tema[]=[{
    IdTema:0,
    IdMunicipio:0,
    Tema:'Seleccione el tema',
    Activo:true,
  }];

  respuesta:string='';
  idRespuestaCorrecta:number=0;

  minimopreguntas:boolean=false;


  arrayRespuestas:Resp[]=[];

  mostrar:boolean=true;
  ocultar:boolean=false;

  ngOnInit(): void {
    //Llenar la lista de Temas
    this.consultarTemas();

    this.formExamen=this.fb.group({
      idExamen          :[''],
      idTema            :['0'],
      nombre            :['', [Validators.required]],
      puntuacion        :[10,  [Validators.required]],
      instrucciones     :[''],
    })

    this.formPregunta = this.fb.group({
      idPregunta      :[0],
      idExamen        :[''],
      pregunta        :['',[Validators.required]],
      puntos          :[1,[Validators.required]],
    })

    this.formRespuesta = this.fb.group({
      idRespuesta        :[0],
      idPregunta        :[''],
      respuesta         :['',[Validators.required]],
      correcta          :[0,[Validators.required]],
    })
  }

  guardarEditarExamen(){
    if(this.idExamen!=0){
      this.editarExamen();
      this.actualizar.emit(true);
    }else{
      this.guardarExamen();
      this.actualizar.emit(true);
    }
  }

  guardarEditarPreguntas(){
    if (this.preguntasGuardadas.length==10){
      this.minimopreguntas=false;
      Swal.fire('Información','No puedes ingresar mas de 10 preguntas.')
      return;
    }else{
      this.minimopreguntas=true;
    }
    if(this.idExamen!=0 && this.idPregunta!=0){
      this.editarPregunta();
    }else{
      this.guardarPreguntas();
    }
  }
  guardarExamen(){
    if(this.formExamen.invalid){return}

    this.examenService.crear(this.formExamen.value)
        .subscribe(res=>{
            this.idExamen = res.idExamen
            if(this.idExamen!=0){
              this.mostrar=false;
              this.ocultar=true;
              this.limpiarPreguntas();
            }
        })
  }

  guardarPreguntas(){
    //validaciones
    if(this.formPregunta.invalid){return}
    if(this.idExamen==0){return}

    //se setea el idexamen en el formulario
    this.formPregunta.get('idExamen').setValue(this.idExamen);
    //consume el servicio
    this.preguntaService.crear(this.formPregunta.value)
          .subscribe(res=>{
            if(res){
              //Se guardo la pregunta 
              this.idPregunta=res.idPregunta;
              //Se guarda las respuestas
              this.guardarRespuestas();
              this.cargarPreguntasGuardadas(this.idExamen);
            }
          });
  }

  guardarRespuestas(){
    if(this.idPregunta!=0){
      this.respuestaService.eliminarTodasRespuestas(this.idPregunta)
            .subscribe(res=>{
                this.arrayRespuestas.forEach(val=>{
                    //se setea el campo idpregunta del formulario
                    this.formRespuesta.get('idPregunta').setValue(this.idPregunta);
                    this.formRespuesta.get('respuesta').setValue(val.respuesta);
                    if(val.id==this.idRespuestaCorrecta){
                      this.formRespuesta.get('correcta').setValue(1);
                    }else{
                      this.formRespuesta.get('correcta').setValue(0);
                    }
                    //valida que el formulario este valido  
                    if(this.formRespuesta.invalid){return}
                    this.respuestaService.crear(this.formRespuesta.value)
                            .subscribe(
                              res=>{
                                if(res){
                                  console.log('holasssscrear')
                                  this.idRespuesta=res.idRespuesta;
                                }
                              }
                            )
                })
                //////////

                Swal.fire({
                  title: 'La Pregunta se ha guardado con éxito.',
                  showDenyButton: false,
                  showCancelButton: false,
                  confirmButtonText: 'Aceptar',
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                      //se limpian los campos
                      this.limpiarPreguntas();
                  }
                })

            })
    }

    
  }

  editarExamen(){
   
      if(this.formExamen.invalid){return}

      this.examenService.editar(this.formExamen.value)
            .subscribe(res=>{
              if(res){
                if(this.idExamen!=0){
                  this.mostrar=false;
                  this.ocultar=true;
                  this.limpiarPreguntas();
                }
              }
            })
  }

  editarPregunta(){
    if(this.idExamen!=0 && this.idPregunta!=0){
      if(this.formPregunta.invalid){return}

      this.preguntaService.editar(this.formPregunta.value)
            .subscribe(res=>{
              if(res){
                this.idPregunta=res.idPregunta
                this.guardarRespuestas();
                this.cargarPreguntasGuardadas(this.idExamen);     
              }
            })
    }
    
  }

  consultarTemas(){
    this.temasService.consultarTemas(1000,1)
              .subscribe(res=>{
                this.temas=[...JSON.parse(res.body.respuesta)];
            })
  }

  cargarExamen(ex:ExamenBD){
    if(ex){
      this.formExamen.patchValue({
        idExamen          :ex.IdExamen,
        idTema            :ex.IdTema,
        nombre            :ex.Nombre,
        puntuacion        :ex.Puntuacion,
        instrucciones     :ex.Instrucciones
      });

      this.cargarPreguntasGuardadas(this.idExamen);
    }
  }

  //Metodo para eliminar preguntas guardadas en el evento del boton eliminar
  //en la tabla
  eliminarPreguntaGuardada(ev:Pregunta){
    this.preguntaService.eliminar(ev.idPregunta)
        .subscribe(res=>{
          if(res){
            this.cargarPreguntasGuardadas(this.idExamen);
          }
        })
  }
  //metodo que llena la tabla de preguntas
  cargarPreguntasGuardadas(idExamen:number){
    this.preguntaService.consultar(idExamen)
          .subscribe(res=>{
             if(res){
              this.preguntasGuardadas=res;
              if (this.preguntasGuardadas.length==10){
                this.minimopreguntas=false;
              }else{
                this.minimopreguntas=true;
              }
             }
          })
  }

  //es el evento de la table de preguntas el editar (click)
  cargarPreguntas(ev:Pregunta){
    this.formPregunta.patchValue({
      idPregunta      :ev.idPregunta,
      idExamen        :ev.idExamen,
      pregunta        :ev.pregunta,
      puntos          :ev.puntos,
    })
    //se llena la variable idpregunta para editar
    this.idPregunta=ev.idPregunta;
    this.cargarRespuestas(ev)
  }

  //metodo se encarga de cargar las respuestas en el formulario dinamico
  cargarRespuestas(ev:Pregunta){
    if(ev){
      this.respuestaService.consultar(ev.idPregunta)
          .subscribe(res=>{
            if(res){
              this.arrayRespuestas=[];
              res.forEach(val=>{
                const rex:Resp={
                  id: val.idRespuesta,
                  respuesta: val.respuesta
                }
                this.arrayRespuestas.push({...rex})
              })
            }
          })
    }
  }
  //metodos para el formulario dinamico
  agregarRespuesta(){
    if(this.respuesta!=''){
      const res:Resp={
        id: this.arrayRespuestas.length,
        respuesta:this.respuesta
      }
      //se agrega al arrayRespuesta
      this.arrayRespuestas.push({...res});
      this.respuesta='';
    }
  }

  quitarRepuesta(ev:any){
    this.arrayRespuestas.splice(ev.id,1);
  }

  //Limpiar los formularios
  limpiarExamen(){
    this.formExamen.patchValue({
      idExamen          :0,
      idTema            :0,
      nombre            :'',
      puntuacion        :10,
      instrucciones     :'',
    })
    this.idExamen=0;
  }

  limpiarPreguntas(){
    this.formPregunta.patchValue({
      idPregunta      :0,
      idExamen        :this.idExamen,
      pregunta        :'',
      puntos          :1,
    })

    this.formRespuesta.patchValue({
      idRespuesa        :0,
      idPregunta        :0,
      respuesta         :'',
      correcta          :0,
    })
    this.idPregunta=0;
    this.arrayRespuestas=[];
  }

  validarCampos(nombreCampo:string){
    return this.formExamen.get(nombreCampo).invalid
              && this.formExamen.get(nombreCampo).touched              
  }

  pasarSiguiente(){
    this.guardarExamen()
  }

  pasarAnterior(){
    this.mostrar=true;
    this.ocultar=false;
  }

  cerrarModal(){
    this.limpiarExamen();
    this.limpiarPreguntas();
    this.mostrar=true;
    this.ocultar=false;
    this.modalService.cerrarModal();
  }

}
