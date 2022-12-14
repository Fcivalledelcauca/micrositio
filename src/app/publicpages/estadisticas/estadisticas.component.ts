import { Component, OnInit } from '@angular/core';
import {single} from './data'
import {multi} from './data'
import {multiradio} from './data'
import { MunicipioService } from 'src/app/core/services/configuracion/municipio.service';
import { EstadisticasService } from 'src/app/core/services/estadisticas/estadisticas.service';

declare function customInitFunction():any;


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {


  //region del municipio
  termino:string='';
  //actualizar municipio
  actualizarMunicipio:boolean=false;
  //se envia el termino que se desea limpiar
  terminoEnviado:string='';

  //campos del municipio
  codigoDane:string='';
  grupoCapacidades:string='';
  region:string='';
  catRuralidad:string='';
  grupoPar:string=''

  //tabla de idf
  baseIdf:any[]=[];
  rangoInterpretacion:string='';

  //grafica idf
  componenteresultadosidf:any[]=[];
  graficaResultadoIdf:any[]=[];
  graficaGestionIdf:any[]=[];

  //tabla Mdm--resumenMdm
  baseMdm:any[]=[];

  //graficas mdm
  graficasComponentesGestion:any[]=[];
  graficasComponentesResultados:any[]=[];

  //tabla promedioDimension
  baseIdi:any[]=[];

  //graficas promedioDimension
  graficasPD1:any[]=[];
  graficasPD2:any[]=[];
  
  graficaPoliticas:any[]=[];

  single:any[]=[];

  get singleResultadosIdf(){
    return this.graficaResultadoIdf;
  }

  get singleGestionIdf(){
    return this.graficaGestionIdf;
  }

  get singleComponenteGestion(){
    return this.graficasComponentesGestion;
  }

  get singleComponentesResultados(){
    return this.graficasComponentesResultados;
  }

  get singleDimensionMipg1(){
    return this.graficasPD1;
  }

  get singleDimensionMipg2(){
    return this.graficasPD2;
  }

  get singlePoliticas(){
    return this.graficaPoliticas;
  }

  multi: any[];
  multiradio: any[];
  view: any[] = [];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  animations: boolean = true;
  maintainAspectRatio: true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  yAxisLabel = 'Medici??n';
  maxXAxisTickLength = 50;
  maxYAxisTickLength = 100;
  autoScale: Boolean = true
  FitContainer=true;
  legend: boolean = false;
  legendTitle = 'Conceptos';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  
  ricolor= {
    domain: ['#0872be','#e58817','#727875']
  }

  mdcolor2= {
    domain: ['#E74C3C']
  }

  
  mdcolor1= {
    domain: ['#2980B9']
  }

  sevendmcolor= {
    domain: ['#0872be','#e58817']
  }

  policolor= {
    domain: ['#7FB3D5','#A9DFBF','#E6B0AA','#F6DDCC' ,'#AAAAAA','#48C9B0','#FCF3CF','#CCD1D1','#E8DAEF'
            ,'#F5B7B1','#85C1E9','#BDC3C7','#F5CBA7' ,'#D0ECE7','#D6DBDF','#BB8FCE','#2874A6','#AED6F1']
  }
 
  constructor( private municipioService:MunicipioService
              ,private estadisticasService:EstadisticasService) {
    this.view = [innerWidth / 1.3, 400];            
    Object.assign(this, { multi,multiradio })
  }

  onActivate(data): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  onSelect(event) {
    //console.log(event);
  }

  ngOnInit(): void {
    customInitFunction();

  }

  //graficos
  graficarResultadoIdf(){
    return this.graficaResultadoIdf;
  }


  //metodos del municipio
  terminoSeleccionado(ev:string){
    if(ev){

      this.termino=ev;
    }else{
      this.termino='';
      this.limpiar();
    }

  }

  idMunicipioSeleccionado(ev:number){
    if(ev){
      this.buscarInfo(ev);
    }else{
     this.limpiar();
    }

  }

  buscarInfo(idmunicipio:number){
   this.informacionMunicipio(idmunicipio);
  }

  //informacion del municipio
  informacionMunicipio(id:number){
    this.municipioService.municipioxId(id)
    .subscribe((res:any)=>{
      this.codigoDane=res.codigoDane;
      this.grupoCapacidades=res.dotaciones_Iniciales;
      this.region=res.region;
      this.catRuralidad=res.categoria_Ruralidad;
      this.grupoPar=res.grupo_Par;
      //base idf
      this.informacionBaseIdf(this.codigoDane);
      //base mdm
      this.informacionBaseMdm(this.codigoDane);
      //base idi
      this.informacionBaseIdi(this.codigoDane,this.grupoPar);
    })
  }

  //tabla idf
  informacionBaseIdf(codigodane:string){
    this.estadisticasService.consultarBaseIdf(codigodane)
        .subscribe(residf=>{
            this.rangoInterpretacion=residf.rango;
            this.estadisticasService.consultarBaseIdfdos(this.grupoCapacidades)
                .subscribe(residf2=>{
                    //se arma la informacion para graficar resultados
                    this.graficaResultadoIdf=[
                      {
                        "name": "Dependiencia de las Tranferencias",
                        "series": [
                          {
                            "name":"Municipio",
                            "value":residf.caDependenciaTransferencia
                          },
                          {
                            "name":"Promedio Dpto",
                            "value":0
                          },
                          {
                            "name":"Promedio Nal.",
                            "value":0
                          },
                        ]
                      },
                      {
                        "name": "Relevancia FBK fijo",
                        "series": [
                          {
                            "name":"Municipio",
                            "value":residf.caRelevanciaFbkFijo
                          },
                          {
                            "name":"Promedio Dpto",
                            "value":0
                          },
                          {
                            "name":"Promedio Nal.",
                            "value":0
                          },
                        ]
                      },
                      {
                        "name": "Endeudamiento Largo Plazo",
                        "series": [
                          {
                            "name":"Municipio",
                            "value":residf.caEndeudamientoLargoPlazo
                          },
                          {
                            "name":"Promedio Dpto",
                            "value":0
                          },
                          {
                            "name":"Promedio Nal.",
                            "value":0
                          },
                        ]
                      },
                      {
                        "name": "Ahorro Corriente",
                        "series": [
                          {
                            "name":"Municipio",
                            "value":residf.caAhorroCorriente
                          },
                          {
                            "name":"Promedio Dpto",
                            "value":0
                          },
                          {
                            "name":"Promedio Nal.",
                            "value":0
                          },
                        ]
                      },
                      {
                        "name": "Balance Primario",
                        "series": [
                          {
                            "name":"Municipio",
                            "value":residf.caBalancePrimario
                          },
                          {
                            "name":"Promedio Dpto",
                            "value":0
                          },
                          {
                            "name":"Promedio Nal.",
                            "value":0
                          },
                        ]
                      },
                    ]
                    //se arma la informacion para graficar gestion
                    this.graficaGestionIdf=[
                      {
                        "name": "Holguera",
                        "series": [
                          {
                            "name":"Municipio",
                            "value":residf.caHolgura
                          },
                          {
                            "name":"Promedio Dpto",
                            "value":0
                          },
                          {
                            "name":"Promedio Nal.",
                            "value":0
                          },
                        ]
                      },
                      {
                        "name": "Capacidad de Ejecuci??n de ingresos",
                        "series": [
                          {
                            "name":"Municipio",
                            "value":residf.caCapacidadEjecucionIngresos
                          },
                          {
                            "name":"Promedio Dpto",
                            "value":0
                          },
                          {
                            "name":"Promedio Nal.",
                            "value":0
                          },
                        ]
                      },
                      {
                        "name": "Capacidad de ejecuci??n de inversi??n",
                        "series": [
                          {
                            "name":"Municipio",
                            "value":residf.caCapacidadEjecucioInversion
                          },
                          {
                            "name":"Promedio Dpto",
                            "value":0
                          },
                          {
                            "name":"Promedio Nal.",
                            "value":0
                          },
                        ]
                      },
                    ]
                    //se recorre la respuesta
                    residf2.forEach(res=>{
                      if(res.grupo=='dptal'){
                        this.baseIdf=[
                          {
                            municipal:residf.nuevoIdfSb,
                            promediodptal:res.idf,
                            promedionacional:0
                          }
                        ]
                        //informacion de la grafica resultados
                        this.graficaResultadoIdf[0].series[1].value=res.dependenciaTransferencia;
                        this.graficaResultadoIdf[1].series[1].value=res.relevanciaFbkFijo;
                        this.graficaResultadoIdf[2].series[1].value=res.endeudamientoLargoPlazo;
                        this.graficaResultadoIdf[3].series[1].value=res.ahorroCorriente;
                        this.graficaResultadoIdf[4].series[1].value=res.balancePrimario;
                        //informacion de la grafica gestion
                        this.graficaGestionIdf[0].series[1].value=res.caHolgura;
                        this.graficaGestionIdf[1].series[1].value=res.caCapacidadEjecucionIngresos;
                        this.graficaGestionIdf[2].series[1].value=res.caCapacidadEjecucionInversion;

                      }else{
                        this.baseIdf[0].promedionacional=res.idf
                        //informacion de la grafica
                        this.graficaResultadoIdf[0].series[2].value=res.dependenciaTransferencia;
                        this.graficaResultadoIdf[1].series[2].value=res.relevanciaFbkFijo;
                        this.graficaResultadoIdf[2].series[2].value=res.endeudamientoLargoPlazo;
                        this.graficaResultadoIdf[3].series[2].value=res.ahorroCorriente;
                        this.graficaResultadoIdf[4].series[2].value=res.balancePrimario;
                        //informacion de la grafica gestion
                        this.graficaGestionIdf[0].series[2].value=res.caHolgura;
                        this.graficaGestionIdf[1].series[2].value=res.caCapacidadEjecucionIngresos;
                        this.graficaGestionIdf[2].series[2].value=res.caCapacidadEjecucionInversion;
                      }
                    })
                })

        })
  }
  //tabla Mdm
  informacionBaseMdm(codigodane:string){
    this.estadisticasService.consultarBaseMdm(codigodane)
          .subscribe(resbasemdm=>{
            this.graficasComponentesGestion=[
              {
                "name":"Movilizaci??n de Recursos",
                "value":resbasemdm[0].movilizacionRecursos
              },
              {
                "name":"Ejecuci??n de recursos",
                "value":resbasemdm[0].ejecucionRecursos
              },
              {
                "name":"Gobierno abierto",
                "value":resbasemdm[0].gobiernoAbierto
              },
              {
                "name":"Ordenamiento territorial",
                "value":resbasemdm[0].ordenamientoTerritorial
              }
            ]

            this.graficasComponentesResultados=[
              {
                "name":"Educaci??n",
                "value":resbasemdm[0].educacion
              },
              {
                "name":"Salud",
                "value":resbasemdm[0].salud
              },
              {
                "name":"Servicios p??blicos",
                "value":resbasemdm[0].serviciosPublicos
              },
              {
                "name":"Seguridad y convivencias",
                "value":resbasemdm[0].seguridadConvivencia
              }
            ]

            this.estadisticasService.consultarResumenMdm(this.grupoCapacidades)
                    .subscribe(res=>{
                      this.baseMdm=[
                        {
                          "codigo":"MDM",
                          "municipal":resbasemdm[0].mdm,
                          "promedioci":res[0].mdm,
                          "posiciongrupoci":resbasemdm[0].rankingMdm
                        },
                        {
                          "codigo":"COMPONENTES GEST??N",
                          "municipal":resbasemdm[0].gestion,
                          "promedioci":res[0].gestion,
                          "posiciongrupoci":resbasemdm[0].rankingGestion,
                        },
                        {
                          "codigo":"COMPONENTE RESULTADOS",
                          "municipal":resbasemdm[0].resultados,
                          "promedioci":res[0].resultado,
                          "posiciongrupoci":resbasemdm[0].rankingResultados
                        }
                      ]
                    })
          })
  }

  //tabla idi
  informacionBaseIdi(codigodane:string,grupopar:string){
    this.estadisticasService.consultarBaseIdi(codigodane)
          .subscribe((residi:any)=>{
              this.estadisticasService.consultarPromedioDimension(grupopar)
                        .subscribe(res=>{
                          //data del la tabla de resultados
                            this.baseIdi=[
                                {
                                  "tipo":"IDI",
                                  "municipal":residi[0].idi,
                                  "grupopar":this.grupoPar,
                                  "promediogrupopar":res[0].idi
                                }
                            ]
                            //datos del grafico
                            this.graficasPD1=[
                              {
                                "name": "D1 Talento Humano",
                                "series": [
                                  {
                                    "name": "Talento Humano",
                                    "value": res[0].d1TalentoHumano
                                  },
                                  {
                                    "name": "municipio1",
                                    "value": residi[0].d1TalentoHumano
                                  }
                                ]
                              },

                              {
                                "name": "D2 Direccion Estrat??gico y Planeaci??n",
                                "series": [
                                  {
                                    "name": "Direccionamiento Estrat??gico y Planeaci??n",
                                    "value": res[0].d2DireccionamientoEstrategicoPlaneacion
                                  },
                                  {
                                    "name": "municipio2",
                                    "value": residi[0].d2DireccionamientoEstrategicoPlaneacion
                                  }
                                ]
                              },

                              {
                                "name": "D3 Gesti??n para Resultados con Valores",
                                "series": [
                                  {
                                    "name": "Gesti??n para Resultados con Valores",
                                    "value": res[0].d3GestionResultadosValores
                                  },
                                  {
                                    "name": "municipio3",
                                    "value": residi[0].d3GestionResultadosValores
                                  }
                                ]
                              },
                              {
                                "name": "D4 Evaluaci??n de Resultados",
                                "series": [
                                  {
                                    "name": "Evaluaci??n de Resultados",
                                    "value": res[0].d4EvaluacionResultados
                                  },
                                  {
                                    "name": "municipio4",
                                    "value": residi[0].d4EvaluacionResultados
                                  }
                                ]
                              }
                            ]

                            this.graficasPD2=[
                              {
                                "name": "D5 Informaci??n y Comunicaci??n",
                                "series": [
                                  {
                                    "name": "Informaci??n y Comunicaci??n",
                                    "value": res[0].d5InformacionComunicacion
                                  },
                                  {
                                    "name": "municipio5",
                                    "value": residi[0].d4EvaluacionResultados
                                  }
                                ]
                              },

                              {
                                "name": "D6 Gesti??n del Conocimiento",
                                "series": [
                                  {
                                    "name": "Gesti??n del Conocimiento",
                                    "value": res[0].d6GestionConocimiento
                                  },
                                  {
                                    "name": "municipio",
                                    "value": residi[0].d5InformacionComunicacion
                                  }
                                ]
                              },

                              {
                                "name": "D7 Control Interno",
                                "series": [
                                  {
                                    "name": "Control Interno",
                                    "value": res[0].d7Control
                                  },
                                  {
                                    "name": "municipio",
                                    "value": residi[0].d7ControlInterno
                                  }
                                ]
                              },
                            ]

                            //grafica de las politicas
                            this.graficaPoliticas=[
                              {
                                "name":"POL??TICA 1 Gesti??n Estrat??gica del Talento Humano",
                                "value":residi[0].p1GestionEstrategicaTalentoHumano
                              },
                              {
                                "name":"POL??TICA 2 Integridad",
                                "value":residi[0].p2Integridad
                              },
                              {
                                "name":"POL??TICA 3 Planeaci??n Institucional",
                                "value":residi[0].p3PlaneacionInstitucional
                              },
                              {
                                "name":"POL??TICA 4 Gesti??n Presupuestal y Eficiencia del Gasto P??blico",
                                "value":residi[0].p4GestionPresupuestalEficienciaGastoPublico
                              },
                              {
                                "name":"POL??TICA 5 Fortalecimiento Organizacional y Simplificaci??n de Procesos",
                                "value":residi[0].p5FortalecimientoOrganizacionalSimplificacionProcesos
                              },
                              {
                                "name":"POL??TICA 6 Gobierno Digital",
                                "value":residi[0].p6GobiernoDigital
                              },
                              {
                                "name":"POL??TICA 7 Seguridad Digital",
                                "value":residi[0].p7SeguridadDigital
                              },
                              {
                                "name":"POL??TICA 8 Defensa Jur??dica",
                                "value":residi[0].p8DefensaJuridica
                              },
                              {
                                "name":"POL??TICA 9 Transparencia, Acceso a la Informaci??n y lucha contra la Corrupci??n",
                                "value":residi[0].p9TransparenciaAccesoInformacionLuchaContraCorrupcion
                              },
                              {
                                "name":"POL??TICA 10 Servicio al ciudadano",
                                "value":residi[0].p10ServicioCiudadano
                              },
                              {
                                "name":"POL??TICA 11 Racionalizaci??n de Tr??mites",
                                "value":residi[0].p11RacionalizacionTramites
                              },
                              {
                                "name":"POL??TICA 12 Participaci??n Ciudadana en la Gesti??n P??blica",
                                "value":residi[0].p12ParticipacionCiudadanaGestionPublica
                              },
                              {
                                "name":"POL??TICA 13 Seguimiento y Evaluaci??n del Desempe??o Institucional",
                                "value":residi[0].p13SegumientoEvaluacionDesempe??oInstitucional
                              },
                              {
                                "name":"POL??TICA 14 Gesti??n Documental",
                                "value":residi[0].p14GestionDocumental
                              },
                              {
                                "name":"POL??TICA 15 Gesti??n del Conocimiento",
                                "value":residi[0].p15GestionConocimiento
                              },
                              {
                                "name":"POL??TICA 16 Control Interno",
                                "value":residi[0].p16ControlInterno
                              },
                              {
                                "name":"POL??TICA 17 Mejora Normativa",
                                "value":residi[0].p17MejoraNormativa
                              },
                              {
                                "name":"POL??TICA 18 Gesti??n de la Informaci??n Estad??stica",
                                "value":residi[0].p18GestionInformacionEstadistica
                              }
                            ]
                        })
          })
  }

  limpiar(){
    this.codigoDane='';
    this.grupoCapacidades='';
    this.region='';
    this.catRuralidad='';
    this.grupoPar=''
  
    //tabla de idf
    this.baseIdf=[];
    this.rangoInterpretacion='';
  
    //grafica idf
    this.componenteresultadosidf=[];
    this.graficaResultadoIdf=[];
    this.graficaGestionIdf=[];
  
    //tabla Mdm--resumenMdm
    this.baseMdm=[];
  
    //graficas mdm
    this.graficasComponentesGestion=[];
    this.graficasComponentesResultados=[];
  
    //tabla promedioDimension
    this.baseIdi=[];
  
    //graficas promedioDimension
    this.graficasPD1=[];
    this.graficasPD2=[];
    this.graficaPoliticas=[];
  
  }



}
