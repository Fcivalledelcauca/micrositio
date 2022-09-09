import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Tablero, TableroDisplay } from '../../interfaces/tablero';

const baseUrl= environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class TableroService {

  private _tableros:Tablero[]=[]
  private _tablero:Tablero;

  get Tableros(){
    return this._tableros;
  }

  get Tablero(){
    return this._tablero;
  }

  constructor(private http:HttpClient) { }

  consultar():Observable<Tablero[]>{
    const token = localStorage.getItem('token');
    return this.http.get<Tablero[]>(`${baseUrl}/tablero`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

  consultarId(id:number):Observable<Tablero>{
    const token = localStorage.getItem('token');
    return this.http.get<Tablero>(`${baseUrl}/tablero/${id}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }
  

  crear(data:TableroDisplay):Observable<Tablero>{
    const token = localStorage.getItem('token');
    return this.http.post<Tablero>(`${baseUrl}/tablero`,data,{
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

    return this.http.delete(`${baseUrl}/tablero/${id}`,{
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
