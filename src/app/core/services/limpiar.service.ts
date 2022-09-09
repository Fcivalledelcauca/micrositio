import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';





@Injectable({
  providedIn: 'root'
})
export class LimpiarService {
  private _limpiar:string='';

  get Limpiar():string{
    return this._limpiar;
  }

  limpiarForm(){
    this._limpiar='limpiar';
  }

  noLimpiarForm(){
    this._limpiar='No limpiar';
  }
}