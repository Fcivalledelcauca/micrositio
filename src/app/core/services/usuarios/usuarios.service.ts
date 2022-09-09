import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrearUsuario, Usuarios } from '../../interfaces/usuarios';

const baseUrl:string = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private _cantidadRegistros:number=0;

  get CantidadRegistros(){
    return this._cantidadRegistros;
  }



  constructor(private http: HttpClient) {}

  consultarUsuarios(resgistrosporpagina:number,pagina:number):Observable<Usuarios[]>{
    const token = localStorage.getItem('token');

    return this.http.get<HttpResponse<any>>(`${baseUrl}/usuarios/users`,{
        headers:{
          'Authorization': `Bearer ${token}`
        },
        observe:'response',
        params:{CantidaddeRegistroPorPagina:`${resgistrosporpagina}`,Pagina:`${pagina}`}
      }).pipe(
        map((res:HttpResponse<any>)=>{
          const listado = JSON.parse(res.body.respuesta);
          this._cantidadRegistros=res.body.cantidadPaginas*resgistrosporpagina;
          let listadoUser:Usuarios[]=[...listado];
          return listadoUser;
      })
    )
  }

  crearUsuario(user:CrearUsuario):Observable<any>{
    const token = localStorage.getItem('token');
    
    return this.http.post(`${baseUrl}/usuarios/registro`,user)
    .pipe(
      map(res=>{
        return res;
      })
    )
  }

  editarUsuario(user:CrearUsuario):Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.put(`${baseUrl}/usuarios/actualizar`,user,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

   /* Validacion del email revisar que no este creado */
   validarEmail(email:string):Observable<any>{
    return this.http.get(`${ baseUrl }/perfiles/usuarios/validatoremail/${email}`,{
        headers:{
           'Content-Type': 'application/json'
        }
    }).pipe(
        map(res=>{
            return JSON.stringify(res);
        })
    )
}

}
