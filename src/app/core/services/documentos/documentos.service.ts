import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Documento } from '../../interfaces/documento';
import { Iarchivo } from '../../interfaces/iarchivo';

const baseUrl = environment.base_url;


interface filtroDocs{
  NomMunicipio:string;
  IdGrupo:string;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  constructor(private http: HttpClient) { }


  consultarDocs(resgistrosporpagina:number,pagina:number):Observable<HttpResponse<any>>{
    const token = localStorage.getItem('token');
    return this.http.get<HttpResponse<any>>(`${baseUrl}/documentos`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
      ,observe:'response',
      params:{CantidaddeRegistroPorPagina:`${resgistrosporpagina}`,Pagina:`${pagina}`}

    }).pipe(
        map((res:HttpResponse<any>)=>{
         //console.log('header',res.headers.get('cantidadpaginas'))
        //let listadoDocs:Documento[]=res.body;
        return res;//listadoDocs;
      })
    )

  }

  crearDocs(doc:Documento):Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.post(`${baseUrl}/documentos`,doc,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

  editarDocs(doc:Documento):Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.put(`${baseUrl}/documentos`,doc,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

  //editarDocs(doc:Documento):Observable<any>{}
  eliminarDocs(doc:Documento):Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.delete(`${baseUrl}/documentos/${doc.idDocumento}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }  

  //se contruye y sube el archivo para extraer la ruta
  async uploadArchivo(archivo:Iarchivo){
    const token = localStorage.getItem('token');
    try {
      const url = `${baseUrl}/documentos/uploadarchivo`;
      const formData= new FormData();
      formData.append('grupo',archivo.grupo);
      formData.append('municipio',archivo.municipio);
      formData.append('titulo',archivo.municipio);
      formData.append('file',archivo.file);

      const resp = await fetch( url, {
        method:'POST',
        headers:{
          'Authorization': `Bearer ${token}`
        },
        body:formData
      } );

      const data = await resp.json();
      return data;

    } catch (error) {
     // console.log(error);
      return false;
      
    }
  }

  //consulta los documentos para todos, son publicos
 
  documentosPublicos(filtro:filtroDocs):Observable<Documento[]>{
    const token = localStorage.getItem('token');
    return this.http.post<Documento[]>(`${baseUrl}/documentospublicos`,filtro,{
      headers:{
        'Content-Type': 'application/json'
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

 
}
