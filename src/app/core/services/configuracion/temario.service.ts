import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Temario } from '../../interfaces/temario';

const baseUrl = environment.base_url;
const token = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class TemarioService {

  private _temarios:Temario[];


  get Temarios(){
    return this._temarios;
  }

  constructor(private http:HttpClient) { 
    
  }

  consultar():Observable<Temario[]> {
    return this.http.get<Temario[]>(`${baseUrl}/temario`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return this._temarios=res;
      })
    )
  }

  consultarxIdTema(idtema:number):Observable<Temario[]>{
    return this.http.get<Temario[]>(`${baseUrl}/temario/${idtema}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return this._temarios=res;
      })
    )
  }

  crear(temario:Temario):Observable<string>{
    return this.http.post(`${baseUrl}/temario`,temario,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return JSON.stringify(res);
      })
    )
  }

  editar(temario:Temario){
    return this.http.put(`${baseUrl}/temario`,temario,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return JSON.stringify(res);
      })
    )
  }

  eliminar(id:number){
    return this.http.delete(`${baseUrl}/temario/${id}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return JSON.stringify(res);
      })
    )
  }
}
