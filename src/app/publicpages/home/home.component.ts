import {Component,OnInit,Input,ViewChild,AfterViewChecked,AfterContentChecked, AfterContentInit,} from '@angular/core';
import { Router } from '@angular/router';
import { hexToRgb } from '@swimlane/ngx-charts';
import { style } from '@angular/animations';

//declare function carouselInit():any;
//declare function homeInicializar():any;
declare var $: any;
ViewChild('carousel', { static: false });
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    //this.playIntervalo()
    //carouselInit();
    //homeInicializar();
  }
  rutamunicipio() {
    this.router.navigateByUrl('/public/municipios');
  }

  rutatemas() {
    this.router.navigateByUrl('/public/temas');
  }

  rutaestadisticas() {
    this.router.navigateByUrl('/public/estadisticas');
  }
}
