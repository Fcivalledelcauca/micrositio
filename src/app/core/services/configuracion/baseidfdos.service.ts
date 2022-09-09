import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseIdfdos } from '../../interfaces/baseIdfdos';
import { Tablero } from '../../interfaces/tablero';

const baseUrl= environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BaseIdfdosService {

  private _baseidfdoss:BaseIdfdos[]=[]
  private _baseidfdos:BaseIdfdos;

  get BaseIdfdoss(){
    return this._baseidfdoss;
  }

  get BaseIdfdos(){
    return this._baseidfdos;
  }

  constructor(private http:HttpClient) { }

  consultar():Observable<BaseIdfdos[]>{
    const token = localStorage.getItem('token');
    return this.http.get<BaseIdfdos[]>(`${baseUrl}/baseidfdos`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

  consultarId(lote:string):Observable<BaseIdfdos[]>{
    const token = localStorage.getItem('token');
    return this.http.get<BaseIdfdos[]>(`${baseUrl}/baseidfdos/${lote}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }
  

  crear(data:BaseIdfdos[]):Observable<BaseIdfdos>{
    const token = localStorage.getItem('token');
    return this.http.post<BaseIdfdos>(`${baseUrl}/baseidfdos`,data,{
      headers:{
        'Authorization':`Bearer ${token}`
        }
      }).pipe(
        map(res=>{
          return res;
        })
      )
  }

  eliminar(id:number):Observable<string>{
    const token = localStorage.getItem('token');

    return this.http.delete(`${baseUrl}/baseidfdos/${id}`,{
      headers:{
        'Authorization':`Bearer ${token}`
        }
      }).pipe(
        map(res=>{
          return JSON.stringify(res);
        })
      )
  }
}
