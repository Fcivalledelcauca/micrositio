import { Component, OnInit } from '@angular/core';
import { Documento } from 'src/app/core/interfaces/documento';
import { ModalDocService } from 'src/app/core/services/componentes/modal-doc.service';
import { DocumentosService } from 'src/app/core/services/documentos/documentos.service';
import { LimpiarInputMunicipioService } from 'src/app/core/services/municipio/limpiarInputMunicipio.service';
import Swal from 'sweetalert2';

declare function dropzone():any;

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {

  listadoDocumentos:Documento[]=[];
  listadoDocumentosDisplay:Documento[]=[];
  documento!:Documento;

  cantidadRegistrosPorPagina:number=10;
  pagina:number=1;
  cantidadRegistros:number=0;

  filtro:string='';

  constructor(private smodalDocService: ModalDocService,
              private documentosService:DocumentosService,
              private limpiarInputMunicipio:LimpiarInputMunicipioService) { }

  ngOnInit(): void {
    dropzone();
    this.consultarDocumento(this.cantidadRegistrosPorPagina,this.pagina)
  }

  mostrarModal(){
    this.smodalDocService.abrirModal();
  }

  nuevoDocumento(){
    this.documento = {
      idDocumento:    0,
      idGrupo:        0,
      nombreGrupo:    '',
      idCia:          0,
      titulo:         '',
      descripcion:    '',
      codMunicipio:   '',
      nombreArchivo:  '',
      archivo:        '',
      activo:         true    
    }
    this.limpiarInputMunicipio.limpiarInput();
    this.smodalDocService.abrirModal();
  }

  consultarDocumento(catnRegistroporPagina:number,pag:number){
    this.documentosService.consultarDocs(catnRegistroporPagina,pag)
          .subscribe(res=>{
            this.cantidadRegistros=res.body.cantidadPaginas*catnRegistroporPagina;
            this.listadoDocumentos=JSON.parse(res.body.respuesta);
            this.listadoDocumentosDisplay=JSON.parse(res.body.respuesta);
          })
  }

  eliminarDocumento(arg:Documento){
    Swal.fire({
      title: '¿Borrar Documento?',
      text: `Esta seguro de borrar este documento ${arg.titulo} `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentosService.eliminarDocs(arg)
        .subscribe(res=>{
          Swal.fire(
            'Información',
            `El documento ${arg.titulo} se borró con éxito.`,
            'success');
            this.consultarDocumento(this.cantidadRegistrosPorPagina,this.pagina);
        })       
      }
    })
  }

  editarDocumento(arg:Documento){
    this.documento=arg;
    this.limpiarInputMunicipio.noLimpiarInput();
    this.mostrarModal();
  }

  filtrarTabla(){
    if(this.filtro==''){
      this.consultarDocumento(this.cantidadRegistrosPorPagina,this.pagina);
    }else{
      this.listadoDocumentosDisplay=this.listadoDocumentos.filter(
        res=>{
          return JSON.stringify(Object.values(res)).toLowerCase().includes(this.filtro.toLowerCase());
        }
      )
    }

  }

  CambioPagina(ev:any){
    this.pagina=ev;
    this.consultarDocumento(this.cantidadRegistrosPorPagina,this.pagina);
  }

  cambiarCantidadRegistros(ev:any){
    this.cantidadRegistrosPorPagina=ev.target.value;
    this.pagina=1;
    this.consultarDocumento(this.cantidadRegistrosPorPagina,this.pagina);
  }

}
