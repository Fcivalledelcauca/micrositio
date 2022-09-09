import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/core/interfaces/usuarios';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { LimpiarInputMunicipioService } from 'src/app/core/services/municipio/limpiarInputMunicipio.service';
import { UsuariosService } from 'src/app/core/services/usuarios/usuarios.service';



declare function customInitFunction():any;

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {

  private _listado!:Usuarios[];

  listadoDisplay:Usuarios[];

  usuarioEditar!:Usuarios;

  get listado():Usuarios[]{
    return this._listado;
  }


  cantidadRegistrosPorPagina:number=10;
  pagina:number=1;
  cantidadRegistros:number=0;

  filtro:string='';

  constructor(private userService:UsuariosService,
              private modalService:ModalService,
              private limpiarInputMunicipioService:LimpiarInputMunicipioService) { 
  }

  ngOnInit(): void {
    //customInitFunction();
    this.consultarUsuarios(this.cantidadRegistrosPorPagina,this.pagina);
  }

  mostrarModal(){
    this.modalService.abrirModal();
  }

  consultarUsuarios(catnRegistroporPagina:number,pag:number) {
    this.userService.consultarUsuarios(catnRegistroporPagina,pag)
         .subscribe(resp=>{
          this.cantidadRegistros=this.userService.CantidadRegistros;
          this._listado=resp;
          this.listadoDisplay=resp;
         })
  }

  editarUsuario(user:Usuarios){
    this.usuarioEditar=user;
      this.mostrarModal();
  }

  filtrarTabla(){
    if(this.filtro==''){
      this.consultarUsuarios(this.cantidadRegistrosPorPagina,this.pagina);
    }else{
      this.listadoDisplay=this.listado.filter(
        res=>{
          return JSON.stringify(Object.values(res)).toLowerCase().includes(this.filtro.toLowerCase());
        }
      )
    }

  }

  CambioPagina(ev:any){
    this.pagina=ev;
    this.consultarUsuarios(this.cantidadRegistrosPorPagina,this.pagina);
  }

  cambiarCantidadRegistros(ev:any){
    this.cantidadRegistrosPorPagina=ev.target.value;
    this.pagina=1;
    this.consultarUsuarios(this.cantidadRegistrosPorPagina,this.pagina);
  }

}
