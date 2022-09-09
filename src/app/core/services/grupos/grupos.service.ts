import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grupo } from '../../interfaces/grupos';

const baseUrl:string = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private http: HttpClient) {}

  consultarGrupos(resgistrosporpagina:number,pagina:number):Observable<HttpResponse<any>>{
    const token = localStorage.getItem('token');
    return this.http.get<HttpResponse<any>>(`${baseUrl}/grupos`,{
       headers:{
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
       },
       observe:'response',
       params:{CantidaddeRegistroPorPagina:`${resgistrosporpagina}`,Pagina:`${pagina}`}
     }).pipe(
       map((res:HttpResponse<any>)=>{
         return res;
       })
     )
   }

  consultarGruposPublic():Observable<Grupo[]>{
   return this.http.get<Grupo[]>(`${baseUrl}/grupos`,{
      headers:{
        'Content-Type': 'application/json',
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }



  crearGrupo(grupo:Grupo):Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.post(`${baseUrl}/grupos`,grupo,{
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

  actaulizarGrupo(grupo:Grupo): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.put(`${baseUrl}/grupos`,grupo,{
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

  eliminarGrupo(grupo:Grupo):Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.delete(`${baseUrl}/grupos/${grupo.IdGrupo}`,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }
}
