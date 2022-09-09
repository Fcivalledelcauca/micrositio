import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapsitio',
  templateUrl: './mapsitio.component.html',
  styleUrls: ['./mapsitio.component.css']
})
export class MapsitioComponent implements OnInit {
  spinner:boolean=false;

  constructor(private router:Router,public autService:AuthService) { }

  ngOnInit(): void {
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
}
