import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const baseUrl:string = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ValidacionEmailService implements AsyncValidator {

  constructor(private http: HttpClient) { }


  validate(control: AbstractControl): Observable<ValidationErrors | null> {
   const email=control.value;

   return this.http.get<any[]>(`${ baseUrl }/usuarios/${email}`,{
              headers:{
                'Content-Type': 'application/json'
              }
            }).pipe(
                map(res=>{
                  if(res){
                    return (res.length===0)
                    ?null
                    :{ emailExiste: res };
                  }else
                  {
                    return {}
                  }

                })
              )
  }

}
