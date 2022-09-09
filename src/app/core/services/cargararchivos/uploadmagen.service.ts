import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl:string = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UploadmagenService {

  token:string = localStorage.getItem('token')|| '';

  constructor() { }

 async actualizarFotoPerfil(
    archivo:File,
    usuario:string
    ){
    try {
      const url = `${baseUrl}/perfiles/uploadimagenperfil`;
      const formData= new FormData();
      formData.append('usuario',usuario);
      formData.append('imagen',archivo);

      const resp = await fetch( url, {
        method:'PUT',
        headers:{
          'Authorization': `Bearer ${this.token}`
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
   
 
}
