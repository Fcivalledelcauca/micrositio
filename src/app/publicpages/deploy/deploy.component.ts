import { Component, OnInit } from '@angular/core';
import { Grupo } from 'src/app/core/interfaces/grupos';
import { ModalDescargaArchivoService } from 'src/app/core/services/componentes/modal-descargaarchivos.service';
import { GrupoService } from 'src/app/core/services/grupos/grupos.service';
import { ModalcookieComponent} from 'src/app/componentes/modalcookie/modalcookie.component'
import { LimpiarInputMunicipioService } from 'src/app/core/services/municipio/limpiarInputMunicipio.service';

declare function customInitFunction():any;

@Component({
  selector: 'app-deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.css']
})
export class DeployComponent implements OnInit {

  constructor(private modalDescargaArchivo: ModalDescargaArchivoService,
              private grupoService:GrupoService,
              private limpiarInputMunicipio:LimpiarInputMunicipioService) { 
  
  }

  actualizarMunicipio:boolean=false;
  grupoEnviar:Grupo={
    IdGrupo: 0,
    Orden: 0,
    Nombre_Grupo: '',
    Descripcion: '',
    Icono: '',
    ClaseCSS: '',
    Activo: false
  };
  gruposListado!:Grupo[];


  grupo1!:Grupo[];
  grupo2!:Grupo[];
  grupo3!:Grupo[];
  grupo4!:Grupo[];
  grupo5!:Grupo[];
  grupo6!:Grupo[];

  filas:number[]=[1,2,3,4,5,6];

  ngOnInit(): void {
    customInitFunction();
    this.consultarGrupos();
   
  }

  descarArchivo(ev:Grupo){
    this.grupoEnviar=ev;
    this.actualizarMunicipio=true;
    this.limpiarInputMunicipio.limpiarInput();
    this.modalDescargaArchivo.abrirModal();
  }

  segmentarGrupos(){}


  consultarGrupos(){
    this.grupoService.consultarGrupos(200,1)
          .subscribe(res=>{
            this.gruposListado = [ ...JSON.parse(res.body.respuesta)];
            this.filas.forEach(el => {

              if (el==1){
                this.grupo1= [...this.gruposListado.filter(res=>res.Activo===true)].splice(0,3);
              }
              if(el==2){
                this.grupo2 = [...this.gruposListado.filter(res=>res.Activo===true)].splice(3,3);
              }
              if(el==3){
                this.grupo3 = [...this.gruposListado.filter(res=>res.Activo===true)].splice(6,3);
              }
              if(el==4){
                this.grupo4 = [...this.gruposListado.filter(res=>res.Activo===true)].splice(9,3);
              }
              if(el==5){
                this.grupo4 = [...this.gruposListado.filter(res=>res.Activo===true)].splice(12,3);
              }
              if(el==6){
                this.grupo4 = [...this.gruposListado.filter(res=>res.Activo===true)].splice(15,3);
              }
            });
          })
  }

}
