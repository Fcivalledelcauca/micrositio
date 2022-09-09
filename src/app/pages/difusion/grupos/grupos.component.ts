import { Component, OnInit, Output, ViewChild,EventEmitter } from '@angular/core';
import { Grupo } from 'src/app/core/interfaces/grupos';
import { ModalGrupoService } from 'src/app/core/services/componentes/modal-grupo.service';
import { GrupoService } from 'src/app/core/services/grupos/grupos.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  grupos: Grupo[]=[];
  gruposDisplay:Grupo[]=[];
  grupoEditar!:Grupo;

  cantidadRegistrosPorPagina:number=10;
  pagina:number=1;
  cantidadRegistros:number=0;

  filtro:string='';

  @ViewChild('table') table:any;

  constructor(private smodalgrupo:ModalGrupoService,
              public grupoService: GrupoService) { }

  ngOnInit(): void {
    this.consultarGrupos(this.cantidadRegistrosPorPagina,this.pagina);
  }

  mostrarModal(){
    this.smodalgrupo.abrirModal();
  }

  consultarGrupos(catnRegistroporPagina:number,pag:number){
    this.grupoService.consultarGrupos(catnRegistroporPagina,pag)
      .subscribe(res=>{
        this.cantidadRegistros=res.body.cantidadPaginas*catnRegistroporPagina;
        this.grupos=JSON.parse(res.body.respuesta);
        this.gruposDisplay=JSON.parse(res.body.respuesta);
    })
  }

  editarGrupo(grupo:Grupo){
    this.grupoEditar=grupo;
    this.smodalgrupo.abrirModal();
  }

  eliminarGrupo( grupo:Grupo ){
    let text:string='';
    let title:string='';

    if(grupo.Activo){
      title='¿Inactivar Grupo?'
      text=`Esta seguro de inactivar el grupo de ${grupo.Nombre_Grupo} `
    }else {
      title='¿Activar Grupo?'
      text=`Esta seguro de activar el grupo de ${grupo.Nombre_Grupo} `
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
        this.grupoService.eliminarGrupo(grupo)
        .subscribe(res=>{
          if(res.activo){
            Swal.fire(
              'Información',
              `El grupo ${grupo.Nombre_Grupo} se activó con éxito.`,
              'success');

          }else{
            Swal.fire(
              'Información',
              `El grupo ${grupo.Nombre_Grupo} se desactivó con éxito.`,
              'success');
          }
          this.consultarGrupos(this.cantidadRegistrosPorPagina,this.pagina);
        })       
      }
    })
  }

  filtrarTabla(){
    if(this.filtro==''){
      this.consultarGrupos(this.cantidadRegistrosPorPagina,this.pagina);
    }else{
      this.gruposDisplay=this.grupos.filter(
        res=>{
          return JSON.stringify(Object.values(res)).toLowerCase().includes(this.filtro.toLowerCase());
        }
      )
    }

  }

  CambioPagina(ev:any){
    this.pagina=ev;
    this.consultarGrupos(this.cantidadRegistrosPorPagina,this.pagina);
  }

  cambiarCantidadRegistros(ev:any){
    this.cantidadRegistrosPorPagina=ev.target.value;
    this.pagina=1;
    this.consultarGrupos(this.cantidadRegistrosPorPagina,this.pagina);
  }

}
