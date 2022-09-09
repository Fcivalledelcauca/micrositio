import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';


declare function customInitFunction():any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private autService: AuthService, private router:Router) { }

  ngOnInit(): void {
    customInitFunction();
  }

  logout(){
    this.autService.signOut();
    this.router.navigateByUrl('/public/home');
  }
  openperfil(){
    let idprincipal = document.getElementById("miperfil")
    let subidprincipal = document.getElementById("miperfil_")
    if(idprincipal.ariaExpanded == "false"){       
      idprincipal.ariaExpanded = "true" 
      idprincipal.className +=" show"
      subidprincipal.className +=" show"
      subidprincipal.setAttribute("data-bs-popper","none")
    }else{
      idprincipal.ariaExpanded = "false" 
      idprincipal.classList.remove("show")
      subidprincipal.classList.remove("show")
      subidprincipal.removeAttribute("data-bs-popper")
    }

  }

}
