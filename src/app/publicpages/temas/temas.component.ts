import { Component, OnInit } from '@angular/core';
import { TemaService } from 'src/app/core/services/configuracion/tema.service';
import { Tema } from 'src/app/core/interfaces/temas';
import { HttpResponse } from '@angular/common/http';

declare function customInitFunction():any;

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  temas:Tema[]=[];
  temasDisplay:Tema[]=[];
  tema:Tema;
  constructor(private temaService:TemaService) { }

  ngOnInit( ): void {
    customInitFunction();
    this.consultarTemas(30,1);
  }
  consultarTemas(catnRegistroporPagina:number,pag:number){
    this.temaService.consultarTemas(catnRegistroporPagina,pag)
          .subscribe((res:HttpResponse<any>)=>{
            this.temas=JSON.parse(res.body.respuesta);
            this.temasDisplay=JSON.parse(res.body.respuesta);
          });
  }
}
