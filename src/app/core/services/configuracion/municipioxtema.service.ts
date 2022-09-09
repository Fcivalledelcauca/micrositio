import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MuncipioTema, MuncipioTemaDisplay } from '../../interfaces/municipiotema';

const baseUrl= environment.base_url;
const token = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class MunicipiotemaService {


  private _municipiotemaDisplay:MuncipioTemaDisplay[];


  get MTDisplay(){
    return this._municipiotemaDisplay;
  }

  constructor(private http:HttpClient) { 
    
  }

  consultar():Observable<MuncipioTemaDisplay[]> {
    return this.http.get<MuncipioTemaDisplay[]>(`${baseUrl}/municipiotema`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return this._municipiotemaDisplay=res;
      })
    )
  }

  consultarxIdMunicipio(idMunicipio:number):Observable<MuncipioTemaDisplay[]>{
    return this.http.get<MuncipioTemaDisplay[]>(`${baseUrl}/municipiotema/${idMunicipio}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return this._municipiotemaDisplay=res;
      })
    )
  }

  crear(mt:MuncipioTema):Observable<string>{
    return this.http.post(`${baseUrl}/municipiotema`,mt,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return JSON.stringify(res);
      })
    )
  }

  editar(mt:MuncipioTema){
    return this.http.put(`${baseUrl}/municipiotema`,mt,{
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
    return this.http.delete(`${baseUrl}/municipiotema/${id}`,{
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
