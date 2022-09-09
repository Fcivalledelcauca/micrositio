import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pregunta } from '../../interfaces/pregunta';

const baseUrl = environment.base_url;
const token   = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(private http:HttpClient) { }

  private _preguntas:Pregunta[];


  get preguntas(){
    return this._preguntas;
  }
  
  consultar(idTema:number):Observable<Pregunta[]>{

    return this.http.get<Pregunta[]>(`${baseUrl}/pregunta/${idTema}`,{
      headers:{
          'Authorization':`Bearer ${token}`
      }
    }).pipe(
      map(res => {
          this._preguntas=res;
          return this.preguntas;
        })
      )
  }

  crear(pregunta:Pregunta):Observable<Pregunta>{
    return this.http.post<Pregunta>(`${baseUrl}/pregunta/`,pregunta,{
       headers:{
           'Authorization':`Bearer ${token}`
       }}).pipe(
       map(res => {
          return res;
       })
    )
   }

  editar(pregunta:Pregunta):Observable<Pregunta>{
    console.log(pregunta);
    return this.http.put<Pregunta>(`${baseUrl}/pregunta`,pregunta,{
      headers:{
          'Authorization':`Bearer ${token}`
      }
    }).pipe(
      map(res => {
          return res;
        })
      )
  }


  eliminar(idpregunta:number):Observable<string>{
    return this.http.delete(`${baseUrl}/pregunta/${idpregunta}`,{
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
