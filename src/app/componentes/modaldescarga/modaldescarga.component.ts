import { Component, Input, OnChanges,  OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ModalDescargaArchivoService } from 'src/app/core/services/componentes/modal-descargaarchivos.service';
import { DocumentosService } from 'src/app/core/services/documentos/documentos.service';
import { Documento } from 'src/app/core/interfaces/documento';
import { Grupo } from 'src/app/core/interfaces/grupos';
import { BuscarMcipiosComponent } from '../buscar-mcipios/buscar-mcipios.component';

interface filtroDocs{
  NomMunicipio:string;
  IdGrupo:string;
}

@Component({
  selector: 'app-modaldescarga',
  templateUrl: './modaldescarga.component.html',
  styleUrls: ['./modaldescarga.component.css']
})
export class ModaldescargaComponent implements OnInit,OnChanges {

  constructor(public modaDescargaArchivoS: ModalDescargaArchivoService,
              private documentoService:DocumentosService) { }



  @ViewChild('buscarMunicipio') compMuninicipio:BuscarMcipiosComponent;

  termino:string='';
  mostrarSugerencia:boolean=false;
  mostrarResultados:boolean=false
  @Input() actualizarMunicipio:boolean=false;
  actualizarMcipio:boolean=false;
  terminoEnviado:string;

  listadoDocumentos:Documento[]=[];


  @Input() grupo:Grupo = {
    IdGrupo: 0,
    Orden: 0,
    Nombre_Grupo: '',
    Descripcion: '',
    Icono: '',
    ClaseCSS: '',
    Activo: false
  };

  ngOnInit(): void {
    
  }

  

  ngOnChanges(changes: SimpleChanges): void {
    //  if(changes.actualizarMunicipio.currentValue){
    //    this.actualizarMcipio=changes.actualizarMunicipio.currentValue;
    //  }
  }

  cerrarModal(){
    this.limpiar();
    this.compMuninicipio.termino='';
    this.modaDescargaArchivoS.cerrarModal()

  }

  limpiar(){
    this.termino='';
    this.listadoDocumentos=[]
    this.mostrarResultados=false;
    this.actualizarMcipio=true;
    this.terminoEnviado='';
    this.compMuninicipio
  }

  terminoSeleccionado(ev:string){
    this.termino=ev;
    this.traerDocumentoFiltro();
  }

  traerDocumentoFiltro(){
    const filtro:filtroDocs={
    
      NomMunicipio: this.termino,
      IdGrupo: this.grupo.IdGrupo.toString()
    };

    this.documentoService.documentosPublicos(filtro)
          .subscribe(res=>{
            if(res){
              this.mostrarResultados=true; 
              this.listadoDocumentos=res;
            }else{
              this.mostrarResultados=false;
              this.listadoDocumentos=[]
            }
            
          })
  }

  descargarArchivo(doc: Documento){
    const refArchivo = document.createElement('a');
    refArchivo.href=doc.archivo;
    refArchivo.setAttribute('download',doc.nombreArchivo);
    refArchivo.target='_blank';
    document.body.appendChild(refArchivo);
    refArchivo.click()
  }

}
