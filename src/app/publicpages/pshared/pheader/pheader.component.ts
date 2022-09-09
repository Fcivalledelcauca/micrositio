import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-pheader',
  templateUrl: './pheader.component.html',
  styleUrls: ['./pheader.component.css']
})
export class PheaderComponent implements OnInit {

  

  spinner:boolean=false;

  constructor(private router:Router
              ,public autService:AuthService) { }

  ngOnInit(): void {
    this.validar()
  }

  validar(){
    this.spinner=true;
    return this.autService.validar().subscribe(res=>
      {
        this.spinner=false;
        return res;
      })
  }

  capacitacion(){
    this.spinner=true
    if(this.validar()){
      this.router.navigateByUrl('/admin')
          .then(res=>{this.spinner=false})

    }else{
      console.log('else')
      this.router.navigateByUrl('/login')
            .then(res=>{
              console.log(res);
              this.spinner=false
            })
      
    }
  }

  logout(){
    this.spinner=true;
    this.autService.signOut().subscribe(
      res=>{
        this.spinner=false;
      }
    );
    this.router.navigateByUrl('/public/home');
  }

  rutainicio(){
    this.router.navigateByUrl('/public/home')
  }  
}
