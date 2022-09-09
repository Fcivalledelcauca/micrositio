import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NavigationMenu } from '../../interfaces/NavigationMenu';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MenunavigationService {

  constructor(private http: HttpClient) { }

 
}
