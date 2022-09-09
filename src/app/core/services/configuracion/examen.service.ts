import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Examen, ExamenBD } from '../../interfaces/examen';

const baseUrl = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  constructor(private http:HttpClient) { }

  private _examenes:Examen[];

 

  get examenes(){
    return this._examenes;
  }
  
  consultar(resgistrosporpagina:number,pagina:number):Observable<HttpResponse<any>>{
    const token   = localStorage.getItem('token');
    return this.http.get<HttpResponse<any>>(`${baseUrl}/examen`,{
      headers:{
          'Authorization':`Bearer ${token}`
      },
      observe:'response',
      params:{CantidaddeRegistroPorPagina:`${resgistrosporpagina}`,Pagina:`${pagina}`}
    }).pipe(
      map(res => {
          return res
        })
      )
  }

  consultarId(idExamen:number):Observable<Examen>{
    const token   = localStorage.getItem('token');
    return this.http.get<Examen>(`${baseUrl}/examen/${idExamen}`,{
      headers:{
          'Authorization':`Bearer ${token}`
      }
    }).pipe(
      map(res => {
          return res;
        })
      )
  }

  crear(examen:ExamenBD):Observable<any>{
    const token   = localStorage.getItem('token');
    return this.http.post<any>(`${baseUrl}/examen/`,examen,{
      headers:{
          'Authorization':`Bearer ${token}`
      }
    }).pipe(
      map(res => {
          return res;
        })
      )

  }

  editar(examen:ExamenBD):Observable<ExamenBD>{
    const token   = localStorage.getItem('token');
    return this.http.put<ExamenBD>(`${baseUrl}/examen`,examen,{
      headers:{
          'Authorization':`Bearer ${token}`
      }
    }).pipe(
      map(res => {
          return res;
        })
      )
  }

  eliminar(idexamen:number):Observable<string>{
    const token   = localStorage.getItem('token');
    return this.http.delete(`${baseUrl}/examen/${idexamen}`,{
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
