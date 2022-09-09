import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './contacto/contacto.component';
import { DeployComponent } from './deploy/deploy.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { HomeComponent } from './home/home.component';
import { MunicipiosComponent } from './municipios/municipios.component';
import { TemasComponent } from './temas/temas.component';
import { MapsitioComponent} from './mapsitio/mapsitio.component';

const rutashijas:Routes=[
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'deploy',
        component:DeployComponent
    }, 
    {
        path:'contact',
        component:ContactoComponent
    },
    {
        path:'municipios',
        component:MunicipiosComponent
    },
    {
        path:'temas',
        component:TemasComponent
    }
    ,
    {
        path:'estadisticas',
        component:EstadisticasComponent
    },
    {
        path:'mapa',
        component:MapsitioComponent
    }

]

@NgModule({
    imports:[RouterModule.forChild(rutashijas)],
    exports:[RouterModule]
})

export class RutasModule{}