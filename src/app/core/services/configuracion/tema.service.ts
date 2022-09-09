import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Tema } from '../../interfaces/temas';

const baseUrl= environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class TemaService {

  private _temas:Tema[]=[]
  private _tema:Tema;

  get Temas(){
    return this._temas
  }

  get Tema(){
    return this._tema;
  }

  constructor(private http:HttpClient) { }

  consultarTemas(resgistrosporpagina:number,pagina:number):Observable<HttpResponse<any>>{
    const token = localStorage.getItem('token');
    return this.http.get<HttpResponse<any>>(`${baseUrl}/temas`,{
      headers:{
        'Authorization': `Bearer ${token}`
      },
      observe:'response',
      params:{CantidaddeRegistroPorPagina:`${resgistrosporpagina}`,Pagina:`${pagina}`}
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

  consultarTemasxMunicipio(idmunicipio:number):Observable<Tema[]>{
    const token = localStorage.getItem('token');
    return this.http.get<Tema[]>(`${baseUrl}/temas/${idmunicipio}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }
  

  crearTema(tema:Tema):Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.post<any>(`${baseUrl}/temas`,tema,{
      headers:{
        'Authorization':`Bearer ${token}`
        }
      }).pipe(
        map(res=>{
          console.log('servicio',res);
          this._tema={
            IdTema:res.idTema,
            IdMunicipio:res.idMunicipio,
            Tema:res.idTema,
            Activo:res.activo
          };
          return this._tema;
        })
      )
  }

  editarTema(tema:Tema):Observable<string>{
    const token = localStorage.getItem('token');
    return this.http.put(`${baseUrl}/temas`,tema,{
      headers:{
        'Authorization':`Bearer ${token}`
        }
      }).pipe(
        map(res=>{
          return JSON.stringify(res);
        })
      )
  }

  eliminarTema(id:number):Observable<string>{
    const token = localStorage.getItem('token');
    return this.http.delete(`${baseUrl}/temas/${id}`,{
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
