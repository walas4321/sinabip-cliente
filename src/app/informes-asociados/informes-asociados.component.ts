import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FabricalinderosService } from '../services/fabricalinderos.service';
import { MigracionService } from '../services/migracion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { informeAsociadosService } from '../services/informeAsociados.service';

@Component({
  selector: 'app-informes-asociados',
  templateUrl: './informes-asociados.component.html',
  styleUrls: ['./informes-asociados.component.css']
})
export class InformesAsociadosComponent implements OnInit {

  @Input('codigo_interno')  codinterno;
  @Input('cargar') carga;

  modal 
  auxcargar = ''
  count = 0
  informesAsociados = {
    codigo_interno: 0,
    usuario : '',
    linderos : [],
    fabrica : []
  }

  parametros = {    
    codigo_interno : '',
    sol_ing : '',
    codigo_preventivo : ''
  } 

  resultado = []
  cantidadRegistros: number = 0
  itemActual: number = 1
  dataRegistroActual = 
  {
    SOLIC_INGRESO : '',
    EXPEDIENTE : '',
    TIPO : '',
    DSC_INFORME_TL : '',
    JEFATURA : '',
    FEC_RECEPCION : '',
    FEC_ASIGNACION : '',
    RESP_LEGAL : '',
    RESP_TECNICO :'',
    AREA_SOLICITADA : '',
    TRAMITE :  '',
    RAZON_SOCIAL : '',
    SOLICITANTE :'',
    ESTADO_INFORME : '',
    PROY_RESOLUCION : '',
    OBS_INFORME :'',
    DSC_RESOLUCION:'',
    FEC_EMISION :'',
    EST_INSCRIPCION : ''    
  }

  aux = { 
    codigodepa : 0,  
    nroCUS   : '',
    codigo_interno  : '',
    coddocumental : '',
    tipo_registro : '0',
    detalle: '',
    cargar:'',
    grabado: ""
   }
  

  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private dataservice : informeAsociadosService,
    private MigracionService: MigracionService,
  ) { }

  ngOnChanges(){
    this.informesAsociados.codigo_interno= this.codinterno;
    this.auxcargar = this.carga
    if (this.auxcargar =='10'){
      this.count = this.count + 1   
      if (this.count==1) 
      {    
        console.log(this.codinterno)
        this.ListadoInformesAsociados()                     
      }   
    }
  }

  ngOnInit() {
  }

  ListadoInformesAsociados()
  {
    this.dataservice.postListadoInformesAsociados(this.informesAsociados).subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.resultado  = data.data;  
      this.cantidadRegistros = data.data.length
      this.itemActual = 1      

      this.dataRegistroActual.SOLIC_INGRESO = this.resultado[0].SOLIC_INGRESO
      this.dataRegistroActual.EXPEDIENTE = this.resultado[0].EXPEDIENTE
      this.dataRegistroActual.TIPO = this.resultado[0].TIPO
      this.dataRegistroActual.DSC_INFORME_TL = this.resultado[0].DSC_INFORME_TL
      this.dataRegistroActual.JEFATURA = this.resultado[0].JEFATURA
      this.dataRegistroActual.FEC_RECEPCION = this.resultado[0].FEC_RECEPCION
      this.dataRegistroActual.FEC_ASIGNACION = this.resultado[0].FEC_ASIGNACION
      this.dataRegistroActual.RESP_LEGAL = this.resultado[0].RESP_LEGAL
      this.dataRegistroActual.RESP_TECNICO = this.resultado[0].RESP_TECNICO
      this.dataRegistroActual.AREA_SOLICITADA = this.resultado[0].AREA_SOLICITADA
      this.dataRegistroActual.TRAMITE = this.resultado[0].TRAMITE
      this.dataRegistroActual.RAZON_SOCIAL = this.resultado[0].RAZON_SOCIAL
      this.dataRegistroActual.SOLICITANTE = this.resultado[0].SOLICITANTE
      this.dataRegistroActual.ESTADO_INFORME = this.resultado[0].ESTADO_INFORME
      this.dataRegistroActual.PROY_RESOLUCION = this.resultado[0].PROY_RESOLUCION
      this.dataRegistroActual.OBS_INFORME = this.resultado[0].OBS_INFORME
      this.dataRegistroActual.DSC_RESOLUCION = this.resultado[0].DSC_RESOLUCION
      this.dataRegistroActual.FEC_EMISION = this.resultado[0].FEC_EMISION
      this.dataRegistroActual.EST_INSCRIPCION = this.resultado[0].EST_INSCRIPCION

      this.parametros.codigo_interno = this.codinterno      
      this.parametros.codigo_preventivo = this.resultado[0]["CODIGO_PREVENTIVO"]    
      this.parametros.sol_ing = this.resultado[0]["SOLIC_INGRESO"]           
    })
  }

  moveItemListado(accion){
    
    if(accion == 'S'){
      if(this.itemActual != this.cantidadRegistros){
        this.itemActual += 1
      }
    }else if(accion == 'A'){
      if(this.itemActual != 1){
        this.itemActual -= 1
      }
    }else if(accion == 'P'){
      this.itemActual = 1
    }else if(accion == 'U'){
      console.log(accion)
      this.itemActual = this.cantidadRegistros
    }
        
    this.dataRegistroActual.SOLIC_INGRESO = this.resultado[this.itemActual -1].SOLIC_INGRESO
    this.dataRegistroActual.EXPEDIENTE = this.resultado[this.itemActual -1].EXPEDIENTE
    this.dataRegistroActual.TIPO = this.resultado[this.itemActual -1].TIPO
    this.dataRegistroActual.DSC_INFORME_TL = this.resultado[this.itemActual -1].DSC_INFORME_TL
    this.dataRegistroActual.JEFATURA = this.resultado[this.itemActual -1].JEFATURA
    this.dataRegistroActual.FEC_RECEPCION = this.resultado[this.itemActual -1].FEC_RECEPCION
    this.dataRegistroActual.FEC_ASIGNACION = this.resultado[this.itemActual -1].FEC_ASIGNACION
    this.dataRegistroActual.RESP_LEGAL = this.resultado[this.itemActual -1].RESP_LEGAL
    this.dataRegistroActual.RESP_TECNICO = this.resultado[this.itemActual -1].RESP_TECNICO
    this.dataRegistroActual.AREA_SOLICITADA = this.resultado[this.itemActual -1].AREA_SOLICITADA
    this.dataRegistroActual.TRAMITE = this.resultado[this.itemActual -1].TRAMITE
    this.dataRegistroActual.RAZON_SOCIAL = this.resultado[this.itemActual -1].RAZON_SOCIAL
    this.dataRegistroActual.SOLICITANTE = this.resultado[this.itemActual -1].SOLICITANTE
    this.dataRegistroActual.ESTADO_INFORME = this.resultado[this.itemActual -1].ESTADO_INFORME
    this.dataRegistroActual.PROY_RESOLUCION = this.resultado[this.itemActual -1].PROY_RESOLUCION
    this.dataRegistroActual.OBS_INFORME = this.resultado[this.itemActual -1].OBS_INFORME
    this.dataRegistroActual.DSC_RESOLUCION = this.resultado[this.itemActual -1].DSC_RESOLUCION
    this.dataRegistroActual.FEC_EMISION = this.resultado[this.itemActual -1].FEC_EMISION
    this.dataRegistroActual.EST_INSCRIPCION = this.resultado[this.itemActual -1].EST_INSCRIPCION

    
    this.parametros.codigo_interno = this.codinterno
    this.parametros.codigo_preventivo = this.resultado[this.itemActual -1]["CODIGO_PREVENTIVO"]    
    this.parametros.sol_ing = this.resultado[this.itemActual -1]["SOLIC_INGRESO"]           
    
  }

  openDetalleInforme(content){                     
        let opciones : NgbModalOptions = {
          size: <any>'xl',
          backdrop : "static"
          };
       
          this.modal = this.modalService.open(content,opciones);      
  }
 

}
