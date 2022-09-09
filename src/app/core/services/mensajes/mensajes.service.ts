import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MensajeDisplay, MmMensaje } from '../../interfaces/mensaje';


const baseUrl:string = environment.base_url;
const token = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private _listadoMensajes:MensajeDisplay[]=[];

  get listadoMensajes():MensajeDisplay[]{
    return this._listadoMensajes;
  }

  constructor(private http:HttpClient) { }

  consultarMensajes(resgistrosporpagina:number,pagina:number):Observable<HttpResponse<any>>{
    return this.http.get<HttpResponse<any>>(`${baseUrl}/mensaje`,{
       headers:{
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
       },
       observe:'response',
       params:{CantidaddeRegistroPorPagina:`${resgistrosporpagina}`,Pagina:`${pagina}`}
     }).pipe(
       map(res=>{
         return res;
       })
     )
  }

  crearMensajes(mensaje:MmMensaje):Observable<MmMensaje>{
    return this.http.post<MmMensaje>(`${baseUrl}/mensaje`,mensaje,{
       headers:{
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
       }
     }).pipe(
       map(res=>{
         return res;
       })
     )
  }

  borrarMensaje(idmensaje:number):Observable<string>{
    return this.http.delete(`${baseUrl}/mensaje/${idmensaje}`,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return JSON.stringify(res);
      }

      )
    )
  }


  /////
}
