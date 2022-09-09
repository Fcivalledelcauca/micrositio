import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Swal from 'sweetalert2';

declare function customInitFunction():any;

@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.component.html',
  styleUrls: ['./recoverpass.component.css',
              '../../../assets/css/pages/login-register-lock.css'
      ]
})
export class RecoverpassComponent implements OnInit,  AfterViewInit {

  @ViewChild('preloader') preloader!:ElementRef<HTMLDivElement>; 

  email:string="";

  constructor(private router: Router
             ,private authService: AuthService) { 

  }


  ngAfterViewInit(): void {
    this.preloader.nativeElement.style.display = 'none';
   }

  ngOnInit(): void {
    customInitFunction();
  }
  recuperar(){
    if(this.email!=''){
       this.authService.recuperarClave(this.email)
            .subscribe(res=>{
              console.log('componente: ',res);
              Swal.fire('Información', res ,'success');
              this.router.navigateByUrl('/');
            })
    }
  }
 
}
