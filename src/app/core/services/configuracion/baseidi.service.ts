import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseIdi } from '../../interfaces/baseIdi';
import { Tablero } from '../../interfaces/tablero';

const baseUrl= environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BaseIdiService {

  private _baseidis:BaseIdi[]=[]
  private _baseidi:BaseIdi;

  get BaseIdis(){
    return this._baseidis;
  }

  get BaseIdi(){
    return this._baseidi;
  }

  constructor(private http:HttpClient) { }

  consultar():Observable<BaseIdi[]>{
    const token = localStorage.getItem('token');
    return this.http.get<BaseIdi[]>(`${baseUrl}/baseidi`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

  consultarId(lote:string):Observable<BaseIdi[]>{
    const token = localStorage.getItem('token');
    return this.http.get<BaseIdi[]>(`${baseUrl}/baseidi/${lote}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }
  

  crear(data:BaseIdi[]):Observable<BaseIdi>{
    const token = localStorage.getItem('token');
    return this.http.post<BaseIdi>(`${baseUrl}/baseidi`,data,{
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

    return this.http.delete(`${baseUrl}/baseidi/${id}`,{
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
