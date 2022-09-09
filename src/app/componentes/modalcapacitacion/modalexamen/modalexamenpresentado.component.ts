import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExamenDisplay, RespuestaPresentada, Respuestas,ExamenPresentado } from 'src/app/core/interfaces/examenPresentado';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ExamenPresentadoService } from 'src/app/core/services/capacitacion/examenpresentado.service';
import { ModalExamenService } from 'src/app/core/services/componentes/modalexamen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modalexamenpresentado',
  templateUrl: './modalexamenpresentado.component.html',
  styleUrls: ['./modalexamenpresentado.component.css']
})
export class ModalexamenPresentadoComponent implements OnInit, OnChanges,OnDestroy {

  constructor(public modalExamenService: ModalExamenService
              ,private examenPresentadoService:ExamenPresentadoService
              ,private authService:AuthService
              ,private fb:FormBuilder) { }


  ngOnDestroy(): void {
   //console.log('destroy')
  }


  ngOnChanges(changes: SimpleChanges): void {
    //console.log(changes)
    if(changes.idTemaExamen.currentValue){
      this.cargarExamen(changes.idTemaExamen.currentValue)
    }
  }

  formExamen:FormGroup=this.fb.group({
    res_1    :[''],
    res_2    :[''],
  })


  
  @Input() idTemaExamen:number=0;

  examen:ExamenDisplay={
    idExamen: 0,
    idTema: 0,
    nombre: '',
    puntuacion: 0,
    instrucciones: '',
    activo: false,
    preguntas: []
  };  

  //en esta variable se guarda las respuestas seleccionadas por 
  //el participante
  respuestas:Respuestas[]=[];

  //esta variable se pasa a la base de datos 
  respuestaPresentadas:RespuestaPresentada[]=[]
  //Variable que sirve para guardar el id que se crea cuando se guarda el examen.
  idExamenPresentado:number=0;

  selected:boolean=false;  

  formRes:FormGroup;  
  //Muestra el mensaje de preguntas sin contestar     
  alertaPregunta:boolean=false;   

  ngOnInit(): void {
    this.respuestas = [];

    this.formRes=this.fb.group({
      idRespuesta   :[0],
      idPregunta    :[0],
      respuesta     :[''],
      seleccionado  :[false]
    })

    this.cargarExamen(this.idTemaExamen);

  }

  cargarExamen(idtema:number){
    this.examenPresentadoService.consultarExamenes(idtema)
        .subscribe(res=>{
          if(res){
            this.examen=res;
          }
        })
  }

 recibirRespuestaSeleccionada(ev:Respuestas){

   this.respuestas = this.respuestas.filter(res=>{
     return res.idPregunta!=ev.idPregunta
   });
   this.respuestas.push(ev);
   //console.log('respuestas seleccionadas:',this.respuestas)
 }

  enviar(){
    //se captura la cantidad de preguntas del examen
    const cantidadPreguntas:number=this.examen.preguntas.length;
    this.respuestaPresentadas=[];
    if(this.examen){
      const examenPresentado:ExamenPresentado={
        idExamenPresentado: 0,
        usuario: this.authService.perfil.usuario,
        idExamen: this.examen.idExamen,
        puntosMin: this.examen.puntuacion,
        puntuacion: 0,
        can_Ok: 0,
        can_Fail: 0,
        aprobo: false
      }
      //Se controla que el usuario haya respondido a todas las preguntas
      if(this.respuestas.length!=cantidadPreguntas){
        this.alertaPregunta=true;
        return;
      }

      this.examenPresentadoService.presentarExamen(examenPresentado)
            .subscribe(resp=>{
              //se almacena el id del examen presentado
              //console.log('respuesta de grabar examen:',resp);
              this.idExamenPresentado=resp.idExamenPresentado;
              if(this.respuestas){
                this.respuestas.forEach(res=>{
                  //arreglo que se va a guardar en la BD
                  const respuestaPres:RespuestaPresentada={
                    idRespuestaPresentada: 0,
                    idExamenPresentado: resp.idExamenPresentado,
                    idRespuesta: res.idRespuesta,
                    puntos: 0
                  }
                  this.respuestaPresentadas.push(respuestaPres);
                  //console.log('repuestas presentadas: ', this.respuestaPresentadas);
                })
                //se recorre el array para guardar las respuestas marcadas por el usuario
                this.respuestaPresentadas.forEach(item=>{
                  //consumo el servicio para guardar en base de datos
                  this.examenPresentadoService.guardarRespuestas(item)
                      .subscribe(res=>{
                         let puntos:number= res.map(item=>item.puntos).reduce((prev,act)=>prev+act,0);
                         let canOk:number=res.filter(item=>item.puntos>0).length;
                         if(this.respuestaPresentadas.length==res.length){
                            //console.log(puntos,canOk);
                            if(puntos>=0 && canOk>=0){
                              this.actualizarInfoExamen(puntos,canOk,this.respuestaPresentadas.length);
                              this.respuestas=[];
                            }
                          }
                        });
  
                   })
              }
            })

    }
  }

  cerrarAlerta(){
    if(this.alertaPregunta){
      this.alertaPregunta=false;
    }else{
      this.alertaPregunta=true;
    }
  }

  //variables para evitar que se guarde repetida la informacion
  //en la BD
  p:number=0;
  ok:number=0;
  //PUNTOS: son los puntos hechos por las respuestas correctas
  //OKS: solas la cantidad de respuestas correctas
  //CANT: la cantidad de preguntas marcadas
  actualizarInfoExamen(puntos:number,oks:number, cant:number){
    if((this.p!=puntos && this.ok!=oks) || cant>0){
      const examenPresentado:ExamenPresentado={
        idExamenPresentado: this.idExamenPresentado,
        usuario: this.authService.perfil.usuario,
        idExamen: this.examen.idExamen,
        puntosMin: 10,
        puntuacion: puntos,
        can_Ok: oks,
        can_Fail: cant-oks,
        aprobo: oks>5?true:false,
        
      }
      //console.log('Cuestionario actualizado: ', examenPresentado);
      this.examenPresentadoService.editarExamenPresentado(examenPresentado)
            .subscribe(
              (respuesta)=>{
                const res=JSON.parse(respuesta);
                if(res.aprobo){
                  Swal.fire({
                    imageUrl: 'https://img.icons8.com/bubbles/200/000000/trophy.png',
                    confirmButtonColor: '#3085d6',
                    html:
                    `<div class='container'> 
                      <div  style='background-image: url('../../../assets/images/curso-realizado.jpg');'> 
                        <p><strong>${res.nombreUsuario}</strong> has finalizado el cuestionario</p>
                        <br/>
                        <p class='h4 text-center'> Resumen de tu prueba </p>
                        <p class='h5'> Puntos logrados       <strong>${res.puntuacion}</strong></p>
                        <p class='h5'> Preguntas Correctas   <strong>${res.can_Ok}</strong></p>
                        <p class='h5'> Preguntas Incorrectas <strong>${res.can_Fail}</strong></p>
                      </div>
                    </div>`,
                    confirmButtonText:
                      '<i class="fas fa-check" style="color:white"></i> Aprobaste el Cuestionario!',
                  })
                }else{
                  Swal.fire({
                    imageUrl: 'https://img.icons8.com/bubbles/200/000000/trophy.png',
                    confirmButtonColor: '#d33',
                    html:
                    `<div class='container'>
                      <div  style='background-image: url('../../../assets/images/curso-realizado.jpg');'>
                        <p> <strong>${res.nombreUsuario}</strong> has finalizado el cuestionario</p>
                        <br/>
                        <p class='h4 text-center'> Resumen de tu prueba </p>
                        <p class='h5 text-justify'> Puntos logrados:       <strong>${res.puntuacion}</strong></p>
                        <p class='h5 text-justify'> Preguntas Correctas:   <strong>${res.can_Ok}</strong></p>
                        <p class='h5 text-justify'> Preguntas Incorrectas: <strong>${res.can_Fail}</strong></p>
                      </div>
                    </div>`,
                    confirmButtonText:
                      "<i class='fas fa-times' style='color:white'></i> Fallaste el Cuestionario!"
                      
                  })
                }

                //se limpia los arreglos para que comience de nuevo un examen en 
                //blanco
                this.respuestaPresentadas=[];  
              }
            );
    }
    this.p=puntos;
    this.ok=oks;
  }

 
  cerrarModal(){
    this.modalExamenService.cerrarModal();
  }
}
