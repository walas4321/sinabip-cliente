import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ElementRef,ViewChild } from '@angular/core';
import { RegistroSbnService } from '../services/registro-sbn.service';
import { MigracionService } from '../services/migracion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2'; 

@Component({
  selector: 'app-rectificacion',
  templateUrl: './rectificacion.component.html',
  styleUrls: ['./rectificacion.component.css']
})
export class RectificacionComponent implements OnInit {

  //@ViewChild('buscarUD') buscarUTD: ElementRef; 

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

  flagvalidar : boolean = false;
  flagaux : ''

   predio ={
    tipoproceso : 0, //0 nuevo registro - 0<> actualizar 
    unidaddoc : '',
    tipo_registro : '',
    condicion : '',
    calificacion: '',
    denominacion : '',
    via : '',
    direccion: '',
    numero: '',
    manzana : '',
    lote : '',
    detalle : '',
    detalledescrip : '',
    piso : 0,
    habilitacion : '',
    descripcion : '',
    referencia : '',
    competencia : '',
    reserva : '',    
    coddepa : '',
    codprov : '',
    coddist: '',
    otorgante : '',
    tipodocumento : '',
    documento : '',
    actoregistral: '',
    modalidad : '',
    dislegal : '',
    disnum : '',
    disfecha : '',
    coddoc : '',
    codnum : '',
    codfecha : '',
    areatitulo : '',
    aporte : '',
    predetalle : '',
    afavor : '',
    oficina : '',
    codpartida : '',
    numpartida : '',
    fojas : '',
    arearegistral : '',
    usuario : '',
    documentosTL: [],
    codigodocumento : '',
    nro_documento : '',
    aux_reg : '',
    independizacion : [],
    solicitud_ingreso : '',
    codpartida2 : '',
    numpartida2 : '',
    fojas2 : ''
  }

  fabricacionlimitaciones ={
    codigo_interno : '',
    linderos : [],
    fabrica : [],
    codusuario : ''
  }

  limitaciones ={
    codigo_interno : '',
    restricciones: '',
    coddetalle  : '',
    area : 0,
    codusuario : '',
    proceso : []
  }
  datos ={
    codigo_interno : '',
    via : '',
    direccion: '',
    numero: '',
    manzana : '',
    lote : '',
    detalle : '',
    detalledescrip : '',
    piso : 0,
    habilitacion : '',
    descripcion : '',
    referencia : '',
    cod_tipozona : '',
    cod_terreno: '',
    zonificacion : '',
    codgenerico :'',
    codespecifico : '',
    area : 0,
    codocupante : '',
    razon : '',
    tipodoc : '',
    numdoc : '',
    parcial : '',
    areades : 0 ,
    codusuario : '',
    linderos:[]
  }
  
  obras ={
    codigo_interno : '',
    OBSERVACIONES:'', 
    TIPO_VALORIZACION:'',
    TIPO_MONEDA:'',
    TIPO_CAMBIO: 0,
    FECHA_TASACION : '',
    VALOR_CONSTRUCCIONES: 0,
    VALOR_OBRAS:0,
    VALOR_TERRENO:0,
    VALOR_INMUEBLE:0,
    VALOR_SOLES:0,
    codusuario : '',
    obrascomplementarias : [] 
  }
  construccion ={
    codigo_interno : '',
    habilitacion : '',
    situacion : '',
    nropiso : 0,
    porcentaje : 0,
    material : '',
    codusuario : '',
    construcciones : [],
    detalle : []
  }
  actos ={
    codigo_interno : '',
    codusuario : '',
    actos : [] 
  }

  zona ={
    codigo_interno : '',
    codlam : '',
    observaciones : '',
    codzona : '',
    areazona : 0,
    codrestringido : '',
    arearestringido: 0,
    codprivado :'',
    areaprivado : 0,
    codigo_usuario : ''     
  }

  riesgo ={
    codigo_interno : '',
    codnivel : '',
    fuenteNivel : '',
    fechaEvaluacion : '',
    fechaIngreso : '',
    observaciones : '',
    codigo_usuario : ''    
  }
  
  numerocus = ''   
  tipoUsuario :string = ''
  tipoRegistro = '';

  
  constructor(
    private modalService: NgbModal,
    private dataservice : RegistroSbnService, 
    private service : MigracionService,
    private spinner: NgxSpinnerService,   
  ) { 
    this.predio.usuario = sessionStorage.getItem("codigopersonal")      
    
  }

  ngOnInit() {  
        
  }
  


  busquedaCUSparaActualizar(modal,nro_cus){   
    this.tipoUsuario = 'I'
    this.aux.grabado = "" 
    this.dataservice.BuscarCodigoPredio(nro_cus).subscribe((data:any) =>{
      this.spinner.show();              
      if (data.data.length == 1)
      {
         this.aux.codigo_interno = data.data[0].aux_codinterno       
         this.tipoRegistro = data.data[0].DSC_ASIENTO          
         this.modaleditar(modal,'X',nro_cus)        
      }
      else 
      {
        swal({
          type: 'error',
          title: 'El CUS ingresado no existe',                 
          confirmButtonText: 'Listo'                  
          });
      }
                  
      this.spinner.hide();
    });
  }

  modaleditar(modal,flag,cus)
  {
    this.numerocus = cus          
    //this.flagaux = flag 
    this.dataservice.BuscarCodigoPredio(cus).subscribe((data:any) =>{
      this.spinner.hide();              
      this.aux.codigo_interno = data.data[0].aux_codinterno                       
        let opciones : NgbModalOptions = {
          size: <any>'xl',
          backdrop : "static"
          };
       
          this.modalService.open(modal,opciones);
          this.desbloquear();            
      this.spinner.show();
    });       
  }
  
    
  bloquear()
  {
  let  opt1 = document.getElementById("nav-lim-tab");
  opt1.classList.add('disabled');
  let  opt2 = document.getElementById("nav-opor-tab");
  opt2.classList.add('disabled');
  let  opt3 = document.getElementById("nav-dat-tab");
  opt3.classList.add('disabled');
  let  opt4 = document.getElementById("nav-con-tab");
  opt4.classList.add('disabled');
  let  opt5 = document.getElementById("nav-pote-tab");
  opt5.classList.add('disabled');
  let  opt6 = document.getElementById("nav-zon-tab");
  opt6.classList.add('disabled');
  let  opt7 = document.getElementById("nav-leg-tab");
  opt7.classList.add('disabled');
  let  opt8 = document.getElementById("nav-fot-tab");
  opt8.classList.add('disabled');
  /*let  opt9 = document.getElementById("nav-pol-tab");
  opt9.classList.add('disabled');*/
  }

  desbloquear()
  {
  let  opt1 = document.getElementById("nav-lim-tab");
  opt1.classList.remove('disabled');
  let  opt2 = document.getElementById("nav-opor-tab");
  opt2.classList.remove('disabled');
  let  opt3 = document.getElementById("nav-dat-tab");
  opt3.classList.remove('disabled');
  let  opt4 = document.getElementById("nav-con-tab");
  opt4.classList.remove('disabled');
  let  opt5 = document.getElementById("nav-pote-tab");
  opt5.classList.remove('disabled');
  let  opt6 = document.getElementById("nav-zon-tab");
  opt6.classList.remove('disabled');
  let  opt7 = document.getElementById("nav-leg-tab");
  opt7.classList.remove('disabled');
  let  opt8 = document.getElementById("nav-fot-tab");
  opt8.classList.remove('disabled');
  /*let  opt9 = document.getElementById("nav-pol-tab");
  opt9.classList.remove('disabled');*/
  }

  actualizarcodigo(data){
    this.aux.codigodepa = data.coddepa
    this.aux.detalle = data.detalle
  }
  actualizarconstruccion(data){   
    this.construccion.codigo_interno = data.codigo_interno
    this.construccion.habilitacion = data.habilitacion
    this.construccion.situacion  = data.situacion
    this.construccion.nropiso = data.nropiso
    this.construccion.porcentaje = data.porcentaje
    this.construccion.material = data.material
    this.construccion.codusuario = data.codusuario
    this.construccion.construcciones = data.construcciones
    this.construccion.detalle  = data.detalle
  }

  actualizardatos(data){   
   this.datos.codigo_interno= data.codigo_interno,
   this.datos.via = data.via,
   this.datos.direccion = data.direccion,
   this.datos.numero = data.numero,
   this.datos.manzana = data.manzana,
   this.datos.lote = data.lote,
   this.datos.detalle = data.detalle,
   this.datos.detalledescrip = data.detalledescrip,
   this.datos.piso = data.piso,
   this.datos.habilitacion = data.habilitacion,
   this.datos.descripcion = data.descripcion,
   this.datos.referencia = data.referencia,
   this.datos.cod_tipozona = data.cod_tipozona,
   this.datos.cod_terreno = data.cod_terreno,
   this.datos.zonificacion = data.zonificacion,
   this.datos.codgenerico = data.codgenerico,
   this.datos.codespecifico = data.codespecifico,
   this.datos.area = data.area,
   this.datos.codocupante = data.codocupante,
   this.datos.razon = data.razon,
   this.datos.tipodoc = data.tipodoc,
   this.datos.numdoc = data.numdoc,
   this.datos.parcial = data.parcial,
   this.datos.areades = data.areades,
   this.datos.codusuario = data.codusuario,
   this.datos.linderos = data.linderos
  }
  actualizarlimitaciones(data){
    this.limitaciones.codigo_interno = data.codigo_interno,
    this.limitaciones.restricciones  = data.restricciones,
    this.limitaciones.coddetalle = data.coddetalle
    this.limitaciones.area = data.area
    this.limitaciones.codusuario = data.codusuario,
    this.limitaciones.proceso = data.procesos
  }
  actualizarfabricalinderos(data){
    this.fabricacionlimitaciones.codigo_interno = data.codigo_interno;
    this.fabricacionlimitaciones.codusuario = data.usuario;
    this.fabricacionlimitaciones.fabrica = data.fabrica;
    this.fabricacionlimitaciones.linderos = data.linderos
  }
  actualizarobras(data){
    this.obras.codigo_interno = data.codigo_interno,
    this.obras.OBSERVACIONES  = data.OBSERVACIONES,
    this.obras.TIPO_VALORIZACION = data.TIPO_VALORIZACION,
    this.obras.TIPO_MONEDA = data.TIPO_MONEDA,
    this.obras.TIPO_CAMBIO = data.TIPO_CAMBIO,
    this.obras.FECHA_TASACION = data.FECHA_TASACION,
    this.obras.VALOR_CONSTRUCCIONES = data.VALOR_CONSTRUCCIONES,
    this.obras.VALOR_OBRAS = data.VALOR_OBRAS,
    this.obras.VALOR_TERRENO = data.VALOR_TERRENO,
    this.obras.VALOR_INMUEBLE = data.VALOR_INMUEBLE,
    this.obras.VALOR_SOLES = data.VALOR_SOLES,
    this.obras.codusuario = data.codusuario,
    this.obras.obrascomplementarias = data.obrascomplementarias
  }
  actualizaractos(data){
    this.actos.codigo_interno = data.codigo_interno,
    this.actos.codusuario = data.codigo_usuario
    this.actos.actos = data.actos    
  }
  actualizarzona(data){
    this.zona.codigo_interno = data.codigo_interno
    this.zona.codlam = data.codlam,
    this.zona.observaciones = data.observaciones,
    this.zona.codzona = data.codzona,
    this.zona.areazona = data.areazona
    this.zona.codrestringido = data.codrestringido,
    this.zona.arearestringido = data.arearestringido,
    this.zona.codprivado = data.codprivado
    this.zona.areaprivado = data.areaprivado
    this.zona.codigo_usuario = data.codigo_usuario    
  }
  actualizarRiesgo(data){
    this.riesgo.codigo_interno = data.codigo_interno
    this.riesgo.codnivel = data.codnivel,
    this.riesgo.fuenteNivel = data.fuenteNivel,
    this.riesgo.fechaEvaluacion = data.fechaEvaluacion,
    this.riesgo.fechaIngreso = data.fechaIngreso
    this.riesgo.observaciones = data.observaciones,
    this.riesgo.codigo_usuario = data.codigo_usuario    
  }
  actualizardatosgenerales(data){     
    if (data.tipoproceso =="")
     {this.predio.tipoproceso = 0}
    else
     {this.predio.tipoproceso = data.tipoproceso}

    this.predio.unidaddoc = data.unidaddoc
    this.predio.tipo_registro = data.tipo_registro
    this.predio.condicion= data.condicion
    this.predio.calificacion = data.calificacion    
    this.predio.denominacion = data.denominacion
    this.predio.via = data.via
    this.predio.direccion = data.direccion
    this.predio.numero = data.numero
    this.predio.manzana = data.manzana
    this.predio.lote = data.lote
    this.predio.detalle = data.detalle
    this.predio.detalledescrip = data.detalledescrip
    this.predio.piso = data.piso
    this.predio.habilitacion= data.habilitacion
    this.predio.descripcion = data.descripcion
    this.predio.competencia = data.competencia
    this.predio.reserva = data.reserva 
    this.predio.referencia = data.referencia
    this.predio.coddepa = data.coddepa
    this.predio.codprov = data.codprov
    this.predio.coddist = data.coddist,
    this.predio.documentosTL = []
    this.predio.codigodocumento = ''
    this.predio.nro_documento = ''    
    this.predio.aux_reg = ''  
    this.predio.solicitud_ingreso = data.solicitud_ingreso
    //this.predio.usuario  = data.usuario
   
    
}
actualizaadquision(data)
{    
  if (data.tipoproceso =="")
  {this.predio.tipoproceso = 0}
  else
  {this.predio.tipoproceso = data.tipoproceso}
  this.predio.otorgante = data.otorgante;
  this.predio.tipodocumento = data.tipdoc;
  this.predio.documento = data.documento;
  this.predio.actoregistral = data.actoregistral
  this.predio.modalidad = data.modalidad;
  this.predio.dislegal = data.dislegal;
  this.predio.disnum = data.disnum;
  this.predio.disfecha = data.disfecha;
  this.predio.coddoc = data.coddoc;
  this.predio.codnum = data.codnum;
  this.predio.codfecha = data.codfecha;
  this.predio.areatitulo = data.areatitulo;
  this.predio.aporte = data.aporte;
  this.predio.predetalle = data.detalle;
  this.predio.afavor = data.afavor;
  this.predio.oficina = data.oficina;
  this.predio.codpartida = data.codpartida;
  this.predio.numpartida = data.numpartida;
  this.predio.fojas = data.fojas;
  this.predio.arearegistral = data.arearegistral;
  this.predio.usuario  = data.usuario
  this.predio.independizacion = data.fabrica

  this.predio.codpartida2 = data.codpartida2;
  this.predio.numpartida2 = data.numpartida2;
  this.predio.fojas2 = data.fojas2;
  
  //this.predio.linderos = data.linderos;
  //this.predio.fabrica = data.fabrica;  
  
}

error(titulo,texto)
{
  swal({
    type: 'error',
    title: titulo,       
    text : texto,     
    confirmButtonText: 'Listo'
  });
}

cerrarventana()
  {
    this.modalService.dismissAll()
  }

cargar(dato)
{
  this.aux.cargar = dato
}


validardatosgenerales()
{    
  this.predio.areatitulo = this.predio.areatitulo.replace(',','');
  this.predio.arearegistral = this.predio.arearegistral.replace(',','');
  this.predio.areatitulo = this.predio.areatitulo.replace(',','');
  this.predio.arearegistral = this.predio.arearegistral.replace(',','');
  this.predio.areatitulo = this.predio.areatitulo.replace(',','');
  this.predio.arearegistral = this.predio.arearegistral.replace(',','');

    //DATOS GENERALES
    if (this.predio.condicion=="0" || this.predio.condicion=="")
    {
       this.error("Selecciona una Condición","Datos Generales")
       this.flagvalidar = true 
       return this.flagvalidar
    }    
    else if (this.predio.competencia =="0" || this.predio.competencia=="")
    {
      this.error("Selecciona Competencia","Datos Generales")
      this.flagvalidar = true 
      return this .flagvalidar
    }    
    else if (this.predio.denominacion =="")
    {
     this.error("Ingrese Denominacion","Datos Generales")
     this.flagvalidar = true 
     return this .flagvalidar
    }    
    else if (this.predio.direccion =="")
    {
     this.error("Ingrese DirecciÓn","Datos Generales")
     this.flagvalidar = true 
     return this .flagvalidar
    }
    else if (this.predio.coddepa =="0" || this.predio.coddepa=="")
    {
     this.error("Selecciona Departamento","Datos Generales")
     this.flagvalidar = true 
     return this .flagvalidar
    }
    else if (this.predio.codprov =="0" || this.predio.codprov=="")
    {
     this.error("Selecciona Provincia","Datos Generales")
     this.flagvalidar = true 
     return this .flagvalidar
    }
    else if (this.predio.coddist =="0" || this.predio.coddist=="")
    {
     this.error("Selecciona Distrito","Datos Generales")
     this.flagvalidar = true 
     return this .flagvalidar
    }
    //ADQUICISIONES
    
    else if (this.predio.tipodocumento > "0" && this.predio.otorgante=='')
    {
     this.error("Selecciona Otorgante","Adquisición e Inscripcion")
     this.flagvalidar = true 
     return this .flagvalidar
    }
    else if (this.predio.otorgante != '' &&  this.predio.tipodocumento =="0")
    {
     
     this.error("Selecciona Tipo de Documento","Adquisición e Inscripcion")
     this.flagvalidar = true 
     return this .flagvalidar
    }
    else if (this.predio.tipodocumento > "0" && this.predio.documento =="")
    {
     this.error("Ingrese Documento","Adquisición e Inscripcion")
     this.flagvalidar = true 
     return this .flagvalidar
    }
    else if (this.predio.modalidad =="0" || this.predio.modalidad=="")
    {
     this.error("Seleccione Modalidad","Adquisición e Inscripcion")
     this.flagvalidar = true 
     return this .flagvalidar
    }
    else if (this.predio.disfecha!="" && (this.predio.disfecha<"1900-01-02"  || this.predio.disfecha>"2030-12-31"))
    {
     this.error("Fecha Legal fuera de rango [1800-12-31 a 2030-12-31]","Adquisición e Inscripcion")
     this.flagvalidar = true 
     return this .flagvalidar
    }
    else if (this.predio.codfecha!="" && (this.predio.codfecha<"1900-01-02"  || this.predio.codfecha>"2030-12-31"))
    {
     this.error("Fecha Doc. fuera de rango [1800-12-31 a 2030-12-31]","Adquisición e Inscripcion")
     this.flagvalidar = true 
     return this .flagvalidar
    }
    if (this.predio.areatitulo =="" || this.predio.areatitulo =="0.00" || this.predio.areatitulo =="0")
    {
     this.error("Ingrese Área Título","Adquisición e Inscripcion")
     this.flagvalidar = true 
     return this .flagvalidar
    }
    else if (this.predio.aporte !=="0" && this.predio.aporte !=="")
    {
      if (this.predio.predetalle =="0" || this.predio.predetalle==""){
        this.error("Seleccione Detalle de aporte ","Adquisición e Inscripcion")
        this.flagvalidar = true 
        return this .flagvalidar
      }
    }
    else if (this.predio.afavor =="0")
    {
     this.error("Seleccione a favor de","Adquisición e Inscripcion")
     this.flagvalidar = true 
     return this .flagvalidar
    }
    
    else if ( this.predio.oficina >"01" && this.predio.codpartida =="0")
    {
     this.error("Seleccione Partida","Adquisición e Inscripcion")
     this.flagvalidar = true        
     return this .flagvalidar
    }
    else if (this.predio.oficina >"01" && this.predio.numpartida =="")
    {
     this.error("Ingrese Número Partida","Adquisición e Inscripcion")       
     this.flagvalidar = true 
     return this .flagvalidar
    } 
    else if (this.predio.codpartida=="4" && this.predio.fojas == "")        
    {                  
      this.error("Ingrese Fojas","Adquisición e Inscripcion")                                           
      this.flagvalidar = true           
      return this .flagvalidar
    }                         
    else if (this.predio.oficina > "01" && this.predio.arearegistral =="")
    {
     this.error("Ingrese Área Registral","Adquisición e Inscripcion")
     this.flagvalidar = true 
     return this .flagvalidar
    }
    else if (this.predio.codpartida2=="4" && this.predio.fojas2 == "")        
    {                  
      this.error("Ingrese Fojas de Matriz","Adquisición e Inscripcion")                                           
      this.flagvalidar = true           
      return this .flagvalidar
    }   
}

validarconstruccion()
{    
    //DATOS GENERALES
    /*
    if (this.construccion.habilitacion=="0" || this.construccion.habilitacion=="")
    {
       this.error("Selecciona Habilitacion","Construcción")
       this.flagvalidar = true 
       return this.flagvalidar
    }
    else if (this.construccion.situacion =="0" || this.construccion.situacion=="")
    {
      this.error("Selecciona Situación","Construcción")
      this.flagvalidar = true 
      return this .flagvalidar
    }     
    */
}  
     
validarobras()
{  
  
  this.obras.VALOR_TERRENO = Number(this.obras.VALOR_TERRENO.toString().replace(',',''));
  this.obras.VALOR_SOLES = Number(this.obras.VALOR_SOLES.toString().replace(',',''));
  this.obras.VALOR_TERRENO = Number(this.obras.VALOR_TERRENO.toString().replace(',',''));
  this.obras.VALOR_SOLES = Number(this.obras.VALOR_SOLES.toString().replace(',',''));
  this.obras.VALOR_TERRENO = Number(this.obras.VALOR_TERRENO.toString().replace(',',''));
  this.obras.VALOR_SOLES = Number(this.obras.VALOR_SOLES.toString().replace(',',''));

  /*
  if (this.obras.TIPO_VALORIZACION =="0" || this.obras.TIPO_VALORIZACION=="")
  {
    this.error("Selecciona Tipo Valorización","Obras")
    this.flagvalidar = true 
    return this .flagvalidar
  }
  
  if (this.obras.TIPO_MONEDA =="0" || this.obras.TIPO_MONEDA=="")
  {
    this.error("Selecciona Tipo Moneda","Obras")
    this.flagvalidar = true 
    return this .flagvalidar
  }
  else if (this.obras.TIPO_CAMBIO ==0)
  {
    this.error("Ingresa Tipo de Cambio","Obras")
    this.flagvalidar = true 
    return this .flagvalidar
  }
  else if (this.obras.FECHA_TASACION =="")
  {
    this.error("Ingrese Fecha Tasación","Obras")
    this.flagvalidar = true 
    return this .flagvalidar
  }
  else if (this.obras.VALOR_CONSTRUCCIONES ==0)
  {
    this.error("Ingrese Valor de Construcciones","Obras")
    this.flagvalidar = true 
    return this .flagvalidar
  }
  else if (this.obras.VALOR_OBRAS ==0)
  {
    this.error("Ingrese Valor Obras","Obras")
    this.flagvalidar = true 
    return this .flagvalidar
  }
  else if (this.obras.VALOR_TERRENO ==0)
  {
    this.error("Ingrese Valor Terreno","Obras")
    this.flagvalidar = true 
    return this .flagvalidar
  }
  else if (this.obras.VALOR_INMUEBLE ==0)
  {
    this.error("Ingrese Valor Dolares","Obras")
    this.flagvalidar = true 
    return this .flagvalidar
  }
  else if (this.obras.VALOR_SOLES ==0)
  {
    this.error("Ingrese Valor Soles","Obras")
    this.flagvalidar = true 
    return this .flagvalidar
  }
  */
}

validardatostecnicos()
{
  this.datos.area = Number(this.datos.area.toString().replace(',',''));
  this.datos.area = Number(this.datos.area.toString().replace(',',''));
  this.datos.area = Number(this.datos.area.toString().replace(',',''));

  if (this.datos.parcial =="2" && this.datos.areades ==0 )
  {
    this.error("Ingrese Área Desocupada","Datos Técnicos")
    this.flagvalidar = true 
    return this .flagvalidar
  }

  
}

validarzona()
{
  if (this.zona.codlam=="0" || this.zona.codlam=="")
  {
     this.error("¿LAM?","Zona")
     this.flagvalidar = true 
     return this.flagvalidar
  }
  else if (this.zona.observaciones =="")
  {
    this.error("Ingrese Observación","Zona")
    this.flagvalidar = true 
    return this .flagvalidar
  }
  else if (this.zona.codzona =="0" || this.zona.codzona=="")
  {
    this.error("¿Zona de Playa?","Zona")
    this.flagvalidar = true 
    return this .flagvalidar
  }
  else if (this.zona.areazona ==0)
  {
    this.error("Ingresa Área de Zona Playa","Zona")
    this.flagvalidar = true 
    return this .flagvalidar
  }
  else if (this.zona.codrestringido =="0" || this.zona.codrestringido=="")
  {
    this.error("¿Zona de Dominio Restringido?","Zona")
    this.flagvalidar = true 
    return this .flagvalidar
  }
  else if (this.zona.arearestringido ==0)
  {
    this.error("Ingrese Área de Dominio Restringido","Zona")
    this.flagvalidar = true 
    return this .flagvalidar
  }
  else if (this.zona.codprivado =="0" || this.zona.codprivado=="")
  {
    this.error("¿Zona de Dominio Privado?","Zona")
    this.flagvalidar = true 
    return this .flagvalidar
  }
  else if (this.zona.areaprivado ==0)
  {
    this.error("Ingrese Área de Dominio Privado","Zona")
    this.flagvalidar = true 
    return this .flagvalidar
  }
 
}

validarlimitaciones()
{    
  
  this.limitaciones.area = Number(this.limitaciones.area.toString().replace(',',''));
  this.limitaciones.area = Number(this.limitaciones.area.toString().replace(',',''));
  this.limitaciones.area = Number(this.limitaciones.area.toString().replace(',',''));

  if (this.limitaciones.restricciones=="0" || this.limitaciones.restricciones=='')
  {
     this.error("Seleccione Restricciones","Limitaciones")
     this.flagvalidar = true 
     return this.flagvalidar
  } 

  else if (this.limitaciones.restricciones =="02" || this.limitaciones.restricciones =="06" || this.limitaciones.restricciones =="09")
  {
    if (this.limitaciones.coddetalle == "0" || this.limitaciones.coddetalle==''){
      this.error("Debe indicar el detalle","Limitaciones")
    this.flagvalidar = true 
    return this .flagvalidar
    }
    
  }
  
}
validaractos()
{
  if (this.actos.actos.length==0)
  {
     this.error("Debe haber mínimo un registro agregado","Actos")
     this.flagvalidar = true 
     return this.flagvalidar 
  }
}

validarfabricalinderos()
{
  if (this.fabricacionlimitaciones.fabrica.length==0 && this.fabricacionlimitaciones.linderos.length==0){
     this.error("No se ha adicionado un item en la seccion de Fabricacion y linderos","Fabricacion y linderos")
     this.flagvalidar = true 
     return this.flagvalidar 
  }
  
}


guardar(data)
  { 
    //console.log(data);
    //return;
    
    const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success ml-2',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
     })  
  
    let aux = this.validardatosgenerales()          
      if (aux===undefined)          
      {  
        swalWithBootstrapButtons({
          title: '¿Estás seguro de realizar el registro?',            
          type: 'warning',
          showCancelButton: true,    
          cancelButtonText: 'No',
          confirmButtonText: 'Si',
          reverseButtons: true
          }).then((result) => {       
            if (result.value) {                          
              this.spinner.show();                   
              this.service.DatosPrincipales(data).subscribe((data:any) =>{                       
                if (data.data[0].RESULTADO=="OK")
                  {
                    this.spinner.hide(); 
                    swal({
                    type: 'success',
                    title: ' El Registro se realizo con éxito',                 
                    confirmButtonText: 'Listo'                  
                    });                 
                    this.aux.codigo_interno = data.data[0].ID        
                    this.dataservice.BuscarCUS(this.aux.codigo_interno).subscribe((dato:any) =>{                      
                      this.spinner.hide();                                  
                      this.numerocus = dato.data[0].NRO_CUS                      
                    });                         
                    this.desbloquear()                    
                  }
            else  
              {
                this.spinner.hide(); 
                this.error("El Registro no pudo realizarse",'')
              }            
          });         
        }
      });
     } 
  }

guardarlimitaciones(data)
{    
 const swalWithBootstrapButtons = swal.mixin({
  confirmButtonClass: 'btn btn-success ml-2',
  cancelButtonClass: 'btn btn-danger',
  buttonsStyling: false,
 })  
 
let aux = this.validarlimitaciones()        
if (aux===undefined)        
 {
  swalWithBootstrapButtons({
    title: '¿Estás seguro de realizar el registro?',            
    type: 'warning',
    showCancelButton: true,    
    cancelButtonText: 'No',
    confirmButtonText: 'Si',
    reverseButtons: true
    }).then((result) => {
      if (result.value) {              
        this.spinner.show();                   
        this.service.Limitaciones(data).subscribe((data:any) =>{ 
        this.spinner.hide();                      
          if (data.data[0].RESULTADO=="OK")
            {
              swal({
              type: 'success',
              title: ' El Registro se realizo con éxito',                 
              confirmButtonText: 'Listo'                  
              });             
            }
          else 
            {
              this.spinner.hide(); 
              this.error("El Registro no pudo realizarse",'Limitaciones')
            }            
        });          
      }
    });
  }
}


guardarfabricalinderos(data)
{    
  
 const swalWithBootstrapButtons = swal.mixin({
  confirmButtonClass: 'btn btn-success ml-2',
  cancelButtonClass: 'btn btn-danger',
  buttonsStyling: false,
 })  
 
let aux = this.validarfabricalinderos()        
if (aux===undefined)        
 {
  swalWithBootstrapButtons({
    title: '¿Estás seguro de realizar el registro?',            
    type: 'warning',
    showCancelButton: true,    
    cancelButtonText: 'No',
    confirmButtonText: 'Si',
    reverseButtons: true
    }).then((result) => {
      if (result.value) {              
        this.spinner.show();                   
        this.service.fabricaLinderos(data).subscribe((data:any) =>{ 
        this.spinner.hide();                      
          if (data.data[0].RESULTADO=="OK")
            {
              swal({
              type: 'success',
              title: ' El Registro se realizo con éxito',                 
              confirmButtonText: 'Listo'                  
              });             
            }
          else 
            {
              this.spinner.hide(); 
              this.error("El Registro no pudo realizarse",'Limitaciones')
            }            
        });          
      }
    });
  }
}

guardaractos(data)
{    
  
  const swalWithBootstrapButtons = swal.mixin({
  confirmButtonClass: 'btn btn-success ml-2',
  cancelButtonClass: 'btn btn-danger',
  buttonsStyling: false,
 })  

let aux = this.validaractos()        
if (aux===undefined)        
 {          
 
  swalWithBootstrapButtons({
    title: '¿Estás seguro de realizar el registro?',            
    type: 'warning',
    showCancelButton: true,    
    cancelButtonText: 'No',
    confirmButtonText: 'Si',
    reverseButtons: true
    }).then((result) => {
      if (result.value) {      
        this.spinner.show();                   
        this.service.Actos(data).subscribe((data:any) =>{ 
        this.spinner.hide();                      
          if (data.data[0].RESULTADO=="OK")
            {
              swal({
              type: 'success',
              title: ' El Registro se realizo con éxito',                 
              confirmButtonText: 'Listo'                  
              });             
            }
          else 
            {
              this.spinner.hide(); 
              this.error("El Registro no pudo realizarse",'Actos')
            }            
        });  
                
      }
    });
  }
}

guardarobras(data)
{    
  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success ml-2',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
   })  
  
  let aux = this.validarobras()        
  if (aux===undefined)        
   {             
   
    swalWithBootstrapButtons({
      title: '¿Estás seguro de realizar el registro?',            
      type: 'warning',
      showCancelButton: true,    
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      reverseButtons: true
      }).then((result) => {
        if (result.value) {      
          this.spinner.show();                   
          this.service.Obras(data).subscribe((data:any) =>{ 
          this.spinner.hide();                      
            if (data.data[0].RESULTADO=="OK")
              {
                swal({
                type: 'success',
                title: ' El Registro se realizo con éxito',                 
                confirmButtonText: 'Listo'                  
                });             
              }
            else 
              {
                this.spinner.hide(); 
                this.error("El Registro no pudo realizarse","Obras")
              }            
          });  
                  
        }
      });
  }
}

guardardatostecnicos(data)
{    
  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success ml-2',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
   })  
  
  let aux = this.validardatostecnicos()        
  if (aux===undefined)        
   {             
   
    swalWithBootstrapButtons({
      title: '¿Estás seguro de realizar el registro?',            
      type: 'warning',
      showCancelButton: true,    
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      reverseButtons: true
      }).then((result) => {
        if (result.value) {      
          this.spinner.show();                   
          this.service.DatosTecnicos(data).subscribe((data:any) =>{ 
          this.spinner.hide();                      
            if (data.data[0].RESULTADO=="OK")
              {
                swal({
                type: 'success',
                title: ' El Registro se realizo con éxito',                 
                confirmButtonText: 'Listo'                  
                });             
              }
            else 
              {
                this.spinner.hide(); 
                this.error("El Registro no pudo realizarse","Datos Técnicos")
              }            
          });  
                  
        }
      });
  }
}
 
guardarconstruccion(data)
{    
  let itemdetalles = 0;
  
  for (let i =0; i<= data.construcciones.length -1; i++){
      itemdetalles = 0
    
      for (let d =0; d<= data.detalle.length -1; d++){
        if (data.construcciones[i].codigo == data.detalle[d].codigoconstruccion){
          itemdetalles++
          data.detalle[d].itemx = itemdetalles
        }
      }
      
  }


 const swalWithBootstrapButtons = swal.mixin({
  confirmButtonClass: 'btn btn-success ml-2',
  cancelButtonClass: 'btn btn-danger',
  buttonsStyling: false,
 })  

let aux = this.validarconstruccion()        
if (aux===undefined)        
 {             
 
  swalWithBootstrapButtons({
    title: '¿Estás seguro de realizar el registro?',            
    type: 'warning',
    showCancelButton: true,    
    cancelButtonText: 'No',
    confirmButtonText: 'Si',
    reverseButtons: true
    }).then((result) => {
      if (result.value) {      
        this.spinner.show();                   
        this.service.Construcciones(data).subscribe((data:any) =>{ 
        this.spinner.hide();                      
          if (data.data[0].RESULTADO=="OK")
            {
              swal({
              type: 'success',
              title: ' El Registro se realizo con éxito',                 
              confirmButtonText: 'Listo'                  
              });               
              this.aux.grabado = "1"   
            }            
          else 
            {
              this.spinner.hide();
              this.error("El Registro no pudo realizarse","Construcción")
            }            
        });  
                
      }
    });
 }
}
 
guardarzona(data)
{    
 const swalWithBootstrapButtons = swal.mixin({
  confirmButtonClass: 'btn btn-success ml-2',
  cancelButtonClass: 'btn btn-danger',
  buttonsStyling: false,
 })  

/*let aux = this.validarzona()     */
let aux = undefined
if (aux===undefined)        
 {              
  swalWithBootstrapButtons({
    title: '¿Estás seguro de realizar el registro?',            
    type: 'warning',
    showCancelButton: true,    
    cancelButtonText: 'No',
    confirmButtonText: 'Si',
    reverseButtons: true
    }).then((result) => {
      if (result.value) {      
        this.spinner.show();                   
        this.service.Zona(data).subscribe((data:any) =>{ 
        this.spinner.hide();                      
          if (data.data[0].RESULTADO=="OK")
            {
              swal({
              type: 'success',
              title: ' El Registro se realizo con éxito',                 
              confirmButtonText: 'Listo'                  
              });             
            }
          else 
            {
              this.spinner.hide(); 
              this.error("El Registro no pudo realizarse","Zona")
            }            
        });  
                
      }
    });
  }
 } 

 guardarRiesgo(data)
{    
  console.log(data)
 const swalWithBootstrapButtons = swal.mixin({
  confirmButtonClass: 'btn btn-success ml-2',
  cancelButtonClass: 'btn btn-danger',
  buttonsStyling: false,
 })  

/*let aux = this.validarzona()     */
let aux = undefined
if (aux===undefined)          
 {              
  swalWithBootstrapButtons({
    title: '¿Estás seguro de realizar el registro?',            
    type: 'warning',
    showCancelButton: true,    
    cancelButtonText: 'No',
    confirmButtonText: 'Si',
    reverseButtons: true
    }).then((result) => {
      if (result.value) {      
        this.spinner.show();                   
        this.service.Riesgo(data).subscribe((data:any) =>{ 
        this.spinner.hide();                      
          if (data.data[0].RESULTADO=="OK")
            {
              swal({
              type: 'success',
              title: ' El Registro se realizó con éxito',                 
              confirmButtonText: 'Listo'                  
              });             
            }
          else 
            {
              this.spinner.hide(); 
              this.error("El Registro no pudo realizarse","Riesgo de Desastres")
            }            
        });  
                
      }
    });
  }
 }




}
