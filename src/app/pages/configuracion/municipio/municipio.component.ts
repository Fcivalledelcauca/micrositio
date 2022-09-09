import { Component, OnInit } from '@angular/core';
import { Municipio } from 'src/app/core/interfaces/municipio';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { MunicipioService } from 'src/app/core/services/configuracion/municipio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html',
  styleUrls: ['./municipio.component.css']
})
export class MunicipioComponent implements OnInit {

  municipios:Municipio[]=[];
  municipio:Municipio;
  municipioDisplay:Municipio[]=[];

  cantidadRegistrosPorPagina:number=10;
  pagina:number=1;
  cantidadRegistros:number=0;

  filtro:string='';

  constructor(public modalService:ModalService
              ,public municipioService:MunicipioService) { }

  ngOnInit(): void {
    this.consultarMunicipios(this.cantidadRegistrosPorPagina,this.pagina);
  }

  consultarMunicipios(catnRegistroporPagina:number,pag:number){
    this.municipioService.consultarMunicipios(catnRegistroporPagina,pag)
        .subscribe(res=>
          {
            this.cantidadRegistros=res.body.cantidadPaginas*catnRegistroporPagina;
            this.municipios=JSON.parse(res.body.respuesta);
            this.municipioDisplay=JSON.parse(res.body.respuesta);
          });
  }

  editarMunicipio(ev:Municipio){
    this.municipio=ev;
    this.modalService.abrirModal();
  }



  eliminarMunicipio(ev:Municipio){
    let text:string='';
    let title:string='';

    if(ev.Activo){
      title='¿Inactivar Municipio?'
      text=`Esta seguro de inactivar el municipio de ${ev.Nombre} `
    }else {
      title='¿Activar Municipio?'
      text=`Esta seguro de activar el municipio de ${ev.Nombre} `
    }

    Swal.fire({
      title: title,
      text: text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.municipioService.eliminarMunicipio(ev.IdMunicipio)
        .subscribe((res:any)=>{
          if(res.activo){
            Swal.fire(
              'Información',
              `El municipio ${ev.Nombre} se activó con éxito.`,
              'success');

          }else{
            Swal.fire(
              'Información',
              `El municipio ${ev.Nombre} se desactivó con éxito.`,
              'success');
          }
          this.consultarMunicipios(this.cantidadRegistrosPorPagina,this.pagina);
        },
        err=>{
          Swal.fire(
            'Atención',
            err.error,
            'error'  
          )
        }
        
        )       
      }
    })

  }

  actualizar(ev:boolean){
    if(ev){
      this.consultarMunicipios(this.cantidadRegistrosPorPagina,this.pagina);
    }

  }

  abrirModal(){
    this.municipio = {
      IdMunicipio:0,
      Nombre:'',
      CodigoDane:'',
      Region:'',
      Categoria_Ruralidad:'',
      Dotaciones_Iniciales:'',
      Grupo_Par:'',
      Activo:true
    };
    this.modalService.abrirModal();
  }

  filtrarTabla(){
    if(this.filtro==''){
      this.consultarMunicipios(this.cantidadRegistrosPorPagina,this.pagina);
    }else{
      this.municipioDisplay=this.municipios.filter(
        res=>{
          return JSON.stringify(Object.values(res)).toLowerCase().includes(this.filtro.toLowerCase());
        }
      )
    }

  }

  CambioPagina(ev:any){
    this.pagina=ev;
    this.consultarMunicipios(this.cantidadRegistrosPorPagina,this.pagina);
  }

  cambiarCantidadRegistros(ev:any){
    this.cantidadRegistrosPorPagina=ev.target.value;
    this.pagina=1;
    this.consultarMunicipios(this.cantidadRegistrosPorPagina,this.pagina);
  }


 
}
