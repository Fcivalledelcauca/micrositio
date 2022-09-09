import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Municipio } from '../../interfaces/municipio';

const baseUrl= environment.base_url;



@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  private _municipios:Municipio[]=[];
  private _municipio:Municipio;


  get Municipios(){
    return this._municipios;
  }

  get Municipio(){
    return this._municipio;
  }

  constructor(private http:HttpClient) { 
      this.consultarMunicipios(500,1)
          .subscribe(res=>{
              this._municipios= JSON.parse(res.body.respuesta)
          }
          );
  }

  consultarMunicipios(resgistrosporpagina:number,pagina:number):Observable<HttpResponse<any>> {
    
    return this.http.get<HttpResponse<any>>(`${baseUrl}/municipio`,{
          observe:'response',
          params:{CantidaddeRegistroPorPagina:`${resgistrosporpagina}`,Pagina:`${pagina}`}
        }).pipe(
          map(res=>{
            return res;
          })
    )
  }

  municipioxId(id:number):Observable<Municipio>{
    return this.http.get<Municipio>(`${baseUrl}/municipio/${id}`).pipe(
      map(res=>{
        return this._municipio=res;
      })
    )
  }

  municipioxNombre(nombre:string):Observable<Municipio>{
    return this.http.get<Municipio>(`${baseUrl}/municipio/${nombre}`)
      .pipe(
        map(res=>{
          return this._municipio=res;
        })
    )
  }

  crearMunicipio(municipio:Municipio):Observable<string>{
    const token = localStorage.getItem('token');
    return this.http.post(`${baseUrl}/municipio`,municipio,{
      headers:{
        'Authorization':`Bearer ${token}`
        }
      }).pipe(
        map(res=>{
          return JSON.stringify(res);
        })
      )
  }

  EditarMunicipio(municipio:Municipio):Observable<string>{
    const token = localStorage.getItem('token');
    return this.http.put(`${baseUrl}/municipio`,municipio,{
      headers:{
        'Authorization':`Bearer ${token}`
        }
      }).pipe(
        map(res=>{
          return JSON.stringify(res);
        })
      )
  }

  eliminarMunicipio(id:number):Observable<Municipio>{
    const token = localStorage.getItem('token');
    return this.http.delete<Municipio>(`${baseUrl}/municipio/${id}`,{
      headers:{
        'Authorization':`Bearer ${token}`
        }
      }).pipe(
        map(res=>{
          return res;
        })
      )
  }
}
