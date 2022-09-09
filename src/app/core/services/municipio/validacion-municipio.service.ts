import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const baseUrl:string = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ValidacionMunicipioService implements AsyncValidator {

  constructor(private http: HttpClient) { }


  validate(control: AbstractControl): Observable<ValidationErrors | null> {
   const municipio=control.value;

   return  this.http.get<any[]>(`${baseUrl}/municipio/buscar/${municipio}`)
            .pipe(
                map(res=>{
                  if(res){
                    return (res.length===0)
                    ?null
                    :{ municipionoexiste: res };
                  }else
                  {
                    return {}
                  }

                })
              )
  }

}
