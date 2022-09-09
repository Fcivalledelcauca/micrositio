import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Documento } from '../../interfaces/documento';
import { Iarchivo } from '../../interfaces/iarchivo';

const baseUrl = environment.base_url;
const token = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }


  consultarDocs():Observable<Documento[]>{
    return this.http.get<Documento[]>(`${baseUrl}/documentos`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        let listadoDocs:Documento[]=res;
        return listadoDocs;
      })
    )

  }

  getReport(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get(`${baseUrl}/documentos`, { headers, responseType: 'blob' as 'json'});
  }

 
}
