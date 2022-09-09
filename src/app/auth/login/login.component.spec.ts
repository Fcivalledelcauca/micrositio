import { TestBed } from '@angular/core/testing'
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { LoginComponent } from './login.component';
import  {  RouterTestingModule  }  from  "@angular/router/testing" ;
describe(`(1) test del componente "LoginComponent"`,() => {

beforeEach(async () => {

    await TestBed.configureTestingModule({
        imports:[
         FormsModule,
        ],
        declarations:[
            LoginComponent
        ]
    }).compileComponents();
});



//valida si el componente existe
it('debe de existir en login component', () => {
    const fixure = TestBed.createComponent(LoginComponent);
    const app = fixure.componentInstance
    expect(app).toBeTruthy(); 
});

});