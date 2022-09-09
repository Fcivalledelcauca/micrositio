import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResumenMdm } from '../../interfaces/resumenMdm';

const baseUrl= environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class ResumenMdmService {

  private _resumenMdms:ResumenMdm[]=[]
  private _resumenMdm:ResumenMdm;

  get ResumenMdms(){
    return this._resumenMdms;
  }

  get ResumenMdm(){
    return this._resumenMdm;
  }

  constructor(private http:HttpClient) { }

   //rutas
  //   api/resumenmdm

  consultar():Observable<ResumenMdm[]>{
    const token = localStorage.getItem('token');
    return this.http.get<ResumenMdm[]>(`${baseUrl}/resumenmdm`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

  consultarId(lote:string):Observable<ResumenMdm[]>{
    const token = localStorage.getItem('token');
    return this.http.get<ResumenMdm[]>(`${baseUrl}/resumenmdm/${lote}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }
  

  crear(data:ResumenMdm[]):Observable<ResumenMdm>{
    const token = localStorage.getItem('token');
    return this.http.post<ResumenMdm>(`${baseUrl}/resumenmdm`,data,{
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

    return this.http.delete(`${baseUrl}/resumenmdm/${id}`,{
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
