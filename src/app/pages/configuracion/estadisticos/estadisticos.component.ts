import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseIdf } from 'src/app/core/interfaces/baseIdf';
import { BaseIdfdos } from 'src/app/core/interfaces/baseIdfdos';
import { BaseIdi } from 'src/app/core/interfaces/baseIdi';
import { BaseMdm } from 'src/app/core/interfaces/baseMdm';
import { PromedioDimensiones } from 'src/app/core/interfaces/promedioDimensiones';
import { ResumenMdm } from 'src/app/core/interfaces/resumenMdm';
import { Tablero, TableroDisplay } from 'src/app/core/interfaces/tablero';
import { BaseIdfService } from 'src/app/core/services/configuracion/baseidf.service';
import { BaseIdfdosService } from 'src/app/core/services/configuracion/baseidfdos.service';
import { BaseIdiService } from 'src/app/core/services/configuracion/baseidi.service';
import { BaseMdmService } from 'src/app/core/services/configuracion/basemdm.service';
import { PromedioDimensionesService } from 'src/app/core/services/configuracion/promedioDimensiones.service';
import { ResumenMdmService } from 'src/app/core/services/configuracion/resumen.service';
import { TableroService } from 'src/app/core/services/configuracion/tablero.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';


declare function customInitFunction():any;
declare function bootstrapTableInit():any;

@Component({
  selector: 'app-estadisticos',
  templateUrl: './estadisticos.component.html',
  styleUrls: ['./estadisticos.component.css']
})
export class EstadisticosComponent implements OnInit {

  cantidadRegistrosPorPagina:number=10;
  pagina:number=1;
  cantidadRegistros:number;
  data:[][];

  cd1:boolean=false;
  cd2:boolean=false; 
  cd3:boolean=false; 
  cd4:boolean=false;
  cd5:boolean=false;
  cd6:boolean=false;

  arrayResMdm:any[]=[];
  arrayResIdf:any[]=[];
  arrayResIdfdos:any[]=[];
  arrayResIdi:any[]=[];
  arrayResResumenMdm:any[]=[];
  arrayResPromedioDimension:any[]=[];

  pidTablero:number=0;
  plote:string='202201';

  arrayLotes:Tablero[]=[];
  baseMdm:BaseMdm[]=[];
  baseIdf:BaseIdf[]=[];
  baseIdFdos:BaseIdfdos[]=[];
  baseIdi:BaseIdi[]=[];
  resumenMdm:ResumenMdm[]=[];
  promedioDimensiones:PromedioDimensiones[]=[];

  formTablero:FormGroup;

  @ViewChild('inputfilemdm') inputfilemdm:ElementRef;
  @ViewChild('inputfileidf') inputfileidf:ElementRef;
  @ViewChild('inputfileidfdos') inputfileidfdos:ElementRef;
  @ViewChild('inputfileidi') inputfileidi:ElementRef;
  @ViewChild('inputfileResumemdm') inputfileResumemdm:ElementRef;
  @ViewChild('inputfilePromedioDimension') inputfilePromedioDimension:ElementRef;

  
  constructor(private tableroService: TableroService
              ,private baseMdmService:BaseMdmService
              ,private baseIdfService:BaseIdfService
              ,private baseIdfdosService:BaseIdfdosService
              ,private baseIdiService:BaseIdiService
              ,private resumenService:ResumenMdmService
              ,private promedioDimensionesService:PromedioDimensionesService
              ,private fb:FormBuilder) { }

  ngOnInit(): void {
    bootstrapTableInit();
    //customInitFunction();

    this.formTablero=this.fb.group({
      idTablero   :[''],
      lote        :[''],
      nombre      :['',[Validators.required]]
    })

    //consulta los lotes 
    this.traerTableros();
  }

  validarCampos(nombre:string):boolean{
    return this.formTablero.get(nombre)?.invalid 
          && this.formTablero.get(nombre)?.touched
  }

  guardarCabecera(){
   if(this.formTablero.invalid){return}
   const fecha=new Date();
   const lote:string = `${fecha.getFullYear().toString()}${(fecha.getMonth()+1).toString()}`

   const tablero:TableroDisplay={
     lote: lote,
     nombre: this.formTablero.get('nombre').value,
     activo: true
   }


   this.tableroService.crear(tablero)
        .subscribe(res=>{
          this.formTablero.patchValue({
            idTablero   :res.idTablero,
            lote        :res.lote,
            nombre      :res.nombre
          })
          //consultamos los registros creados
          this.traerTableros();
        })

    
  }

  traerTableros(){
    this.tableroService.consultar()
        .subscribe(res=>{
          this.arrayLotes=res;
        })
  }

  seleccionarLote(ev:Tablero){
    if(ev){
      this.formTablero.get('idTablero').setValue(ev.idTablero);
      this.formTablero.get('lote').setValue(ev.lote);
      this.formTablero.get('nombre').setValue(ev.nombre);
      //busca baseMdm para trae los registros
      this.baseMdmService.consultarId(ev.lote)
                .subscribe(res=>{
                  if(res.length>0){
                    this.arrayResMdm=[
                      {
                        idTablero:this.formTablero.get('idTablero').value,
                        lote:this.formTablero.get('lote').value,
                        cantRegistro:res.length
                      }
                    ]
                  }
                })
      //busca BaseIdf para traer los registros
      this.baseIdfService.consultarId(ev.lote)
                .subscribe(res=>{
                  if(res.length>0){
                    this.arrayResIdf=[
                      {
                        idTablero:this.formTablero.get('idTablero').value,
                        lote:this.formTablero.get('lote').value,
                        cantRegistro:res.length
                      }
                    ]
                  }
                })
      //busca BaseIdfDos para traer los registros
      this.baseIdfdosService.consultarId(ev.lote)
                .subscribe(res=>{
                  if(res.length>0){
                    this.arrayResIdfdos=[
                      {
                        idTablero:this.formTablero.get('idTablero').value,
                        lote:this.formTablero.get('lote').value,
                        cantRegistro:res.length
                      }
                    ]
                  }
                })
      //busca baseIdi para traer los registros
      this.baseIdiService.consultarId(ev.lote)
                .subscribe(res=>{
                  if(res.length>0){
                    this.arrayResIdi=[
                      {
                        idTablero:this.formTablero.get('idTablero').value,
                        lote:this.formTablero.get('lote').value,
                        cantRegistro:res.length
                      }
                    ]
                  }
                })
      //busca ResumenMdm para traer los registros
      this.resumenService.consultarId(ev.lote)
                .subscribe(res=>{
                  if(res.length>0){
                    this.arrayResMdm=[
                      {
                        idTablero:this.formTablero.get('idTablero').value,
                        lote:this.formTablero.get('lote').value,
                        cantRegistro:res.length
                      }
                    ]
                  }
                })
      //busca PromocionesDimensiones para traer los registros
      this.promedioDimensionesService.consultarId(ev.lote)
                .subscribe(res=>{
                  if(res.length>0){
                    this.arrayResPromedioDimension=[
                      {
                        idTablero:this.formTablero.get('idTablero').value,
                        lote:this.formTablero.get('lote').value,
                        cantRegistro:res.length
                      }
                    ]
                  }
                })
      //limpiar los input file
      this.limpiar('');

    
    }
  }

  fileChange(ev:any, base:string){
    const target: DataTransfer = <DataTransfer>(ev.target);

    if(target.files.length !== 1 ) throw new Error('Solo puede seleccionar un archivo.');

    const reader: FileReader = new FileReader();

    reader.onload = (e:any)=>{
      const bstr:string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr,{type:'binary'});

      const wsname:string = wb.SheetNames[0];

      const ws:XLSX.WorkSheet = wb.Sheets[wsname];

      this.data = (XLSX.utils.sheet_to_json(ws,{header:1}))
      switch (base){
        case 'basemdm':
          this.cd1=true;
          this.crearBaseMdm(this.data);
          break;
        case 'baseidf':
          this.cd2=true;
          this.crearBaseidf(this.data);
          break;
        case 'baseidfdos':
          this.cd3=true;
          this.crearBaseidfdos(this.data);
          break;
        case 'baseidi':
          this.cd4=true;
          this.crearBaseidi(this.data);
          break;  
        case 'resumenmdm':
          this.cd5=true;
          this.crearResumenMdm(this.data);
          break; 
        case 'promedioDimension':
          this.cd6=true;
          this.crearPromedioDimensiones(this.data);
          break; 
      }
      this.cantidadRegistros=this.data.length
    }

    //El reader se le debe asignat la data del excel para 
    //que el onload se ejecute
    reader.readAsBinaryString(target.files[0]);
  }


//creacion de las tablas
  crearBaseMdm(data:any[])
  {
      let canRegistros:number=0;
      let arrayData:BaseMdm[]=[];

      data.forEach((res,index)=>{
        if(index>0){
          const basemdm:BaseMdm={
            idTablero:                this.formTablero.get('idTablero').value,
            lote:                     this.formTablero.get('lote').value,
            codigoDane:               res[0],
            grupo:                    res[1],
            movilizacionRecursos:     res[2] || 0,
            ejecucionRecursos:        res[3] || 0,
            gobiernoAbierto:          res[4] || 0,
            ordenamientoTerritorial:  res[5] || 0,
            gestion:                  res[6] || 0,
            educacion:                res[7] || 0,
            salud:                    res[8] || 0,
            serviciosPublicos:        res[9] || 0,
            seguridadConvivencia:     res[10] || 0,
            resultados:               res[11] || 0,
            ajusteResultados:         res[12] || 0,
            mdm:                      res[13] || 0,
            rankingMdm:               res[14] || '',
            rankingMov:               res[15]  || '',
            rankingEjecu:             res[16]  || '',
            rankingGob:               res[17]  || '',
            rankingOt:                res[18]  || '',
            rankingGestion:           res[19]  || '',
            rankingEdu:               res[20]  || '',
            rankingSalud:             res[21]  || '',
            rankingServPub:           res[22]  || '',
            rankingSeguridad:         res[23]  || '',
            rankingResultados:        res[24]  || '',
            activo:                   true
          }
          canRegistros+=1;
          arrayData.push(basemdm);
        }
        
      })//final del foreach

      this.baseMdmService.crear(arrayData)
      .subscribe((res:any)=>{
        if(res=='Ya existe el Lote.'){
          Swal.fire({
            icon: 'error',
            title: 'Ya existe el lote',
            text: 'La información que intenta cargar ya esta subida.',
          })
          this.cd1=false;
        }else{
          this.cd1=false;
          this.arrayResMdm=[
            {
              idTablero:this.formTablero.get('idTablero').value,
              lote:this.formTablero.get('lote').value,
              cantRegistro:canRegistros
            }
          ]
        }

      });

     

  }

  eliminarBaseMdm(ev:any){
    Swal.fire({
      title: '¿Borrar Registro?',
      text: `Esta seguro de Borrar estos registros`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.baseMdmService.eliminar(ev.idTablero)
        .subscribe(res=>{
          Swal.fire(
            'Información',
            `${res}`,
            'success');
            //Limpia los registro
            this.arrayResMdm=[
              {
                idTablero:0,
                lote:'',
                cantRegistro:0
              }
            ]
            //llama los registros nuevamente
            this.mostrarBaseMdm(this.arrayResMdm);

        })       
      }
    })
  }

  mostrarBaseMdm(ev:any){
    if(!ev){return}
    this.baseMdmService.consultarId(ev.lote)
      .subscribe(res=>{
        this.cantidadRegistros=res.length
        this.baseMdm=res;
      })
  }


  crearBaseidf(data:any[]){
    let canRegistros:number=0;
    let arrayData:BaseIdf[]=[];

    data.forEach((res,index)=>{
      if(index>0){
        const baseidf:BaseIdf={
          idTablero:                    this.formTablero.get('idTablero').value,
          lote:                         this.formTablero.get('lote').value,
          codigoDane:                   res[0],
          municipio:                    res[1],
          caDependenciaTransferencia:   res[2],
          caRelevanciaFbkFijo:          res[3],
          caEndeudamientoLargoPlazo:    res[4],
          caAhorroCorriente:            res[5],
          caBalancePrimario:            res[6],
          resultado:                    res[7],
          caResultado:                  res[8],
          caHolgura:                    res[9],
          caCapacidadEjecucionIngresos: res[10],
          caCapacidadEjecucioInversion: res[11],
          bonificacionEsfuerzoPropio:   res[12],
          gestion:                      res[13],
          gestionBonos:                 res[14],
          caGestion:                    res[15],
          nuevoIdf:                     res[16],
          nuevoIdfSb:                   res[17],
          rango:                        res[18],
          activo:                       true
        }
        canRegistros+=1;
        arrayData.push(baseidf);
      }
    })//final del foreach

    this.baseIdfService.crear(arrayData)
        .subscribe((res:any)=>{
          if(res=='Ya existe el Lote.'){
            Swal.fire({
              icon: 'error',
              title: 'Ya existe el lote',
              text: 'La información que intenta cargar ya esta subida.',
            })
            this.cd2=false;
          }else{
            this.cd2=false;
            this.arrayResIdf=[
              {
                idTablero:this.formTablero.get('idTablero').value,
                lote:this.formTablero.get('lote').value,
                cantRegistro:canRegistros
              }
            ]
          }
        })
  }

  eliminarBaseIdf(ev:any){
    Swal.fire({
      title: '¿Borrar Registro?',
      text: `Esta seguro de Borrar estos registros`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.baseIdfService.eliminar(ev.idTablero)
        .subscribe(res=>{
          Swal.fire(
            'Información',
            `${res}`,
            'success');
            //Limpia los registro
            this.arrayResIdf=[
              {
                idTablero:0,
                lote:'',
                cantRegistro:0
              }
            ]
            //llama los registros nuevamente
            this.mostrarBaseIdf(this.arrayResMdm);

        })       
      }
    })
  }

  mostrarBaseIdf(ev:any){
    if(!ev){return}
    this.baseIdfService.consultarId(ev.lote)
      .subscribe(res=>{
        this.cantidadRegistros=res.length
        this.baseIdf=res;
      })
  }


  crearBaseidfdos(data:any[]){
    let canRegistros:number=0;
    let arrayData:BaseIdfdos[]=[];

    data.forEach((res,index)=>{
      if(index>0){
        const baseIdfdos:BaseIdfdos={
          idTablero:                        this.formTablero.get('idTablero').value, 
          lote:                             this.formTablero.get('lote').value,
          tipo:                             res[0],
          grupo:                            res[1],
          dependenciaTransferencia:         res[2],
          relevanciaFbkFijo:                res[3],
          endeudamientoLargoPlazo:          res[4],
          ahorroCorriente:                  res[5],
          balancePrimario:                  res[6],
          resultados:                       res[7],
          idf:                              res[8],
          caHolgura:                        res[9],
          caCapacidadEjecucionIngresos:     res[10],
          caCapacidadEjecucionInversion:    res[11],
          bonificacionEsfuerzoPropio:       res[12],
          caGestion:                        res[13],
          activo:                           true
        }
        canRegistros+=1;
        arrayData.push(baseIdfdos);
      }//termina el if
    })//termina el foreach

    this.baseIdfdosService.crear(arrayData)
        .subscribe((res:any)=>{
          if(res=='Ya existe el Lote.'){
            Swal.fire({
              icon: 'error',
              title: 'Ya existe el lote',
              text: 'La información que intenta cargar ya esta subida.',
            })
            this.cd3=false;
          }else{
            this.cd3=false;
            this.arrayResIdfdos=[
              {
                idTablero:this.formTablero.get('idTablero').value,
                lote:this.formTablero.get('lote').value,
                cantRegistro:canRegistros
              }
            ]
            console.log(this.arrayResIdfdos);
          }
        })

  }

  eliminarBaseIdfdos(ev:any){
    Swal.fire({
      title: '¿Borrar Registro?',
      text: `Esta seguro de Borrar estos registros`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.baseIdfdosService.eliminar(ev.idTablero)
        .subscribe(res=>{
          Swal.fire(
            'Información',
            `${res}`,
            'success');
            //Limpia los registro
            this.arrayResIdfdos=[
              {
                idTablero:0,
                lote:'',
                cantRegistro:0
              }
            ]
            //llama los registros nuevamente
            this.mostrarBaseIdfdos(this.arrayResIdfdos);

        })       
      }
    })
  }

  mostrarBaseIdfdos(ev:any){
    if(!ev){return}
    this.baseIdfdosService.consultarId(ev.lote)
      .subscribe(res=>{
        this.cantidadRegistros=res.length
        this.baseIdFdos=res;
      })
  }

  crearBaseidi(data:any[]){
    let canRegistros:number=0;
    let arrayData:BaseIdi[]=[];

    data.forEach((res,index)=>{
      if(index>0){
        const baseidi:BaseIdi={
          idTablero: this.formTablero.get('idTablero').value,
          lote: this.formTablero.get('lote').value,
          codigoDane: res[0],
          municipio: res[1],
          d1TalentoHumano: res[2],
          d2DireccionamientoEstrategicoPlaneacion: res[3],
          d3GestionResultadosValores: res[4],
          d4EvaluacionResultados: res[5],
          d5InformacionComunicacion: res[6],
          d6GestionConocimiento: res[7],
          d7ControlInterno: res[8],
          p1GestionEstrategicaTalentoHumano: res[9],
          p2Integridad: res[10],
          p3PlaneacionInstitucional: res[11],
          p4GestionPresupuestalEficienciaGastoPublico: res[12],
          p5FortalecimientoOrganizacionalSimplificacionProcesos: res[13],
          p6GobiernoDigital: res[14],
          p7SeguridadDigital: res[15],
          p8DefensaJuridica: res[16],
          p9TransparenciaAccesoInformacionLuchaContraCorrupcion: res[17],
          p10ServicioCiudadano: res[18],
          p11RacionalizacionTramites: res[19],
          p12ParticipacionCiudadanaGestionPublica: res[20],
          p13SegumientoEvaluacionDesempe: res[21],
          idBaseIdi: res[22],
          P14GestionDocumental: res[22],
          P15GestionConocimiento: res[23],
          P16ControlInterno: res[24],
          P17MejoraNormativa: res[25],
          P18GestionInformacionEstadistica: res[26],
          Idi: res[27],
          Activo: true
        }
        canRegistros+=1;
        arrayData.push(baseidi);
      }//termina el if
    })//termina el foreach

    this.baseIdiService.crear(arrayData)
    .subscribe((res:any)=>{
      if(res=='Ya existe el Lote.'){
        Swal.fire({
          icon: 'error',
          title: 'Ya existe el lote',
          text: 'La información que intenta cargar ya esta subida.',
        })
        this.cd4=false;
      }else{
        this.cd4=false;
        this.arrayResIdi=[
          {
            idTablero:this.formTablero.get('idTablero').value,
            lote:this.formTablero.get('lote').value,
            cantRegistro:canRegistros
          }
        ]
      }
    })
  }

  eliminarBaseIdi(ev:any){
    Swal.fire({
      title: '¿Borrar Registro?',
      text: `Esta seguro de Borrar estos registros`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.baseIdiService.eliminar(ev.idTablero)
        .subscribe(res=>{
          Swal.fire(
            'Información',
            `${res}`,
            'success');
            //Limpia los registro
            this.arrayResIdi=[
              {
                idTablero:0,
                lote:'',
                cantRegistro:0
              }
            ]
            //llama los registros nuevamente
            this.mostrarBaseIdi(this.arrayResIdi);

        })       
      }
    })
  }

  mostrarBaseIdi(ev:any){
    if(!ev){return}
    this.baseIdiService.consultarId(ev.lote)
      .subscribe(res=>{
        this.cantidadRegistros=res.length
        this.baseIdi=res;
      })
  }

  crearResumenMdm(data:any[]){
    let canRegistros:number=0;
    let arrayData:ResumenMdm[]=[];

    data.forEach((res,index)=>{
      if(index>0){
        const resumenMdm:ResumenMdm={
          idTablero:        this.formTablero.get('idTablero').value,
          lote:             this.formTablero.get('lote').value,
          grupo:            res[0],
          mdm:              res[1],
          gestion:          res[2],
          resultado:        res[3],
          activo:           true
        }
        canRegistros+=1;
        arrayData.push(resumenMdm);
      }//termina el if
    })//termina el foreach

    this.resumenService.crear(arrayData)
    .subscribe((res:any)=>{
      if(res=='Ya existe el Lote.'){
        Swal.fire({
          icon: 'error',
          title: 'Ya existe el lote',
          text: 'La información que intenta cargar ya esta subida.',
        })
        this.cd5=false;
      }else{
        this.cd5=false;
        this.arrayResResumenMdm=[
          {
            idTablero:this.formTablero.get('idTablero').value,
            lote:this.formTablero.get('lote').value,
            cantRegistro:canRegistros
          }
        ]
      }
    })
  }

  eliminarResumenMdm(ev:any){
    Swal.fire({
      title: '¿Borrar Registro?',
      text: `Esta seguro de Borrar estos registros`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.resumenService.eliminar(ev.idTablero)
        .subscribe(res=>{
          Swal.fire(
            'Información',
            `${res}`,
            'success');
            //Limpia los registro
            this.arrayResResumenMdm=[
              {
                idTablero:0,
                lote:'',
                cantRegistro:0
              }
            ]
            //llama los registros nuevamente
            this.mostrarResumenMdm(this.arrayResResumenMdm);

        })       
      }
    })
  }

  mostrarResumenMdm(ev:any){
    if(!ev){return}
    this.resumenService.consultarId(ev.lote)
      .subscribe(res=>{
        this.cantidadRegistros=res.length
        this.resumenMdm=res;
      })
  }

  crearPromedioDimensiones(data:any[]){
    let canRegistros:number=0;
    let arrayData:PromedioDimensiones[]=[];

    data.forEach((res,index)=>{
      if(index>0){
        const promedioDimensiones:PromedioDimensiones={
          idTablero:                                this.formTablero.get('idTablero').value,
          lote:                                     this.formTablero.get('lote').value,
          tipo:                                     res[0],
          d1TalentoHumano:                          res[1],
          d2DireccionamientoEstrategicoPlaneacion:  res[2],
          d3GestionResultadosValores:               res[3],
          d4EvaluacionResultados:                   res[4],
          d5InformacionComunicacion:                res[5],
          d6GestionConocimiento:                    res[6],
          d7Control:                                res[7],
          idi:                                      res[8],
          activo:                                   true
        }
        canRegistros+=1;
        arrayData.push(promedioDimensiones);
      }//termina el if
    })//termina el foreach

    this.promedioDimensionesService.crear(arrayData)
    .subscribe((res:any)=>{
      if(res=='Ya existe el Lote.'){
        Swal.fire({
          icon: 'error',
          title: 'Ya existe el lote',
          text: 'La información que intenta cargar ya esta subida.',
        })
        this.cd6=false;
      }else{
        this.cd6=false;
        this.arrayResPromedioDimension=[
          {
            idTablero:this.formTablero.get('idTablero').value,
            lote:this.formTablero.get('lote').value,
            cantRegistro:canRegistros
          }
        ]
      }
    })
  }

  eliminarPromedioDimensiones(ev:any){
    Swal.fire({
      title: '¿Borrar Registro?',
      text: `Esta seguro de Borrar estos registros`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.promedioDimensionesService.eliminar(ev.idTablero)
        .subscribe(res=>{
          Swal.fire(
            'Información',
            `${res}`,
            'success');
            //Limpia los registro
            this.arrayResPromedioDimension=[
              {
                idTablero:0,
                lote:'',
                cantRegistro:0
              }
            ]
            //llama los registros nuevamente
            this.mostrarPromedioDimensiones(this.arrayResPromedioDimension);

        })       
      }
    })
  }

  mostrarPromedioDimensiones(ev:any){
    if(!ev){return}
    this.promedioDimensionesService.consultarId(ev.lote)
      .subscribe(res=>{
        this.cantidadRegistros=res.length
        this.promedioDimensiones=res;
      })
  }





  limpiar(ev:string){
    switch (ev){
      case 'basemdm':
        this.inputfilemdm.nativeElement.value='';
        break;
      case 'baseidf':
        this.inputfileidf.nativeElement.value='';
        break;
      case 'baseidfdos':
        this.inputfileidfdos.nativeElement.value='';
        break;
      case 'baseidi':
        this.inputfileidi.nativeElement.value='';
        break;
      case 'resumenmdm':
        this.inputfileResumemdm.nativeElement.value='';
        break;
      case 'promedioDimension':
        this.inputfilePromedioDimension.nativeElement.value='';
        break;
      default:
        this.inputfilemdm.nativeElement.value='';
        this.inputfileidf.nativeElement.value='';
        this.inputfileidfdos.nativeElement.value='';
        this.inputfileidi.nativeElement.value='';
        this.inputfileResumemdm.nativeElement.value='';
        this.inputfilePromedioDimension.nativeElement.value='';
        break;
    }
  }

  eliminarLote(ev:any){
    Swal.fire({
      title: '¿Borrar Registro?',
      text: `Esta seguro de Borrar estos registros`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tableroService.eliminar(ev.idTablero)
        .subscribe(res=>{
          Swal.fire(
            'Información',
            `${res}`,
            'success');
            //consulta nuevamente y Limpia los registro
            this.traerTableros();
            this.formTablero.get('idTablero').setValue('');
            this.formTablero.get('lote').setValue('');
            this.formTablero.get('nombre').setValue('');
        })
      }
    })
  }
 
}
