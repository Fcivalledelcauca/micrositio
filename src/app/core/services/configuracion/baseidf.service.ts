import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseIdf } from '../../interfaces/baseIdf';
import { Tablero } from '../../interfaces/tablero';

const baseUrl= environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BaseIdfService {

  private _baseidfs:BaseIdf[]=[]
  private _baseidf:BaseIdf;

  get BaseIdfs(){
    return this._baseidfs;
  }

  get BaseIdf(){
    return this._baseidf;
  }

  constructor(private http:HttpClient) { }

  consultar():Observable<BaseIdf[]>{
    const token = localStorage.getItem('token');
    return this.http.get<BaseIdf[]>(`${baseUrl}/baseidf`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

  consultarId(lote:string):Observable<BaseIdf[]>{
    const token = localStorage.getItem('token');
    return this.http.get<BaseIdf[]>(`${baseUrl}/baseidf/${lote}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }
  

  crear(data:BaseIdf[]):Observable<BaseIdf>{
    const token = localStorage.getItem('token');
    return this.http.post<BaseIdf>(`${baseUrl}/baseidf`,data,{
      headers:{
        'Authorization':`Bearer ${token}`
        }
      }).pipe(
        map(res=>{
          return res;
        })
      )
  }

  eliminar(lote:string):Observable<string>{
    const token = localStorage.getItem('token');

    return this.http.delete(`${baseUrl}/baseidf/${lote}`,{
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
