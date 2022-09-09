import { Component, OnInit } from '@angular/core';
import { Accessibility } from 'node_modules/accessibility/src/main';

//declare function customInitFunction():any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor( ) {  new Accessibility(
    this.options,
    (this.textToSpeech = 'en-ES'),
    (this.speechToText = 'en-ES')
  );}

  ngOnInit(): void {
    //customInitFunction();
  }

  labels = {
    resetTitle: 'Reiniciar',
    closeTitle: 'Cerrar (ctrl + alt + a)',
    menuTitle: 'Opciones de accesibilidad',
    increaseText: 'Aumentar el tamaño del texto',
    decreaseText: 'Disminuir el tamaño del texto',
    increaseTextSpacing: 'Aumentar el espaciado del texto',
    decreaseTextSpacing: 'Disminuir el espaciado del texto',
    invertColors: 'Invertir colores (ctrl + alt + i)',
    grayHues: 'Tonos grises (ctrl + alt + g)',
    underlineLinks: 'Subrayar enlaces (ctrl + alt + u)',
    bigCursor: 'Cursor grande (ctrl + alt + c)',
    readingGuide: 'Guia de lectura (ctrl + alt + r)',
    textToSpeech: 'Texto a voz (ctrl + alt + t)',
    speechToText: 'Dictado a texto',
  };
  options = {
    labels: this.labels,
    icon: {
      position: {
        bottom: { size: 50, units: 'px' },
        right: { size: 0, units: 'px' },
        top: { size: 30, units: '%' },
        type: 'fixed',
      },
      circular: false,
      
    },
    hotkeys: {
      enabled: true,
      helpTitles: true
    },
  };
  textToSpeech;
  speechToText;
  
  mostrarMenu(){
    let boton = document.querySelector('._access-menu');
    let quitarClose = boton.classList.remove("close");
    let menu = document.querySelector('._access-scrollbar');
    let mostrarTexto = menu.classList.remove("before-collapse");
    let x = document.querySelector('._access-scrollbar');
    //let tabIndex = x.setAttribute("tabindex","24");
    // before-collapse ESTA ES LA CLASE PARA MOSTRAER EL TEXTO
  }
}
