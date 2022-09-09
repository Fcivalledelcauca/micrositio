import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicpagesComponent } from './publicpages.component';

const routes: Routes=[
    {
        path: 'public',
        component: PublicpagesComponent,
        loadChildren : () => import('./rutas-module').then(m=>m.RutasModule)
    }
]

@NgModule({
    declarations:[],
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class PublicPageRouting{}