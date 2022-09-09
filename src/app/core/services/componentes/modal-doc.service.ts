import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalDocService {

  private _ocultarModal: boolean=true;

  get ocultarModal(){
    return this._ocultarModal
  }

  constructor() { }

  cerrarModal(){
    this._ocultarModal=true;
  }

  abrirModal(){
    this._ocultarModal=false;
  }
}
