import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const baseUrl:string = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class LimpiarInputMunicipioService {
  private _limpiar:string='';

  get Limpiar():string{
    return this._limpiar;
  }

  limpiarInput(){
    this._limpiar='limpiar';
  }

  noLimpiarInput(){
    this._limpiar='No limpiar';
  }
}