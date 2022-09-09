import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RespuestaBD } from '../../interfaces/respuestaBD';

const baseUrl = environment.base_url;
const token   = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class RespuestasService {

  constructor(private http:HttpClient) { }

  private _respuestas:RespuestaBD[];


  get respuetas(){
    return this._respuestas;
  }
  
  consultar(idpregunta:number):Observable<RespuestaBD[]>{

    return this.http.get<RespuestaBD[]>(`${baseUrl}/respuesta/${idpregunta}`,{
      headers:{
          'Authorization':`Bearer ${token}`
      }
    }).pipe(
      map(res => {
          this._respuestas=res;
          return this.respuetas;
        })
      )
  }

  crear(respuesta:RespuestaBD):Observable<RespuestaBD>{
    return this.http.post<RespuestaBD>(`${baseUrl}/respuesta/`,respuesta,{
       headers:{
           'Authorization':`Bearer ${token}`
       }}).pipe(
       map(res => {
            return res;
       })
    )
   }

  editar(respuesta:RespuestaBD):Observable<RespuestaBD>{
    return this.http.put<RespuestaBD>(`${baseUrl}/respuesta`,respuesta,{
      headers:{
          'Authorization':`Bearer ${token}`
      }
    }).pipe(
      map(res => {
          return res;
        })
      )
  }

  
  eliminarTodasRespuestas(idpregunta:number){
    return this.http.delete(`${baseUrl}/respuesta/todo/${idpregunta}`,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    }).pipe(
      map(res => {
          return JSON.stringify(res);
        })
      )

  }

  eliminar(idrespuesta:number):Observable<string>{
    return this.http.delete(`${baseUrl}/respuesta/${idrespuesta}`,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    }).pipe(
      map(res => {
          return JSON.stringify(res);
        })
      )

  }
}
