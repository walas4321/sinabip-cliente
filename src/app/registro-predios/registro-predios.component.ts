import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MigracionService } from '../services/migracion.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AngularFileUploaderComponent } from 'angular-file-uploader';
import swal from 'sweetalert2';
import { LegajoService } from '../services/legajo.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registro-predios',
  templateUrl: './registro-predios.component.html',
  styleUrls: ['./registro-predios.component.css']
})
export class RegistroPrediosComponent implements OnInit {

  Adj_documento: string = "";
  resetVar = false;
  closeResult: string;
  urlPDF;
  NomArchEstado = -1;
  @ViewChild('fileUpload1')
  afuConfig = {
    multiple: false,
    uploadAPI: {
      url: 'aa',
      //url: ''
    },
    hideResetBtn: true,
    uploadBtnText: "Adjuntar Archivo",
    uploadMsgText: "",
    formatsAllowed: ".PDF,.pdf",
    maxSize: 50
  };
  nombreArchivo:string = "";
  modalVisualizador;
  tipoRegistro = '';
  token
  flag 
  public previsualizacion: string;
  public archivos: any = []
  RUTA_BASE = environment.rutaBase.toString();
  auxnum = ''
  auxnumMax = ''

  private fileUpload1: AngularFileUploaderComponent;

  constructor(
    private spinner: NgxSpinnerService,
    private MigracionService: MigracionService,
    private modalService: NgbModal,
    private dataservice : LegajoService,
    private sanitizer: DomSanitizer
  ) {
   }

  ngOnInit() {
    //this.ListadoPrediosCS(2);
    //this.BusquedaAvanzadaPredios();
   
   
    this.obtenerubigeo(0,0,0,1);
    let ruc =  sessionStorage.getItem('codigoruc')
    this.token = JSON.parse(sessionStorage.getItem('token'))    
    
    
    this.flag = this.token.codiperfil 
     
  }

  
  /* Declaracion de variables */

  aux ={
    codigodepa : 0,    
    codigo_interno  : 0,
    coddocumental : '',
    cargar:'',
    tipo_registro : ''
   }

   auxdoc : ''   
  filtro : any = {        
    page : 1,
    records : 10
  };

  buscar : any = {    
    valor:'',
    page : 1,
    records : 10
  };

  menu ={
    estado :false
  }
  
  filtro1 : any = {
    valor:'',
    coddepa:0,
    codprov:0, 
    coddist: 0,
    tipo: 2 ,   
    page : 1,
    records : 10
  };
  direccion = ""
  
  /* Declaracion de Paginacion */
  itemsPerPage1: number = 20; 
  page: any = 1;
  previousPage1: any;
  total1 : any = 0;
  
  numerocus : ''
  filtroSearch = {
    ruc: '',
    denominacion_cus: '',
    departamento: '0',
    provincia: '0',
    distrito: '0',
    direccion: '',
    nroSI: '',
    propietario: '',
    areaMinima: '',
    areaMaxima: '',
    tipoPartida: '',
    nroPartida: '',
    ocurrencia: '', 
    page: this.page,
    records: this.itemsPerPage1
  }
   
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
    solicitud_ingreso : ''
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

  departamentos : any = [];
  provincias : any = [];
  distritos : any = [];

  ubigeo = {
    coddepa : 0,
    codprov : 0,
    coddist : 0,
    tipo    : 0    
  }
  
 
  dataResultado : any = [];
  public loading: boolean
  public ocultarBotonSubirFile: boolean = false
    

  ListadoPrediosCS(tipo){ 
    this.spinner.show();    
    this.filtro1.tipo = tipo
    if (tipo ==1)    
      {
        this.filtro1.coddepa = this.ubigeo.coddepa
        this.filtro1.codprov = this.ubigeo.codprov 
        this.filtro1.coddist = this.ubigeo.coddist 
        this.filtro1.valor  = this.direccion  
      }  
    this.MigracionService.getListadoPrediosCS(this.filtro1).subscribe((data : any) =>{
    this.spinner.hide();
    this.dataResultado = data.data;   
    if(tipo==1) {this.filtro1.valor  =''}
    //if (this.filtro1.page != 1 ){this.filtro1.page = 1 }
     this.total1 = ( this.dataResultado.listado.length > 0 ) ? this.dataResultado.listado[0].total : 0;
    });
}

BusquedaAvanzadaPredios(){
  this.filtroSearch.areaMinima = this.filtroSearch.areaMinima.toString().replace(',','');
  this.filtroSearch.areaMaxima = this.filtroSearch.areaMaxima.toString().replace(',','');

  this.spinner.show();    
  console.log(this.filtroSearch) 
  this.MigracionService.postBusquedaAvanzadaPredios(this.filtroSearch).subscribe((data : any) =>{
  this.spinner.hide();
  this.dataResultado = data.data;   
   this.total1 = ( this.dataResultado.listado.length > 0 ) ? this.dataResultado.listado[0].total : 0;
  });
}

validardecimal(numero,tipo)
  {    
    if (numero % 1 == 0) {      
      let aux_1 =numero.substr(0,1)    
      let aux_2 =numero.substr(0,2)
      if (aux_1 =='0')
      {
        this.error("Área no válida,no permite 0 a la izquierda")
        if(tipo==2)
        {
          this.filtroSearch.areaMinima = '0'
        }        
      }      
      if (aux_2=='.0')
      {        
        this.error("Área no válida,formato incorrecto solo permite X.X")
        if(tipo==2)
        {
          this.filtroSearch.areaMinima = '0'
        }
      }
   } else {          
      let aux_3 =numero.substr(0,1)
      let aux_4 =numero.substr(0,2)  
      let aux_5 =numero.substr(1,1)                     
      if (aux_3=='.')
      {        
        this.error("Área no válida,formato incorrecto solo permite X.X")
        if(tipo==2)
        {
          this.filtroSearch.areaMinima = '0'
        }
      }           
      if (aux_4=='00' )
      {        
        this.error("Área no válida,solo permite un 0 a la izquierda del .")
        if(tipo==2)
        {
          this.filtroSearch.areaMinima = '0'
        }
      }
      if (aux_3=='0' && aux_5>'0')
      {        
        this.error("Área no válida,no permite 0 a la izquierda")
        if(tipo==2)
        {
          this.filtroSearch.areaMinima = '0'
        }
      }
   }
  }

  foco(opcion)
  {    
    if(opcion==1){
      if (this.auxnum!="")
      {
        this.filtroSearch.areaMinima = this.auxnum     
      }
    }
    
  }

  processMyValue(opcion) {      
    if(opcion==1)
    {
      if(this.filtroSearch.areaMinima!='')   
      {
        this.auxnum = this.filtroSearch.areaMinima
        let noTruncarDecimales = {maximumFractionDigits: 10}
        let numberVal = parseFloat(this.auxnum).toLocaleString('en-US', noTruncarDecimales);
        this.filtroSearch.areaMinima = numberVal;         
      }
      else
      {
        this.auxnum =''
      }
    }

  }




  validardecimalMax(numero,tipo)
  {    
    if (numero % 1 == 0) {      
      let aux_1 =numero.substr(0,1)    
      let aux_2 =numero.substr(0,2)
      if (aux_1 =='0')
      {
        this.error("Área no válida,no permite 0 a la izquierda")
        if(tipo==2)
        {
          this.filtroSearch.areaMaxima = '0'
        }        
      }      
      if (aux_2=='.0')
      {        
        this.error("Área no válida,formato incorrecto solo permite X.X")
        if(tipo==2)
        {
          this.filtroSearch.areaMaxima = '0'
        }
      }
   } else {          
      let aux_3 =numero.substr(0,1)
      let aux_4 =numero.substr(0,2)  
      let aux_5 =numero.substr(1,1)                     
      if (aux_3=='.')
      {        
        this.error("Área no válida,formato incorrecto solo permite X.X")
        if(tipo==2)
        {
          this.filtroSearch.areaMaxima = '0'
        }
      }           
      if (aux_4=='00' )
      {        
        this.error("Área no válida,solo permite un 0 a la izquierda del .")
        if(tipo==2)
        {
          this.filtroSearch.areaMaxima = '0'
        }
      }
      if (aux_3=='0' && aux_5>'0')
      {        
        this.error("Área no válida,no permite 0 a la izquierda")
        if(tipo==2)
        {
          this.filtroSearch.areaMaxima = '0'
        }
      }
   }
  }

  focoMax(opcion)
  {    
    if(opcion==1){
      if (this.auxnumMax!="")
      {
        this.filtroSearch.areaMaxima = this.auxnumMax     
      }
    }
    
  }

  processMyValueMax(opcion) {      
    if(opcion==1)
    {
      if(this.filtroSearch.areaMaxima!='')   
      {
        this.auxnumMax = this.filtroSearch.areaMaxima
        let noTruncarDecimales = {maximumFractionDigits: 10}
        let numberVal = parseFloat(this.auxnumMax).toLocaleString('en-US', noTruncarDecimales);
        this.filtroSearch.areaMaxima = numberVal;         
      }
      else
      {
        this.auxnumMax =''
      }
    }

  }




LimpiarFiltros(){  
  this.filtroSearch.areaMaxima = '';
  this.filtroSearch.areaMinima = '';
  this.filtroSearch.denominacion_cus = '';
  this.filtroSearch.departamento = '0';
  this.filtroSearch.direccion = '';
  this.filtroSearch.distrito = '0';
  this.filtroSearch.nroPartida = '';
  this.filtroSearch.nroSI = '';
  this.filtroSearch.page = this.page;
  this.filtroSearch.propietario = '';
  this.filtroSearch.provincia = '0';
  this.filtroSearch.records = this.itemsPerPage1;
  this.filtroSearch.ruc = '';
  this.filtroSearch.tipoPartida = '';
  this.filtroSearch.ocurrencia = '';
  /*this.MigracionService.postBusquedaAvanzadaPredios(this.filtroSearch).subscribe((data : any) =>{
  this.spinner.hide();
  this.dataResultado = data.data;   
   this.total1 = ( this.dataResultado.listado.length > 0 ) ? this.dataResultado.listado[0].total : 0;
  });*/
  this.dataResultado.listado = []
}


LimpiarFiltroAvanzado(){
  this.spinner.show();    
  this.filtroSearch.areaMaxima = '';
  this.filtroSearch.areaMinima = '';
  this.filtroSearch.departamento = '0';
  this.filtroSearch.direccion = '';
  this.filtroSearch.distrito = '0';
  this.filtroSearch.nroPartida = '';
  this.filtroSearch.nroSI = '';
  this.filtroSearch.page = this.page;
  this.filtroSearch.propietario = '';
  this.filtroSearch.provincia = '0';
  this.filtroSearch.records = this.itemsPerPage1;
  this.filtroSearch.tipoPartida = '';
  this.filtroSearch.ocurrencia = '';
  this.MigracionService.postBusquedaAvanzadaPredios(this.filtroSearch).subscribe((data : any) =>{
  this.spinner.hide();
  this.dataResultado = data.data;   
   this.total1 = ( this.dataResultado.listado.length > 0 ) ? this.dataResultado.listado[0].total : 0;
  });
}

  BuscarPrediosWeb(){  
    this.spinner.show();
    this.MigracionService.getBuscarPrediosWeb(this.buscar).subscribe((data : any) =>{
    this.spinner.hide();
    this.dataResultado = data.data;        
    this.total1 = ( this.dataResultado.listado.length > 0 ) ? this.dataResultado.listado[0].TOTAL : 0;    
    });
  }

  validarruc(ruc)
  {
    if (ruc.length<11)
      {
        this.filtroSearch.ruc=''
        this.error("El RUC debe tener 11 digitos")
      }
  }

  error(titulo)
  {
    swal({
      type: 'error',
      title: titulo,            
      confirmButtonText: 'Listo'
    });
  }
  
  validarpartida(numero,tipo)
  {
    if (numero.length<8 && tipo=='1')
    {
      this.error("Número de partida debe tener 8 dígitos")
      this.filtroSearch.nroPartida = ''
    }
  }
  modalregistro(modalpredio,codinterno,codcus, tipoAsiento)
  {       
    this.tipoRegistro = tipoAsiento
    this.numerocus = codcus
    this.aux.codigo_interno = codinterno    
    let opciones : NgbModalOptions = {
    size: <any>'xl',
    backdrop : "static"
    };
    this.modalService.open(modalpredio,opciones);       
  }
  
  cerrarventana()
  {
    this.modalService.dismissAll()
  }

  cerrarReporte(){
    this.modalService.dismissAll()
    this.ocultarBotonSubirFile = false;
    this.previsualizacion = '';
    this.loading = false;
    this.archivos = [];
  }

  cerrarPersonalizacionLogo(){
    this.modalService.dismissAll()
    this.ocultarBotonSubirFile = false;
    this.previsualizacion = '';
    this.loading = false;
    this.archivos = [];
  }


  
   
  LimpiarWeb()
  {
    this.ListadoPrediosCS(2)
    this.buscar.valor = ''
  }

  loadPage1(page1: number) {       
    if (page1 !== this.previousPage1) {
      this.previousPage1 = page1;
      //this.ListadoPrediosCS(2)
      this.BusquedaAvanzadaPredios();
    }
  }

  cargar(dato)
  {
    this.aux.cargar = dato
  }
      

  actualizarcodigo(data){
    this.aux.codigodepa = data.coddepa
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
  actualizardatosgenerales(data){    
    this.predio.tipoproceso = data.tipoproceso
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
    this.predio.coddist = data.coddist     
}
actualizaadquision(data)
{  
  this.predio.tipoproceso = data.tipoproceso;
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
}


  obtenerubigeo(coddepa,codprov,coddist,tipo)
  {
    this.ubigeo.coddepa = coddepa
    this.ubigeo.codprov = codprov
    this.ubigeo.coddist = coddist
    this.ubigeo.tipo  = tipo
    this.spinner.show();
    this.MigracionService.ObtenerUbigeo(this.ubigeo).subscribe((data : any) =>{
    this.spinner.hide();    
    if (tipo ==1)
      {
        this.departamentos = data.data;            
      }
    else if (tipo==2)
      {
        this.provincias = data.data 
      }
    else if (tipo==3)
      {
        this.distritos = data.data 
      }
    
    });
  }

  modal(content)
  {
    let opciones : NgbModalOptions = {
      size: <any>'xl',
      backdrop : "static"
    };
    this.modalService.open(content,opciones);
  }

  modal1(content1)
  {
    let opciones : NgbModalOptions = {
      size : "lg",  
      backdrop : "static"
    };
    this.modalService.open(content1,opciones);
  }

  DescargarInfo(content){
    if (this.filtroSearch.ruc == ''){
      swal({
        type: 'info',
        title: "Debe indicar el RUC",            
        confirmButtonText: 'Listo'
      });
      return
    }

    this.MigracionService.getValidarExistenciaRUC(this.filtroSearch.ruc.trim()).subscribe((data : any) =>{
      if(data.data[0].RESULTADO == 'EXISTE'){
        let opciones : NgbModalOptions = {
          size : "lg",  
          backdrop : "static",
          keyboard : false
        };
        this.modalService.open(content,opciones);
      }else{
        swal({
          type: 'error',
          title: "Nro de RUC no existe",            
          confirmButtonText: 'Listo'
        });
      }
    });  
    
  }

  capturarFile(event): any{
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any ) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);
    })
    this.archivos.push(archivoCapturado)
    //console.log(event.target.files)
    
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    }catch(e){
      return null;
    }
  })

  subirArchivo(): any{
    
    if(this.archivos.length == 0){
      swal({
        type: 'error',
        title: "Debe adjuntar una imágen",            
        confirmButtonText: 'Listo'
      });
      return
    }
    try{
      this.loading = true;
      const formularioDeDatos = new FormData();
      this.archivos.forEach(archivo => {
        formularioDeDatos.append('files', archivo)
        console.log(archivo)
      });
      formularioDeDatos.append('data', this.filtroSearch.ruc)
      this.MigracionService.postsubirArchivo(formularioDeDatos).subscribe((data : any) =>{
        this.spinner.hide();
        if(data.data.resultado == 'NOEXISTE'){
          swal({
            type: 'error',
            title: "No existe RUC",            
            confirmButtonText: 'Listo'
          });
        }else if(data.data.resultado == 'ERROR'){
          swal({
            type: 'error',
            title: "Ha ocurrido un inconveniente, vuelva a intentarlo",            
            confirmButtonText: 'Listo'
          });
        }else if(data.data.resultado == 'OK'){
          swal({
            type: 'success',
            title: "Se ha subido correctamente la imágen",            
            confirmButtonText: 'Listo'
          });
          this.ocultarBotonSubirFile = true
        }else if(data.data.resultado == 'PESO'){
          swal({
            type: 'error',
            title: "Solo se acepta imagen con peso máximo de 1MB",            
            confirmButtonText: 'Listo'
          });
        }else if(data.data.resultado == 'EXTENSION'){
          swal({
            type: 'error',
            title: "Solo se acepta imagenes con formato jpg",            
            confirmButtonText: 'Listo'
          });
        }else{
          swal({
            type: 'error',
            title: "Ha ocurrido un inconveniente, vuelva a intentarlo",            
            confirmButtonText: 'Listo'
          });
        }
        this.loading = false;  
      });
    }catch (e){
      this.loading = false;
      console.log('ERROR', e);
    }
  }

  cargar_ruta_aportes(){ 
    alert('cargar');
    this.Adj_documento = this.dataservice.API_URL + "SubirDocumentoLegajo/" + "100" + "-" + 'DOCUMENTO';
    sessionStorage.setItem("Adjuntar_InfFinal", this.Adj_documento);
    console.log('llego')
    console.log(this.Adj_documento)
    this.afuConfig.uploadAPI.url = this.Adj_documento;
    this.fileUpload1.uploadAPI = this.Adj_documento;
    
  }

  openvistaPreviaDocumento(event) {
    let indice;
    let dataAdjuntado = JSON.parse(event.response);  
    dataAdjuntado = dataAdjuntado.url;
    indice = dataAdjuntado.indexOf('//',0);
    this.nombreArchivo = dataAdjuntado.substr(indice + 2)   
    this.filtro.nombreArchivo =  this.nombreArchivo;
    
    this.spinner.show();
      
    let opciones : NgbModalOptions = {
      size: <any>'lg',
      backdrop : "static",
      keyboard : false
      };    
      //this.modalVisualizador = this.modalService.open(contentaux,opciones);

/*
			this.modalService.open(contentaux, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			}, (reason) => {
        
      });
*/
			this.urlPDF = this.MigracionService.API_URL + "VerPDF/" + this.nombreArchivo;
      this.spinner.hide();
  }

  verReportePDF(content){ 
    if(this.filtroSearch.ruc.trim() == ''){
      this.error("No se ha especificado Nro de RUC") 
      return;
    }
      
    this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
    this.urlPDF = this.dataservice.API_URL+"verReportePDF/"+ this.filtroSearch.ruc
  }

  ExportaPrediosExcel(){
    if (this.filtroSearch.ruc == ''){
      swal({
        type: 'info',
        title: "Debe indicar el RUC",            
        confirmButtonText: 'Listo'
      }); 
      return
    }

    this.spinner.show();
    this.MigracionService.getValidarExistenciaRUC(this.filtroSearch.ruc.trim()).subscribe((data : any) =>{
      if(data.data[0].RESULTADO == 'EXISTE'){
        location.href = this.dataservice.API_URL + '/ExportaPrediosExcel/' + this.filtroSearch.ruc;
        setTimeout(() => {      
          this.spinner.hide(); 
        }, 6000);
        // this.MigracionService.getExportaPrediosExcel(this.filtroSearch.ruc.trim()).subscribe((data : any) =>{
        //   this.spinner.hide();      
        // });
      }else{
        swal({
          type: 'error',
          title: "Nro de RUC no existe",            
          confirmButtonText: 'Listo'
        });
        this.spinner.hide();
      }    
    });    
  }

}
