import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalExamenService {

  private _ocultarModal: boolean=false;

  get ocultarModal(){
    return this._ocultarModal
  }

  constructor() { }

  cerrarModal(){
    this._ocultarModal=false;
  }

  abrirModal(){
    this._ocultarModal=true;
  }
}


