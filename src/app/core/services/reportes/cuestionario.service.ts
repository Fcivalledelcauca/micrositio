import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ReporteCuestionario } from '../../interfaces/reportecuestionario';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {

  constructor(private http:HttpClient) { }

  public getcuestionario():Observable<ReporteCuestionario[]>{
    const token = localStorage.getItem('token');
    return this.http.get<ReporteCuestionario[]>(`${baseUrl}/reportes`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map((res:ReporteCuestionario[])=>{
        return res;
      })
    );
  }
}
