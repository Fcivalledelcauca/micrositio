import { Component, Input, OnChanges, OnInit, Output, SimpleChanges,EventEmitter } from '@angular/core';
import { ExamenDisplay, Preguntas, Respuestas } from 'src/app/core/interfaces/examenPresentado';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit,OnChanges {

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes.pregunta.currentValue){
      this.preguntaFormuladas=changes.pregunta.currentValue;
    }
  }

  @Input() pregunta:Preguntas
  @Output('resp') respSeleccionada:EventEmitter<Respuestas> =new EventEmitter();


  resSeleccionada:Respuestas={
    idRespuesta: 0,
    idPregunta: 0,
    respuesta: '',
    correcta: 0
  }

  onItemChange(ev:Respuestas){
    this.respSeleccionada.emit(ev);
  }


  preguntaFormuladas:Preguntas;
  respuestas:Respuestas[]=[];

  ngOnInit(): void {
  }

  seleccionarRespuesta(ev:Respuestas,eventhtml:any){
    if(eventhtml.target.value){
      const res:Respuestas={
        idRespuesta:  ev.idRespuesta,
        idPregunta:   ev.idPregunta,
        respuesta:    ev.respuesta,
        correcta:     ev.correcta
      }
      this.respuestas.push({...res});
    }else{

      this.respuestas.pop();
    }
  }

}
