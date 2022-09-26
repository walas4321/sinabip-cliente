import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ActosService } from '../services/actos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdquisicionService } from '../services/adquisicion.service';
import { MigracionService } from '../services/migracion.service';
import swal from 'sweetalert2';
import { NgSelectConfig} from '@ng-select/ng-select';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-actos',
  templateUrl: './actos.component.html',
  styleUrls: ['./actos.component.css']
})
export class ActosComponent implements OnInit {
  
  acto=[];
  item : 1;
  detalleacto =[];
  instituciones=[];
  documentos =[];
  generico = [];
  especifico = [];
  derecho =[];
  vigencia = [];
  dispositivo = [];
  oficinas = [];
  flagggg = ''
  hoy = new Date();
  fecha_sistema = '' 
  d_legal : boolean = true
  d_doc : boolean = true
  sec ={
    select : '',
    select2 : ''
  }
  flagvalidar : boolean = false;
  flag_inscrito :boolean = true;
  flag_inscritoarea : boolean =true;
  
  actoad ={
    codigo_interno : '',
    codigo_usuario : '',
    actos : [] 
  }
  actos ={
    item : 0,
    codigoacto : '',
    coddetalle : '',
    codnorma  : '',
    numerolegal : '',
    fechalegal : '',
    doccodigo : '',
    docnumero: '',
    docfecha : '',
    afavor : '',
    dispuesta : 0,
    areare : 0,
    codgenerico : '0',
    codespecifico : '0',
    codderecho : '',
    oficinaregistral : '0',
    arearegistral : 0,
    codvigencia : '',
    plazoinicial : '',
    plazofinal : '',
    tiempo : 0,
    costo : 0,
    nomdetalle: '',
    nominst : '',
    NRO_CUS_ACTO: '',
    vigencia: '',
    arealegal : 0,
    codigopartida: 0,
    nropartida: '',
    fojas: '',
    aporte: '',
    aporteDetalle: '',
    plazoinicial_doc : '',
    plazofinal_doc : '',
    tiempo_doc : 0,
  }

  itemsPerPage1: number = 10; 
  page: any = 1;
  previousPage1: any;
  total1 : any = 0;

  filtroSearch : any = {    
    valor:'',
    page : this.page,
    records : this.itemsPerPage1,
    seleccion : 1
  };

  tipo = 0
  aux = 0
  auxcargar = '' 
  count = 0
  active : boolean
  codigodepa  = ""
  texto_afavor = ''
  buscar: string = ''
  
  
  @Input('bloquear')  bloquear;
  @Input('codigo_interno')  codinterno;
  @Input('cargar')  cargar;
  @Input('coddepa') idCodigoDepa; 
  @Output('callback') salida = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private dataservice : ActosService,
    private service : AdquisicionService,
    private MigracionService: MigracionService,
    private config: NgSelectConfig
  ) {
     
    this.actoad.codigo_usuario =  sessionStorage.getItem('codigopersonal')
    //this.actoad.codigo_usuario = '2622'
    this.config.notFoundText = 'No hay resultados';   
    
   } 
  
  restar()
  {            
    if( this.actos.plazofinal == null || this.actos.plazofinal == '1900-01-01' || this.actos.plazofinal == '' ){
      this.actos.tiempo = 0
    }else{
      let fechaFin    = new Date(this.actos.plazofinal).getTime();
      let diff =   fechaFin - new Date(this.fecha_sistema).getTime();        
      let tiempo = diff/(1000*60*60*24)          
      this.actos.tiempo = tiempo   
    }
  }

  restar_doc()
  {            
    if( this.actos.plazofinal_doc == null || this.actos.plazofinal_doc == '1900-01-01' || this.actos.plazofinal_doc == '' ){
      this.actos.tiempo_doc = 0
    }else{
      let fechaFin    = new Date(this.actos.plazofinal_doc).getTime();
      let diff =   fechaFin - new Date(this.fecha_sistema).getTime();        
      let tiempo = diff/(1000*60*60*24)          
      this.actos.tiempo_doc = tiempo   
    }
  }



  ngOnChanges(){
    this.codigodepa= this.idCodigoDepa      
    this.service.Oficina(this.codigodepa).subscribe((data:any) =>{           
      this.oficinas = data.data;     
    }); 

    this.actoad.codigo_interno= this.codinterno 
    this.auxcargar = this.cargar
    this.bloquear=='1'? this.active=true: this.active = false
    if (this.auxcargar=='3')
    {
      this.count = this.count+ 1      
      if (this.count==1) 
      { 
        
        this.cargarcombos()  
        this.setcombos();                   
      }           
    }
    if (this.actoad.codigo_interno !="0" && this.actoad.codigo_interno!='' && this.count==1)
    //if (this.actoad.codigo_interno !="0" && this.actoad.codigo_interno!='')
    {          
 
      this.CargarActos(this.actoad.codigo_interno)      
      this.ObtenerItem();
    } 
  }

  ngOnInit() {    
    this.obtenerfecha()
  }

  obtenerfecha()
  {        
    this.fecha_sistema = this.hoy.getFullYear() + '-'
             + ('0' + (this.hoy.getMonth()+1)).slice(-2) + '-'
             + ('0' + this.hoy.getDate()).slice(-2) ;
  }
  
  activar(flag)
  {
    if (flag == '0' || flag=='0000')
        {this.d_legal = true
         this.actos.numerolegal = ''
         this.actos.fechalegal = ''
        }
    else 
        this.d_legal = false 
  }

  activar_(flag)
  {
    if (flag == '0' || flag=='0000')
        {
          this.d_doc = true
          this.actos.docnumero = ''
          this.actos.docfecha = ''
        }
    else 
        this.d_doc = false 
  }


  CargarActos(codigo)
  {    
    this.spinner.show();
    this.MigracionService.ObtenerData('AD',codigo).subscribe((data:any) =>{     
    this.actoad.actos = []
     for (let i= 0; i < data.data.length; i++)      
        {                  
          this.actoad.actos.push(
            {             
              item :  data.data[i].ITEM,             
              coddetalle :  data.data[i].CODIGO_TIPO_ACTO, 
              afavor :   data.data[i].CODIGO_INST_FAVORECIDA, 
              dispuesta :  (data.data[i].AREA_DISPUESTA==null || data.data[i].AREA_DISPUESTA==".00")?"0":data.data[i].AREA_DISPUESTA,
              nomdetalle : data.data[i].DETALLE,
              nominst :  data.data[i].INSTITUCION,               
              //
              codigoacto :  data.data[i].CODIGO_ACTO_REGISTRAL, 
              codnorma  :  data.data[i].CODIGO_DISLEGAL, 
              numerolegal : data.data[i].NRO_DISLEGAL, 
              fechalegal :  data.data[i].FECHA_INSCRIPCION, 
              doccodigo :  data.data[i].CODIGO_DOCUM, 
              docnumero:  data.data[i].NRO_DOCUM, 
              docfecha :  data.data[i].FEC_DOCUM, 
              areare :  (data.data[i].AREA_REMANENTE==null || data.data[i].AREA_REMANENTE==".00")?"0":data.data[i].AREA_REMANENTE,
              codgenerico :  (data.data[i].CODIGO_USO_GENERICO=="")?"00":data.data[i].CODIGO_USO_GENERICO, 
              codespecifico :  (data.data[i].CODIGO_USO_ESPECIFICO=="")?"00":data.data[i].CODIGO_USO_ESPECIFICO,             
              codvigencia :  (data.data[i].ESTADO_VIGENCIA_ACTO==null)?"0":data.data[i].ESTADO_VIGENCIA_ACTO,
              plazoinicial :  data.data[i].PLAZO_INICIO, 
              plazofinal :  data.data[i].PLAZO_FINAL, 
              tiempo :  (data.data[i].TIEMPO_TRANSCURRIDO==null)?"0":data.data[i].TIEMPO_TRANSCURRIDO,
              costo : (data.data[i].COSTO_ANUAL==null)?"0":data.data[i].COSTO_ANUAL,
              NRO_CUS_ACTO : data.data[i].NRO_CUS_ACTO,
              oficinaregistral :  (data.data[i].OFICINAREGISTRAL==null)?"0":data.data[i].OFICINAREGISTRAL,   
              codderecho : (data.data[i].DERECHO_INSCRITO==null)?"0":data.data[i].DERECHO_INSCRITO,
              arearegistral :  (data.data[i].AREAREGISTRAL==null)?"0":data.data[i].AREAREGISTRAL, 
              vigencia :  data.data[i].VIGENCIA_ACTO,
              arealegal :  (data.data[i].AREA_LEGAL==null || data.data[i].AREA_LEGAL==".00")?"0":data.data[i].AREA_LEGAL,
              codigopartida :  (data.data[i].CODIGO_PARTIDA=="")?"0":data.data[i].CODIGO_PARTIDA,  
              nropartida :  data.data[i].NRO_PARTIDA_REGISTRAL,
              fojas :  data.data[i].FOJAS,
              aporte : data.data[i].CODIGO_APORTE,
              aporteDetalle : data.data[i].CODIGO_APORTE_DETALLE,
              plazoinicial_doc :  data.data[i].PLAZO_INICIO_DOC, 
              plazofinal_doc :  data.data[i].PLAZO_FINAL_DOC, 
              tiempo_doc :  (data.data[i].TIEMPO_TRANSCURRIDO_DOC==null)?"0":data.data[i].TIEMPO_TRANSCURRIDO_DOC,               
            }        
          );
          this.restar()
        }
        
    
     this.spinner.hide(); 
     this.validaracto(this.actoad)
    });  
    
  }

  ObtenerItem()
  {  
    this.spinner.show();
    this.dataservice.ObtenerItem(this.actoad.codigo_interno).subscribe((data:any) =>{ 
      this.spinner.hide();                
      this.item = data.data[0].ULTIMO_ITEM
     
    }); 
  }
  setcombos(){
    this.actos.codigoacto = '0'
    this.actos.coddetalle = '0'
    this.actos.codnorma = '0'
    this.actos.docnumero = ''
    this.actos.afavor = ''
    this.actos.codespecifico = '0'
    this.actos.codgenerico = '0'
    this.actos.codderecho = '0'
    this.actos.codvigencia = '0'
    this.actos.doccodigo = '0'
    this.actos.oficinaregistral = '0'
  }

  validaracto(data){    
    this.salida.emit(data);
   } 

   Limpiar()
   {
    this.filtroSearch.valor = ''
    this.buscar = ''
    this.CargarInstituciones()
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

   loadPage1(page1: number) {       
    if (page1 !== this.previousPage1) {
      this.previousPage1 = page1;      
      this.CargarInstituciones();
    }
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
   
   pasar(codigo,nombre)
   {
     this.actos.afavor = codigo
     this.texto_afavor = nombre
     let  opt1 = document.getElementById("favor");
     opt1.click();
     this.validaracto(this.actoad)
     //cerrar ese modal
   } 

  cargarcombos(){
    this.spinner.show();
    this.service.DispositivoLegal().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.dispositivo = data.data;                                            
    }); 

    this.spinner.show();
    this.dataservice.ActoAd().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.acto = data.data;                                            
    }); 

    
    this.spinner.show();
    this.dataservice.Documentos().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.documentos = data.data;                                            
    }); 

    this.spinner.show();
    this.dataservice.Generico().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.generico = data.data;                                            
    });

    this.spinner.show();
    this.dataservice.DerechoInscrito().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.derecho = data.data;                                            
    });
    
    this.spinner.show();
    this.dataservice.Vigencia().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.vigencia = data.data;                                            
    });
    
  }

  CargarEspecifico(codgenerico){
    this.spinner.show();
    this.dataservice.Especifico(codgenerico).subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.especifico = data.data;                                   
    }); 
  }

  CargarEspecificoSel(codgenerico){
    this.spinner.show();
    this.dataservice.Especifico(codgenerico).subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.especifico = data.data;   
      this.actos.codespecifico = "0"                                         
    }); 
  }


agregar_nuevo_item(content,aux){  
  this.modal(content,aux);
  this.actos.codnorma ="0000"
  this.actos.doccodigo = "0000"
  this.actos.codgenerico = "00"
  this.CargarEspecificoNuevo(this.actos.codgenerico)
  this.actos.codespecifico = "00"
}


CargarEspecificoNuevo(codgenerico){
  this.spinner.show();
  this.dataservice.Especifico(codgenerico).subscribe((data:any) =>{ 
    this.spinner.hide();           
    this.especifico = data.data;   
    this.actos.codespecifico = "00"                                       
  }); 
}

  modal(content,aux)
  {
    
    this.limpiaracto()
    this.setcombos()
    this.tipo = aux
    
    let opciones : NgbModalOptions = {
      size : "lg",
      backdrop : "static"
    };
    this.modalService.open(content,opciones);
  }

  detcAto(codigo)
  {  
    let codacto
    if (codigo == 1)
    {
       codacto = 'D'
       //this.fabrica.nombreacto = 'SIN TRANSFERENCIA DE PROPIEDAD'
    }
    if (codigo == 2)
    {
       codacto = 'A'
      // this.fabrica.nombreacto = 'CON TRANSFERENCIA DE PROPIEDAD'
    }
    if (codigo == 3)
    {
       codacto = 'C'
      // this.fabrica.nombreacto  = 'CARGAS'
    }
    if (codigo == 4)
    {
       codacto = 'G'
       // this.fabrica.nombreacto = 'GRAVAMEN'
    }
    
    this.dataservice.DetalleActoAd(codacto).subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.detalleacto = data.data; 
     
    })
  }

  validardecimal(numero,tipo)
  {    
    if (numero % 1 == 0) {      
      let aux_1 =numero.substr(0,1)    
      let aux_2 =numero.substr(0,2)
      if (aux_1 =='0')
      {
        this.error("Área no válida,no permite 0 a la izquierda")
        if (tipo==1)
        {this.actos.dispuesta = 0}        
        if (tipo==2)
        {this.actos.areare = 0}   
        if (tipo==3)
        {this.actos.costo = 0}      
      }      
        if(aux_2=='.0')
        {       
          this.error("Área no válida,formato incorrecto solo permite X.X")
          if (tipo==1)
          {this.actos.dispuesta = 0}        
          if (tipo==2)
          {this.actos.areare = 0} 
          if (tipo==3)
          {this.actos.costo = 0}
        }
   } else {          
      let aux_3 =numero.substr(0,1)
      let aux_4 =numero.substr(0,2)  
      let aux_5 =numero.substr(1,1)                     
      if (aux_3=='.')
      {        
        this.error("Área no válida,formato incorrecto solo permite X.X")
        if (tipo==1)
        {this.actos.dispuesta = 0}        
        if (tipo==2)
        {this.actos.areare = 0} 
        if (tipo==3)
        {this.actos.costo = 0}
      }           
      if (aux_4=='00' )
      {        
        this.error("Área no válida,solo permite un 0 a la izquierda del .")
        if (tipo==1)
        {this.actos.dispuesta = 0}        
        if (tipo==2)
        {this.actos.areare = 0} 
        if (tipo==3)
        {this.actos.costo = 0}
      }
      if (aux_3=='0' && aux_5>'0')
      {        
        this.error("Área no válida,no permite 0 a la izquierda")
        if (tipo==1)
        {this.actos.dispuesta = 0}        
        if (tipo==2)
        {this.actos.areare = 0} 
        if (tipo==3)
        {this.actos.costo = 0}
      }
   }
  }

  prueba(){
    //alert(this.actos.codgenerico)
  }
  
  ObtenerNombreDetalle(codigo)
  {
    this.service.DetalleNombreActo(codigo).subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.actos.nomdetalle  = data.data[0].NMB_DOCUMENTO        
    })
  }

  ObtenerNombreInstitucion(codigo)
  {
    this.dataservice.NombreInstitucion(codigo).subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.actos.nominst  = data.data[0].NOMBRE_INSTITUCION        
    })
  }

  validaract()
  {
    if(this.actos.codvigencia=="0")
    {
     this.error("Seleccione Vigencia de Acto")
     this.flagvalidar = true 
     return this.flagvalidar
    } 
    else if (this.actos.codigoacto=="0")
    {
      this.error("Seleccione Tipo de Acto")
      this.flagvalidar = true 
      return this.flagvalidar
    }
    else if(this.actos.coddetalle=="0")
    {
      this.error("Seleccione Detalle del Acto")
      this.flagvalidar = true 
      return this.flagvalidar
    }
    

    if(this.actos.codnorma>"0000")
    {
      if (this.actos.numerolegal.trim() == "" || this.actos.numerolegal == null){
      this.error("Ingrese el Número Legal")
      this.flagvalidar = true 
      return this.flagvalidar 
      }
      if (this.actos.fechalegal == "" || this.actos.fechalegal == null){
        this.error("Ingrese la Fecha Legal")
        this.flagvalidar = true 
        return this.flagvalidar
      }else if (this.actos.fechalegal<"1900-01-02"  || this.actos.fechalegal>"2030-12-31"){
        this.error("Fecha Legal fuera de rango [1900-01-02 a 2030-12-31]")
        this.flagvalidar = true 
        return this.flagvalidar
      }   
    }else if (this.actos.codnorma=="0"){
      this.error("Indique Norma Legal")
      this.flagvalidar = true 
      return this.flagvalidar 
    }
    
    if(this.actos.doccodigo>"0000")
    {
      if (this.actos.docnumero.trim() == "" || this.actos.docnumero == null){
          this.error("Ingrese el Número Documento")
          this.flagvalidar = true 
          return this.flagvalidar
        }
        if (this.actos.docfecha == "" || this.actos.docfecha == null){
          this.error("Ingrese la Fecha Documento")
          this.flagvalidar = true 
          return this.flagvalidar
        }else if (this.actos.docfecha<"1900-01-02"  || this.actos.docfecha>"2030-12-31"){
          this.error("Fecha Legal fuera de rango [1900-01-02 a 2030-12-31]")
          this.flagvalidar = true 
          return this.flagvalidar
        }
    }else if (this.actos.docnumero == "0"){
      this.error("Indique Documento")
      this.flagvalidar = true 
      return this.flagvalidar 
    }

    if(this.actos.afavor=='')
    {
      this.error("Seleccine el Titular o Favor de")
      this.flagvalidar = true 
      return this.flagvalidar
    }
    
    /*
    else if(this.actos.dispuesta==0)
    {
      this.error("Ingrese Área Dispuesta")
      this.flagvalidar = true 
      return this.flagvalidar
    }
    */
    /*
    else if(this.actos.codigoacto !=='02')
    {
      if (this.actos.areare==0){
      this.error("Ingrese Área Remanente")
      this.flagvalidar = true 
      return this.flagvalidar
      }
    }
    */

    else if(this.actos.codgenerico=="0"){
      this.error("Seleccione Uso Genérico")
      this.flagvalidar = true 
      return this.flagvalidar
    }
    else if(this.actos.codespecifico=="0"){
      this.error("Seleccione Uso Especifico")
      this.flagvalidar = true 
      return this.flagvalidar
    }

    else if(this.actos.codderecho=='0' )
    {
      this.error("Seleccione Derecho Inscrito")
      this.flagvalidar = true 
      return this.flagvalidar
    }  
    else if(this.actos.codderecho=='1' )
    {
      if(this.actos.oficinaregistral == '0' || this.actos.oficinaregistral == "01"){
        this.error("Seleccione Oficina Registral")
        this.flagvalidar = true 
        return this.flagvalidar
      }else{
        /*
        if(this.actos.arearegistral ==0){
          this.error("Ingrese Área Registral")
          this.flagvalidar = true 
          return this.flagvalidar
        }
        */
      }
    }  
    /*
    if(this.sec.select=='2')
    {
      if(this.actos.plazoinicial==''){
        this.error("Ingrese Plazo Inicial")
        this.flagvalidar = true 
        return this.flagvalidar
      }
    }
    */
    if(this.sec.select=='1')
    {
      if(this.actos.plazoinicial==''){
        this.error("Ingrese Plazo Inicial")
        this.flagvalidar = true 
        return this.flagvalidar
      }
      if(this.actos.plazofinal==''){
        this.error("Ingrese Plazo Final")
        this.flagvalidar = true 
        return this.flagvalidar
      }
    }
    
   
  }
  
  agregaracto()
  {       
    let aux = this.validaract()        
    if (aux===undefined)        
    { 
        this.item++
         this.actoad.actos.push(
          { 
            item : this.item ,
            coddetalle : this.actos.coddetalle,
            afavor : this.actos.afavor,
            dispuesta : this.actos.dispuesta,     
            nomdetalle : this.actos.nomdetalle,
            nominst : this.texto_afavor,    
            //
            codigoacto : this.actos.codigoacto,
            codnorma  : this.actos.codnorma,
            numerolegal : this.actos.numerolegal,
            fechalegal : this.actos.fechalegal,
            doccodigo : this.actos.doccodigo,
            docnumero: this.actos.docnumero,
            docfecha : this.actos.docfecha,
            areare : this.actos.areare,
            codgenerico : this.actos.codgenerico,
            codespecifico : this.actos.codespecifico,
            codderecho : this.actos.codderecho,
            codvigencia : this.actos.codvigencia,
            plazoinicial : this.actos.plazoinicial,
            plazofinal : this.actos.plazofinal,
            tiempo : this.actos.tiempo,
            costo : this.actos.costo,
            oficinaregistral : this.actos.oficinaregistral,
            arearegistral : this.actos.arearegistral,
            texto_afavor : this.actos.nominst,
            vigencia : (this.actos.codvigencia == 'S'?'SI':'NO'),
            arealegal : this.actos.arealegal,
            codigopartida : 0,
            nropartida : '',
            fojas : '',
            aporte : '',
            aporteDetalle : '',
            plazoinicial_doc : this.actos.plazoinicial_doc,
            plazofinal_doc : this.actos.plazofinal_doc,
            tiempo_doc : this.actos.tiempo_doc,
          } 
        )    
        
        swal({
          type: 'success',
          title: 'Se agregó el registro',                 
          confirmButtonText: 'Listo'                  
          });   
        this.limpiaracto()
        this.validaracto(this.actoad)        
    }    
  }

  limpiaracto()
  {
    this.actos.item = 0
    this.actos.codigoacto = '0'
    this.actos.coddetalle = '0'
    this.actos.codnorma  = '0'
    this.actos.numerolegal = ''
    this.actos.fechalegal = ''
    this.actos.doccodigo = '0'
    this.actos.docnumero= ''
    this.actos.docfecha = ''
    this.actos.afavor = undefined
    this.actos.dispuesta = 0
    this.actos.areare = 0
    this.actos.codgenerico = '0'
    this.actos.codespecifico = '0'
    this.actos.codderecho = '0'
    this.actos.codvigencia = '0'
    this.actos.plazoinicial = ''
    this.actos.plazofinal = ''
    this.actos.tiempo = 0
    this.actos.costo = 0
    this.actos.nomdetalle= ''
    this.actos.nominst = ''
    this.actos.oficinaregistral = '0',
    this.actos.arearegistral = 0,
    this.texto_afavor = '',
    this.actos.vigencia = '',
    this.actos.arealegal = 0,
    this.actos.codigopartida = 0,
    this.actos.nropartida = '',
    this.actos.fojas = '',
    this.actos.aporte = '',
    this.actos.aporteDetalle = ''
  }

  modificaracto(i,content)
  {   
    
    this.modal(content,1);       
    this.actos.item = this.actoad.actos[i].item;
    this.actos.codigoacto = this.actoad.actos[i].codigoacto;
    this.detcAto(this.actos.codigoacto)
    this.actos.coddetalle = this.actoad.actos[i].coddetalle;
    this.actos.codnorma  = this.actoad.actos[i].codnorma;
    this.activar(this.actos.codnorma);
    this.actos.numerolegal = this.actoad.actos[i].numerolegal;
    this.actos.fechalegal = this.actoad.actos[i].fechalegal;
    this.actos.doccodigo = this.actoad.actos[i].doccodigo;
    this.activar_(this.actos.doccodigo);
    this.actos.docnumero = this.actoad.actos[i].docnumero;
    this.actos.docfecha = this.actoad.actos[i].docfecha;
    this.actos.afavor = this.actoad.actos[i].afavor;    
    this.actos.dispuesta = this.actoad.actos[i].dispuesta;
    this.actos.areare = this.actoad.actos[i].areare;
    this.actos.codgenerico = this.actoad.actos[i].codgenerico;
    this.CargarEspecifico(this.actos.codgenerico)
    this.actos.codespecifico = this.actoad.actos[i].codespecifico;
    this.actos.codderecho = this.actoad.actos[i].codderecho;
    this.actos.codvigencia = this.actoad.actos[i].codvigencia;  
    this.actos.plazoinicial = this.actoad.actos[i].plazoinicial;
    this.actos.plazofinal = this.actoad.actos[i].plazofinal;
    this.actos.nomdetalle = this.actoad.actos[i].nomdetalle;
    //this.actos.nominst = this.actoad.actos[i].nominst;
    this.texto_afavor = this.actoad.actos[i].nominst;
    this.actos.NRO_CUS_ACTO = this.actoad.actos[i].NRO_CUS_ACTO;
    this.actos.oficinaregistral = this.actoad.actos[i].oficinaregistral;
    this.actos.arearegistral = this.actoad.actos[i].arearegistral;
    this.sec.select = (this.actoad.actos[i].plazofinal == null || this.actoad.actos[i].plazofinal == '1900-01-01' || this.actoad.actos[i].plazofinal == '' )?"2":"1";
    //this.actos.tiempo = (this.actoad.actos[i].plazofinal == null || this.actoad.actos[i].plazofinal == '1900-01-01' || this.actoad.actos[i].plazofinal == '' )?0:this.actos.tiempo;
    this.restar()
    this.actos.costo = this.actoad.actos[i].costo;
    this.activar_flag_inscritoLoad(this.actoad.actos[i].codderecho)
    this.actos.vigencia = this.actoad.actos[i].vigencia;      
    this.actos.arealegal = this.actoad.actos[i].arealegal;
    this.actos.codigopartida = this.actoad.actos[i].codigopartida;
    this.actos.nropartida = this.actoad.actos[i].nropartida;
    this.actos.fojas = this.actoad.actos[i].FOJAS;
    this.actos.aporte = this.actoad.actos[i].aporte;
    this.actos.aporteDetalle = this.actoad.actos[i].aporteDetalle;
    this.actos.plazoinicial_doc = this.actoad.actos[i].plazoinicial_doc;
    this.actos.plazofinal_doc = this.actoad.actos[i].plazofinal_doc;
    this.sec.select2 = (this.actoad.actos[i].plazofinal_doc == null || this.actoad.actos[i].plazofinal_doc == '1900-01-01' || this.actoad.actos[i].plazofinal_doc == '' )?"2":"1";
    this.restar_doc()    
    this.aux = i
    
  }

  editaracto()
  {                
   
   let aux = this.validaract()        
   if (aux===undefined)        
   { 
   let obj = {
    item : 0,
    codigoacto : '',
    coddetalle : '',
    codnorma  : '',
    numerolegal : '',
    fechalegal : '',
    doccodigo : '',
    docnumero: '',
    docfecha : '',
    afavor : '',
    dispuesta : 0,
    areare : 0,
    codgenerico : '',
    codespecifico : '',
    codderecho : '',
    codvigencia : '',
    plazoinicial : '',
    plazofinal : '',
    tiempo : 0,
    costo : 0,
    nomdetalle: '',
    nominst : '',
    oficinaregistral : '0',
    arearegistral : 0,
    vigencia : '',
    arealegal : 0,
    codigopartida: 0,
    nropartida: '',
    fojas: '',
    aporte: '',
    aporteDetalle: '',
    plazoinicial_doc : '',
    plazofinal_doc : '',
    tiempo_doc : 0,

    }
    
    obj.item =  this.actos.item 
    obj.codigoacto = this.actos.codigoacto 
    obj.coddetalle = this.actos.coddetalle 
    obj.codnorma  = this.actos.codnorma 
    obj.numerolegal  = this.actos.numerolegal 
    obj.fechalegal = (this.actos.fechalegal == ""?null:this.actos.fechalegal)  
    obj.doccodigo   = this.actos.doccodigo 
    obj.docnumero  = this.actos.docnumero  
    obj.docfecha  = (this.actos.docfecha == ""?null:this.actos.docfecha) 
    obj.afavor   = this.actos.afavor 
    obj.dispuesta  = this.actos.dispuesta 
    obj.areare  = this.actos.areare 
    obj.codgenerico  = this.actos.codgenerico 
    obj.codespecifico  = this.actos.codespecifico 
    obj.codderecho  = this.actos.codderecho 
    obj.codvigencia   = this.actos.codvigencia 
    obj.plazoinicial  = this.actos.plazoinicial 
    obj.plazofinal  = this.actos.plazofinal   
    obj.tiempo  = this.actos.tiempo 
    obj.plazoinicial_doc  = this.actos.plazoinicial_doc
    obj.plazofinal_doc  = this.actos.plazofinal_doc
    obj.tiempo_doc  = this.actos.tiempo_doc
    obj.costo  = this.actos.costo 
    obj.nomdetalle  = this.actos.nomdetalle 
    obj.nominst  = this.actos.nominst    
    obj.oficinaregistral  = this.actos.oficinaregistral 
    obj.arearegistral  = this.actos.arearegistral 
    //obj.nominst = this.actos.nominst
    obj.nominst = this.texto_afavor
    if (this.actos.codvigencia=='S')
    {
      obj.vigencia = 'SI'
    }
    else
    {
      obj.vigencia = 'NO'
    }
        
    obj.arealegal  = this.actos.arealegal
    obj.codigopartida  = this.actos.codigopartida
    obj.nropartida  = this.actos.nropartida
    obj.fojas  = this.actos.fojas
    obj.aporte = this.actos.aporte
    obj.aporteDetalle = this.actos.aporteDetalle

    this.actoad.actos[this.aux] = obj      
    
    swal({
      type: 'success',
      title: 'Se actualizó el registro',                 
      confirmButtonText: 'Listo'                  
      });   
      
    this.validaracto(this.actoad)
    
   }
   
  }


  quitaracto(index,item){   
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success ml-2',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
     })  
    swalWithBootstrapButtons({
      title: '¿Estás seguro eliminar el proceso?',            
      type: 'warning',
      showCancelButton: true,    
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      reverseButtons: true
      }).then((result) => {
        if (result.value) {      
          this.spinner.show();                   
          this.dataservice.EliminarActosAd(this.actoad.codigo_interno,item).subscribe((data:any) =>{                       
            this.spinner.hide();   
            if (data.data[0].RESULTADO=="ERROR")
            {
              this.error("No se pudo eliminar")
            }
            else 
            {
              swal({
                type: 'success',
                title: 'El registro fue eliminado',                 
                confirmButtonText: 'Listo'                  
                });
                this.actoad.actos.splice(index ,1)               
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

  activar_flag_inscrito(codigo)
  {
    if (codigo == "0" || codigo == "2"){
      this.flag_inscrito = true
      this.actos.oficinaregistral = '0'
      this.actos.arearegistral = 0
    }else{
      this.flag_inscrito = false 
      this.actos.oficinaregistral = '0'
      this.actos.arearegistral = 0
    } 

    if (codigo == "1" || codigo == "2"){
      this.flag_inscritoarea = false
    }else{
      this.flag_inscritoarea = true
    }
  } 

  activar_flag_inscritoLoad(codigo)
  {
    if (codigo == "0" || codigo == "2"){
      this.flag_inscrito = true
    }else{
      this.flag_inscrito = false 
    } 

    if (codigo == "1" || codigo == "2"){
      this.flag_inscritoarea = false
    }else{
      this.flag_inscritoarea = true
    }
  } 



  cambiarPlazo(){
    if (this.sec.select == "2"){
      this.actos.tiempo = 0
      this.actos.plazofinal = ""
    }
  }

  cambiarPlazo2(){
    if (this.sec.select2 == "2"){
      this.actos.tiempo = 0
      this.actos.plazofinal = ""
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
