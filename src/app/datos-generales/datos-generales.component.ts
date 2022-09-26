import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver } from '@angular/core';
import { NgbModal, NgbModalRef , NgbModalOptions,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { MigracionService } from '../services/migracion.service';
import { DatosgeneralesService } from '../services/datosgenerales.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html',
  styleUrls: ['./datos-generales.component.css']
})
export class DatosGeneralesComponent implements OnInit {
  
  rows: number = 0;
  rows2: number = 0;
  active : boolean
  departamentos : any = [];
  provincias : any = [];
  distritos : any = [];
  condicion= [];
  calificacion = [];
  via = [];
  detalle = [];
  habilitacion =[];
  competencia =[];

  ubigeo = {
    coddepa : 0,
    codprov : 0,
    coddist : 0,
    tipo    : 0    
  }

  datosgenerales ={
    tipoproceso: 0,
    unidaddoc: '',
    tipo_registro:'',
    tipo_registro2:'',
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
    reserva : '3',
    coddepa : '',
    codprov : '',
    coddist: '',
    documentosTL: [],
    codigodocumento: '',
    nro_documento: '',
    solicitud_ingreso: ''
  }

  filtro = {
    valor : '',
    valorCus : '', 
    codigointerno : 0
  };
  expediente_relacionados : [];
  cus_relacionados : [];
  ultimo = 0

  //codigo_interno = 0
  @Input('bloquear')  bloquear;
  @Input('codigo_interno')  codinterno;
  @Input('flagaux')  flagaux;
  @Input('tipoUsuario')  tipo_Usuario;
  @Input('coddocumental')  coddocumental;
  @Input('codigodocumento')  codigodocumento;
  @Input('nro_documento')  nro_documento;
  @Input('tipo_registro')  tipo_registro;
  @Input('tipo_registro2')  tipo_registro2;
  @Input('ID')  codigointer;


  @Output('callbackcodigo') codigosalida = new EventEmitter();
  @Output('callback') salida = new EventEmitter();

  constructor(
    private MigracionService: MigracionService,
    private spinner: NgxSpinnerService,
    private dataservice : DatosgeneralesService,
    private modalService: NgbModal,
  ) {   
    
    this.cargando();
    this.cargarcombos(); 
    this.setcombos();    
    
  }
  
  ngOnChanges(){    
    
    this.datosgenerales.tipoproceso = this.codinterno;   
    this.filtro.codigointerno = this.codinterno;    
    this.CargarListadoExpedientesRelacionados() 
    this.CargarListadoCUSRelacionados()
    if (this.datosgenerales.tipoproceso !=0 )
    {                         
      this.cargando();
      this.CargarDatosGenerales(this.datosgenerales.tipoproceso)  
                 
    }
    this.bloquear=='1'? this.active=true: this.active = false
  }

  ngOnInit() {         
   
    this.datosgenerales.unidaddoc = this.coddocumental   

    if(this.tipo_registro == 'CP'){
      this.datosgenerales.tipo_registro = 'P'
    }else{
      /* DEFINITIVO */
      this.datosgenerales.tipo_registro2 = this.tipo_registro2
    }

    this.datosgenerales.tipo_registro = this.tipo_registro    
    this.validardatosgenerales(this.datosgenerales)
    
  }

  cargando()
  {    
    this.spinner.show();
    setTimeout(() => {   
      this.spinner.hide();
    }, 5000);
  }

  setcombos(){
    this.datosgenerales.condicion = '0'
    this.datosgenerales.calificacion = '0'
    this.datosgenerales.competencia = '0'    
    this.datosgenerales.via = '0'
    this.datosgenerales.detalle = '0'
    this.datosgenerales.habilitacion = '0'    

  }

  resetcalif()
  {
    this.datosgenerales.calificacion = "0"
  }

  CargarDatosGenerales(codigo)
  {
   

    this.spinner.show();
    this.MigracionService.ObtenerData('P',codigo).subscribe((data:any) =>{               
      let aux = data.data[0].CODIGO_UBIGEO      
      let auxdep =aux.substr(2,2)      
      let auxpro =aux.substr(4,2)      
      let auxdis =aux.substr(6,2)      
      this.obtenerubigeo(auxdep,0,0,2) 
      this.obtenerubigeo(auxdep,auxpro,0,3)             
      this.datosgenerales.condicion       = (data.data[0].ESTADO_ASIENTO=='')?"0":data.data[0].ESTADO_ASIENTO  
      this.datosgenerales.calificacion    = (data.data[0].ESTADO_CALIFICACION=='')?"0":data.data[0].ESTADO_CALIFICACION
      this.datosgenerales.denominacion    = data.data[0].DENOMINACION_INMUEBLE
      this.datosgenerales.via             = (data.data[0].TIPO_VIA=='')?"0":data.data[0].TIPO_VIA  
      this.datosgenerales.direccion       = (data.data[0].DIRECCION_INMUEBLE==" ")?"":data.data[0].DIRECCION_INMUEBLE
      this.datosgenerales.numero          = data.data[0].NRO_INMUEBLE  
      this.datosgenerales.manzana         = data.data[0].NRO_MANZANA  
      this.datosgenerales.lote            = data.data[0].NRO_LOTE  
      this.datosgenerales.detalle         = data.data[0].DIRECCION_DETALLE  
      this.datosgenerales.detalledescrip  = data.data[0].NUMERACION_DETALLE  
      this.datosgenerales.piso            = data.data[0].PISO_UBICACION      
      this.datosgenerales.habilitacion    = (data.data[0].TIPO_HABILITACION=='')?"0":data.data[0].TIPO_HABILITACION  
      this.datosgenerales.descripcion     = data.data[0].NMB_URBANIZACION  
      this.datosgenerales.referencia      = data.data[0].REFERENCIA_UBICACION
      this.datosgenerales.competencia     = (data.data[0].CODIGO_COMPETENCIA=='')?"0":data.data[0].CODIGO_COMPETENCIA
      this.datosgenerales.reserva         = data.data[0].RESERVADO      
      this.ubigeo.coddepa                 = auxdep
      this.ubigeo.codprov                 = auxpro
      this.ubigeo.coddist                 = auxdis
      this.datosgenerales.coddist         = auxdis
      this.datosgenerales.codigodocumento = this.codigodocumento
      this.datosgenerales.nro_documento   = this.nro_documento
      this.datosgenerales.solicitud_ingreso  = data.data[0].SOLICITUD_INGRESO 

      if(this.datosgenerales.denominacion.length <= 33){
        this.rows = 1
      }else if(this.datosgenerales.denominacion.length <= 66){
        this.rows = 2
      }else if(this.datosgenerales.denominacion.length <= 99){
        this.rows = 3
      }else if(this.datosgenerales.denominacion.length <= 132){
        this.rows = 4
      }else if(this.datosgenerales.denominacion.length <= 165){
        this.rows = 5
      }else if(this.datosgenerales.denominacion.length <= 198){
        this.rows = 6
      }else{
        this.rows = 7
      }

      if(this.datosgenerales.direccion.length <= 50){
        this.rows2 = 1
      }else if(this.datosgenerales.direccion.length <= 100){
        this.rows2 = 2
      }else if(this.datosgenerales.direccion.length <= 150){
        this.rows2 = 3
      }else if(this.datosgenerales.direccion.length <= 200){
        this.rows2 = 4
      }else if(this.datosgenerales.direccion.length <= 250){
        this.rows2 = 5
      }else if(this.datosgenerales.direccion.length <= 300){
        this.rows2 = 6
      }else{
        this.rows2 = 7
      }

      this.validardatosgenerales(this.datosgenerales)
      this.spinner.hide(); 
    }); 
  }

  validardatosgenerales(data){ 
      this.salida.emit(data);   
      this.enviarcodigodepa(data);
  }
  
  validarentero(numero,tipo)
  {
      let aux_1 =numero.substr(0,1)       
      if (aux_1 =='0')
      {
        this.error("Número no permite 0 a la izquierda")
        if(tipo==1)
        {this.datosgenerales.numero = ""}
        if(tipo==2)
        {this.datosgenerales.piso = 0}

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

  enviarcodigodepa(data){
    this.codigosalida.emit(data);   
  }

  cargarcombos(){    
    this.dataservice.CondicionRegistro().subscribe((data:any) =>{       
      this.condicion = data.data;  
      
      if (this.codinterno == '' || this.codinterno == '0'){
        this.condicion.splice(0 ,2) //SE ELIMINA CANCELADO Y NO DETERMINADO
      }
      /*
      else{
        if (this.tipo_Usuario=='E')
        {
          this.condicion.splice(0 ,1) // SE ELIMINA CANCELADO
        }
      }
      */
    }); 

    this.dataservice.Calificacion().subscribe((data:any) =>{       
      this.calificacion = data.data;                                            
    }); 

    this.dataservice.Via().subscribe((data:any) =>{       
      this.via = data.data;                                            
    }); 

    this.dataservice.Detalle().subscribe((data:any) =>{       
      this.detalle = data.data;                                            
    }); 

    this.dataservice.Habilitacion().subscribe((data:any) =>{       
      this.habilitacion = data.data;                                            
    }); 

    this.dataservice.Competencia().subscribe((data:any) =>{       
      this.competencia = data.data;                                            
    });     
    this.obtenerubigeo(0,0,0,1);                   
  }
  obtenercodigodistrito(coddist)
  {
    this.datosgenerales.coddist = coddist    
  }
  obtenerubigeo(coddepa,codprov,coddist,tipo)
  {
    this.ubigeo.coddepa = coddepa
    this.ubigeo.codprov = codprov
    this.ubigeo.coddist = coddist
    this.ubigeo.tipo  = tipo
    this.datosgenerales.coddepa = coddepa
    this.datosgenerales.codprov = codprov          
    this.MigracionService.ObtenerUbigeo(this.ubigeo).subscribe((data : any) =>{    
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



open_expedientes_relacionados(content){
  let opciones : NgbModalOptions = {
    size : "sm",
    backdrop : "static"
  };
  this.CargarListadoExpedientesRelacionados(); 
  this.filtro.valor = ''
  this.modalService.open(content,opciones);
}

CargarListadoExpedientesRelacionados(){
  this.spinner.show();
  this.MigracionService.CargarListadoExpedientesRelacionados(this.filtro).subscribe((data : any) =>{    
    this.spinner.hide();
    this.expediente_relacionados = data.data
  });  
}

BorrarFiltroExpediente(){
  this.filtro.valor = ''
}

AgregarExpediente(){
  if(this.filtro.valor == ''){
    swal({
      type: 'info',
      title: 'Debe ingresar el Nro. de expediente',                 
      confirmButtonText: 'Listo'                  
      });
      return
  }
  this.spinner.show();
  this.MigracionService.AgregarExpediente(this.filtro).subscribe((data : any) =>{    
    this.spinner.hide();
    if (data.data[0].RESULTADO == 'EXISTE'){
      this.error("El Nro. de expediente " + this.filtro.valor + ' ya se encuentra en la lista')
    }else if(data.data[0].RESULTADO == 'NOEXISTE'){
      this.error("El Nro. de expediente " + this.filtro.valor + ' no existe en el SID')
    }else{
      swal({
        type: 'success',
        title: 'El Expediente fue registrado satisfactoriamente',                 
        confirmButtonText: 'Listo'                  
        });
        this.CargarListadoExpedientesRelacionados()
    }
  });  
}

QuitarExpediente(expediente){
  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success ml-2',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
   })  
  swalWithBootstrapButtons({
    title: '¿Estás seguro de quitar el Nro de expediente ' + expediente + '?',            
    type: 'warning',
    showCancelButton: true,    
    cancelButtonText: 'No',
    confirmButtonText: 'Si',
    reverseButtons: true
    }).then((result) => {
      if (result.value) {      
        this.spinner.show();    
        this.filtro.valor = expediente               
        this.MigracionService.QuitarExpediente(this.filtro).subscribe((data:any) =>{                       
          this.spinner.hide();   
          if (data.data[0].RESULTADO=="ERROR")
          {
            this.error("Ha ocurrido un inconveniente")
          }
          else 
          {
            swal({
              type: 'success',
              title: 'El registro fue eliminado satisfactoriamente',                 
              confirmButtonText: 'Listo'                  
              });
              this.CargarListadoExpedientesRelacionados()
          }
                    
        });  
                
      }
    });
}


open_cus_relacionados(content){
  let opciones : NgbModalOptions = {
    size : "lg",
    backdrop : "static"
  };
  this.CargarListadoCUSRelacionados();       
  this.filtro.valor = ''
  this.modalService.open(content,opciones);
}

CargarListadoCUSRelacionados(){
  this.spinner.show();
  this.MigracionService.CargarListadoCusRelacionados(this.filtro).subscribe((data : any) =>{    
    this.spinner.hide();
    this.cus_relacionados = data.data
  });  
}

BorrarFiltroCus(){
  this.filtro.valorCus = ''
}

AgregarCus(){
  if(this.filtro.valorCus == ''){
    swal({
      type: 'info',
      title: 'Debe ingresar el Nro. de CUS',                 
      confirmButtonText: 'Listo'                  
      });
      return
  }
  this.spinner.show();
  this.MigracionService.AgregarCus(this.filtro).subscribe((data : any) =>{    
    this.spinner.hide();
    if (data.data[0].RESULTADO == 'EXISTE'){
      this.error("El Nro. de CUS " + this.filtro.valorCus + ' ya se encuentra en la lista')
    }else if(data.data[0].RESULTADO == 'NOEXISTE'){
      this.error("El Nro. de CUS " + this.filtro.valorCus + ' no existe')
    }else{
      swal({
        type: 'success',
        title: 'El CUS fue registrado satisfactoriamente',                 
        confirmButtonText: 'Listo'                  
        });
        this.CargarListadoCUSRelacionados()
    }
  });
}

QuitarCus(codigointerno, cus){
  const swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success ml-2',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false,
   })  
  swalWithBootstrapButtons({
    title: '¿Estás seguro de quitar el Nro de CUS ' + cus + '?',            
    type: 'warning',
    showCancelButton: true,    
    cancelButtonText: 'No',
    confirmButtonText: 'Si',
    reverseButtons: true
    }).then((result) => {
      if (result.value) {      
        this.spinner.show();    
        this.filtro.valorCus = codigointerno               
        this.MigracionService.QuitarCus(this.filtro).subscribe((data:any) =>{                       
          this.spinner.hide();   
          if (data.data[0].RESULTADO=="ERROR")
          {
            this.error("Ha ocurrido un inconveniente")
          }
          else 
          {
            swal({
              type: 'success',
              title: 'El registro fue eliminado satisfactoriamente',                 
              confirmButtonText: 'Listo'                  
              });
              this.CargarListadoCUSRelacionados()
          }
                    
        });  
                
      }
    });  
}


}
