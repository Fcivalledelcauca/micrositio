import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PromedioDimensiones } from '../../interfaces/promedioDimensiones';


const baseUrl= environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class PromedioDimensionesService {

  private _PDs:PromedioDimensiones[]=[]
  private _PD:PromedioDimensiones;

  get PDs(){
    return this._PDs
  }

  get PD(){
    return this._PD;
  }
  //rutas
  //   api/promediodim
  constructor(private http:HttpClient) { }

  consultar():Observable<PromedioDimensiones[]>{
    const token = localStorage.getItem('token');
    return this.http.get<PromedioDimensiones[]>(`${baseUrl}/promediodim`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

  consultarId(lote:string):Observable<PromedioDimensiones[]>{
    const token = localStorage.getItem('token');
    return this.http.get<PromedioDimensiones[]>(`${baseUrl}/promediodim/${lote}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }
  

  crear(data:PromedioDimensiones[]):Observable<PromedioDimensiones>{
    const token = localStorage.getItem('token');
    return this.http.post<PromedioDimensiones>(`${baseUrl}/promediodim`,data,{
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

    return this.http.delete(`${baseUrl}/promediodim/${id}`,{
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
