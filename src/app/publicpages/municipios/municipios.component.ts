import { Component, OnInit } from '@angular/core';
import { Municipio } from 'src/app/core/interfaces/municipio';
import { MunicipioService } from 'src/app/core/services/configuracion/municipio.service';

declare function customInitFunction():any;

@Component({
  selector: 'app-municipios',
  templateUrl: './municipios.component.html',
  styleUrls: ['./municipios.component.css']
})
export class MunicipiosComponent implements OnInit {
  municipios:Municipio[]=[];
  municipio:Municipio;
  municipioDisplay:Municipio[]=[];
  constructor(public municipioService:MunicipioService) { }

  ngOnInit(): void {
    customInitFunction();
    this.consultarMunicipios(20,1);
  }
  
  consultarMunicipios(catnRegistroporPagina:number,pag:number){
    this.municipioService.consultarMunicipios(catnRegistroporPagina,pag)
        .subscribe(res=>
          {
            this.municipios=JSON.parse(res.body.respuesta);
            this.municipioDisplay=JSON.parse(res.body.respuesta);
          });
  }
}
