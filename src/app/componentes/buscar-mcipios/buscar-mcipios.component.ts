import { Component, OnInit, Output,EventEmitter, Input, OnChanges, SimpleChanges, OnDestroy, DoCheck} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Municipio } from 'src/app/core/interfaces/municipio';
import { MunicipioService } from 'src/app/core/services/configuracion/municipio.service';
import { LimpiarInputMunicipioService } from 'src/app/core/services/municipio/limpiarInputMunicipio.service';
import { ValidacionMunicipioService } from 'src/app/core/services/municipio/validacion-municipio.service';


declare function customInitFunction():any;

@Component({
  selector: 'app-buscar-mcipios',
  templateUrl: './buscar-mcipios.component.html',
  styleUrls: ['./buscar-mcipios.component.css']
})
export class BuscarMcipiosComponent implements OnInit,OnChanges,OnDestroy,DoCheck {

  @Output() terminoSeleccionado?:EventEmitter<string> = new EventEmitter();
  @Output() idMunicipioSeleccionado:EventEmitter<number> = new EventEmitter();
  @Input() actualizar?:boolean=false;
  @Input() terminoEnviado?:string=''

    
  termino:string='';

  debounce: Subject<string> = new Subject();
  
  mostrarSugerencia:boolean=false;
  MunicipiosSugeridos:Municipio[];
  Municipionovalido:boolean=false;
  formMunicipio:FormGroup;

  get codMunicipioError():string{
    const error = this.formMunicipio.get('municipio')?.errors;
    if(error?.required){
      return "El municipio es obligatorio";
    }
    if(error?.municipionoexiste){
      return "Debe digitar un municipio valido";
    }
    return '';
  }

  constructor(private municipiosService:MunicipioService
             ,private fb: FormBuilder
             ,private validacionMunicipio:ValidacionMunicipioService
             ,private limpiarInputMunicipio:LimpiarInputMunicipioService) { }

  ngDoCheck(): void {
   if(this.limpiarInputMunicipio.Limpiar=='limpiar'){
     this.formMunicipio.get('municipio').setValue('');
     this.limpiarInputMunicipio.noLimpiarInput();
   }
  }


  ngOnDestroy(): void {
    this.debounce.next( '');
    console.log('onDestroy buscar municipio: ',this.actualizar);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes){
      for(const propiedad in changes ){
        if(propiedad=='terminoEnviado'){
          if(changes.terminoEnviado.currentValue){
            this.formMunicipio.get('municipio').setValue(changes.terminoEnviado.currentValue);
            //this.mostrarSugerencia=false;
          }else{
            this.termino=''
            //this.mostrarSugerencia=false;
          }
        }
      }
    }
  }

  ngOnInit() {
    customInitFunction();
    this.formMunicipio=this.fb.group({
      idMunicipio:    [0],
      municipio:      ['',[Validators.required],[this.validacionMunicipio]],
    });
    this.consultarMunicipios();
    // this.debounce
    //   .pipe(
    //     debounceTime(300)
    //   )
    //   .subscribe(valor => {
    //       this.terminoSeleccionado.emit(valor);
    //       this.consultarMunicipios();
    //   })
  }

 
  teclaPrecionada(){
    //this.debounce.next( this.formMunicipio.get('municipio').value );
  }

  // consultarMunicipios(){
  //   const pTermino:String=this.formMunicipio.get('municipio').value 
  //   if(pTermino!=''){
  //     this.municipiosService.consultarMunicipios(500,1)
  //         .subscribe(res=>{
  //           this.MunicipiosSugeridos=JSON.parse(res.body.respuesta).filter(valor=>
  //                 valor.Nombre.toLowerCase().includes(pTermino.toLowerCase())).splice(0,7);
  //           if(this.MunicipiosSugeridos.length==0){
  //             this.mostrarSugerencia=false;
  //             this.Municipionovalido=true;
  //           }else{
  //             this.Municipionovalido=false;
  //             this.mostrarSugerencia=true;
  //           }
  //         })
  //   }else{
  //     this.mostrarSugerencia=false;
  //     this.Municipionovalido=true;
  //   }
  // }

   consultarMunicipios(){
     const pTermino:String=this.formMunicipio.get('municipio').value 
       this.municipiosService.consultarMunicipios(500,1)
           .subscribe(res=>{
             this.MunicipiosSugeridos=JSON.parse(res.body.respuesta)
             this.MunicipiosSugeridos = this.MunicipiosSugeridos.filter(res=>res.Activo==true)
           })
          
    
   }

   
   seleccionar(ev:any){
    if(ev.target.value){
      this.terminoSeleccionado.emit(ev.target.value);
      this.MunicipiosSugeridos.forEach(resp=>{
        if(resp.Nombre==ev.target.value){
          this.idMunicipioSeleccionado.emit(resp.IdMunicipio);
          this.Municipionovalido=false;
        }else{
          this.Municipionovalido=true;
        }
      })

    }else{
      this.terminoSeleccionado.emit('');
      this.idMunicipioSeleccionado.emit(0);
    }
  }

 
}
