import { Component, OnInit, Output,EventEmitter, Input, OnChanges, SimpleChanges, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Evento } from 'src/app/core/interfaces/evento';
import { ImagenEvento } from 'src/app/core/interfaces/eventoBD';
import { EventoArchivo, EventoArchivoDisplay } from 'src/app/core/interfaces/eventosarchivos';
import { Iarchivo } from 'src/app/core/interfaces/iarchivo';
import { Temario } from 'src/app/core/interfaces/temario';
import { Tema } from 'src/app/core/interfaces/temas';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CAdminService } from 'src/app/core/services/capacitacion/cadmin.service';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { TemaService } from 'src/app/core/services/configuracion/tema.service';
import { TemarioService } from 'src/app/core/services/configuracion/temario.service';
import { LimpiarService } from 'src/app/core/services/limpiar.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modaldocente',
  templateUrl: './modaldocente.component.html',
  styleUrls: ['./modaldocente.component.css']
})
export class ModaldocenteComponent implements OnInit, OnChanges,DoCheck {

  formEvento:FormGroup;
  formMateriales:FormGroup;

  //@Input() eventoEditar!:Evento;
  @Input() idMunicipio!:number;
  @Input() idEvento!:number;
  @Input() limpiarTitulo!:boolean;
  @Output() eventoGuardado:EventEmitter<boolean>=new EventEmitter();

  @ViewChild('tab1') tab1:ElementRef;
  
  limpiarDropZone:boolean=false;
  limpiarDropZoneEvento:boolean=false;
  mostrarIconoImagenEvento:boolean=false;
  mostrarCarpetaMateriales:boolean=false;
  linkImagenEvento:string='';
  archivo!:Iarchivo;
  tituloEvento:string='';
  descripcion:string='';
  
  config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 5,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    uploadMultiple:true,
    addRemoveLinks:true,
    acceptedFiles: 'application/pdf',
    dictRemoveFile: 'Eliminar archivo',
    createImageThumbnails: true,
    dictFileTooBig: "Error, el archivo es demasiado grande.",
    maxFilesize:10,

  };

  configEvento: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    uploadMultiple:true,
    addRemoveLinks:true,
    acceptedFiles: 'image/jpeg,image/png,image/jpg',
    dictRemoveFile: 'Eliminar archivo',
    createImageThumbnails: true,
  };

  constructor( public modalService:ModalService
              ,private fb:FormBuilder
              ,public cadmin:CAdminService
              ,private temasService:TemaService
              ,private temarioService:TemarioService
              ,private authService:AuthService
              ,private limpiarService:LimpiarService) { }
  ngDoCheck(): void {
    //limpiar el formulario
    if(this.limpiarService.Limpiar=='limpiar'){
    //  this.tab1.nativeElement.classList +=" active";
      this.limpiar();
      this.mostrarCarpetaMateriales=false;

    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes){
      for(const propiedad in changes ){

        if(propiedad=='eventoEditar'){
          if(changes.eventoEditar.currentValue){
            this.tituloEvento=changes.eventoEditar.currentValue.event.title;
            this.cargarEvento(changes.eventoEditar.currentValue.event);
          }else{
            this.tituloEvento='';
          }
        }else if(propiedad=='idMunicipio'){
          if(changes.idMunicipio){
            this.idMunicipio=changes.idMunicipio.currentValue
            this.consultarTemasxMunicipio(changes.idMunicipio.currentValue)
          }
        }else if(propiedad=='limpiarTitulo'){
          if(changes.limpiarTitulo.currentValue){
            this.tituloEvento = ''
            this.limpiarcamposhtml()
          }
        }else if(propiedad=='idEvento'){      
          if(changes.idEvento.currentValue > 0){
            this.cargarEvento(changes.idEvento.currentValue);
          }
        }
      }
    }
  }



  ngOnInit(): void {

    //SE CONSULTA EL IDMUNICIPIO PARA SABER A QUE MUNICIPIO LE CORRESPONDE EL EVENTO
    this.idMunicipio=this.authService.perfil.idMunicipio


    this.formEvento=this.fb.group({
        idEvento:         [''],
        idMunicipio:      [this.idMunicipio],
        idTema:           [''],
        titulo:           ['',  [Validators.required,Validators.minLength(6)]],
        descripcion:      ['',  [Validators.required]],
        fecha_Ini:        ['',  [Validators.required]],
        fecha_Fin:        ['',  [Validators.required]],
        todoElDia:        [0,   [Validators.required]],
        imagen:           [''],
        nombreArchivo:    [''],
        direccion:        [''],
        link:             [''],
        colorEvento:      ['bg-info',   [Validators.required]]
    })  
    //this.formEvento.get('nombreArchivo').disable();

    this.formMateriales=this.fb.group({
      idArchivo:        [''],
      idEvento:         [''],
      idTema:           ['',[Validators.required]],
      idTemario:        ['',[Validators.required]],
      archivo:          [''],
      nombreArchivo:    [''],
      titulo:           [''],
      descripcion:      [''],
    })  
  }


  guardarEvento(){
    if(this.formEvento.invalid){
      return
    }

    if(this.formEvento.get('idEvento').value=='')
    {
      this.cadmin.guardarEvento(this.formEvento.value)
            .subscribe(res=>{
               if(res){
                 this.formEvento.get('idEvento').setValue(res.idEvento);
                 this.formMateriales.get('idEvento').setValue(res.idEvento); 
                 this.mostrarCarpetaMateriales=true
                 this.consultarTemasxMunicipio(this.formEvento.get('idMunicipio').value);
                 this.eventoGuardado.emit(true);
                 Swal.fire('Materiales', 'Puede ingresar la documentación por tema.','success');
               } 
            })
    }else{
      //console.log('formulario',this.formEvento.value);
      this.cadmin.EditarEvento(this.formEvento.value)
            .subscribe(res=>{
              if(res){
                this.eventoGuardado.emit(true);
                Swal.fire('Materiales', 'Puede ingresar la documentación por tema.','success');
              } 
     })
    }
  }

  cargarEvento(ev:any){
    let   decription  = '';
    //const start=new Date(ev.start).toISOString().substring(0, 10);
    //const end =new Date(ev.end).toISOString().substring(0,10);
    // let start:any=new Date(ev.start).toISOString();
    // let end:any =new Date(ev.end).toISOString();
    let start:any;
    let end:any;
    this.mostrarCarpetaMateriales=true;
    //consumimos el servicio para editar el evento
    this.cadmin.consultarEventoxId(ev)
          .subscribe((res)=>{
            console.log('res',res)
            this.tituloEvento=res.titulo;
            if(res.imagen!=''){
              this.mostrarIconoImagenEvento=true
              this.linkImagenEvento=res.imagen;
            }
            this.formEvento.patchValue({
              idEvento      :ev,
              idTema        :ev,
              titulo        :res.titulo,
              descripcion   :res.descripcion,
              fecha_Ini     :res.fecha_Ini,
              fecha_Fin     :res.fecha_Fin,
              nombreArchivo :res.nombreArchivo,
              direccion     :res.direccion,
              link          :res.link,
              todoElDia     :res.todoElDia,
              colorEvento   : res.colorEvento
            });

          })
    //Se consume el servicio para traer los archivos por temas 
    this.cadmin.consultarArchivoGuardadosxTema(ev)
          .subscribe(res=>{
            //console.log('archivos guardados',res);
            this.archivosGuardados=res;
          })
  }

  validarCampos(nombreCampo:string){
    return this.formEvento.get(nombreCampo).invalid
              && this.formEvento.get(nombreCampo).touched              
  }

  validarCamposMateriales(nombreCampo:string){
    return this.formMateriales.get(nombreCampo).invalid
              && this.formMateriales.get(nombreCampo).touched              
  }


  temarioSeleccionado(ev:string){
    if(ev){
      this.limpiarDropZone=true;
      this.consultarArchivosGuardados(this.formEvento.get('idEvento').value, this.formMateriales.get('idTema').value,+ev)
    }
    
  }


  traerFilesEvento(archivo:File[]){
    if(archivo.length==0){return}
    //Consumo el servicio
    const imagen:ImagenEvento={
      idEvento: this.formEvento.get('idEvento').value|| 0,
      imagen: archivo[0]
    }
     this.cadmin.uploadArchivoEvento(imagen)
           .then(res=>{
             //seteo el formulario para enviarlo a guardar
             if(res){
               this.formEvento.get('imagen').setValue(res.rutaArchivo);
               this.formEvento.get('nombreArchivo').setValue(res.nombreArchivo);
               this.linkImagenEvento=res.rutaArchivo
               this.mostrarIconoImagenEvento=true;
             } 
      })

  }

  limpiar(){
    this.formEvento.patchValue({
      idEvento:       '',
      idTema:         '',
      titulo:         '',
      descripcion:    '',
      fecha_Ini:      '',
      fecha_Fin:      '',
      direccion:      '',
      todoElDia:      '0',
      imagen:         '',
      nombreArchivo:  '',
      link:           '',
      colorEvento:    ''
    });

    this.formMateriales.patchValue({
      idArchivo:        '',
      idEvento:         '',
      idTema:           '',
      idTemario:        '',
      archivo:          '',
      nombreArchivo:    '',
      titulo:           '',
      descripcion:      '',
    })

    this.limpiarDropZone=true;
    this.limpiarDropZoneEvento=true;
    this.mostrarIconoImagenEvento=false;
    this.archivosGuardados=[];

  }

  cerrarModal(){
    //this.limpiar();
    this.modalService.cerrarModal();
  }

  //metodos de adicionar materiales

  temas:Tema[]=[];
  temarios:Temario[]=[];
  archivosGuardados:EventoArchivoDisplay[]=[];

  consultarTemasxMunicipio(id:number){
    if(id){
      this.temasService.consultarTemasxMunicipio(id)
              .subscribe(res=>{
                  this.temas=res;
              })
    }
  }

  

  temaSeleccionado(ev:any){
    if(ev){
      this.consultarTemariosxTemas(ev.target.value);
    }
  }

  consultarTemariosxTemas(id:number){
    if(id){
      this.temarioService.consultarxIdTema(id)
          .subscribe(res=>{
            this.temarios=res;
          })
    }
  }

  GuardarMateriales(){
    console.log(this.formMateriales.value);
  }

  traerFiles(archivo:File[]){
    if(archivo.length==0){return}
    if(this.formMateriales.invalid){
      this.formMateriales.markAllAsTouched()
      return;
    }
    const eventoArchivo:EventoArchivo={
      idArchivo       :this.formMateriales.get('idArchivo').value|| 0,
      idEvento        :this.formEvento.get('idEvento').value|| 0,
      idTema          :this.formMateriales.get('idTema').value|| 0,
      idTemario       :this.formMateriales.get('idTemario').value|| 0,
      archivo         :this.formMateriales.get('archivo').value|| '',
      nombreArchivo   :this.formMateriales.get('nombreArchivo').value|| '',
      titulo          :this.formMateriales.get('titulo').value|| '',
      descripcion     :this.formMateriales.get('descripcion').value|| '',
      file            :archivo[archivo.length-1]
    }
    //NO SIRVIO
    //Consumo el servicio
     this.cadmin.uploadArchivo(eventoArchivo)
           .then(res=>{
             //seteo el formulario para enviarlo a guardar
             const evArchivo:EventoArchivo={
               idArchivo: eventoArchivo.idArchivo,
               idEvento: eventoArchivo.idEvento,
               idTema: eventoArchivo.idTema,
               idTemario: eventoArchivo.idTemario,
               archivo: res.rutaArchivo,
               nombreArchivo: res.nombreArchivo,
               titulo:eventoArchivo.titulo,
               descripcion:eventoArchivo.descripcion
             }
             this.cadmin.guardarArchivos(evArchivo)
                    .subscribe(res=>{
                        this.consultarArchivosGuardados(eventoArchivo.idEvento,evArchivo.idTema,evArchivo.idTemario);
                    });
           })
  }

  consultarArchivosGuardados(idevento:number,idtema:number,idtemario:number){
    this.cadmin.consultarArchivosGuardados(idevento,idtema,idtemario)
            .subscribe(res=>{
              this.archivosGuardados=res;
            })
  }

  eliminarArchivo(ev:any){
    this.cadmin.EliminarArchivo(+ev.idArchivo)
        .subscribe(res=>{
          this.limpiarDropZone=false;
          this.consultarArchivosGuardados(this.formEvento.get('idEvento').value,ev.idTema,ev.idTemario);
        })
  }

limpiarcamposhtml(){
 let input = document.getElementsByTagName("input")
 let texarea = document.getElementsByTagName("textarea") 
 this.mostrarCarpetaMateriales = false
 this.mostrarIconoImagenEvento =  false
 for(let i = 0; i < input.length; i++){
     input[i].value = ""
 }

 for(let i = 0; i < texarea.length; i++){
  texarea[i].value = ""
}
this.archivosGuardados=[];
}

}
