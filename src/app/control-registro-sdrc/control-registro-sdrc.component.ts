import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { controlregistroSDRCService } from '../services/control-registroSDRC.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import swal from'sweetalert2';
import { MigracionService } from '../services/migracion.service';
import { RegistroSbnService } from '../services/registro-sbn.service';


@Component({
  selector: 'app-control-registro-sdrc',
  templateUrl: './control-registro-sdrc.component.html',
  styleUrls: ['./control-registro-sdrc.component.css']
})
export class ControlRegistroSDRCComponent implements OnInit {
  
  codigo_usuario: string = ''
  
  constructor(
    private spinner: NgxSpinnerService,
    private controlregistroSDRCService: controlregistroSDRCService,
    private modalService: NgbModal,
    private service : MigracionService,  
    private dataservice : RegistroSbnService
  ) { 
    this.codigo_usuario = sessionStorage.getItem('codigopersonal')
    //this.codigo_usuario = '2222'
  }

  ngOnInit() {
    
    this.obtenerubigeo(0,0,0,1);
    this.obtenerubigeo_externos(0,0,0,1);
    this.obtenerubigeo_notificados(0,0,0,1);
    this.obtenerubigeo_aprobados(0,0,0,1);
    //this.codigo_usuario = sessionStorage.getItem('codigopersonal')
    this.Busqueda_Cus_registrados_internos();      
  }

  //Paginacion Internos
  itemsPerPage: number = 10;
  page: any = 1;
  previousPage: any;
  total : any = 0;  

  //Paginacion Externos
  itemsPerPageExternos: number = 20;
  pageExternos: any = 1;
  previousPageExternos: any;
  previousPageNotificados: any;
  previousPageAprobados: any;
  totalExternos : any = 0; 
  totalNotificados : any = 0; 

  /* Declaracion de variables */
  departamentos : any = [];
  provincias : any = [];
  distritos : any = [];

  departamentos_ext : any = [];
  provincias_ext : any = [];
  distritos_ext : any = [];

  departamentos_not : any = [];
  provincias_not : any = [];
  distritos_not : any = [];

  departamentos_apro : any = [];
  provincias_apro : any = [];
  distritos_apro : any = [];
  dataObservaciones : any = [];

  NOMBRE_ESTANDARIZADO: string;
  AREA_REGISTRAL_VACIO: string;
  CODIGO_COMPETENCIA_VACIO: string;
  DESCRIPCION_TIPODETALLE_VACIO: string;
  CODIGO_USO_ESPECIFICO_VACIO: string;
  AREA_DESOCUPADA_VACIO: string;
  FECHA_APORTE_VACIO: string;

  ubigeo = { 
    coddepa : 0,
    codprov : 0,
    coddist : 0,
    tipo    : 0    
  }
  hero = {  
    rucs:  ""
  }

  aux_codinterno = ''

  filtro = {
    rucs: '',
    cus: null,
    coddepa: '0',
    codprov: '0',
    coddist: '0',
    tipo: 0,
    tipoSeleccion: '1',
    fechaInicio: '',
    fechaFinal: '',
    page : this.page, 
    records : this.itemsPerPage,
    
  }
  filtroAprobacion = {
    codigo_interno: '0',
    tipoRegistro : '',
    codigo_usuario : '100',
    observaciones : '',
    aprobado : '1',
    nro_cus : '',
    idControlCalidad: 0,
    codigo_observaciones: '',
    tipoCus: ''
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

  aux ={
    codigodepa : 0,    
    codigo_interno  : 0,
    coddocumental : '',
    cargar:'',
    tipo_registro : '',
    grabado: ""
   }

  dataResultado : any = [];
  dataResultadoTotal : any = [];
  datacopia : any = [];
  modal;
 

  filtro_externos = {
    rucs: '',
    cus: null,
    coddepa: '0',
    codprov: '0',
    coddist: '0',
    tipo: 0,
    page : this.page, 
    records : this.itemsPerPage
  }

  filtro_notificados = {
    rucs: '',
    cus: null,
    coddepa: '0',
    codprov: '0',
    coddist: '0',
    tipo: 0,
    page : this.page, 
    records : this.itemsPerPage
  }

  filtro_aprobados = {
    rucs: '',
    cus: null,
    coddepa: '0',
    codprov: '0',
    coddist: '0',
    tipo: 0,
    page : this.page, 
    records : this.itemsPerPage
  }

  dataResultadoExternos : any = [];
  dataResultadoNotificados : any = [];
  dataResultadoAprobados : any = [];
  NrocusAprobar : string;
  codigo_internoAprobar : string;
  pestana: string = '';
  closeResult: string;
  urlPDF;  
  urlPDF_H;
  flagvalidar : boolean = false;
  modalVerificar;
  modalObservacion;
  id_control_calidad = 0
  numero_cus = ''
  tipoRegistro = ''
  selcompetencia : boolean = false;
  Arrg_codigo = [];
  posicion : number;
  ListCodPatrim: string;
  contListselecc : number;
  dataResultadoNotificacion : any = [];

  /* Declaracion de funciones */
  obtenerubigeo(coddepa,codprov,coddist,tipo)
  {
    this.filtro.coddepa = coddepa
    this.filtro.codprov = codprov
    this.filtro.coddist = coddist
    this.filtro.tipo  = tipo
    this.spinner.show();
    this.controlregistroSDRCService.ObtenerUbigeo(this.filtro).subscribe((data : any) =>{
    this.spinner.hide();    
    if (tipo ==1)
      {
        this.departamentos = data.data;            
      }
    else if (tipo==2)
      {
        this.provincias = data.data;
      }
    else if (tipo==3)
      {
        this.distritos = data.data;
      }
    
    });
  }

  obtenerubigeo_externos(coddepa,codprov,coddist,tipo)
  {
    this.filtro_externos.coddepa = coddepa
    this.filtro_externos.codprov = codprov
    this.filtro_externos.coddist = coddist
    this.filtro_externos.tipo  = tipo
    this.spinner.show();
    this.controlregistroSDRCService.ObtenerUbigeo(this.filtro_externos).subscribe((data : any) =>{
    this.spinner.hide();    
    if (tipo ==1)
      {
        this.departamentos_ext = data.data;            
      }
    else if (tipo==2)
      {
        this.provincias_ext = data.data;
      }
    else if (tipo==3)
      {
        this.distritos_ext = data.data;
      }
    
    });
  }


  obtenerubigeo_notificados(coddepa,codprov,coddist,tipo)
  {
    this.filtro_notificados.coddepa = coddepa
    this.filtro_notificados.codprov = codprov
    this.filtro_notificados.coddist = coddist
    this.filtro_notificados.tipo  = tipo
    this.spinner.show();
    this.controlregistroSDRCService.ObtenerUbigeo(this.filtro_notificados).subscribe((data : any) =>{
    this.spinner.hide();    
    if (tipo ==1)
      {
        this.departamentos_not = data.data;            
      }
    else if (tipo==2)
      {
        this.provincias_not = data.data;
      }
    else if (tipo==3)
      {
        this.distritos_not = data.data;
      }
    
    });
  }


  obtenerubigeo_aprobados(coddepa,codprov,coddist,tipo)
  {
    this.filtro_aprobados.coddepa = coddepa
    this.filtro_aprobados.codprov = codprov
    this.filtro_aprobados.coddist = coddist
    this.filtro_aprobados.tipo  = tipo
    this.spinner.show();
    this.controlregistroSDRCService.ObtenerUbigeo(this.filtro_aprobados).subscribe((data : any) =>{
    this.spinner.hide();    
    if (tipo ==1)
      {
        this.departamentos_apro = data.data;            
      }
    else if (tipo==2)
      {
        this.provincias_apro = data.data;
      }
    else if (tipo==3)
      {
        this.distritos_apro = data.data;
      }
    
    });
  }

  Busqueda_Cus_registrados_internos(){    
    if ( this.filtro.fechaInicio == ''){
      if ( this.filtro.fechaFinal !== ''){
        swal(
          'Advertenca!',
          'No se ha especificado una fecha del Rango',
          'error'
        )
        return;
      }
    }
    else{
      if ( this.filtro.fechaFinal == ''){
        swal(
          'Advertenca!',
          'No se ha especificado una fecha del Rango',
          'error'
        )
        return;
      }
    }
      
    this.spinner.show();
    this.controlregistroSDRCService.Busqueda_Cus_registrados_internos(this.filtro).subscribe((data : any) =>{ 

      this.spinner.hide();    
      this.dataResultadoTotal = data.data;       
      
      this.total = ( this.dataResultadoTotal.listadoCusRegistradosInternos.length > 0 ) ? this.dataResultadoTotal.listadoCusRegistradosInternos[0].TOTAL : 0;      
      if ( this.filtro.tipoSeleccion == '1' ){        
        let contador = 0;
        this.dataResultadoTotal.listadoCusRegistradosInternos.forEach((data5 :any) =>{

          if ( this.dataResultadoTotal.listadoCusRegistradosInternos[contador].ROW_NUMBER_ID <= this.itemsPerPage ){
            this.dataResultadoTotal.listadoCusRegistradosOK.push(this.dataResultadoTotal.listadoCusRegistradosInternos[contador]);
            contador += 1;
          }       
        });
      }else{        
        this.dataResultadoTotal.listadoCusRegistradosOK = this.dataResultadoTotal.listadoCusRegistradosInternos
      }                  
    });
  }

  Busqueda_Cus_registrados_externos(){

    this.spinner.show();
    this.controlregistroSDRCService.Busqueda_Cus_registrados_externos(this.filtro_externos).subscribe((data : any) =>{      
      this.spinner.hide();    
      this.dataResultadoExternos = data.data;       
      this.total = ( this.dataResultadoExternos.listadoCusRegistradosExternos.length > 0 ) ? this.dataResultadoExternos.listadoCusRegistradosExternos[0].TOTAL : 0;      
    });

  }

  BorrarFiltro(){
    
    this.filtro.rucs = '',
    this.filtro.cus = null,
    this.filtro.coddepa = '0',
    this.filtro.codprov = '0',
    this.filtro.coddist = '0', 
    this.filtro.tipo = 0, 
    this.hero.rucs = '',
    this.filtro.fechaInicio = '',
    this.filtro.fechaFinal = ''
  }

  BorrarFiltro_externos(){
    
    this.filtro_externos.rucs = '',
    this.filtro_externos.cus = null,
    this.filtro_externos.coddepa = '0',
    this.filtro_externos.codprov = '0',
    this.filtro_externos.coddist = '0', 
    this.hero.rucs = ''
  }

  BorrarFiltro_notificados(){
    
    this.filtro_notificados.rucs = '',
    this.filtro_notificados.cus = null,
    this.filtro_notificados.coddepa = '0',
    this.filtro_notificados.codprov = '0',
    this.filtro_notificados.coddist = '0', 
    this.hero.rucs = ''
  }

  BorrarFiltro_aprobados(){
    
    this.filtro_aprobados.rucs = '',
    this.filtro_aprobados.cus = null,
    this.filtro_aprobados.coddepa = '0',
    this.filtro_aprobados.codprov = '0',
    this.filtro_aprobados.coddist = '0', 
    this.hero.rucs = ''
  }
  
  loadPage(page: number) {
    
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.dataResultadoTotal.listadoCusRegistradosOK
      
      if ( this.dataResultadoTotal.tipoSeleccion == 1 ){
        let totalRegPag;
        let regDesde;
        if (page !== 1){
          totalRegPag =  page * this.itemsPerPage;
          regDesde = totalRegPag - this.itemsPerPage;
        }else{
          totalRegPag =  this.itemsPerPage;
          regDesde = 0;
        }        
        this.dataResultadoTotal.listadoCusRegistradosOK = [];
        let contador = 0;
        this.dataResultadoTotal.listadoCusRegistradosInternos.forEach((data5 :any) =>{
          
          if ( this.dataResultadoTotal.listadoCusRegistradosInternos[contador].ROW_NUMBER_ID > regDesde){
            if ( this.dataResultadoTotal.listadoCusRegistradosInternos[contador].ROW_NUMBER_ID <= totalRegPag ){                
                this.dataResultadoTotal.listadoCusRegistradosOK.push(this.dataResultadoTotal.listadoCusRegistradosInternos[contador]);
                
            }
          }
          contador += 1;
        });
      }else{
        this.Busqueda_Cus_registrados_internos();
      }      
    }
  }
  
  resetearpag(){
    this.filtro.page = 1;
    this.Busqueda_Cus_registrados_internos(); 
  }

  loadPage_externos(page: number) {
    if (page !== this.previousPageExternos) {
      this.previousPageExternos = page;
      this.Busqueda_Cus_registrados_externos();
    }  
  }

  loadPage_notificados(page: number) {
    if (page !== this.previousPageNotificados) {
      this.previousPageNotificados = page;
      this.Busqueda_Cus_registrados_notificados();
    }  
  }
  
  loadPage_aprobados(page: number) {
    if (page !== this.previousPageAprobados) {
      this.previousPageAprobados = page;
      this.Busqueda_Cus_registrados_aprobados();
    }  
  }

  resetearpag_externos(){
    this.filtro_externos.page = 1;
    this.Busqueda_Cus_registrados_externos(); 
  }
0
  modalAprobacion(content,codigo_interno, cus, pestana, idControlCalidad){

    this.controlregistroSDRCService.Verificar_cusCheck(codigo_interno, idControlCalidad, pestana).subscribe((data:any) =>{
      this.dataObservaciones = data.data
      console.log(this.dataObservaciones.resultado.length)
      
      if (this.dataObservaciones.resultado.length > 0 ){
        /* CON OBSERVACIONES Y APROBACION A CRITERIO DE USUARIO */
        swal({
          title: 'El CUS tiene observaciones ¿Esta Ud. seguro de aprobar el CUS Nro ' + cus + ' sin necesidad de Notificar?',
          text: "¡No podrás revertir esto!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonText: 'Cancelado',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Aprobar!'
          
        }).then((result) => {
          if (result.value) {
            this.id_control_calidad = idControlCalidad;
            this.NrocusAprobar = cus;
            this.pestana = pestana;
            this.codigo_internoAprobar = codigo_interno;
            let prueba = {
              codigo_interno: codigo_interno
            }    
            this.spinner.show();                   
              this.controlregistroSDRCService.obtenerTipoAccionDetalleUD(prueba).subscribe((data:any) =>{ 
                this.spinner.hide();                
                if ( data.data[0].DETALLE_TIPO_ACCION == undefined ){
                  this.error("CUS no tiene Unidad Documental","Unidad Documental")
                  return;
                } 
                this.filtroAprobacion.tipoRegistro = data.data[0].DETALLE_TIPO_ACCION;
                
                let opciones : NgbModalOptions = {
                  size : "lg",
                  backdrop : "static"
                };
                this.modalService.open(content,opciones);             
              });  
          }
        })
        // swal({  
        //   type: 'info',   
        //   title: 'El CUS no puede ser aprobado porque tiene Observaciones por corregir',
        //   confirmButtonText: 'Listo'                  
        //   }); 
      }else{

        this.id_control_calidad = idControlCalidad;
        this.NrocusAprobar = cus;
        this.pestana = pestana;
        this.codigo_internoAprobar = codigo_interno;
        let prueba = {
          codigo_interno: codigo_interno
        }    
        this.spinner.show();                   
          this.controlregistroSDRCService.obtenerTipoAccionDetalleUD(prueba).subscribe((data:any) =>{ 
            this.spinner.hide();                
            if ( data.data[0].DETALLE_TIPO_ACCION == undefined ){
              this.error("CUS no tiene Unidad Documental","Unidad Documental")
              return;
            } 
            this.filtroAprobacion.tipoRegistro = data.data[0].DETALLE_TIPO_ACCION;
            
            let opciones : NgbModalOptions = {
              size : "lg",
              backdrop : "static"
            };
            this.modalService.open(content,opciones);             
          });  

      }
      

    });
       
  }
  

  Aprobar_cus(){
    if ( this.filtroAprobacion.tipoRegistro == '' ){
      swal({
        title: 'Aviso!!!',
        text: 'No ha especificado el tipo de Registro del CUS ' + this.NrocusAprobar,
        type: 'warning',
      });
      return;
    }

    if(this.pestana == '2' && this.filtroAprobacion.tipoRegistro == 'CD'){
      if ( this.filtroAprobacion.tipoCus == '' ){
        swal({
          title: 'Aviso!!!',
          text: 'No ha especificado el tipo de CUS para el Nro.' + this.NrocusAprobar,
          type: 'warning',
        });
        return;
      }  
    }
    

    swal({
      title: '¿Esta Ud. seguro de aprobar el CUS Nro ' + this.NrocusAprobar + '?',
      text: "¡No podrás revertir esto!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelado',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Aprobar!'
      
    }).then((result) => {
      if (result.value) {
        
        this.filtroAprobacion.idControlCalidad = this.id_control_calidad;
        this.filtroAprobacion.codigo_interno = this.codigo_internoAprobar;
        this.filtroAprobacion.observaciones = 'El CUS con nro ' + this.NrocusAprobar + ' ha sido aprobado satisfactoriamente por la Superintendencia Nacional de Bienes Estatales (SBN)';
        this.spinner.show();
        this.controlregistroSDRCService.Aprobar_cus(this.filtroAprobacion).subscribe((data : any) =>{
          this.spinner.hide();
          this.dataResultado = data.data;           
          this.filtroAprobacion.observaciones = '';
          this.id_control_calidad = 0;
          
          if (this.dataResultado.resultadoAprobacion[0].RESULTADO == 'OK'){
            let contador;
            let posicion;
            
            if (this.pestana == '2'){
              this.Busqueda_Cus_registrados_externos();
            }else{
              
              if ( this.filtro.tipoSeleccion == '1' ){               
                let contador = 0;
                let posicion;
                this.dataResultadoTotal.listadoCusRegistradosInternos.forEach((data5 :any) =>{
                  if ( this.dataResultadoTotal.listadoCusRegistradosInternos[contador].CODIGO_INTERNO == this.codigo_internoAprobar){                    
                    posicion = this.dataResultadoTotal.listadoCusRegistradosInternos.findIndex(arrBusqueda => arrBusqueda.CODIGO_INTERNO == this.codigo_internoAprobar)
                    this.dataResultadoTotal.listadoCusRegistradosInternos.splice(posicion,1);                    
                  }
                  contador += 1;
                });
                /* RELLENAR NUEVAMENTE ARRAY QUE SE MOSTRARA EN GRILLA */
                let totalRegPag;
                let regDesde;
                if (this.filtro.page !== 1){
                  totalRegPag =  this.filtro.page * this.itemsPerPage;
                  regDesde = totalRegPag - this.itemsPerPage;
                }else{
                  totalRegPag =  this.itemsPerPage;
                  regDesde = 0;
                }               
                this.dataResultadoTotal.listadoCusRegistradosOK = [];
                contador = 0;
                this.dataResultadoTotal.listadoCusRegistradosInternos.forEach((data5 :any) =>{
                  if ( this.dataResultadoTotal.listadoCusRegistradosInternos[contador].ROW_NUMBER_ID > regDesde){
                    if ( this.dataResultadoTotal.listadoCusRegistradosInternos[contador].ROW_NUMBER_ID <= totalRegPag ){                        
                        this.dataResultadoTotal.listadoCusRegistradosOK.push(this.dataResultadoTotal.listadoCusRegistradosInternos[contador]);
                    }
                  }
                  contador += 1;
                });
  
              }else if ( this.filtro.tipoSeleccion == '2' ){ 
                this.Busqueda_Cus_registrados_internos();
              }

            }
            this.filtroAprobacion.tipoRegistro = '';
            swal(
              'Aprobado!',
              'El CUS con Nro. ' + this.NrocusAprobar + ' ha sido aprobado',
              'success'
            )
            
            this.modalService.dismissAll();
            
          }else if (this.dataResultado.resultadoAprobacion[0].RESULTADO == 'NO_TIENE_NRO_UD'){
            swal(
              'Advertencia!',
              'No se le ha especifica un propietario para el CUS nro. ' + this.NrocusAprobar,
              'warning'
            )
          }else{
            swal(
              'Error!',
              'Ocurrio un inconveniente',
              'error'
            )
          }
        }); 

      }
    })
  }

  cerrarventana()
  {
    this.modalService.dismissAll()
  }

  cargar(dato)
  {
    this.aux.cargar = dato
  }

  modaleditar(modal,codinterno, CUS)
  {   
    this.aux.grabado = ""
    this.dataservice.BuscarCodigoPredio(CUS).subscribe((data:any) =>{

      this.numero_cus = CUS
      this.aux.codigo_interno = codinterno
      this.tipoRegistro = data.data[0].DSC_ASIENTO  
      let opciones : NgbModalOptions = {
      size: <any>'xl',
      backdrop : "static",
      keyboard : false
      };
      this.modalService.open(modal,opciones);
      /*this.desbloquear();*/    

    });   
      

  }

  // Verificar_cus(contentVerificacion,codigo_interno, idControlCalidad){
  //   {
  //     this.filtroAprobacion.observaciones = ""
  //     this.aux_codinterno = codigo_interno
  //     this.id_control_calidad = idControlCalidad

  //     let opciones : NgbModalOptions = {
  //       size : "lg",
  //       ariaLabelledBy: 'modal-basic-title'
  //     };    
  //     this.modalVerificar=this.modalService.open(contentVerificacion,opciones); 

  //     this.urlPDF = this.controlregistroSDRCService.API_URL+"Verificar_cus/"+codigo_interno + "/" + idControlCalidad;
  //   }
  // }

  Verificar_cusCheck(content,codigo_interno, idControlCalidad, pestana){
    
      this.filtroAprobacion.observaciones = "" 
      this.aux_codinterno = codigo_interno
      this.id_control_calidad = idControlCalidad

      this.controlregistroSDRCService.Verificar_cusCheck(codigo_interno, idControlCalidad, pestana).subscribe((data:any) =>{
        this.dataObservaciones = data.data
        
        let contador = 0;
        this.dataObservaciones.resultado.forEach((data1 : any) => {
          if(this.dataObservaciones.resultado[contador].TIPO == 'C'){
            this.dataObservaciones.resultadoCabecera.push(this.dataObservaciones.resultado[contador]);
          }else{
            this.dataObservaciones.resultadoDetalles.push(this.dataObservaciones.resultado[contador]);
          }
          contador +=1;
        });

        console.log(this.dataObservaciones)

        //this.numero_cus = CUS
        //this.aux.codigo_interno = codinterno
        //this.tipoRegistro = data.data[0].DSC_ASIENTO  
        
        let opciones : NgbModalOptions = {
          size : "lg",
          ariaLabelledBy: 'modal-basic-title',
          keyboard: false,
          backdrop : "static"
        };    
        this.modalVerificar=this.modalService.open(content,opciones);
  
      });   
    
  }

  Verificar_historico(contentHistorico, idControlCalidad){
    {                  
      this.modalService.open(contentHistorico, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
      });
      this.urlPDF_H = this.controlregistroSDRCService.API_URL+"Verificar_historico/"+idControlCalidad;
    }
  }

  EnviarNotificacion()
  { 
    this.spinner.show();
    this.controlregistroSDRCService.UpdateNotificacion(this.aux_codinterno,this.codigo_usuario,this.filtroAprobacion.observaciones, this.id_control_calidad).subscribe((data : any) =>{
      this.spinner.hide();
      
      swal({
        type: 'success',
        title: ' La notificación acaba de ser enviada',                 
        confirmButtonText: 'Listo'                  
        }); 
        this.id_control_calidad = 0
        this.modalObservacion.close()
        this.modalVerificar.close()
        this.Busqueda_Cus_registrados_internos()
        this.Busqueda_Cus_registrados_externos()
       
        
    });
  }

  Notificar(content1){        
    this.ListCodPatrim = ''; 
    this.ListCodPatrim = JSON.stringify(this.Arrg_codigo);
    this.ListCodPatrim = this.ListCodPatrim.substring( 1, (this.ListCodPatrim.length)-1 ); 
    this.ListCodPatrim = this.ListCodPatrim.replace(/['"]+/g, ''); 

    this.contListselecc = this.ListCodPatrim.length;

    //if(this.contListselecc >= 1){
      let opciones : NgbModalOptions = {
        size : "lg",
        backdrop : "static"
      };    
      this.modalObservacion=this.modalService.open(content1,opciones);    
    // }else{
    //   swal({
    //     position: 'center',
    //     type: 'warning',
    //     title: 'Debe marcar al menos una observacion para realizar la notificacion'
    //   })
    // }
  }

  actualizarcodigo(data){
    this.aux.codigodepa = data.coddepa
    //this.aux.detalle = data.detalle
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
    this.predio.documentosTL = []
    this.predio.codigodocumento = ''
    this.predio.nro_documento = ''    
    this.predio.aux_reg = ''  
    this.predio.solicitud_ingreso = data.solicitud_ingreso
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
  
  this.predio.codpartida2 = data.codpartida2;
  this.predio.numpartida2 = data.numpartida2;
  this.predio.fojas2 = data.fojas2;
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
                //this.desbloquear()
                //this.BuscarDocumentos()
              }
            else  
              {
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
              this.error("El Registro no pudo realizarse",'Limitaciones')
            }            
        });          
      }
    });
  }
}

guardarfabricalinderos(data)
{    
  console.log(data)
  //return
  
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

let aux = this.validarzona()        
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
              this.error("El Registro no pudo realizarse","Zona")
            }            
        });  
                
      }
    });
  }
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



 verObservaciones(){
   alert('Debera mostrar las observaciones que se genero al notificar-en formato PDF');
 }

 Busqueda_Cus_registrados_notificados(){

  this.spinner.show();
  this.controlregistroSDRCService.Busqueda_Cus_registrados_notificados(this.filtro_notificados).subscribe((data : any) =>{      
    this.spinner.hide();    
    this.dataResultadoNotificados = data.data;     
    console.log(data.data)
    return
    this.total = ( this.dataResultadoNotificados.listadoCusRegistradosNotificados.length > 0 ) ? this.dataResultadoNotificados.listadoCusRegistradosNotificados[0].TOTAL : 0;      
  });

}

Busqueda_Cus_registrados_aprobados(){

  this.spinner.show();
  this.controlregistroSDRCService.Busqueda_Cus_registrados_aprobados(this.filtro_aprobados).subscribe((data : any) =>{      
    this.spinner.hide();    
    this.dataResultadoAprobados = data.data;       
    this.total = ( this.dataResultadoAprobados.listadoCusRegistradosAprobados.length > 0 ) ? this.dataResultadoAprobados.listadoCusRegistradosAprobados[0].TOTAL : 0;      
  });

}

chequeoObservaciones(accion, codigoobs){
  if(accion == true){
    this.Arrg_codigo.push(codigoobs);
  }else{
    this.posicion = this.Arrg_codigo.indexOf(codigoobs);
    this.Arrg_codigo.splice(this.posicion,1);
  }
  console.log(this.Arrg_codigo);
}

GuardarNotificacion(){
  this.filtroAprobacion.codigo_observaciones = this.ListCodPatrim;
  this.filtroAprobacion.codigo_usuario = this.codigo_usuario;
  this.filtroAprobacion.idControlCalidad = this.id_control_calidad;
  console.log(this.filtroAprobacion);
 
  if(this.filtroAprobacion.observaciones.trim() == '' && this.filtroAprobacion.codigo_observaciones == ''){
    swal({
      type: 'info',
      title: 'Debe especificar observaciones a la notificacion',                  
      confirmButtonText: 'Listo'                  
    }); 
    return
  }

  this.spinner.show();
  this.controlregistroSDRCService.GuardarNotificacion(this.filtroAprobacion).subscribe((data : any) =>{
    this.dataResultadoNotificacion = data.data
    if (this.dataResultadoNotificacion[0].RESULTADO == 'OK'){
      this.spinner.hide();
      swal({
        type: 'success',
        title: ' Se ha realizado la notificacion satisfactoriamente',                  
        confirmButtonText: 'Listo'                  
      }); 
      this.id_control_calidad = 0
      this.modalObservacion.close()
      this.modalVerificar.close()
      this.Busqueda_Cus_registrados_internos()
      this.Busqueda_Cus_registrados_externos() 
    }else{
      this.spinner.hide();
      swal({
        type: 'error',
        title: 'Se encontro problemas en la operacion',                  
        confirmButtonText: 'Error'                  
      });
    }
    
  });
}

cambiarTipoRegistro(){
  
  //alert(this.filtroAprobacion.tipoRegistro)
}

}
