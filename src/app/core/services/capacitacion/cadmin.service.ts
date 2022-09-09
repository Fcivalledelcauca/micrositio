import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Evento } from '../../interfaces/evento';
import { EventoBD, ImagenEvento } from '../../interfaces/eventoBD';
import { EventoMaterial } from '../../interfaces/eventoMaterial';
import { EventoArchivo, EventoArchivoDisplay } from '../../interfaces/eventosarchivos';

const baseUrl:string = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class CAdminService {

  private _eventos:Evento[]=[];

  get eventos():Evento[]{
    return this._eventos;
  }

  

  ev:Evento={
    id: '',
    title: '',
    start: undefined,
    decription: '',
    editable: false
  }

  constructor(private http:HttpClient) { 
    // this.consultarEventos()
    // .subscribe(res=>{
    //   this._eventos=res;
    //   return this._eventos
    // });
  }

  consultarEventos(idmunicipio:number):Observable<Evento[]>{
    const token:string = localStorage.getItem('token');
    return this.http.get(`${baseUrl}/eventos/municipio/${idmunicipio}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map((res:any[])=>{
        this._eventos=[];
        res.forEach(el => {
          let fechafin:Date = el.fecha_Fin;
          this.ev={
            id:el.idEvento,
            title:el.titulo,
            start:el.fecha_Ini,
            //end:this.addDays(new Date(fechafin),1),
            end:el.fecha_Fin,
            decription:el.descripcion,
            editable:true,
            classNames:['color-gris', el.colorEvento],
            allDay:el.todoElDia,
          }
          this.eventos.push(this.ev);
        });
        return this.eventos;
      })
    )
  }

  consultarEventoxId(idEvento:number):Observable<EventoMaterial>{
    const token:string = localStorage.getItem('token');
    return this.http.get<EventoMaterial>(`${baseUrl}/eventos/${idEvento}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map((res)=>{
          const evento:EventoMaterial=res;
          return evento;
      })
    )
  }

  guardarEvento(data:EventoBD):Observable<EventoBD>{
    const token:string = localStorage.getItem('token');
    return this.http.post<EventoBD>(`${baseUrl}/eventos`,data,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res
      })
    )
  }

  EditarEvento(data:EventoBD):Observable<EventoBD>{
    const token:string = localStorage.getItem('token');
    return this.http.put<EventoBD>(`${baseUrl}/eventos`,data,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res
      })
    )
  }

  eliminarEvento(idEvento: number):Observable<string>{
    const token:string = localStorage.getItem('token');
    return this.http.delete(`${baseUrl}/eventos/${idEvento}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return JSON.stringify(res);
      })
    )
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  //Eventos para guardar los archivos de los eventos
  //{EVENTOSARCHIVOS CONTROLADOR}
  //RUTA{api/archivoevento}

  //sirve pora traer los archivos guardados por el evento
  
  guardarArchivos(archivo:EventoArchivo):Observable<any>{
    const token:string = localStorage.getItem('token');
    return this.http.post<any>(`${baseUrl}/archivoevento`,archivo,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res
      })
    )
  }

  async uploadArchivo(archivo:EventoArchivo){
    try {
      const url = `${baseUrl}/archivoevento/uploadarchivo`;
      const formData= new FormData();
      formData.append('idEvento',archivo.idEvento.toString());
      formData.append('idTema',archivo.idTema.toString());
      formData.append('idTemario',archivo.idTemario.toString());
      formData.append('archivo',archivo.archivo.toString());
      formData.append('nombreArchivo',archivo.nombreArchivo);
      formData.append('titulo',archivo.titulo);
      formData.append('descripcion',archivo.descripcion);
      formData.append('file',archivo.file);

  
      const token:string = localStorage.getItem('token');
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
      //console.log(error);
      return false;
      
    }
  }

  async uploadArchivoEvento(archivo:ImagenEvento){
    const token:string = localStorage.getItem('token');
    try {
      const url = `${baseUrl}/eventos/uploadarchivo`;
      const formData= new FormData();
      formData.append('idEvento',archivo.idEvento.toString());
      formData.append('imagen',archivo.imagen);

  

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
      //console.log(error);
      return false;
      
    }
  }

  consultarArchivosGuardados(idevento:number,idtema:number,idtemario:number):Observable<EventoArchivoDisplay[]>{
    const token:string = localStorage.getItem('token');
    return this.http.get<EventoArchivoDisplay[]>(`${baseUrl}/archivoevento/${idevento}/${idtema}/${idtemario}`,{
      headers:{
        'Authorization': `Bearer ${token}` 
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

  consultarArchivoGuardadosxTema(idevento:number):Observable<EventoArchivoDisplay[]>{
    const token:string = localStorage.getItem('token');
    return this.http.get<EventoArchivoDisplay[]>(`${baseUrl}/archivoevento/${idevento}`,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(res=>{
        return res;
      })
    )
  }

  EliminarArchivo(id:number):Observable<string>{
    const token:string = localStorage.getItem('token');
    return this.http.delete(`${baseUrl}/archivoevento/${id}`,{
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
