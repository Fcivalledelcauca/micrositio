import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseMdm } from '../../interfaces/baseMdm';
import { Tablero } from '../../interfaces/tablero';

const baseUrl= environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BaseMdmService {

  private _basemdms:BaseMdm[]=[]
  private _basemdm:BaseMdm;

  get BaseMdms(){
    return this._basemdms;
  }

  get BaseMdm(){
    return this._basemdm;
  }

  constructor(private http:HttpClient) { }

  consultar():Observable<BaseMdm[]>{
    const token = localStorage.getItem('token');
    return this.http.get<BaseMdm[]>(`${baseUrl}/basemdm`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      }),catchError((err:any)=>{
        return [];
      })
    )
  }

  consultarId(lote:string):Observable<BaseMdm[]>{
    const token = localStorage.getItem('token');
    return this.http.get<BaseMdm[]>(`${baseUrl}/basemdm/${lote}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }
  
  crear(data:BaseMdm[]):Observable<BaseMdm>{
    const token = localStorage.getItem('token');
    return this.http.post<BaseMdm>(`${baseUrl}/basemdm`,data,{
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

    return this.http.delete(`${baseUrl}/basemdm/${id}`,{
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
