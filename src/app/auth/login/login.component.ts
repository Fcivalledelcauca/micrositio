import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { environment } from 'src/environments/environment';

declare function customInitFunction():any;

const siteKey = environment.siteKeyCaptcha;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @ViewChild('signInNgForm') signInNgForm!: NgForm;

  spinner:boolean=false;

  siteKey:string;

  public signInForm: FormGroup;
  showAlert: boolean = false;

  constructor(private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _fB: FormBuilder,
    private _router: Router
   ) { 
       // Create the form
       this.signInForm = this._fB.group({
        email     : [ localStorage.getItem('user') ||'', [Validators.required]],
        password  : ['', Validators.required],
        rememberMe: [false],
        recaptcha   :['', [Validators.required]]
    });
    this.siteKey=siteKey;
   }

 
  ngOnInit(): void {
    customInitFunction();

  }

  signIn(): void
  {
      this.spinner=true;
      const {email,rememberMe} = this.signInForm.value
      // Return if the form is invalid
      if ( this.signInForm.invalid )
      {
        this.spinner=false;
        return;
      }
      // Disable the form
      this.signInForm.disable();

      // Hide the alert
      this.showAlert = false;

      // Sign in
       this._authService.signIn(this.signInForm.value)
          .subscribe(
              (resp:any) => {
                if (resp.ok){
                  if (rememberMe){
                    localStorage.setItem('user',email);
                  }else{
                    localStorage.removeItem('user');  
                  }
                  this._router.navigateByUrl('/admin');
                  this.spinner=false;
                }else{
                  this.signInForm.enable();
                  this.showAlert=true;
                  this.spinner=false;
                }
              },
              (error) => {
                  // Re-enable the form
                  this.signInForm.enable();
                  this.showAlert = true;
                  this.spinner=false;
              }
          );
  }

  validarCampos(campo:string){
    return this.signInForm.controls[campo].errors && this.signInForm.controls[campo].touched
  }

  mostrarAlerta(){
    
      this.showAlert=false;
    
  }

 
}
