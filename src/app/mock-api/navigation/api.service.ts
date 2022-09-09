import { Injectable } from '@angular/core';
import { NavigationMenu } from 'src/app/core/interfaces/NavigationMenu';
import { Navigation } from './navigation';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  menuNavigation:NavigationMenu[] | undefined;

  constructor() { }

  getMenuNavigation(){
    return this.menuNavigation=Navigation;
  }
}
