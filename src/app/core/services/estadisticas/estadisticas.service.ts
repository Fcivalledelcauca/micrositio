import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grupo } from '../../interfaces/grupos';
import { BaseIdf } from '../../interfaces/baseIdf';
import { BaseIdfdos } from '../../interfaces/baseIdfdos';
import { BaseMdm } from '../../interfaces/baseMdm';
import { ResumenMdm } from '../../interfaces/resumenMdm';
import { BaseIdi } from '../../interfaces/baseIdi';
import { PromedioDimensiones } from '../../interfaces/promedioDimensiones';

const baseUrl:string = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor(private http: HttpClient) {}

  consultarBaseIdf(codigoDane:string):Observable<BaseIdf>{
    return this.http.get<BaseIdf>(`${baseUrl}/graficas/baseidf/${codigoDane}/oo`,{
      }).pipe(
       map((res)=>{
         return res;
       })
     )
   }

  consultarBaseIdfdos(grupo:string):Observable<BaseIdfdos[]>{
    return this.http.get<BaseIdfdos[]>(`${baseUrl}/graficas/baseidfdos/oo/${grupo}`,{
      }).pipe(
       map((res)=>{
         return res;
       })
     )
  }
  
  consultarBaseMdm(codigodane:string):Observable<BaseMdm[]>{
    return this.http.get<BaseMdm[]>(`${baseUrl}/graficas/basemdm/${codigodane}/oo`,{
      }).pipe(
       map((res)=>{
         return res;
       })
     )
  }

  consultarResumenMdm(grupo:string):Observable<ResumenMdm[]>{
    return this.http.get<ResumenMdm[]>(`${baseUrl}/graficas/resumenmdm/oo/${grupo}`,{
      }).pipe(
       map((res)=>{
         return res;
       })
     )
  }

  consultarBaseIdi(codigodane:string):Observable<BaseIdi[]>{
    return this.http.get<BaseIdi[]>(`${baseUrl}/graficas/baseidi/${codigodane}/oo`,{
      }).pipe(
       map((res)=>{
         return res;
       })
     )
  }

  consultarPromedioDimension(codigodane:string):Observable<PromedioDimensiones[]>{
    return this.http.get<PromedioDimensiones[]>(`${baseUrl}/graficas/promediodimension/${codigodane}/oo`,{
      }).pipe(
       map((res)=>{
         return res;
       })
     )
  }
}
