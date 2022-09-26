import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegistroSbnService } from '../services/registro-sbn.service';
import { MigracionService } from '../services/migracion.service';
import { ConstruccionesService } from '../services/construcciones.service';
import swal from 'sweetalert2';
import { NgSelectConfig} from '@ng-select/ng-select';

@Component({
  selector: 'app-registro-sbn',
  templateUrl: './registro-sbn.component.html',
  styleUrls: ['./registro-sbn.component.css']
})
export class RegistroSbnComponent implements OnInit {
   aux ={
    codigodepa : 0,    
    codigo_interno  : '',
    coddocumental : '',
    cargar:'',
    tipo_registro : '0', 
    detalle: '',
    grabado: "",
    tipo_registro2: '0'
   }
   auxdoc : ''   
   flagaux : ''
  
   unidad = { 
    documental   : 0 ,    
    tipodocumento :''  ,
    codigodocumento : '',
    numerodocumento :'',
    codtecnico   : undefined,
    codlegal      : undefined,
    codigousuario  :'',
    nroCUS: '',
    buscarUD: '',
    externo: 0 
   }
   updateRespUD ={
    codud: '',
     codtecnico: '',
     codLegal: ''
   }
   numeroud = ''
   tipodocumento =
   {
     coddocunental : 0,
     codtipodoc : ''
   }

   buscarud ={
     coddocumento : 0,
     codud : 0,
   }
   auxnumerodocumento = ''
   respuesta = [];
   listadodocumental = [];
   resultado = [];
   listadoverificacion =[];
   tecnico =[];
   legal =[];
   opt = '';
   documentos=[];
   flagvalidar : boolean = false;
   nombre = '';  
   modal = '';
   codinterno= '';
   flag ='';
   cus  = '';
   etapaUD = '';
  
  predio ={
    tipoproceso : 0, //0 nuevo registro - 0<> actualizar 
    unidaddoc : '',
    tipo_registro : '',
    tipo_registro2 : '', 
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
    linderos : [],
    fabrica : [],
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
  limitaciones ={
    codigo_interno : '',
    restricciones: '',
    coddetalle  : '',
    area : 0,
    codusuario : '',
    proceso : []
  }
  fabricacionlimitaciones ={
    codigo_interno : '',
    linderos : [],
    fabrica : [],
    codusuario : ''
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
  existeCUS = '';
  numerocus = ''   
  tipoRegistro = ''

  ConsultaCaratula ={
    tipo : '1',    
    libro  : '0',
    tipoCUS : '0',
    numero:''
   }
   activado = true;
   closeResult: string;
   urlPDF;  
   tipoUsuario :string = ''
   modalDocumentosTL;
    
  constructor(
    private spinner: NgxSpinnerService,   
    private modalService: NgbModal,
    private dataservice : RegistroSbnService,
    private service : MigracionService,
    private config: NgSelectConfig,
    private dataserviceConstrucciones : ConstruccionesService,
  ) {     
    this.config.notFoundText = 'No hay resultados';     
    this.unidad.codigousuario = sessionStorage.getItem("codigopersonal")   
    //this.unidad.codigousuario = '2222'; 
    //this.unidad.codigousuario = '2887';  
    
  } 

  ngOnInit() {
    
    this.CargarCombos();  
    
  }


  CargarCombos()
  {
    this.spinner.show();        
    this.dataservice.TecnicoLegal(this.unidad.codigousuario).subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.tecnico = data.data.tecnico
      this.legal = data.data.legal     
    }); 
  }


  BuscarUD(numeroud)
  {
    if(numeroud.trim() !="")  
    {
      if(numeroud.trim().length < 4){
        this.error("El número debe contener como mínimo 4 caracteres",'') 
        return;
      }else{

        this.buscarud.codud = numeroud.trim()
        this.spinner.show();
        this.dataservice.BuscarUD(this.buscarud).subscribe((data:any) =>{  
          this.spinner.hide();           
          this.listadodocumental = data.data  

          if (this.listadodocumental.length == 0){
            this.error("No se ha encontrado la U.D.",'')            
          }else{
            this.unidad.tipodocumento = this.listadodocumental[0].TIPO_DOCUMENTO; 
            this.unidad.numerodocumento = this.listadodocumental[0].NRO_DOCUMENTO;
            this.unidad.codtecnico = this.listadodocumental[0].RESP_EVALUACION_TECNICA;
            this.unidad.codlegal = this.listadodocumental[0].RESP_EVALUACION_LEGAL;
            this.unidad.buscarUD = "";
            this.modalService.dismissAll();
          }
        }); 

      }
      
    }
    else 
    {
      this.error("Ingrese Nº de UD",'')              
    }    

   
    
  }

  openBusquedaUD(buscarUD){ 
    
    let opciones : NgbModalOptions = {
        size : "sm",
        backdrop : "static"
      };
    this.modalService.open(buscarUD,opciones);    
  }


  ListadoDocumentos(content)
  {
    this.auxnumerodocumento = ""
    this.respuesta = [];
    
    if (this.unidad.tipodocumento=="") 
      {
         this.error("Selecciona un Tipo de Documento",'')            
      }
    else 
      {
        let opciones : NgbModalOptions = {
          size : "lg",
          backdrop : "static"
        };
        this.modalService.open(content,opciones);        
      }      
  }

  cargar(dato)
  {
    this.aux.cargar = dato
  }
      
  CargarDocumentos()
  {   
        
    this.unidad.numerodocumento = this.auxnumerodocumento 
    
    if (this.unidad.numerodocumento.trim()=="")
    {    
      this.error("Ingrese Número de Documento",'')
    }
    else
    {
      if(this.unidad.numerodocumento.trim().length < 4){
        this.error("El número debe contener como mínimo 4 caracteres",'') 
        return;
      }else{
        
        this.spinner.show();      
        this.dataservice.ListadoDocumentos(this.unidad).subscribe((data:any) =>{ 
        this.spinner.hide();       
        if (data.data=="")
        {    
          this.error("No hay coincidencias",'')        
        }
        else 
        {
          this.respuesta = data.data       
        }         
        this.unidad.numerodocumento = ''
        }); 

      }
      
    }
  }

  limpiar()
  {
    this.auxnumerodocumento = ''
    this.respuesta = [];
  }

  LimpiarUD(){
    this.unidad.tipodocumento = ""
    this.unidad.numerodocumento = ""
    this.unidad.documental = 0
    this.unidad.codtecnico = undefined
    this.unidad.codlegal = undefined

  }

  pasar(codigo,numero)
  {
    this.unidad.numerodocumento = numero
    this.unidad.codigodocumento = codigo
    this.buscarud.coddocumento = codigo
    this.BuscarDocumentos()
    this.modalService.dismissAll();
  
  }

  cerrarventana()
  {
    this.modalService.dismissAll()
  }

  GenerarUD()
  {                  
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success ml-2',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
     })   
  let aux = this.validaciones()        
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
            this.dataservice.GenerarUnidad(this.unidad).subscribe((data:any) =>{ 
              this.spinner.hide();
              swal({
              type: 'success',
              title: ' Se Generaron las UD con éxito',                 
              confirmButtonText: 'Listo'                  
              });  
              this.CargarUnidad()
            }); 
          }
        });                                       
  } 
}

CargarUnidad()
{
  this.spinner.show()              
    this.dataservice.ListadoUnidad(this.unidad).subscribe((dato:any) =>{ 
      this.spinner.hide();
    this.listadodocumental = dato.data                
    }); 
}
validar()
{
  if (this.unidad.documental > 50)
  {
    this.unidad.documental=0
    this.error("Máximo de UD a generar: 50","")
  }
}

resetdoc()
{
  this.unidad.numerodocumento=""  
  this.listadodocumental = []
}

BuscarDocumentos()
{  
  this.buscarud.codud = 0  
  this.spinner.show()    
      this.dataservice.ListadoUnidad(this.unidad).subscribe((dato:any) =>{ 
        this.spinner.hide();
        this.listadodocumental = dato.data                
      });
          
}

ventana(content1,dato)
{
  if (this.tipodocumento.coddocunental!=0)
   {
    this.Documentos(dato)
    if (dato == 'L')
        {this.nombre = "Legal"}
    else 
        {this.nombre = "Técnico"}

    let opciones : NgbModalOptions = {
        size : "lg",
        backdrop : "static"
      };
    this.modalDocumentosTL = this.modalService.open(content1,opciones);
   }
  else 
  { 
    this.error("Selecciona un Documento",'')
  }
}

registro(nuevo,codigodocumental,item)
{   
  this.cargar('')
  this.aux.grabado = ""
  this.tipoUsuario = 'I'
   this.spinner.show()
   this.dataservice.verificacionExistenciaDocsTL(codigodocumental).subscribe((data:any) =>{
     
  
   this.spinner.hide()
    this.aux.codigo_interno = data.data;     
    if (data.data[0].RESULTADO >= '1'){
      this.numerocus = ''
      this.tipoRegistro = 'ESTATAL'
      this.auxdoc = codigodocumental    
      this.aux.tipo_registro = '0'    
      this.aux.codigo_interno = ''
      let opciones : NgbModalOptions = {
          size : "sm",
          backdrop : "static"
        };
      this.modalService.open(nuevo,opciones);  
      let i 
      for (i=1; i<=this.listadodocumental.length; i ++)
      {
        let  opt1 = document.getElementById(i);  
        opt1.classList.remove('celda');  
      }          
      let  opt1 = document.getElementById(item);  
      opt1.classList.add('celda');    
    }else{
      swal({
        type: 'warning',
        title: 'Debe especificar los documentos técnicos y/o legales del CUS a registrar',                 
        confirmButtonText: 'Listo'                  
        }); 
    }       
  });     
  
   
}

actualizara(actualizar,codigodocumental) 
{      
  this.cargar('')
  this.aux.grabado = ""
  this.tipoUsuario = 'I'
  this.dataservice.verificacionExistenciaDocsTL(codigodocumental).subscribe((data:any) =>{
    this.aux.codigo_interno = data.data;     
    if (data.data[0].RESULTADO >= '1'){
      this.aux.tipo_registro = '0'
      this.unidad.nroCUS  = ''
      this.numerocus = ''
      this.auxdoc = codigodocumental  
      
      let opciones : NgbModalOptions = {
          size : "sm",
          backdrop : "static",
          keyboard : false
        };
      this.modalService.open(actualizar,opciones);     
    }else{
      swal({
        type: 'warning',
        title: 'Debe especificar los documentos técnicos y/o legales del CUS a registrar',                 
        confirmButtonText: 'Listo'                  
        }); 
    }       
  }); 
    
}



busquedaCUSparaActualizar(modal, tipo_registro){   
  this.aux.tipo_registro == tipo_registro
  if (tipo_registro=="" || tipo_registro=="0"){
    swal({
      type: 'error',
      title: 'Selecciona el Detalle de la Actualizacion',                 
      confirmButtonText: 'Listo'                  
      });  
  }else if (this.unidad.nroCUS.trim()==""){
    swal({
      type: 'error',
      title: 'Ingrese el Nro. de CUS',                 
      confirmButtonText: 'Listo'                  
      });  
  }else{

    /* VALIDAR EXISTETNCIA DE CUS Y ESTADO DE SUS UDS */    
    this.dataservice.BusquedaCUSparaActualizar(this.unidad).subscribe((data:any) =>{ 
      this.spinner.hide();                           
      this.existeCUS =  data.data[0].codigo_interno   
      if (this.existeCUS =='UD'){
        swal({
          type: 'error',
          title: "El CUS ingresado tiene UDs' que no han Terminado su Proceso",                 
          confirmButtonText: 'Listo'                  
          });  
      }else if (this.existeCUS =='CC'){
        swal({
          type: 'error',
          title: "El CUS ingresado tiene Unidad documental en control de calidad",                 
          confirmButtonText: 'Listo'                  
          });  
      }else{
        if (this.existeCUS !='0'){   
          
          /* ACTUALIZAR ESTADO DE CUS */
          let datos = {
            tipoAccion: '01',
            detalleRegistro: tipo_registro,
            codigo_udocumental: this.auxdoc
           };
      
          this.spinner.show();
          this.dataservice.ActualizarTipoDetalleAccionUD(datos).subscribe((data:any) =>{
            this.spinner.hide();           
            this.resultado = data.data;  
          
            if (this.resultado[0].RESULTADO == 'OK'){
              this.dataservice.BuscarCodigoPredio(this.unidad.nroCUS).subscribe((data:any) =>{
                this.spinner.hide();              
                this.aux.codigo_interno = data.data[0].aux_codinterno   
                this.tipoRegistro = data.data[0].DSC_ASIENTO                     
                this.modaleditar(modal,'X',this.unidad.nroCUS,  this.auxdoc,'')               
                this.existeCUS = '';
                this.spinner.show();
              });             
            }            
          }); 

        }else{
          swal({
            type: 'error',
            title: 'El CUS ingresado no existe',                 
            confirmButtonText: 'Listo'                  
            });  
        }
      }
    });

  }
    



  
}



Documentos(tipo)
{
  this.spinner.show();
  this.dataservice.Documentos(tipo).subscribe((data:any) =>{ 
    this.spinner.hide();           
    this.documentos = data.data   
  }); 
}
agregardoc(codigo)
{
  this.tipodocumento.codtipodoc = codigo  
  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success ml-2',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
   })   
        
    swalWithBootstrapButtons({
      title: '¿Estás seguro agregar el documento?',            
      type: 'warning',
      showCancelButton: true,    
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      reverseButtons: true
      }).then((result) => {
        if (result.value) {      
          this.spinner.show(); 
          this.dataservice.BuscarDocumento(this.tipodocumento).subscribe((data:any) =>{ 
            this.spinner.hide();
            if (data.data[0].CANTIDAD ==1)
              {
                swal({
                  type: 'success',
                  title: 'El documento ya existe',                 
                  confirmButtonText: 'Listo'                  
                  }); 
              }
            else 
            {
              this.spinner.show(); 
              this.dataservice.AgregarDocumento(this.tipodocumento).subscribe((data:any) =>{ 
                this.spinner.hide();
                swal({
                type: 'success',
                title: 'El documento fue agregado',                 
                confirmButtonText: 'Listo'                  
                }); 
                  //this.modalService.dismissAll();      
                  this.modalDocumentosTL.close()                                               
                  this.CargarVerificacion("", this.tipodocumento.coddocunental,this.numeroud, "xx")
              });
            }
                       
          });                        
        }
      });                                        
}

eliminardocumento(coddoc,codtip)
{
  this.tipodocumento.codtipodoc = codtip 
  this.tipodocumento.coddocunental = coddoc  
  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success ml-2',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
   })   
        
    swalWithBootstrapButtons({
      title: '¿Estás seguro eliminar el documento?',            
      type: 'warning',
      showCancelButton: true,    
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      reverseButtons: true
      }).then((result) => {
        if (result.value) {      
          this.spinner.show();          
          this.dataservice.EliminarDocumento(this.tipodocumento).subscribe((data:any) =>{ 
            this.spinner.hide();
            swal({
            type: 'success',
            title: 'El documento fue eliminado',                 
            confirmButtonText: 'Listo'                  
            }); 
            this.CargarVerificacion("", this.tipodocumento.coddocunental,this.numeroud, "xx")           
          });                 
        }
      });  
}

CargarVerificacion(content, codigo,ud, etapa) 
  {
    this.etapaUD = etapa
    this.tipodocumento.coddocunental = codigo 
    this.numeroud = ud  
    this.spinner.show();  
    this.dataservice.CargarVerificacion(codigo).subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.listadoverificacion = data.data;    
      if (content !=''){
        let opciones : NgbModalOptions = {
          size : "lg",
          backdrop : "static"
        };
        this.modalService.open(content,opciones);
      }
                                                 
    }); 
}

EliminarUnidad(codigo,ud)
  { 
  
  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success ml-2',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
  })
  
  swalWithBootstrapButtons({
    title: '¿Estás seguro eliminar la UD?',            
    type: 'warning',
    showCancelButton: true,    
    cancelButtonText: 'No',
    confirmButtonText: 'Si',
    reverseButtons: true
    }).then((result) => {
      if (result.value) {      
        this.spinner.show();          
        this.dataservice.EliminarUnidad(codigo).subscribe((data:any) =>{ 
          this.spinner.hide();
          swal({
          type: 'success',
          title: 'El documento fue eliminado',                 
          confirmButtonText: 'Listo'                  
          }); 
          
          this.CargarUnidad()
          this.CargarVerificacion("",codigo,ud,"xx")
          
        });                 
      }
    });     
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

  validaciones()
  {    
    if (this.unidad.tipodocumento=="")
      {
         this.error("Selecciona el Tipo de Documento",'')
         this.flagvalidar = true 
         return this.flagvalidar
      }
    else if(this.unidad.numerodocumento=="")
     {
      this.error("Escoja Nº de Documento",'')
      this.flagvalidar = true 
      return this.flagvalidar
     }
    else if(this.unidad.documental==0)
     {
      this.error("Ingrese Nº de Unidades Documentales (U.D.)",'')
      this.flagvalidar = true 
      return this.flagvalidar
     }
    else if(this.unidad.codtecnico===undefined)
     {
      this.error("Seleccione Profesional Técnico",'')
      this.flagvalidar = true 
      return this.flagvalidar
     }
     else if(this.unidad.codlegal===undefined)
     {
      this.error("Seleccione Profesional Legal",'')
      this.flagvalidar = true 
      return this.flagvalidar
     }
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
  
  modalregistro(modalpredio,tipo_registro) 
  {        
    if(this.aux.tipo_registro == 'CP'){
      this.tipoRegistro = 'PROVISIONAL'
    }else{
      /* SI ES DEFINITIVO */
      if(this.aux.tipo_registro2 == '0'){
        this.error("Seleccione Tipo de Registro","")
        return
      }
      if(this.aux.tipo_registro2 == 'M'){
        this.tipoRegistro = 'MUNICIPAL'
      }else if(this.aux.tipo_registro2 == 'E'){
        this.tipoRegistro = 'ESTATAL'
      }else if(this.aux.tipo_registro2 == 'O'){
        this.tipoRegistro = 'EMPRESARIAL'
      }
      
    }
   
    if(this.aux.tipo_registro!="" && this.aux.tipo_registro!=="0")
     {
       let datos = {
         tipoAccion: '3',
         detalleRegistro: tipo_registro,
         codigo_udocumental: this.auxdoc
        };
       
      this.spinner.show();      
      this.dataservice.ActualizarTipoDetalleAccionUD(datos).subscribe((data:any) =>{ 
        this.spinner.hide();           
        this.resultado = data.data;   
        
        if (this.resultado[0].RESULTADO == 'OK'){
          this.aux.codigo_interno = ''
          this.flagaux= tipo_registro
          this.aux.coddocumental = this.auxdoc
          this.aux.tipo_registro = tipo_registro

          
          let opciones : NgbModalOptions = {
            size: <any>'xl',
            backdrop : "static",
            keyboard : false
          };
          this.modalService.open(modalpredio,opciones);   
          
          

          this.bloquear()
        }
        
      }); 

      
     }
    else 
    {
      this.error("Selecciona el Detalle de Registro","")
    }
  }

    
  modaleditar(modal,flag,cus, codigodocumental,item)
  {               
    
    this.cargar('')
    this.aux.grabado = ""
    this.aux.coddocumental = codigodocumental
    if (codigodocumental = 0){
      this.numerocus = cus               
        this.flagaux = flag 
        this.spinner.show();
        this.dataservice.BuscarCodigoPredio(cus).subscribe((data:any) =>{
          this.spinner.hide();              
          this.aux.codigo_interno = data.data[0].aux_codinterno   
          this.tipoRegistro = data.data[0].DSC_ASIENTO              
            let opciones : NgbModalOptions = {
              size: <any>'xl',
              backdrop : "static",
              keyboard : false
              };          
              this.modalService.open(modal,opciones);
              this.desbloquear();
              let i 
              for (i=1; i<=this.listadodocumental.length; i ++)
              {
                let  opt1 = document.getElementById(i);  
                opt1.classList.remove('celda');  
              }          
              let  opt1 = document.getElementById(item);  
              opt1.classList.add('celda');                      
        });     
    }else{
      
      this.dataservice.verificacionExistenciaDocsTL(this.aux.coddocumental).subscribe((data:any) =>{  
        this.aux.codigo_interno = data.data;     
        if (data.data[0].RESULTADO >= '1'){
          this.numerocus = cus                 
          this.flagaux = flag 
          this.spinner.show();
          this.dataservice.BuscarCodigoPredio(cus).subscribe((data:any) =>{
            this.spinner.hide();              
            this.aux.codigo_interno = data.data[0].aux_codinterno  
            this.tipoRegistro = data.data[0].DSC_ASIENTO                            
              let opciones : NgbModalOptions = {
                size: <any>'xl',
                backdrop : "static",
                keyboard : false
                };            
                this.modalService.open(modal,opciones);
                this.desbloquear();                 
                let i 
                for (i=1; i<=this.listadodocumental.length; i ++)
                {
                  let  opt1 = document.getElementById(i);  
                  opt1.classList.remove('celda');  
                }          
                let  opt1 = document.getElementById(item);  
                opt1.classList.add('celda'); 
           
          });       
        }else{
          swal({
            type: 'warning',
            title: 'Debe especificar los documentos técnicos y/o legales del CUS a registrar',                 
            confirmButtonText: 'Listo'                  
            }); 
        }       
      }); 
    }
    
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
    this.predio.tipo_registro2 = data.tipo_registro2
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
 let  opt9 = document.getElementById("nav-fablin-tab");
 opt9.classList.add('disabled');
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
 let  opt9 = document.getElementById("nav-fablin-tab");
 opt9.classList.remove('disabled');
 /*let  opt9 = document.getElementById("nav-pol-tab");
 opt9.classList.remove('disabled');*/
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
                    title: ' El Registro se realizó con éxito',                 
                    confirmButtonText: 'Listo'                  
                    });     
                    this.aux.grabado = "1"            
                    this.aux.codigo_interno = data.data[0].ID                    
                    this.dataservice.BuscarCUS(this.aux.codigo_interno).subscribe((dato:any) =>{                      
                      this.spinner.hide();                                  
                      this.numerocus = dato.data[0].NRO_CUS                                          
                    });                         
                    this.desbloquear()
                    this.BuscarDocumentos()                  
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
/*
Desvincular(codigo)
{
  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success ml-2',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
   })  

  swalWithBootstrapButtons({
    title: '¿Estás seguro de desvincular el registro?',            
    type: 'warning',
    showCancelButton: true,    
    cancelButtonText: 'No',
    confirmButtonText: 'Si',
    reverseButtons: true
    }).then((result) => {
      if (result.value) {              
        this.spinner.show();                   
        this.service.Desvincular(codigo).subscribe((data:any) =>{ 
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
              this.error("El Registro no pudo realizarse",'Limitaciones')
            }            
        });          
      }
    });
} */

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
              title: ' El Registro se realizó con éxito',                 
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
              title: ' El Registro se realizó con éxito',                 
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
  //let aux = undefined
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
                title: ' El Registro se realizó con éxito',                 
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
                title: ' El Registro se realizó con éxito',                 
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
        this.service.Construcciones(data).subscribe((data:any) =>{ 
        this.spinner.hide();                      
          if (data.data[0].RESULTADO=="OK")
            {
              swal({
              type: 'success',
              title: ' El Registro se realizó con éxito',                 
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
              title: ' El Registro se realizó con éxito',                 
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

 TerminarProceso(CODIGO_UDOCUMENTAL, NRO_UD, CODIGO_INTERNO){
   
   
  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success ml-2',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
   })  

  swalWithBootstrapButtons({
    title: '¿Está Ud seguro(a) de finalizar la UD ' +  NRO_UD +' ?',            
    type: 'warning',
    showCancelButton: true,    
    cancelButtonText: 'No',
    confirmButtonText: 'Si',
    reverseButtons: true
    }).then((result) => {
      if (result.value) {    
        let dataarray = {
          CODIGO_UDOCUMENTAL : CODIGO_UDOCUMENTAL,
          USUARIO_MODIFICACION : this.unidad.codigousuario,
          CODIGO_INTERNO : CODIGO_INTERNO,
          ESTADO : 0
        }
        
        
        this.spinner.show();                   
        this.dataservice.TerminarProceso(dataarray).subscribe((data:any) =>{
        
          if (data.data[0].RESULTADO=="TITULAR"){
            this.error("No se ha especificado el Titular del Predio", "Control de Calidad")
            this.spinner.hide();
          }else if (data.data[0].RESULTADO=="APORTE"){
            this.error("No se ha realizado el aporte de poligono", "Control de Calidad")
            this.spinner.hide();
          }else if (data.data[0].RESULTADO=="PROCESO"){
              this.error("No es posible cerrar proceso porque CUS se encuentra en Control de Calidad", "Control de Calidad")
              this.spinner.hide();
          }else if(data.data[0].RESULTADO=="CERRADO"){
            this.error("No es posible cerrar U.D.", "U.D. se encuentra cerrado")
            this.spinner.hide();
          }else if(data.data[0].RESULTADO=="SINACTIVIDAD"){
            this.error("No cuenta con actividad POI para este año", "Actividad POI") 
            this.spinner.hide();
          }else if(data.data[0].RESULTADO=="OK" || data.data[0].RESULTADO=="NOTIFICADO"){
            this.dataservice.ActualizaNotificacion(dataarray).subscribe((data:any) =>{
              this.spinner.hide();
              if (data.data[0].RESULTADO=="OK")
              {
                swal({
                  type: 'success',
                  title: 'Se ha cerrado la U.D. ' + NRO_UD, 
                  confirmButtonText: 'Listo'  
                  });      
                  this.BuscarDocumentos();
              }
              else{
                this.spinner.hide();
                this.error("Ha ocurrido un inconveniente", "Intentar nuevamente")
              }
            });
          }else{
            this.spinner.hide();
            this.error("Ha ocurrido un inconveniente", "Intentar nuevamente")
          }
                
        });         
      }
    });
 }

 openImprimirCaratula(modal){
  this.numerocus = ''
    //this.auxdoc = codigodocumental    
    this.aux.tipo_registro = '0'    
    let opciones : NgbModalOptions = {
        size : "sm",
        backdrop : "static"
      };
    this.modalService.open(modal,opciones);    
 }

 SeleccionTipoConsulta(){
  
  if (this.ConsultaCaratula.tipo == '1'){
    this.activado == true;
  }else{
    this.activado == false;
  }
 }

 imprimirCaratula(content){
    
  if(this.ConsultaCaratula.numero.trim() == ''){
    this.error("Ingrese Nro de CUS",'') 
    return;
  }
  //this.codigo_internoAprobar = codigo_interno;
  this.dataservice.existeCUS(this.ConsultaCaratula.numero).subscribe((data:any) =>{
    
    if (data.data[0].RESULTADO == 1){
      this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {  
      });
      this.urlPDF = this.dataservice.API_URL+"Imprimir_caratula/"+ 
        this.ConsultaCaratula.numero;
        this.ConsultaCaratula.numero='';
    }else{
      this.error("El número de CUS no existe",'') 
      return;
     }; 
    
    })
  
  
}


openactualizarProfesionales(actualizar,codigodocumental) 
{    

  this.dataservice.traerProfesionalesUD(codigodocumental).subscribe((data:any) =>{
    
    if (data.data[0] != []){
      this.updateRespUD.codud = codigodocumental;
      this.updateRespUD.codtecnico = data.data[0].TECNICO;  
      this.updateRespUD.codLegal = data.data[0].LEGAL;   
      
      let opciones : NgbModalOptions = {
          size : "sm",
          backdrop : "static"
        };
      this.modalService.open(actualizar,opciones);     
    }else{
      swal({
        type: 'warning',
        title: 'No se ha encontrado la U.D, Intente nuevamente',                 
        confirmButtonText: 'Listo'                  
        }); 
    }       
  }); 
    
}

actualizarProfesionales(){
  this.spinner.show();
  this.dataservice.actualizarProfesionales(this.updateRespUD).subscribe((data:any) =>{
    this.spinner.hide();           
    this.resultado = data.data;  
  
    if (this.resultado[0].RESULTADO == 'OK'){
      swal({
        type: 'success',
        title: 'Se ha realizado la actualización de los profesionales',                 
        confirmButtonText: 'Listo'                  
        }); 
        this.BuscarDocumentos();
    }else{
      swal({
        type: 'error',
        title: 'Se ha presentado inconveniente en la actualización',                 
        confirmButtonText: 'Listo'                  
        });  
    }   
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

cambiarTipoRegisto2(){
  if (this.aux.tipo_registro !== 'CD'){
    this.aux.tipo_registro2 = '0'
  }  
}

}
