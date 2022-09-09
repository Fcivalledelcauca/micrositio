import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-modalcookie',
  templateUrl: './modalcookie.component.html',
  styleUrls: ['./modalcookie.component.css']
})
export class ModalcookieComponent implements OnInit {

  constructor(private cookieSvc:CookieService) { }

  ngOnInit(): void {
    this.validatcookie();
  }

  visible: boolean = true;
  //valida si el navegador tiene la cookie
  validatcookie(){    
    if(this.cookieSvc.get('fcivalledelcauca')){
      this.visible = !this.visible;
   }  
  }


  @Output() close: EventEmitter<any> = new EventEmitter();
 //impide capturar la cookie
  ofGRDP(){
    this.visible = !this.visible;
    this.close.emit(null); 
  }
  //genera la cookie en el navegador
  onGRDP() {
      if (this.visible) {   
        this.cookieSvc.set('fcivalledelcauca','fcivalledelcauca.com.co',1)          
        this.visible = !this.visible;   
      }
      //this.close.emit();  
  }



}
