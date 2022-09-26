import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'; 
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { estandarizacionService } from '../services/estandarizacion.service';


@Component({
  selector: 'app-estandarizacion',
  templateUrl: './estandarizacion.component.html',
  styleUrls: ['./estandarizacion.component.css']
})
export class EstandarizacionComponent implements OnInit {

  //Paginacion
  itemsPerPage: number = 20;
  page: any = 1;
  previousPage: any;
  total : any = 0;  

  resetVar = false;
  afuConfig = {
    uploadAPI: {
        url:this.dataservice.API_URL+"AdjuntarActoMasivo/" + 100,
      },
      hideResetBtn: true,
      uploadBtnText:"Adjuntar Archivo",
      uploadMsgText: "",
      formatsAllowed: ".CSV,.csv"
  };
  dataAdjuntadoActo : any = [];
  estado_adjuntarActo : boolean = true;
  dataAdjuntadoCUS : any = [];
  estado_adjuntarCUS : boolean = true;
  arrayListaGobRegionales = [];
  id_adjuntadoCUS: number = null
  id_adjuntadoACTO: number = null

  arrayResultadoVinculacion = [];
  arrayResultadoVinculacionCUS = [];

  arrayListaNivelGobierno = [];
  arrayListaNivelGeneral = [];
  arrayListaNivelSectorial = [];
  arrayListaOrganismo = [];

  resetVarCUS = false;
  afuConfigCUS = {
    uploadAPI: {
        url:this.dataservice.API_URL+"AdjuntarCusMasivo/" + 100,
      },
      hideResetBtn: true,
      uploadBtnText:"Adjuntar Archivo",
      uploadMsgText: "",
      formatsAllowed: ".CSV,.csv"
  };

  aux = {
    select : '',
    ent_nombre : '',
    ent_ruc    : '',
    jur_nombre : '',
    jur_ruc    : '',
    page: this.page,
    records : this.itemsPerPage,
  }

  datos = {
    accion: '',
    ruc: '',
    nombreEstandarizado: '',
    nombreLiteral: '',
    siglas: '',
    estado: '',
    org: '',
    nivelGobierno: '',
    nivelGeneral: '',
    nivelSectorial: '',
    organismo: '',
    usuario: '',
    fecha: '',
    codigo_institucion: '',
    usuarioCreacion: ''
  }

  datosEstCUSIndividual = {
    nroCUS: '',
    nroRUC: '',
    usuarioCreacion: this.datos.usuarioCreacion
  }
  datosEstCUSListado = {
    nroRUC: '',
    id_adjuntado: '',
    usuarioCreacion: this.datos.usuarioCreacion
  }

  datosEstActoIndividual = {
    nroCodigo: '',
    nroRUC: ''
  }
  datosEstActoListado = {
    nroRUC: '',
    id_adjuntado: '',
    usuarioCreacion: this.datos.usuarioCreacion
  }

  datosVincularNiveles = {
    nroRUC: '', //primer nivel
    RucUnidadEjecutora: '', //segundo nivel
    RucUnidadxxx: '' //tercer nivel
  }

  datosVincularPredios = {
    nroRUCEntidadPrimerNivel: '11111111111',
    idgobiernoRegional: '0',
    nroRUCGobReg: ''
  }


  bloquear = '0'
  dataEntidades : any = [];
  dataresultado: any = [];
  dataGrabado: any = [];

  constructor(
    private spinner: NgxSpinnerService, 
    private modalService: NgbModal,
    private dataservice : estandarizacionService ) { 

      this.afuConfigCUS.uploadAPI.url = this.dataservice.API_URL+"AdjuntarCusMasivo/" + 100;
      this.afuConfig.uploadAPI.url = this.dataservice.API_URL+"AdjuntarActoMasivo/" + 100;

      this.datos.usuarioCreacion =  sessionStorage.getItem('codigopersonal')
      
    }

  ngOnInit() {
    
      this.aux.select = ''
      this.cargarListaGobRegionales()
      this.cargarListaNivelGobierno()
      this.cargarListaNivelGeneral()
      this.cargarListaNivelSectorial()
      this.cargarListaOrganismo()
    
  }

  listado_entidades(modal){   
      this.bloquear = '1'                
      let opciones : NgbModalOptions = {
          size : "lg",
          backdrop : "static"
        };
      this.modalService.open(modal,opciones);    
  }

  datos_entidad(modal, item){         
    if(item == -1){
      this.limpiarCampos()
      this.datos.accion = 'G'
      this.bloquear = '0'
    }else{
      this.datos.accion = 'M'
      this.bloquear = '1'
      this.datos.codigo_institucion = this.dataEntidades[item].CODIGO_INSTITUCION
      this.datos.ruc = this.dataEntidades[item].RUC
      this.datos.nombreEstandarizado = this.dataEntidades[item].NOMBRE_ESTANDARIZADO
      this.datos.nombreLiteral = this.dataEntidades[item].NOMBRE_LITERAL
      this.datos.siglas = this.dataEntidades[item].SIGLAS
      this.datos.estado = this.dataEntidades[item].ENTI_ESTADO
      this.datos.org = this.dataEntidades[item].UNIDAD_ORGANICA
      this.datos.nivelGobierno = this.dataEntidades[item].NIVEL_GOBIERNO
      this.datos.nivelGeneral = this.dataEntidades[item].NIVEL_GENERAL
      this.datos.nivelSectorial = this.dataEntidades[item].NIVEL_SECTORIAL
      this.datos.organismo = this.dataEntidades[item].NIVEL_ORGANISMO
      this.datos.usuario = this.dataEntidades[item].ENT_USUARIO
      this.datos.fecha = this.dataEntidades[item].ENTI_FEC_ACT
    }
    
    let opciones : NgbModalOptions = {
        size : "lg",
        backdrop : "static"
      };
    this.modalService.open(modal,opciones);    
  }

  limpiarCampos(){
    this.datos.ruc = ""
    this.datos.nombreEstandarizado = ""
    this.datos.nombreLiteral = ""
    this.datos.siglas = ""
    this.datos.estado = ""
    this.datos.org = ""
    this.datos.nivelGobierno = ""
    this.datos.nivelGeneral = ""
    this.datos.nivelSectorial = ""
    this.datos.organismo = ""
    this.datos.usuario = ""
    this.datos.fecha = ""
  }

buscarLiterales(){
  if (this.aux.select ==''){
    this.error("Indique el Tipo de Administrado")
    return
  }
  // if (this.aux.ent_nombre!='' || this.aux.ent_ruc!='')
  // {
    console.log(this.aux);
    this.dataservice.buscarLiterales(this.aux).subscribe((data:any) =>{       
      this.dataEntidades = data.data;  
      if(this.dataEntidades.length == 0){
        this.total = 0
      }else{
        console.log(this.dataEntidades)        
        console.log(this.dataEntidades[0].TOTAL);
        this.total = ( this.dataEntidades.length > 0 ) ? this.dataEntidades[0].TOTAL : 0;      
        this.spinner.hide();
        //this.numero_cus = dato.data[0].NRO_CUS;
      }
      console.log(this.total)
    });    
  // }
  // else
  // {
  //   this.error("Ingrese Entidad o RUC")
  // }
}

resetearpag(){
  this.aux.page = 1;
  this.buscarLiterales(); 
}

loadPage(page: number) {
  if (page !== this.previousPage) {
    this.previousPage = page;
    this.buscarLiterales();
  }  
}

grabarEntidad(){
  if (this.datos.ruc.trim() ==""){
    this.error("Ingrese Nro de RUC")
    return
  }else if(this.datos.nombreEstandarizado.trim() ==""){
    this.error("Ingrese Nombre de Estandarizacion")
    return
  }else if(this.datos.nombreLiteral.trim() ==""){
    this.error("Ingrese Nombre de Literal")
    return
  }else if(this.datos.estado.trim() ==""){
    this.error("Indique Estado")
    return
  }else if(this.datos.nivelGobierno.trim() ==""){
    this.error("Seleccione Nivel de Gobierno")
    return
  }else if(this.datos.nivelGeneral.trim() ==""){
    this.error("Seleccione Nivel General")
    return
  }else if(this.datos.nivelSectorial.trim() ==""){
    this.error("Seleccione Nivel Sectorial")
    return
  }else if(this.datos.organismo.trim() ==""){
    this.error("Seleccione Organismo")
    return
  }
  swal({
    title: '¿Esta Ud. seguro de guardar el registro?',
    text: "¡No podrás revertir esto!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonText: 'Cancelado',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Guardar!'
    
  }).then((result) => {
    if (result.value) {        
      this.spinner.show();
      console.log(this.datos)
      this.dataservice.grabarEntidad(this.datos).subscribe((data : any) =>{
        this.dataGrabado = data.data;  
        console.log(this.dataGrabado)
        if (this.dataGrabado[0].RESULTADO == 'OK'){
          this.dataEntidades = []
          this.spinner.hide()
          this.modalService.dismissAll();
          swal(
            'Se ha registro satisfactoriamente!',
            'El registro ha sido registrado.',
            'success' 
          )
        }else if (this.dataGrabado[0].RESULTADO == 'SIN RUC'){
          this.spinner.hide()
          swal(
          'Error!',
          'Ruc ingresado no existe',
          'error'
          )
        }else{
          this.spinner.hide()
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


  vent_entidad(modalentidades,modal_datos,aux)
  {
    if (this.aux.ent_nombre!='' || this.aux.ent_ruc!='')
      {
        if (this.aux.ent_nombre!='')
          {
            this.bloquear = '1'
            this.listado_entidades(modalentidades)
          }
        if (this.aux.ent_ruc!='')
          {
            this.bloquear = '0'
            this.datos_entidad(modal_datos, 1)
          }
      }
    else
    {
      this.error("Ingrese Entidad o RUC")
    }
  }

  listado_juridica(modal){   
    this.bloquear = '1'                
    let opciones : NgbModalOptions = {
        size : "lg",
        backdrop : "static"
      };
    this.modalService.open(modal,opciones);    
  }

  datos_juridica(modal){          
  let opciones : NgbModalOptions = {
      size : "lg",
      backdrop : "static"
    };
  this.modalService.open(modal,opciones);    
}

 vent_juridica(modaljuridica,modal_juridica)
  {
    if (this.aux.jur_nombre!='' || this.aux.jur_ruc!='')
      {
        if (this.aux.jur_nombre!='')
          {            
            this.listado_juridica(modaljuridica)
          }
        if (this.aux.jur_ruc!='')
          {
        
            this.datos_juridica(modal_juridica)
          }
      }
    else
    {
      this.error("Ingrese Nombre o RUC")
    }
  }


  
VincularCusIndividual(){
  if (this.datosEstCUSIndividual.nroCUS.trim() ==""){
    this.error("Ingrese Nº de CUS")
    return
  }else if(this.datosEstCUSIndividual.nroRUC.trim() ==""){
    this.error("Ingrese Nº de RUC")
    return
  }

  swal({
    title: '¿Esta Ud. seguro(a) de vincular el Nro de CUS ' + this.datosEstCUSIndividual.nroCUS + ' al RUC ' + this.datosEstCUSIndividual.nroRUC +  '?',
    text: "¡No podrás revertir esto!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonText: 'Cancelado',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Vincular!'
    
  }).then((result) => {
    if (result.value) {        
      console.log(this.datosEstCUSIndividual)
      this.spinner.show();
      this.dataservice.VincularCusIndividual(this.datosEstCUSIndividual).subscribe((data : any) =>{
        this.dataresultado = data.data;           
  
        if (this.dataresultado[0].RESULTADO == 'SIN CUS'){
          this.error('El Nro de CUS ingresado no existe');
          this.spinner.hide()
        }else if(this.dataresultado[0].RESULTADO == 'SIN RUC'){
          this.error('El Nro de RUC ingresado no existe')
          this.spinner.hide()
        }else if(this.dataresultado[0].RESULTADO == 'OK'){
          swal(
            'El Nro de CUS ' + this.datosEstCUSIndividual.nroCUS + ' ha sido vinculado satisfactoriamente!',
            'Vinculacion finalizado.',
            'success' 
          )
          this.datosEstCUSIndividual.nroCUS = ''
          this.datosEstCUSIndividual.nroRUC = ''
          this.spinner.hide()
        }
      });
    }
  })   
}

AdjuntarCusMasivo(event){
  this.afuConfigCUS.uploadAPI.url = this.dataservice.API_URL+"AdjuntarCusMasivo/" + 100;
  this.dataAdjuntadoCUS = JSON.parse(event.response); 
  console.log(event.response)
  this.estado_adjuntarCUS = this.dataAdjuntadoCUS.data.error;
  this.id_adjuntadoCUS = this.dataAdjuntadoCUS.data.ID;
  this.datosEstCUSListado.id_adjuntado = this.dataAdjuntadoCUS.data.ID;
  console.log(this.estado_adjuntarCUS)
  
}

VincularCusMasivo(){
  if (this.datosEstCUSListado.id_adjuntado.trim() ==""){
    this.error("Suba un archivo csv")
    return
  }else if(this.datosEstCUSListado.nroRUC.trim() ==""){
    this.error("Ingrese Nº de RUC")
    return
  }

  this.spinner.show();
  this.datosEstCUSListado.id_adjuntado = this.dataAdjuntadoCUS.data.ID
  this.dataservice.VincularCusMasivo(this.datosEstCUSListado).subscribe((data:any) =>{ 
    this.spinner.hide();           
    this.arrayResultadoVinculacionCUS = data.data;     

    if (this.arrayResultadoVinculacionCUS[0].RESULTADO == 'SIN RUC'){
      this.error('El Nro de RUC ingresado no existe');
      this.spinner.hide()
    }else if(this.arrayResultadoVinculacionCUS[0].RESULTADO == 'OK'){
      swal(
        'El RUC ' + this.datosEstCUSListado.nroRUC + ' ha sido vinculado a los CUS cargados en el archivo csv!',
        'Vinculacion finalizado.',
        'success' 
      )
      this.id_adjuntadoCUS = null
      this.datosEstCUSListado.id_adjuntado = ''
      this.datosEstCUSListado.nroRUC = ''
      this.estado_adjuntarCUS = true;
      this.resetVarCUS = true;
      console.log(this.arrayResultadoVinculacionCUS)
    }
  }); 
}




VincularActoIndividual(){
  if (this.datosEstActoIndividual.nroCodigo.trim() ==""){
    this.error("Ingrese Codigo de Acto")
    return
  }else if(this.datosEstActoIndividual.nroRUC.trim() ==""){
    this.error("Ingrese Nº de RUC")
    return
  }

  swal({
    title: '¿Esta Ud. seguro(a) de vincular el Codigo de Acto ' + this.datosEstActoIndividual.nroCodigo + ' al RUC ' + this.datosEstActoIndividual.nroRUC +  '?',
    text: "¡No podrás revertir esto!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonText: 'Cancelado',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Vincular!'
    
  }).then((result) => {
    if (result.value) {        
      console.log(this.datosEstActoIndividual)
      this.spinner.show();
      this.dataservice.VincularActoIndividual(this.datosEstActoIndividual).subscribe((data : any) =>{
        this.dataresultado = data.data;           
  
        if (this.dataresultado[0].RESULTADO == 'SIN CODIGO'){
          this.error('El Codigo de Acto ingresado no existe');
          this.spinner.hide()
        }else if(this.dataresultado[0].RESULTADO == 'SIN RUC'){
          this.error('El Nro de RUC ingresado no existe')
          this.spinner.hide()
        }else if(this.dataresultado[0].RESULTADO == 'OK'){
          swal(
            'El Codigo de Acto ' + this.datosEstActoIndividual.nroCodigo + ' ha sido vinculado satisfactoriamente!',
            'Vinculacion finalizado.',
            'success' 
          )
          this.datosEstActoIndividual.nroCodigo = ''
          this.datosEstActoIndividual.nroRUC = ''
          this.spinner.hide()
        }
      });
    }
  })
}

AdjuntarActoMasivo(event){
  this.afuConfig.uploadAPI.url = this.dataservice.API_URL+"AdjuntarActoMasivo/" + 100;
  this.dataAdjuntadoActo = JSON.parse(event.response); 
  console.log(event.response)
  this.estado_adjuntarActo = this.dataAdjuntadoActo.data.error;
  this.id_adjuntadoACTO = this.dataAdjuntadoActo.data.ID;
  this.datosEstActoListado.id_adjuntado = this.dataAdjuntadoActo.data.ID;
  console.log(this.estado_adjuntarActo)
}

VincularActoMasivo(){
  if (this.datosEstActoListado.id_adjuntado.trim() ==""){
    this.error("Suba un archivo csv")
    return
  }else if(this.datosEstActoListado.nroRUC.trim() ==""){
    this.error("Ingrese Nº de RUC")
    return
  }
  
  this.spinner.show();
  this.datosEstActoListado.id_adjuntado = this.dataAdjuntadoActo.data.ID
  this.dataservice.VincularActoMasivo(this.datosEstActoListado).subscribe((data:any) =>{ 
    this.spinner.hide();           
    this.arrayResultadoVinculacion = data.data;         
  
    if (this.arrayResultadoVinculacion[0].RESULTADO == 'SIN RUC'){
      this.error('El Nro de RUC ingresado no existe');
      this.spinner.hide()
    }else if(this.arrayResultadoVinculacion[0].RESULTADO == 'OK'){
      swal(
        'El RUC ' + this.datosEstActoListado.nroRUC + ' ha sido vinculado a los codigos cargados en el archivo csv!',
        'Vinculacion finalizado.',
        'success' 
      )
      this.id_adjuntadoACTO = null
      this.datosEstActoListado.id_adjuntado = ''
      this.datosEstActoListado.nroRUC = ''
      this.estado_adjuntarActo = true;
      this.resetVar = true;
      console.log(this.arrayResultadoVinculacion)
    }
    
  }); 
}

VincularNiveles(){
  if (this.datosVincularNiveles.nroRUC.trim() ==""){
    this.error("Ingrese RUC de entidad de 1er nivel")
    return
  }else if(this.datosVincularNiveles.RucUnidadEjecutora.trim() ==""){
    this.error("Ingrese RUC de entidad de 2do nivel")
    return
  }else if(this.datosVincularNiveles.RucUnidadxxx.trim() ==""){
    this.error("Ingrese RUC de entidad de 3er nivel")
    return
  }

  swal({
    title: '¿Esta Ud. seguro(a) de vincular los niveles del RUC ' + this.datosVincularNiveles.RucUnidadxxx + ' ?',
    text: "¡No podrás revertir esto!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonText: 'Cancelado',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Vincular nivel!'
    
  }).then((result) => {
    if (result.value) {        
      console.log(this.datosVincularNiveles)
      this.spinner.show();
      this.dataservice.VincularNiveles(this.datosVincularNiveles).subscribe((data : any) =>{
        this.dataresultado = data.data;           
  
        if (this.dataresultado[0].RESULTADO == 'SIN PRIMER'){
          this.error('El RUC del 1er nivel no existe');
          this.spinner.hide()
        }else if(this.dataresultado[0].RESULTADO == 'SIN SEGUNDO'){
          this.error('El RUC del 2do nivel no existe')
          this.spinner.hide()
        }else if(this.dataresultado[0].RESULTADO == 'SIN TERCERO'){
          this.error('El RUC del 3er nivel no existe')
          this.spinner.hide()
        }else if(this.dataresultado[0].RESULTADO == 'OK'){
          swal(
            'El RUC ' + this.datosVincularNiveles.RucUnidadxxx + ' ha sido vinculado a los niveles satisfactoriamente!',
            'Vinculacion finalizado.',
            'success' 
          )
          this.datosVincularNiveles.nroRUC = ''
          this.datosVincularNiveles.RucUnidadEjecutora = ''
          this.datosVincularNiveles.RucUnidadxxx = ''
          this.spinner.hide()
        }
      });
    }
  })  
}

cargarListaGobRegionales(){
  this.spinner.show();
  this.dataservice.cargarListaGobRegionales(this.datosVincularPredios).subscribe((data:any) =>{ 
    this.spinner.hide();           
    this.arrayListaGobRegionales = data.data;                                             
  }); 
}

cambiar_gobRegional(){
  if(this.datosVincularPredios.idgobiernoRegional != '0'){
    this.spinner.show();
  this.dataservice.cambiar_gobRegional(this.datosVincularPredios).subscribe((data:any) =>{ 
    this.spinner.hide();           
    this.datosVincularPredios.nroRUCGobReg = data.data[0].CODIGO;
  });
  }else{
    this.datosVincularPredios.nroRUCGobReg = ''
  }
  
}

VincularPredios(){
 if(this.datosVincularPredios.idgobiernoRegional.trim() =="" || this.datosVincularPredios.idgobiernoRegional.trim() =="0"){
    this.error("Indique el Gobierno regional")
    return
  }else if(this.datosVincularPredios.nroRUCGobReg.trim() ==""){
    this.error("Ingrese numero de RUC")
    return
  }

  swal({
    title: '¿Esta Ud. seguro(a) de vincular el Gobierno Regional con RUC ' + this.datosVincularPredios.nroRUCGobReg + ' ?',
    text: "¡No podrás revertir esto!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonText: 'Cancelado',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Vincular Gobierno Regional!'
    
  }).then((result) => {
    if (result.value) {        
      console.log(this.datosVincularPredios)
      this.spinner.show();
      this.dataservice.VincularPredios(this.datosVincularPredios).subscribe((data : any) =>{
        this.dataresultado = data.data;           
  
        if (this.dataresultado[0].RESULTADO == 'SIN PRIMER'){
          this.error('El RUC del Estado no existe');
          this.spinner.hide()
        }else if(this.dataresultado[0].RESULTADO == 'SIN GOBIERNO'){
          this.error('El RUC del Gobierno regional no existe')
          this.spinner.hide()
        }else if(this.dataresultado[0].RESULTADO == 'OK'){
          swal(
            'El gobierno regional con RUC ' + this.datosVincularPredios.nroRUCGobReg + ' ha sido vinculado al RUC del Estado, satisfactoriamente!',
            'Vinculacion finalizado.',
            'success' 
          )
          this.datosVincularPredios.nroRUCEntidadPrimerNivel = '11111111111'
          this.datosVincularPredios.idgobiernoRegional = '0'
          this.datosVincularPredios.nroRUCGobReg = ''
          this.spinner.hide()
        }
      });
    }
  })  
}


cargarListaNivelGobierno(){
  this.spinner.show();
  this.dataservice.cargarListaNivelGobierno(this.datosVincularPredios).subscribe((data:any) =>{ 
    this.spinner.hide();           
    this.arrayListaNivelGobierno = data.data;  
    console.log(this.arrayListaNivelGobierno)
  }); 
}

cargarListaNivelGeneral(){
  this.spinner.show();
  this.dataservice.cargarListaNivelGeneral(this.datosVincularPredios).subscribe((data:any) =>{ 
    this.spinner.hide();           
    this.arrayListaNivelGeneral = data.data;                                             
  }); 
}

cargarListaNivelSectorial(){
  this.spinner.show();
  this.dataservice.cargarListaNivelSectorial(this.datosVincularPredios).subscribe((data:any) =>{ 
    this.spinner.hide();           
    this.arrayListaNivelSectorial = data.data;                                             
  }); 
}

cargarListaOrganismo(){
  this.spinner.show();
  this.dataservice.cargarListaOrganismo(this.datosVincularPredios).subscribe((data:any) =>{ 
    this.spinner.hide();           
    this.arrayListaOrganismo = data.data;                                             
  }); 
}

  error(titulo) 
  {
    swal({
      type: 'error',
      title: titulo,            
      confirmButtonText: 'Listo'
    });
  } 

  limpiarEstEntidades(){
    this.aux.select = ''
    this.aux.ent_nombre = ''
    this.aux.ent_ruc = ''
  }

  obtenerDescripcionEntidad(){
    this.spinner.show();
    this.dataservice.obtenerDescripcionEntidad(this.datos).subscribe((data:any) =>{ 
      this.spinner.hide();  
      console.log(data.data.length)         
      if(data.data.length == 0){
        this.datos.nombreEstandarizado = "";   
      }else{
        this.datos.nombreEstandarizado = data.data[0].NMB_ENTE;  
        console.log(data.data) 
      }
                          
  }); 
  }

}
