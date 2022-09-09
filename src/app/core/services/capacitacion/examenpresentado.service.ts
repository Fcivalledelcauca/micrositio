import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ExamenDisplay, ExamenPresentado, RespuestaPresentada } from '../../interfaces/examenPresentado';


const baseUrl:string = environment.base_url;
const token:string = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class ExamenPresentadoService {
  constructor(private http:HttpClient) { 
    
  }

  consultarExamenes(idtema:number):Observable<ExamenDisplay>{
    return this.http.get<ExamenDisplay>(`${baseUrl}/examen/temas/${idtema}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

  presentarExamen(examenPresentado:ExamenPresentado):Observable<ExamenPresentado>{
    return this.http.post<ExamenPresentado>(`${baseUrl}/test`,examenPresentado,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      }).pipe(
        map((res)=>{
            return res;
        })
      )
  }

  guardarRespuestas(respuestaPresentadas:RespuestaPresentada):Observable<RespuestaPresentada[]>{
      return this.http.post<RespuestaPresentada[]>(`${baseUrl}/respuestapresentadas`,respuestaPresentadas,{
          headers:{
              'Authorization': `Bearer ${token}`
          }
      }).pipe(
          map(res=>{
              return res;
          })
      )
  }

  editarExamenPresentado(examenPresentado:ExamenPresentado):Observable<any>{
      return this.http.put(`${baseUrl}/test`,examenPresentado,{
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
