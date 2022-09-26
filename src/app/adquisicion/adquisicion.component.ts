import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef , NgbModalOptions,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AdquisicionService } from '../services/adquisicion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgSelectConfig} from '@ng-select/ng-select';
import { MigracionService } from '../services/migracion.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-adquisicion',
  templateUrl: './adquisicion.component.html',
  styleUrls: ['./adquisicion.component.css']
})
export class AdquisicionComponent implements OnInit {
  modala;
  closeResult: string;
  otorgante = [];
  tipodocumento =[];
  modalidad = [];
  dispositivo = [];
  datos : any = null;  
  documento = [];
  aporte = [];
  detalle = [];
  instituciones = [];
  oficinas = [];
  partida = [];
  lindero = [];
  acto = [];
  actoIA = [];
  tipoReg = [];
  detalleacto = [];
  moneda = [];
  flagvalidar : boolean = false;
  codigodepa  = ""
  filtro = ""
  flag = 0
  flag_activar :boolean = true;
  flag_activarPartida :boolean = true;
  flag_activarPartida2 :boolean = true;
  flag_aux :boolean = true;
  flag_registro_nuevo :boolean = true;
  
  itemsPerPage1: number = 10; 
  page: any = 1;
  previousPage1: any;
  total1 : any = 0;

  itemsPerPage2: number = 10; 
  page2: any = 1;
  previousPage2: any;
  total2 : any = 0;
  
  

  filtroSearch : any = {    
    valor:'',
    page : this.page,
    records : this.itemsPerPage1,
    seleccion : 1
  };

  filtroSearch_ : any = {    
    valor:'',
    page : this.page2,
    records : this.itemsPerPage2,
    seleccion : 1
  };
  
  texto_afavor = ''
  texto_otorgante = ''  
  adquision ={
    tipoproceso: 0,
    otorgante : '',
    tipdoc : '',
    documento : '',
    actoregistral: '02',
    modalidad : '',
    dislegal : '',
    disnum : '',
    disfecha : null,
    coddoc : '',
    codnum : '',
    codfecha : null,
    areatitulo : '0.00',
    aporte : '0',
    detalle : '0',
    afavor : '',
    oficina : '',
    codpartida : '',
    numpartida : '',
    fojas : '',
    arearegistral : '0.00',
    usuario : '',
    fabrica : [],
    codpartida2 : '',
    numpartida2 : '',
    fojas2 : ''
  }
  
  fabrica = {
    item : 0,
    tipoacto : '0',
    nombretipoacto: '',
    tiporegistro : '0',
    nombretipoRegistro : '',
    fechaacto : '',
    nrocus : '',
    areaindependizada : 0,
    tomo: '',
    foja: '',
    ficha: '',
    partidaelectronica: '',
    codigopredio: '',
    nroasiento: '',
    codigoinmuebleindep: ''
  }

  tipo = 0
  aux = 0
  tipo1= 0
  aux1 = 0
  ultimo = 0
  ultimo1 = 0
  ultimoIA = 0
  codigo_interno = 0
  auxcargar = ''
  count = 0
  countlinderos = 0
  active : boolean
  auxnum = ''
  auxVALOR_SOLES = ''  
  _idfila = 0
  _codActo = ''
  _dscActo = ''
  _codTipoReg = ''
  _dscTipoReg = ''
  buscar: string = ''

  @Input('bloquear')  bloquear;
  @Input('coddepa') idCodigoDepa;  
  @Input('detalle') iddetalle;  
  @Input('codigo_interno')  codinterno;
  @Input('grabado') grabado;
  
  @Input('cargar')  cargar;
  @Output('callback') salida = new EventEmitter();

  
  constructor(
    private modalService: NgbModal,  
    private modalOtorgante: NgbModal, 
    private spinner: NgxSpinnerService,
    private dataservice : AdquisicionService,
    private MigracionService: MigracionService,
    private config: NgSelectConfig
  ) {      
    
    this.adquision.usuario = sessionStorage.getItem('codigopersonal')
    //this.adquision.usuario = '2887'
    this.config.notFoundText = 'No hay resultados';   
    
  }

  
  ngOnChanges(){ 
    this.bloquear=='1'? this.active=true: this.active = false
    this.codigodepa= this.idCodigoDepa     
    this.filtro = this.iddetalle   
    this.adquision.tipoproceso = this.codinterno    
    this.auxcargar = this.cargar     

    /* observaciones: se borra linderos */
    /* fecha: 26-01-2021 */
    this.countlinderos = this.countlinderos + 1
    if (this.adquision.tipoproceso !=0 && this.countlinderos == 1){
      
      //this.ObtenerUltimoLL(this.adquision.tipoproceso)
      this.ObtenerUltimoIA(this.adquision.tipoproceso)
      this.CargarFabrica(this.adquision.tipoproceso)
      
     //return
      this.validaradquision(this.adquision) 
    }
    /* fin de observaciones: se borra linderos */
  
          
    if (this.auxcargar=='1')
    {
      this.count = this.count + 1       

      if (this.adquision.tipoproceso !=0){
        //this.ObtenerUltimoLL(this.adquision.tipoproceso)
        this.ObtenerUltimoIA(this.adquision.tipoproceso)
      }
      
      if (this.count==1)
      {
        this.cargando()        
        this.cargarcombos()   
        this.setcombos()    
      }

      if (this.grabado == "1"){
        this.activar_flag_registro_nuevo(this.codinterno)       
      }

      
      this.dataservice.Oficina(this.codigodepa).subscribe((data:any) =>{           
        this.oficinas = data.data;     

      });
      
    }
             
           
    if (this.adquision.tipoproceso !=0)
    {          
      this.cargando2();
      this.CargarAdquision(this.adquision.tipoproceso)         
    }else{
     
      this.adquision.modalidad     = "0"  
      this.adquision.afavor        = "0"
      this.adquision.areatitulo    = "0"
      this.texto_afavor = ""
      
      this.validaradquision(this.adquision) 
    }
   
  }

  ngOnInit() {     
    if (this.adquision.tipoproceso ==0 )
    { 
      this.activar_flag_registro_nuevo(this.codinterno)
    }    
    this.validaradquision(this.adquision)        
  }

  loadPage1(page1: number) {       
    if (page1 !== this.previousPage1) {
      this.previousPage1 = page1;      
      this.CargarInstituciones();
    }
  }

  loadPage2(page2: number) {       
    if (page2 !== this.previousPage2) {
      this.previousPage2 = page2;      
      this.CargarOtorgante();
    }
  }

  cargando()
  {    
    this.spinner.show();
    setTimeout(() => {      
      this.spinner.hide();
    }, 4000);
  }

  cargando2()
  {    
    this.spinner.show();
    setTimeout(() => {      
      this.spinner.hide();
    }, 4000);
  }


  activar(tipo)
  {
    if (tipo!="0")
      this.flag_activar = false
    else 
      this.flag_activar = true
  }

  activarpartida(tipo)
  {
    if (tipo!="0")
      this.flag_activarPartida = false
    else 
      this.flag_activarPartida = true
  }

  activarpartida2(tipo)
  {
    if (tipo!="0")
      this.flag_activarPartida2 = false
    else 
      this.flag_activarPartida2 = true
  }

  activar_flag(codigo)
  {
    if (codigo >"01")
      this.flag_aux = false
    else 
      this.flag_aux = true
  }

  activar_flag_registro_nuevo(codigo)
  {
    if (codigo == "")
      this.flag_registro_nuevo = false
    else 
      this.flag_registro_nuevo = true
  }

  limpiarcasillas(valor)
  {
    if (valor=='0' || valor =='01')
      {
        this.adquision.codpartida = "0"
        this.adquision.numpartida  =''
        this.adquision.arearegistral  ='0.00'
        this.adquision.fojas = ''

        this.adquision.codpartida2 = "0"
        this.adquision.numpartida2  =''
        this.adquision.fojas2 = ''
      }
  }

  setcombos(){
    this.adquision.otorgante = ''
    this.adquision.tipdoc = '0'
    this.adquision.modalidad = '0'
    this.adquision.dislegal = '0000'
    this.adquision.coddoc = '0000'
    this.adquision.aporte = '0'
    this.adquision.detalle = '0'
    this.adquision.afavor = '0'
    this.adquision.oficina = '0'
    this.adquision.codpartida = '0'
    this.adquision.codpartida2 = '0'
  }

  CargarAdquision(codigo){
    
    this.spinner.show();
    this.MigracionService.ObtenerData('P',codigo).subscribe((data:any) =>{   
          
      this.adquision.otorgante     = (data.data[0].CODIGO_INST_DONANTE=="")?'':data.data[0].CODIGO_INST_DONANTE
      this.adquision.tipdoc        = (data.data[0].CODIGO_TIPODOCUMENTO=='')?"0":data.data[0].CODIGO_TIPODOCUMENTO  
      this.adquision.documento     = data.data[0].NRO_DOCUMENTO
      this.adquision.actoregistral = (data.data[0].CODIGO_ACTO_REGISTRAL=='')?"0":data.data[0].CODIGO_ACTO_REGISTRAL  
      this.adquision.modalidad     = (data.data[0].CODIGO_TIPO_ACTO=='')?"0":data.data[0].CODIGO_TIPO_ACTO  
      this.adquision.dislegal      = (data.data[0].CODIGO_DISLEGAL=='')?"0":data.data[0].CODIGO_DISLEGAL
      this.adquision.disnum        = data.data[0].NRO_DISLEGAL
      this.adquision.disfecha      = data.data[0].FEC_DISLEGAL
      this.adquision.coddoc        = (data.data[0].CODIGO_DOCUM=='')?"0":data.data[0].CODIGO_DOCUM
      this.adquision.codnum        = data.data[0].NRO_DOCUM
      this.adquision.codfecha      = data.data[0].FEC_DOCUM
      this.adquision.areatitulo    = data.data[0].AREA_LEGAL
      this.adquision.aporte        = (data.data[0].CODIGO_APORTE=='')?"0":data.data[0].CODIGO_APORTE
      this.DetalleAporte(this.adquision.aporte)
      this.adquision.detalle       = (data.data[0].TIPO_APORTE_REGLAMENTARIO=='')?"0":data.data[0].TIPO_APORTE_REGLAMENTARIO
      this.adquision.afavor        = (data.data[0].CODIGO_INST_FAVORECIDA=='')?"0":data.data[0].CODIGO_INST_FAVORECIDA
      this.texto_afavor = (data.data[0].DSC_INST_FAVORECIDA=="")?'':data.data[0].DSC_INST_FAVORECIDA
      this.texto_otorgante = (data.data[0].DSC_INST_DONANTE=="")?'':data.data[0].DSC_INST_DONANTE
      
      
      this.adquision.codpartida    = (data.data[0].CODIGO_PARTIDA==null)?"0":data.data[0].CODIGO_PARTIDA

      this.adquision.codpartida2    = (data.data[0].CODIGO_PARTIDA2==null)?"0":data.data[0].CODIGO_PARTIDA2


      let auxpartida =  data.data[0].NRO_PARTIDA_REGISTRAL
      if(this.adquision.codpartida == '0'){
        this.flag_activarPartida = true
      }
      else{
        this.flag_activarPartida = false
      }

      if (this.adquision.codpartida == '1')      
      {        
        this.adquision.numpartida    = auxpartida.substr(1,8)
      }
      else
      {
        this.adquision.numpartida    = auxpartida
      }
      if(this.adquision.tipdoc == '0'){
        this.flag_activar = true
      }else{
        this.flag_activar = false
      }



      let auxpartida2 =  data.data[0].NRO_PARTIDA_REGISTRAL2
      if(this.adquision.codpartida2 == '0'){
        this.flag_activarPartida2 = true
      }
      else{
        this.flag_activarPartida2 = false
      }

      if (this.adquision.codpartida2 == '1')      
      {        
        this.adquision.numpartida2    = auxpartida2.substr(1,8)
      }
      else
      {
        this.adquision.numpartida2    = auxpartida2
      }
      // if(this.adquision.tipdoc == '0'){
      //   this.flag_activar = true
      // }else{
      //   this.flag_activar = false
      // }



      this.adquision.fojas         = data.data[0].FOJAS
      this.adquision.fojas2         = data.data[0].FOJAS2
      this.adquision.arearegistral = data.data[0].AREA_REGISTRAL      
      let aux = data.data[0].CODIGO_UBIGEO      
      let auxdep =aux.substr(2,2)         
      this.dataservice.Oficina(auxdep).subscribe((data:any) =>{ 
        this.spinner.hide();           
        this.oficinas = data.data;      
      });           
      this.adquision.oficina   = (data.data[0].SEDE_REGISTRAL=='')?"0":data.data[0].SEDE_REGISTRAL
      this.validaradquision(this.adquision)  
      this.processMyValue(1)     
      this.processMyValue(2)    
      this.spinner.hide();   
    }); 
  }

  validardni(dni)
  {
    if (dni.length<8)
      {
        this.adquision.documento=''
        this.error("El DNI debe tener 8 digitos")
      }
  }

  validarpartida(numero,tipo)
  {
    if (numero.length<8 && tipo=='1')
    {
      this.error("Número de partida debe tener 8 dígitos")
      this.adquision.numpartida = ''
    }
  }

  validarruc(ruc)
  {
    if (ruc.length<11)
      {
        this.adquision.documento=''
        this.error("El RUC debe tener 11 digitos")
      }
  }

  // validarentero(numero,tipo)
  // {             
  //     let aux_1 =numero.substr(0,1)       
  //     if (aux_1 =='0')
  //     {
  //       this.error("Área no válida,no permite 0 a la izquierda")
  //       if (tipo==1)
  //       {this.linderolegal.tramos = 0}
  //       if (tipo==2)
  //       {this.linderolegal.municipal = 0}
  //     }             
  // }

  validardecimal(numero,tipo)
  {    
    if (numero % 1 == 0) {      
      let aux_1 =numero.substr(0,1)    
      let aux_2 =numero.substr(0,2)
      if (aux_1 =='0')
      {
        this.error("Área no válida,no permite 0 a la izquierda")
         if (tipo==1)
         {this.adquision.areatitulo = '0.00'}
         if (tipo==2)
         {this.adquision.arearegistral = '0.00'}
         if (tipo==4)
         {this.fabrica.areaindependizada = 0}
         
      }      
      if (aux_2=='.0')
      {        
        this.error("Área no válida,formato incorrecto solo permite X.X")
        if (tipo==1)
        {this.adquision.areatitulo = '0'}
        if (tipo==2)
        {this.adquision.arearegistral = '0'}
        if (tipo==4)
        {this.fabrica.areaindependizada = 0}
       
      }
   } else {          
      let aux_3 =numero.substr(0,1)
      let aux_4 =numero.substr(0,2)  
      let aux_5 =numero.substr(1,1)                     
      if (aux_3=='.')
      {        
        this.error("Área no válida,formato incorrecto solo permite X.X")
        if (tipo==1)
        {this.adquision.areatitulo = '0'}
        if (tipo==2)
        {this.adquision.arearegistral = '0'}
        if (tipo==4)
        {this.fabrica.areaindependizada = 0}
        
      }           
      if (aux_4=='00' )
      {        
        this.error("Área no válida,solo permite un 0 a la izquierda del .")
        if (tipo==1)
        {this.adquision.areatitulo = '0'}
        if (tipo==2)
        {this.adquision.arearegistral = '0'}
        if (tipo==4)
        {this.fabrica.areaindependizada = 0}
        
      }
      if (aux_3=='0' && aux_5>'0')
      {        
        this.error("Área no válida,no permite 0 a la izquierda")
        if (tipo==1)
        {this.adquision.areatitulo = '0'}
        if (tipo==2)
        {this.adquision.arearegistral = '0'}
        if (tipo==4)
        {this.fabrica.areaindependizada = 0}
        
      }
   }
  }

  limpiardocumento()
  {
    this.adquision.documento=''    
  }

  limpiarnumero()
  {
    this.adquision.numpartida=''
  }

  limpiarnumero2()
  {
    this.adquision.numpartida2=''
  }

  /*validardecimal(numero)
  {
    if (isNaN(numero)==true)
    {
      alert("numero no valido")
    }
    else
    {
      alert("todo esta super :V")
    }
  }*/

  ObtenerUltimoLL(aux)
  {
    this.spinner.show();                   
    this.dataservice.ObtenerUltimoLL(aux).subscribe((data:any) =>{                       
      this.spinner.hide();      
        this.ultimo = data.data[0].ULTIMO
    });
  }

  ObtenerUltimoLF(aux)
  {
    this.spinner.show();                   
    this.dataservice.ObtenerUltimoLF(aux).subscribe((data:any) =>{                       
      this.spinner.hide();      
        this.ultimo1 = data.data[0].ULTIMO
    });
  }

  ObtenerUltimoIA(aux)
  {
    this.spinner.show();                   
    this.dataservice.ObtenerUltimoIA(aux).subscribe((data:any) =>{                       
      this.spinner.hide();      
        this.ultimoIA = data.data[0].ULTIMO
    });
  }
    

  CargarFabrica(codigo){
    this.spinner.show();    
    this.MigracionService.ObtenerData('IA',codigo).subscribe((data:any) =>{                                   
    this.adquision.fabrica = []
     for (let i= 0; i < data.data.length; i++)      
        {                   
          this.adquision.fabrica.push(
            {                           
              item : data.data[i].ITEM_INDEPENDIZACION,
              tipoacto : data.data[i].TIPO_ACTO,
              nombretipoacto :data.data[i].DSC_TIPO_ACTO,
              tiporegistro :data.data[i].TIPO_REGISTRO,
              nombretipoRegistro : data.data[i].DSC_TIPO_REGISTRO,
              nrocus : data.data[i].NRO_CUS,
              fechaacto :data.data[i].FECHA_ACTO,
              tomo :data.data[i].TOMO,
              foja : data.data[i].FOJA,
              ficha :data.data[i].FICHA,
              partidaelectronica : data.data[i].PARTIDA_ELECTRONICA,
              codigopredio : data.data[i].CODIGO_PREDIO,
              areaindependizada : data.data[i].AREA_INDEPENDIZADA,
              nroasiento : data.data[i].NRO_ASIENTO,
              codigoinmuebleindep : data.data[i].CODIGO_INMUEBLE_INDEPENDIZADO
            }        
          );
        }
        console.log(this.adquision.fabrica)
     this.spinner.hide(); 
    }); 
    
  }


  DetalleAporte(filtro){
    
    this.dataservice.Detalle(filtro).subscribe((data:any) =>{  
      this.detalle = data.data;   
     
    }); 
  }

  DetalleAportealCambiar(filtro){
    
    this.dataservice.Detalle(filtro).subscribe((data:any) =>{  
      this.detalle = data.data;   
      this.adquision.detalle = "0"
    }); 
  }

  
  validaradquision(data){
    this.salida.emit(data);         
   } 

   
  cargarcombos(){            
    
    this.dataservice.TipoDocumento().subscribe((data:any) =>{                  
      this.tipodocumento = data.data;         
    }); 
    
    this.dataservice.Modalidad().subscribe((data:any) =>{                 
      this.modalidad = data.data;                                            
    }); 
    
    this.dataservice.DispositivoLegal().subscribe((data:any) =>{       
      this.dispositivo = data.data;                                            
    }); 
    
    this.dataservice.Documentos().subscribe((data:any) =>{       
      this.documento = data.data;                                            
    }); 
    
    this.dataservice.Aporte().subscribe((data:any) =>{ 
      this.aporte = data.data;                                            
    }); 

  
             
    this.dataservice.Partida().subscribe((data:any) =>{       
      this.partida = data.data;                                            
    });

    this.dataservice.Lindero().subscribe((data:any) =>{       
      this.lindero = data.data;                                            
    });

    this.dataservice.Acto().subscribe((data:any) =>{       
      this.acto = data.data;                                            
    });

    this.dataservice.ActoIA().subscribe((data:any) =>{       
      this.actoIA = data.data;                                            
    });

    this.dataservice.TipoRegistro().subscribe((data:any) =>{       
      this.tipoReg = data.data;                                            
    });

    this.dataservice.Moneda().subscribe((data:any) =>{       
      this.moneda = data.data;                                            
    });    
  }

  descripcionActo(codigo)
  {           
    let contador = 0;
    this.actoIA.forEach((data : any) => {
      if(codigo == this.actoIA[contador].CODIGO){
        this.fabrica.tipoacto = this.actoIA[contador].CODIGO
        this.fabrica.nombretipoacto = this.actoIA[contador].DESCRIPCION    
        return
      }
      contador += 1;
    });
  }

  descripcionTipoRegistro(codigo)
  {           
    let contador = 0;
    this.tipoReg.forEach((data : any) => {
      if(codigo == this.tipoReg[contador].CODIGO){
        this.fabrica.tiporegistro = this.tipoReg[contador].CODIGO
        this.fabrica.nombretipoRegistro = this.tipoReg[contador].DESCRIPCION
        return
      }
      contador += 1;
    });
  }



  detacto(codigo)
  {
    this.dataservice.DetalleActo(codigo).subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.detalleacto = data.data;      
    })
  }
  modal(content,aux)  
  {
    this.tipo = aux
    //this.limpiarlindero()
    let opciones : NgbModalOptions = {
      size : "lg",
      backdrop : "static"
    };
    this.modala = this.modalService.open(content,opciones);
  }

  ModalAfavor(content)
  {   
    let opciones : NgbModalOptions = {
      size : "lg",
      backdrop : "static"
    };
    this.modalService.open(content,opciones);
    this.CargarInstituciones();   
    this.filtroSearch.valor = ''
    this.buscar = ''
  }

  ModalOtorgante(content)
  {   
    let opciones : NgbModalOptions = {
      size : "lg",
      backdrop : "static"
    };
    this.CargarOtorgante();         
    this.filtroSearch_.valor = ''
    this.buscar = ''
    this.modalService.open(content,opciones);
 
  }

  limpiaroto()
  {
    this.buscar = ''
    this.filtroSearch_.valor = ''
    this.CargarOtorgante()
  }


  CargarInstituciones()   
  {
    this.spinner.show()
    this.dataservice.Instituciones(this.filtroSearch).subscribe((data:any) =>{   
      this.spinner.hide()    
      this.instituciones = data.data;       
      if(this.filtroSearch.valor.trim() !== ''){
        this.buscar = '1'; 
      }                                       
      this.total1 = ( this.instituciones.length > 0 ) ? this.instituciones[0].TOTAL : 0;    
    }); 
  }

  CargarOtorgante()
  {
    this.spinner.show()
    this.dataservice.Otorgante(this.filtroSearch_).subscribe((data:any) =>{   
      this.spinner.hide()    
      this.otorgante = data.data;   
      if(this.filtroSearch_.valor.trim() !== ''){
        this.buscar = '1'; 
      }                                              
      this.total2 = ( this.otorgante.length > 0 ) ? this.otorgante[0].TOTAL : 0;  
    }); 
  }

  Limpiar()
  {
    this.buscar = ''
    this.filtroSearch.valor = ''
    this.CargarInstituciones()
  }
  
  pasar(codigo,nombre)
  {
    this.adquision.afavor = codigo
    this.texto_afavor = nombre
    let  opt1 = document.getElementById("favor");
    opt1.click();
    this.validaradquision(this.adquision)
    
    //cerrar ese modal
  } 
  pasar_(codigo,nombre)
  {
    this.adquision.otorgante = codigo
    this.texto_otorgante = nombre    
    let  opt1 = document.getElementById("oto");
    opt1.click();
    this.validaradquision(this.adquision)
  
    //cerrar ese modal  
  } 

  limpiarOtorgante()
  {
    this.adquision.otorgante = ''
    this.texto_otorgante = '[ NO SE HA ESPECIFICADO AL OTORGANTE ]'
    this.validaradquision(this.adquision)
  }

  modal1(content1,aux1)
  {
    this.limpiarfabrica()
    this.tipo1 = aux1
    let opciones : NgbModalOptions = {
      size : "lg",
      backdrop : "static"
    };
    this.modalService.open(content1,opciones);
  }


  // ObtenerNombre()
  // {
  //   this.dataservice.NombreLindero(this.linderolegal.lindero).subscribe((data:any) =>{ 
  //     this.spinner.hide();           
  //     this.linderolegal.nomlind  = data.data[0].DESCRIPCION_LINDEROS        
  //   })
  // }

  // ObtenerMoneda(cod)
  // {    
  //   if (cod=='S')
  //   {this.fabrica.nommoneda = 'SOLES'}
  //   else if  (cod=='D')
  //   {this.fabrica.nommoneda = 'DOLARES'}
  //   else if  (cod=='I')
  //   {this.fabrica.nommoneda = 'INTIS'}
  // }

  ObtenerNombreDetalle()
  {
    // if(this.fabrica.detacto == "0"){
    //   //this.fabrica.nomdetalle = ""
    // }else{
    //   this.dataservice.NombreDetalleDatosFabrica(this.fabrica.detacto).subscribe((data:any) =>{ 
    //     this.spinner.hide();           
    //     this.fabrica.nomdetalle  = data.data[0].DSC_DETALLE        
    //   })
    // }
      
   }
  

  // validarlindero()
  // {    
  //   if (this.linderolegal.lindero=="0")
  //     {
  //        this.error("Selecciona un Lindero")
  //        this.flagvalidar = true 
  //        return this.flagvalidar
  //     }
  //   else if(this.linderolegal.colindancia=="")
  //    {
  //     this.error("Ingresa Colindancia")
  //     this.flagvalidar = true 
  //     return this.flagvalidar
  //    }
    
  // }



  
  validarfecha(){
    
  }
  editarfabrica()
  { 
    
    let aux = this.validarfabrica()        
    if (aux===undefined)        
    {                
      let obj = {
        item : this.adquision.fabrica.length +1 ,      
        tipoacto : this.fabrica.tipoacto,
        nombretipoacto : this.fabrica.nombretipoacto,
        tiporegistro : this.fabrica.tiporegistro,
        nombretipoRegistro : this.fabrica.nombretipoRegistro,
        fechaacto : this.fabrica.fechaacto,
        nrocus : this.fabrica.nrocus,
        areaindependizada : this.fabrica.areaindependizada,
        tomo : this.fabrica.tomo,
        foja : this.fabrica.foja,
        ficha : this.fabrica.ficha,
        partidaelectronica: this.fabrica.partidaelectronica,
        codigopredio : this.fabrica.codigopredio,
        nroasiento : this.fabrica.nroasiento,
        codigoinmuebleindep : this.fabrica.codigoinmuebleindep
      }

      obj.item =  this.fabrica.item
      obj.tipoacto =this.fabrica.tipoacto
      obj.nombretipoacto = this.fabrica.nombretipoacto
      obj.tiporegistro =  this.fabrica.tiporegistro
      obj.nombretipoRegistro = this.fabrica.nombretipoRegistro
      obj.fechaacto = this.fabrica.fechaacto
      obj.nrocus = this.fabrica.nrocus
      obj.areaindependizada = this.fabrica.areaindependizada
      obj.tomo = this.fabrica.tomo
      obj.foja = this.fabrica.foja
      obj.ficha = this.fabrica.ficha
      obj.partidaelectronica = this.fabrica.partidaelectronica
      obj.codigopredio = this.fabrica.codigopredio

      this.adquision.fabrica[this.aux1] = obj     
      swal({
        type: 'success',
        title: 'Se actualizó el registro',
        confirmButtonText: 'Listo'                  
        });
      this.validaradquision(this.adquision) 
          
    }
  }

  modificarfabrica(i,content1)
  {        
    this._idfila = i
    this.modal1(content1,1);          
    //this.detacto(this.adquision.fabrica[i].tipoacto)
    this.fabrica.item =  this.adquision.fabrica[i].item
    this.fabrica.tipoacto = this.adquision.fabrica[i].tipoacto
    this.fabrica.nombretipoacto = this.adquision.fabrica[i].nombretipoacto    
    this.fabrica.tiporegistro = this.adquision.fabrica[i].tiporegistro
    this.fabrica.nombretipoRegistro = this.adquision.fabrica[i].nombretipoRegistro
    this.fabrica.fechaacto  = this.adquision.fabrica[i].fechaacto
    this.fabrica.nrocus = (this.adquision.fabrica[i].nrocus==null)?"":this.adquision.fabrica[i].nrocus
    this.fabrica.areaindependizada  = this.adquision.fabrica[i].areaindependizada
    this.fabrica.tomo = this.adquision.fabrica[i].tomo
    this.fabrica.foja = this.adquision.fabrica[i].foja
    this.fabrica.ficha = this.adquision.fabrica[i].ficha
    this.fabrica.partidaelectronica = this.adquision.fabrica[i].partidaelectronica
    this.fabrica.codigopredio = this.adquision.fabrica[i].codigopredio
    this.fabrica.nroasiento = this.adquision.fabrica[i].nroasiento
    this.fabrica.codigoinmuebleindep = this.adquision.fabrica[i].codigoinmuebleindep
    
    this.aux1 = i
    console.log(this.adquision.fabrica[i].fechaacto)
    console.log(this.fabrica.fechaacto)
   
  }

  limpiarfabrica()  
  {
    this.fabrica.tipoacto = '0';
    this.fabrica.nombretipoacto = '',
    this.fabrica.tiporegistro = '0',
    this.fabrica.nombretipoRegistro = '',
    this.fabrica.fechaacto = '',
    this.fabrica.nrocus = '',
    this.fabrica.areaindependizada = 0,
    this.fabrica.tomo= '',
    this.fabrica.foja= '',
    this.fabrica.ficha= '',
    this.fabrica.partidaelectronica= '',
    this.fabrica.codigopredio= '',
    this.fabrica.nroasiento= '',
    this.fabrica.codigoinmuebleindep = ''

  }


  
  validarfabrica()
  {    
    if (this.fabrica.tipoacto=='0')
      {
         this.error("Selecciona Acto")
         this.flagvalidar = true 
         return this.flagvalidar
      }
    else if(this.fabrica.tiporegistro=="0")
     {
      this.error("Seleccione tipo de registro")
      this.flagvalidar = true 
      return this.flagvalidar
     }
     else if(this.fabrica.tiporegistro == 'O' || this.fabrica.tiporegistro == 'E' || this.fabrica.tiporegistro == 'M'
      || this.fabrica.tiporegistro == 'P'){

        if(this.fabrica.nrocus == ''){
          this.error("Debe especificar Nro. CUS")
          this.flagvalidar = true 
          return this.flagvalidar
        }

     }
    else if(this.fabrica.fechaacto !=="")
     {
      if( this.fabrica.fechaacto<"1900-01-02"  || this.fabrica.fechaacto>"2030-12-31")
      {
        this.error("Fecha fuera de rango [1900-01-02 a 2030-12-31]")
        this.fabrica.fechaacto = "" 
        this.flagvalidar = true 
        return this.flagvalidar
      } 
     }
    //  else if( this.fabrica.fechaacto<"1900-01-02"  || this.fabrica.fechaacto>"2030-12-31")
    //  {
    //   this.error("Fecha fuera de rango [1900-01-02 a 2030-12-31]")
    //   this.fabrica.fechaacto = ""
    //   this.flagvalidar = true 
    //   return this.flagvalidar
    //  }
    // else if(this.fabrica.areaindependizada==0)
    //  {
    //   this.error("Ingresa Área")
    //   this.flagvalidar = true 
    //   return this.flagvalidar
    //  }
   
  }

  
  agregarfabrica()
  {       
    
    let aux = this.validarfabrica()        
    if (aux===undefined)        
    { 
      this.ultimoIA++
      this.adquision.fabrica.push(
      { 
        item : this.ultimoIA,
        tipoacto : this.fabrica.tipoacto,
        nombretipoacto : this.fabrica.nombretipoacto,
        tiporegistro : this.fabrica.tiporegistro,
        nombretipoRegistro : this.fabrica.nombretipoRegistro,
        fechaacto : this.fabrica.fechaacto,
        nrocus : this.fabrica.nrocus,
        areaindependizada : this.fabrica.areaindependizada,
        tomo : this.fabrica.tomo,
        foja : this.fabrica.foja,
        ficha : this.fabrica.ficha,
        partidaelectronica : this.fabrica.partidaelectronica,
        codigopredio : this.fabrica.codigopredio,
        nroasiento : this.fabrica.nroasiento,
        codigoinmuebleindep : this.fabrica.codigoinmuebleindep
      }
        
      )        
      swal({
        type: 'success',
        title: 'Se agrego el registro',                 
        confirmButtonText: 'Listo'                  
        }); 
      this.limpiarfabrica()
      this.validaradquision(this.adquision)
     
    }
  }
  quitarfabrica(index,item)
  {     
    
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success ml-2',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
     })  
    swalWithBootstrapButtons({
      title: '¿Estás seguro de quitar la información de Independizacion?',            
      type: 'warning',
      showCancelButton: true,    
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      reverseButtons: true
      }).then((result) => {
        if (result.value) {      
          this.spinner.show();                   
          this.dataservice.EliminarIndependizacion(this.codinterno,item).subscribe((data:any) =>{                       
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
                this.adquision.fabrica.splice(index ,1)  
            }
                      
          });  
                  
        }
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


  processMyValue(opcion) {  
    if(opcion==1)
    {
      if(this.adquision.areatitulo!='')   
      {
        this.auxnum = this.adquision.areatitulo
        let noTruncarDecimales = {maximumFractionDigits: 10}
        let numberVal = parseFloat(this.auxnum).toLocaleString('en-US', noTruncarDecimales);
        this.adquision.areatitulo = numberVal;
      }
      else
      {
        this.auxnum =''
      }
    }
    if(opcion==2)
    {
      if(this.adquision.arearegistral!='')   
      {
        this.auxVALOR_SOLES = this.adquision.arearegistral
        let noTruncarDecimales = {maximumFractionDigits: 10}
        let numberVal = parseFloat(this.auxVALOR_SOLES).toLocaleString('en-US', noTruncarDecimales);
        this.adquision.arearegistral = numberVal;         
      }
      else
      {
        this.auxVALOR_SOLES =''
      }
    }

    
     
  }

  foco(opcion)
  {    
    if(opcion==1){
      if (this.auxnum!="")
      {
        this.adquision.areatitulo = this.auxnum     
      }
    }
    if(opcion==2){
      if (this.auxVALOR_SOLES!="")
      {
        this.adquision.arearegistral = this.auxVALOR_SOLES  
      }
    }
    
  }

  validar_cus(nrocus){
    
    if (nrocus !== '' ){
      this.spinner.show();                   
      this.dataservice.validar_cus(nrocus).subscribe((data:any) =>{                       
        this.spinner.hide();   
        
        if (data.data[0].RESULTADO=="NOEXISTE")
        {
          this.error("Nro CUS no existe")
          this.fabrica.nrocus = ''
          this.fabrica.codigoinmuebleindep = ''
        }
        else
        {
          this.fabrica.codigoinmuebleindep = data.data[0].ID
        }
                  
      });  
    }
  }


  usarComodin(seleccion){
    
    if(seleccion == true){
      this.filtroSearch.seleccion = 1
    }else{
      this.filtroSearch.seleccion = 0
    }
    //console.log(this.filtroSearch.seleccion)
  }


 

}






