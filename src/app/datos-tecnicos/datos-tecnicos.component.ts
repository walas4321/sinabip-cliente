import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DatosgeneralesService } from '../services/datosgenerales.service';
import { ActosService } from '../services/actos.service';
import { AdquisicionService } from '../services/adquisicion.service';
import { DatosService } from '../services/datos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MigracionService } from '../services/migracion.service';
import swal from 'sweetalert2';
import { NgSelectConfig} from '@ng-select/ng-select';

@Component({
  selector: 'app-datos-tecnicos',
  templateUrl: './datos-tecnicos.component.html',
  styleUrls: ['./datos-tecnicos.component.css']
})
export class DatosTecnicosComponent implements OnInit {
  modala;
  via = [];
  detalle = [];
  habilitacion =[];
  generico=[];
  especifico = [];
  zona = [];
  terreno = [];
  zonificacion = [];
  ocupacion =[];
  proveedores = [];
  tipodocumento= [];
  flagvalidar : boolean = false;
  lindero = []
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
    area : '0',
    codocupante : undefined,
    razon : '',
    tipodoc : '',
    numdoc : '',
    parcial : '',
    areades : 0 ,
    codusuario : '',
    linderos:[]
  }

  
  linderolegal ={  
    item : 0,  
    lindero : '',
    colindancia : '',
    tramos : 0,
    lados : 0,
    municipal : 0,
    nomlind : ''
  }

  tipo = 0
  auxx = 0
  ultimo = 0
  auxcargar = ''
  count = 0
  active : boolean


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
  
  texto_afavor = ''
  auxnum = ''
  buscar: string = ''
  
  @Input('bloquear')  bloquear;
  @Input('codigo_interno')  codinterno;
  @Input('cargar')  cargar
  @Output('callback') salida = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private dataservice : DatosgeneralesService,
    private datoservice : ActosService,
    private aux : AdquisicionService,
    private service : DatosService,
    private MigracionService: MigracionService,
    private config: NgSelectConfig
  ) {      
    this.datos.codusuario =  sessionStorage.getItem('codigopersonal')
    //this.datos.codusuario = '2222'
    this.config.notFoundText = 'No hay resultados';       
  }
  
  ngOnChanges(){   
    this.bloquear=='1'? this.active=true: this.active = false    
    this.datos.codigo_interno= this.codinterno;
    this.auxcargar = this.cargar
    
    if (this.auxcargar=='4')
    {
      this.count = this.count + 1 

      if (this.datos.codigo_interno !="0" && this.datos.codigo_interno!=''){
        this.ObtenerUltimoLT(this.datos.codigo_interno)
      }
          
      if (this.count==1) 
      { 
        this.cargarcombos()  
        this.setcombos();                         
      }    
      
      if (this.datos.codigo_interno !="0" && this.datos.codigo_interno!='' && this.count==1)
      {               
        this.CargarLindero(this.datos.codigo_interno)
        this.CargarDatos(this.datos.codigo_interno)             
      }   
    }
    
  }

  ngOnInit() {    
    if (this.datos.codigo_interno =="0" || this.datos.codigo_interno ==''){
      this.linderomemoria()
      this.validardatos(this.datos)
    }
  }

  linderomemoria()
  {
    this.datos.linderos.push(
      { 
        item : 1 ,
        lindero : 1,
        colindancia : '',
        tramos : '0',
        lados : '0.0',
        municipal : '0',
        nomlind : "FRENTE"
      },
      { 
        item : 2 ,
        lindero : 2,
        colindancia : '',
        tramos : '0',
        lados : '0.0',
        municipal : '0',
        nomlind : "DERECHA"
      },
      { 
        item : 3 ,
        lindero : 3,
        colindancia : '',
        tramos : '0',
        lados : '0.0',
        municipal : '0',
        nomlind : "IZQUIERDA"
      },
      { 
        item : 4 ,
        lindero : 4,
        colindancia : '',
        tramos : '0',
        lados : '0.0',
        municipal : '0',
        nomlind : "FONDO"
      }

    )  
    this.ultimo = 4
  }

  CargarDatos(codigo)
  {
    this.spinner.show();
    this.MigracionService.ObtenerData('DT',codigo).subscribe((data:any) =>{                                       	       
      this.datos.via  =            (data.data[0].TIPO_VIA==null)?"0":data.data[0].TIPO_VIA      
      this.datos.direccion=        (data.data[0].DIRECCION_INMUEBLE==null)?"":data.data[0].DIRECCION_INMUEBLE
      this.datos.numero=           (data.data[0].NRO_INMUEBLE==null)?"":data.data[0].NRO_INMUEBLE
      this.datos.manzana =         (data.data[0].MANZANA==null)?"":data.data[0].MANZANA
      this.datos.lote =            (data.data[0].LOTE==null)?"":data.data[0].LOTE
      this.datos.detalle =         (data.data[0].DIRECCION_DETALLE==null)?"0":data.data[0].DIRECCION_DETALLE            
      this.datos.detalledescrip =  (data.data[0].NUMERACION_DETALLE==null)?"":data.data[0].NUMERACION_DETALLE
      this.datos.piso =            (data.data[0].PISO_UBICACION==null)?"0":data.data[0].PISO_UBICACION
      this.datos.habilitacion =    (data.data[0].TIPO_HABILITACION==null)?"0":data.data[0].TIPO_HABILITACION            
      this.datos.descripcion =     (data.data[0].URBANIZACION==null)?"":data.data[0].URBANIZACION
      this.datos.referencia =      (data.data[0].REFERENCIA==null)?"":data.data[0].REFERENCIA
      this.datos.cod_tipozona =    (data.data[0].TIPO_ZONA==null)?"0":data.data[0].TIPO_ZONA                  
      this.datos.cod_terreno=      (data.data[0].TIPO_TERRENO==null)?"0":data.data[0].TIPO_TERRENO            
      this.datos.zonificacion =    (data.data[0].ZONIFICACION==null)?"0":data.data[0].ZONIFICACION                  
      this.datos.codgenerico =     data.data[0].CODIGO_USO_GENERICO
      this.CargarEspecificos(data.data[0].CODIGO_USO_GENERICO)
      this.datos.codespecifico =  data.data[0].CODIGO_USO_ESPECIFICO
      this.datos.area          =  (data.data[0].AREA_TERRENO==null || data.data[0].AREA_TERRENO==".00")?"0":data.data[0].AREA_TERRENO      
      this.datos.codocupante   =  (data.data[0].CODIGO_INST_OCUPANTE==null)?"0":data.data[0].CODIGO_INST_OCUPANTE                  
      
      this.service.ObPoseedor( this.datos.codocupante).subscribe((dato:any) =>{                                   
        this.texto_afavor = dato.data[0].NOMBRE_INSTITUCION; 
         
      });

      this.datos.razon         =  (data.data[0].NOMBRE_RAZON_SOCIAL==null)?"":data.data[0].NOMBRE_RAZON_SOCIAL
      this.datos.tipodoc       =  (data.data[0].CODIGO_TIPODOCUMENTO==null)?"0":data.data[0].CODIGO_TIPODOCUMENTO                        
      this.datos.numdoc        =  (data.data[0].NRO_DOCUMENTO==null)?"":data.data[0].NRO_DOCUMENTO                  
      this.datos.parcial       =  (data.data[0].DESOCUPACION_PARCIAL==null)?"0":data.data[0].DESOCUPACION_PARCIAL
      this.datos.areades       =  (data.data[0].AREA_DESOCUPADA==null || data.data[0].AREA_DESOCUPADA==".00")?"0":data.data[0].AREA_DESOCUPADA            
      this.validardatos(this.datos)
      this.processMyValue(1)
      this.spinner.hide(); 
    }); 
  }

  setcombos()
  {
    this.datos.via = "0"
    this.datos.habilitacion = "0"
    this.datos.detalle = "0"    
    this.datos.cod_tipozona = "0"
    this.datos.cod_terreno  =  "0"
    this.datos.zonificacion = "0"
    this.datos.codgenerico = "0"
    this.datos.codespecifico = "0"
    this.datos.codocupante = undefined
    this.datos.tipodoc = "0"
    this.datos.parcial = "0"
    this.linderolegal.lindero = "0"

  }

  
  validardni(dni)
  {
    if (dni.length<8)
      {
        this.datos.numdoc=''
        this.error("El DNI debe tener 8 digitos")
      }
  }
  

  validarruc(ruc)
  {
    if (ruc.length<11)
      {
        this.datos.numdoc=''
        this.error("El RUC debe tener 11 digitos")
      }
  }
  
  limpiardocumento()
  {
    this.datos.numdoc=''
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
         {this.datos.numero = '0'}
         if (tipo==2)
         {this.datos.piso = 0}
         if (tipo==3)
         {this.datos.area = '0'}         
         if (tipo==4)
         {this.datos.areades = 0}
         if (tipo==5)
         {this.linderolegal.tramos = 0}
         if (tipo==6)
         {this.linderolegal.lados = 0}
      }      
      if (aux_2=='.0')
      {        
        this.error("Área no válida,formato incorrecto solo permite X.X")
        if (tipo==1)
        {this.datos.numero = '0'}
        if (tipo==2)
        {this.datos.piso = 0}
        if (tipo==3)
        {this.datos.area = '0'} 
        if (tipo==4)
        {this.datos.areades = 0}
        if (tipo==5)
        {this.linderolegal.tramos = 0}
        if (tipo==6)
        {this.linderolegal.lados = 0}       
      }
   } else {          
      let aux_3 =numero.substr(0,1)
      let aux_4 =numero.substr(0,2)  
      let aux_5 =numero.substr(1,1)                     
      if (aux_3=='.')
      {        
        this.error("Área no válida,formato incorrecto solo permite X.X")
        if (tipo==1)
        {this.datos.numero = '0'}
        if (tipo==2)
        {this.datos.piso = 0}
        if (tipo==3)
        {this.datos.area = '0'}  
        if (tipo==4)
        {this.datos.areades = 0}       
        if (tipo==5)
        {this.linderolegal.tramos = 0}
        if (tipo==6)
        {this.linderolegal.lados = 0}
      }           
      if (aux_4=='00' )
      {        
        this.error("Área no válida,solo permite un 0 a la izquierda del .")
        if (tipo==1)
        {this.datos.numero = '0'}
        if (tipo==2)
        {this.datos.piso = 0}
        if (tipo==3)
        {this.datos.area = '0'}   
        if (tipo==4)
        {this.datos.areades = 0}  
        if (tipo==5)
        {this.linderolegal.tramos = 0}
        if (tipo==6)
        {this.linderolegal.lados = 0}   
      }
      if (aux_3=='0' && aux_5>'0')
      {        
        this.error("Área no válida,no permite 0 a la izquierda")
        if (tipo==1)
        {this.datos.numero = '0'}
        if (tipo==2)
        {this.datos.piso = 0}
        if (tipo==3)
        {this.datos.area = '0'}   
        if (tipo==4)
        {this.datos.areades = 0} 
        if (tipo==5)
        {this.linderolegal.tramos = 0}
        if (tipo==6)
        {this.linderolegal.lados = 0}   
      }
   }
  }


  CargarLindero(codigo){
    this.spinner.show();
    this.MigracionService.ObtenerData('LT',codigo).subscribe((data:any) =>{                                   
    this.datos.linderos = []  
    
    if (data.data.length>0)
    {
      for (let i= 0; i < data.data.length; i++)      
      { 
        
        this.datos.linderos.push(
          {             
            item : data.data[i].NRO_LINDERO,
            lindero : data.data[i].LINDERO,
            colindancia : data.data[i].COLINDANCIA,
            tramos : data.data[i].TRAMOS,
            lados : data.data[i].LADOS,
            municipal : data.data[i].NRO_MUNICIPAL,
            nomlind : data.data[i].NOMLINDERO,
          }        
        );
      } 
    }
    else 
    {
      this.linderomemoria();             
    }         
    this.spinner.hide(); 
    }); 
  }

  validardatos(data){
    this.salida.emit(data);             
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

  CargarInstituciones()
  {
    this.spinner.show()
    this.datoservice.Instituciones(this.filtroSearch).subscribe((data:any) =>{    
      this.spinner.hide()      
      this.proveedores = data.data;       
      if(this.filtroSearch.valor.trim() !== ''){
        this.buscar = '1'; 
      }                                       
      this.total1 = ( this.proveedores.length > 0 ) ? this.proveedores[0].TOTAL : 0;    
    }); 
  }

  pasar(codigo,nombre)
  {
    this.datos.codocupante = codigo
    this.texto_afavor = nombre
    let  opt1 = document.getElementById("favor");
    opt1.click();
    this.validardatos(this.datos)
    
  } 

  loadPage1(page1: number) {       
    if (page1 !== this.previousPage1) {
      this.previousPage1 = page1;      
      this.CargarInstituciones();
    }
  }


  cargarcombos(){
    this.spinner.show();
    this.dataservice.Via().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.via = data.data;                                             
    }); 
    this.spinner.show();
    this.dataservice.Detalle().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.detalle = data.data;                                            
    }); 
    this.spinner.show();
    this.dataservice.Habilitacion().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.habilitacion = data.data;                                            
    }); 
    this.spinner.show();
    this.datoservice.Generico().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.generico = data.data;                                            
    }); 
   
    this.spinner.show();
    this.service.Zonas().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.zona = data.data;                                            
    }); 

    this.spinner.show();
    this.service.Terrenos().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.terreno = data.data;                                            
    }); 

    this.spinner.show();
    this.service.Zonificaciones().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.zonificacion = data.data;                                            
    }); 

    this.spinner.show();
    this.service.Ocupacion().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.ocupacion = data.data;                                            
    }); 
    
   

    this.spinner.show();
    this.service.TipoDocumento().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.tipodocumento = data.data;                                            
    }); 

    this.aux.Lindero().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.lindero = data.data;                                            
    });
  
  }

  CargarEspecificos(codgenerico){
     this.spinner.show();
    this.service.Especifico(codgenerico).subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.especifico = data.data;                                            
    });
  }

  ObtenerUltimoLT(aux)
  {
    this.spinner.show();                   
    this.service.ObtenerUltimo(aux).subscribe((data:any) =>{                       
      this.spinner.hide();      
        this.ultimo = data.data[0].ULTIMO    
    });
  }

  ObtenerNombre()
  {
    this.aux.NombreLindero(this.linderolegal.lindero).subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.linderolegal.nomlind  = data.data[0].DESCRIPCION_LINDEROS        
    })
  }

  
  modal(content,aux)
  {
    this.tipo = aux
    this.limpiarlindero()
    let opciones : NgbModalOptions = {
      size : "lg",
      backdrop : "static"
    };
    this.modala = this.modalService.open(content,opciones);
  }

  
  agregarlindero()
  {       
    let aux = this.validarlindero()        
    if (aux===undefined)        
    { 
      
        this.ultimo ++
        this.datos.linderos.push(
          { 
            item : this.ultimo,
            lindero : this.linderolegal.lindero,
            colindancia : this.linderolegal.colindancia,
            tramos : this.linderolegal.tramos,
            lados : this.linderolegal.lados,
            municipal : this.linderolegal.municipal,
            nomlind : this.linderolegal.nomlind
          } 
        )   
       swal({
          type: 'success',
          title: 'Se agrego el registro',                 
          confirmButtonText: 'Listo'                  
          });    
        this.limpiarlindero()
        this.validardatos(this.datos)
        this.modala.close();
    }
  }

  Limpiar()
  {
    this.buscar = ''
    this.filtroSearch.valor = ''
    this.CargarInstituciones()
  }

  usarComodin(seleccion){
    
    if(seleccion == true){
      this.filtroSearch.seleccion = 1
    }else{
      this.filtroSearch.seleccion = 0
    }
    //console.log(this.filtroSearch.seleccion)
  }

  modificarlindero(i,content)
  {        
    console.log(this.datos.linderos)
    this.modal(content,1);      
    this.linderolegal.item = this.datos.linderos[i].item;
    this.linderolegal.lindero = this.datos.linderos[i].lindero
    this.linderolegal.colindancia = this.datos.linderos[i].colindancia
    this.linderolegal.tramos = this.datos.linderos[i].tramos
    this.linderolegal.lados= this.datos.linderos[i].lados
    this.linderolegal.municipal= this.datos.linderos[i].municipal  
    this.linderolegal.nomlind = this.datos.linderos[i].nomlind  
    this.auxx = i     
  }

  editarlindero()
  {                
    let aux = this.validarlindero()        
    if (aux===undefined)        
    { 
    let obj = {
      item : 0,
      lindero : '',
      colindancia : '',
      tramos : 0,
      lados : 0,
      municipal : 0,
      nomlind : ''
    }
    obj.item =  this.linderolegal.item
    obj.lindero =this.linderolegal.lindero
    obj.colindancia = this.linderolegal.colindancia
    obj.tramos =  this.linderolegal.tramos
    obj.lados = this.linderolegal.lados
    obj.municipal = this.linderolegal.municipal
    obj.nomlind = this.linderolegal.nomlind     
    this.datos.linderos[this.auxx] = obj     
    this.validardatos(this.datos)        
    swal({
      type: 'success',
      title: 'Se actualizó el registro',
      confirmButtonText: 'Listo'                  
      });
      this.modala.close();
    }
  }


  limpiarlindero()
  {
    this.linderolegal.lindero = "0";
    this.linderolegal.colindancia="";
    this.linderolegal.tramos= 0;
    this.linderolegal.lados=0;
    this.linderolegal.municipal=0;
  }


  quitarlindero(index,item)
  {    
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
          this.service.EliminarLT(this.datos.codigo_interno,item).subscribe((data:any) =>{                       
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
                this.datos.linderos.splice(index ,1)                  
            }
                      
          });  
                  
        }
      });
  }

  validarlindero()
  {    
    if (this.linderolegal.lindero=="0")
      {
         this.error("Selecciona un Lindero")
         this.flagvalidar = true 
         return this.flagvalidar
      }
    else if(this.linderolegal.colindancia=="")
     {
      this.error("Ingresa Colindancia")
      this.flagvalidar = true 
      return this.flagvalidar
     }
     /*
    else if(this.linderolegal.tramos==0)
     {
      this.error("Ingresa Tramos")
      this.flagvalidar = true 
      return this.flagvalidar
     }
    else if(this.linderolegal.lados==0)
     {
      this.error("Ingresa Nº de Lados")
      this.flagvalidar = true 
      return this.flagvalidar
     }
     */
    /*else if(this.linderolegal.municipal==0)
     {
      this.error("Ingresa Nº Municipal")
      this.flagvalidar = true 
      return this.flagvalidar
     }*/
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
      if(this.datos.area!='')   
      {
        this.auxnum = this.datos.area
        let noTruncarDecimales = {maximumFractionDigits: 10}
        let numberVal = parseFloat(this.auxnum).toLocaleString('en-US', noTruncarDecimales);
        this.datos.area = numberVal;         
      }
      else
      {
        this.auxnum =''
      }
    }
     
  }

  foco(opcion)
  {    
    if(opcion==1){
      if (this.auxnum!="")
      {
        this.datos.area = this.auxnum     
      }
    }
    
  }

}
