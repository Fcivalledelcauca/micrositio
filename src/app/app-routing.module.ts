import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing';
import { PublicPageRouting } from './publicpages/publicpage-routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesRoutingModule } from './pages/pages-routing.module';



const routes: Routes = [
  {path: '' , redirectTo: '/public/home', pathMatch:'full' },
  {path:'**', component:NopagefoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    PagesRoutingModule,
    PublicPageRouting,

  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
