import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MuncipioTemaDisplay, MuncipioTema } from 'src/app/core/interfaces/municipiotema';
import { Tema } from 'src/app/core/interfaces/temas';
import { ModalService } from 'src/app/core/services/componentes/modal.service';
import { MunicipiotemaService } from 'src/app/core/services/configuracion/municipioxtema.service';
import { TemaService } from 'src/app/core/services/configuracion/tema.service';
import { LimpiarInputMunicipioService } from 'src/app/core/services/municipio/limpiarInputMunicipio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-temasxmunicipio',
  templateUrl: './temasxmunicipio.component.html',
  styleUrls: ['./temasxmunicipio.component.css']
})
export class TemasxmunicipioComponent implements OnInit {

  botonAdicionar:string='Adicionar';
  show:boolean=false;
  municipiosTemas: MuncipioTemaDisplay[]=[];
  temas:Tema[]=[];
  termino:string='';
  actualizar:boolean=false;
  terminoEnviado:string=''

  formTemasx:FormGroup;

  constructor(public modalService:ModalService
              ,private fb:FormBuilder
              ,private temasService:TemaService
              ,private municipioTemaService:MunicipiotemaService
              ,private limpiarInputMunicipio:LimpiarInputMunicipioService) { }

  ngOnInit(): void {
    this.formTemasx=this.fb.group({
      idMunicipioTema :[''],
      idMuncipio      :['',[Validators.required]],
      idTema          :['',[Validators.required]], 
      municipio       :[''],
      tema            :['']
    });
  }

  terminoSeleccionado(ev:string){
    this.termino=ev;
    this.buscarTemas();
  }

  idMunicipioSeleccionado(ev:number){
    this.formTemasx.get('idMuncipio').setValue(ev);
    this.consultarMunicipiosTemas(ev);
  }

  buscarTemas(){
    if(this.termino!=''){
      this.temasService.consultarTemas(1000,1)
          .subscribe(res=>{
            this.temas=JSON.parse(res.body.respuesta);
          })
    }
  }

  guardarTemasx(){
    if(this.formTemasx.invalid){return}

    const mt:MuncipioTema = {
      idMunicipioTema: 0,
      idMunicipio: this.formTemasx.get('idMuncipio').value,
      idTema: this.formTemasx.get('idTema').value,
      activo: true
    }

    this.municipioTemaService.crear(mt)
        .subscribe(res=>{
          if(res){
            Swal.fire(
              'Información',
              'El registro se creó con éxito.',
              'success'
            )
            this.consultarMunicipiosTemas(mt.idMunicipio)
          }
        })
  }

  consultarMunicipiosTemas(id:number){
    if(id){
      this.municipioTemaService.consultarxIdMunicipio(id)
            .subscribe(res=>{
              this.municipiosTemas=res
            })
    }
  }


  eliminarTemario(ev:MuncipioTemaDisplay){
    Swal.fire({
      title: '¿Borrar Registro?',
      text: `Esta seguro de Borrar este registro `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.municipioTemaService.eliminar(ev.idMunicipioTema)
        .subscribe(
          res=>{
            Swal.fire(
              'Información',
              `El registro se borró con éxito.`,
              'success');
              this.consultarMunicipiosTemas(ev.idMunicipio)
            },
            err=>{
              Swal.fire({
                icon: 'error',
                title: 'Atención',
                text: err.error,
              });
            }
          )
        };
      })
  }
  
    
  limpiar(){
    this.formTemasx.patchValue({
      idMunicipioTema :0,
      idMuncipio      :0,
      idTema          :0,
      municipio       :'',
      tema            :'',
    })

    this.municipiosTemas=[]
    this.actualizar=true;
    this.limpiarInputMunicipio.limpiarInput();

  }
  
  cerrarModal(){
    this.modalService.cerrarModal();
  }

}
