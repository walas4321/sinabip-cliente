import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ObrasService } from '../services/obras.service';
import { AdquisicionService } from '../services/adquisicion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MigracionService } from '../services/migracion.service';
import swal from 'sweetalert2';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.css']
})
export class ObrasComponent implements OnInit {
  valorizacion = [];
  moneda = [];
  materiales = [];
  estado =[];
  
  value:any;

  valor ={
    suma : 0
  }
  obras ={
    codigo_interno : '',
    OBSERVACIONES:'', 
    TIPO_VALORIZACION:'',
    TIPO_MONEDA:'D',
    TIPO_CAMBIO: 0,
    FECHA_TASACION : '',
    VALOR_CONSTRUCCIONES: 0,
    VALOR_OBRAS:0,
    VALOR_TERRENO:'0',
    VALOR_INMUEBLE:0,
    VALOR_SOLES:'0',
    codusuario : '',
    obrascomplementarias : [] 
  }

  obrascomplementarias  = {    
    item : 0,
    codigoobra : 0,
    denominacion: '',
    antiguedad : 0,
    valor_unitario:0,
    cantidad:0,
    codestado : '',
    codmaterial : '',
    valor_estimado:0
  }

  tipo = 0
  aux = 0
  ultimo = 0
  flagvalidar : boolean = false;
  flag : boolean = true;
  auxcargar = ''
  count = 0
  active : boolean
  cambio = ''
  auxnum = ''
  auxVALOR_SOLES = ''
  @Input('bloquear')  bloquear;
  @Input('codigo_interno')  codinterno
  @Input('cargar')  cargar
  @Output('callback') salida = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private dataservice : ObrasService,
    private service : AdquisicionService,
    private spinner: NgxSpinnerService,
    private MigracionService: MigracionService,
  ) { 
    this.obras.codusuario =  sessionStorage.getItem('codigopersonal')   
  }



  processMyValue(opcion) {      
    if(opcion==1)
    {
      if(this.obras.VALOR_TERRENO!='')   
      {
        this.auxnum = this.obras.VALOR_TERRENO
        //console.log(this.auxnum)
        let noTruncarDecimales = {maximumFractionDigits: 10}
        let numberVal = parseFloat(this.auxnum).toLocaleString('en-US', noTruncarDecimales);
        //console.log(numberVal)
        let decArr=this.auxnum.split(".");
               if(decArr.length>1){                   
                   var dec=decArr[1].length;     
                   //console.log(dec)              
                  if(dec>1)
                  {
                    
                    if (decArr[1] == '00'){
                      
                      numberVal+="00"
                    }else{  
                      let val = decArr[1].toString().substr(decArr[1].toString().length - 1) 
                      console.log(val)                     
                      if (Number(val)==0)
                         {numberVal+="0"}
                    }
                  }
                    
               }
        this.obras.VALOR_TERRENO = numberVal;         
      }
      else
      {
        this.auxnum =''
      }
    }
    if(opcion==2)
    {
      if(this.obras.VALOR_SOLES!='')   
      {
        this.auxVALOR_SOLES = this.obras.VALOR_SOLES
        
        let noTruncarDecimales = {maximumFractionDigits: 10}
        let numberVal = parseFloat(this.auxVALOR_SOLES).toLocaleString('en-US', noTruncarDecimales);
        let decArr=this.auxVALOR_SOLES.split(".");
               if(decArr.length>1){                   
                   var dec=decArr[1].length;                   
                   if(dec>1)
                     
                    {  
                      let val = decArr[1].toString().substr(decArr[1].toString().length - 1)                      
                      if (Number(val)==0)
                         {numberVal+="0"}
                    }
               }                
        this.obras.VALOR_SOLES = numberVal;         
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
        this.obras.VALOR_TERRENO = this.auxnum     
      }
    }
    if(opcion==2){
      if (this.auxVALOR_SOLES!="")
      {
        this.obras.VALOR_SOLES = this.auxVALOR_SOLES  
      }
    }
    
  }



  ngOnChanges(){   
    this.obras.codigo_interno= this.codinterno;
    this.auxcargar = this.cargar
    this.bloquear=='1'? this.active=true: this.active = false
    if (this.auxcargar=='6')
    {
      this.count = this.count+ 1      
      if (this.count==1) 
      { 
        this.cargando() 
        this.cargarcombos()  
        this.setcombo();                   
      }

      if (this.obras.codigo_interno !="" &&  this.count ==1)
      {               
        //this.cargando() 
        this.obras.TIPO_MONEDA = 'D'
        this.cambiar(this.obras.TIPO_MONEDA)

        this.CargarObras(this.obras.codigo_interno)       
        this.CargarComplementarias(this.obras.codigo_interno) 
        this.processMyValue(1)
        this.processMyValue(2)
      }

      if (this.obras.codigo_interno !=""){
        this.dataservice.ObtenerSuma(this.obras.codigo_interno).subscribe((data:any) =>{                       
          this.obras.VALOR_CONSTRUCCIONES = data.data[0].suma_total 
          this.default_sumar()      
          this.processMyValue(1)
          this.processMyValue(2)      
        }); 
        this.ObtenerUltimoO(this.obras.codigo_interno)
      }
    }
  }

  ngOnInit() {    
    this.validarobra(this.obras)
  }

  modal(content,aux)
  {
    this.tipo = aux 
    this.limpiarobra()
    let opciones : NgbModalOptions = {
      size : "lg",
      backdrop : "static"
    };
    this.modalService.open(content,opciones);
  }

  cargando()
  {    
    this.spinner.show();
    setTimeout(() => {      
      this.spinner.hide();
    }, 8000);
  }

  
  validarobra(data){
    this.salida.emit(data);         
   } 

   habilitar(tipo)
   {
     if (tipo==0)
     {
        this.flag = true 
        this.obras.TIPO_CAMBIO =0        
     }
     else 
     {
       this.flag = false 
     }
   }
  
  CargarObras(codigo){
    this.spinner.show();
    this.MigracionService.ObtenerData('OV',codigo).subscribe((data:any) =>{                                       	      
      this.obras.OBSERVACIONES= (data.data[0].OBSERVACIONES==null)?"":data.data[0].OBSERVACIONES
      this.obras.TIPO_VALORIZACION= (data.data[0].TIPO_VALORIZACION==null)?"0":data.data[0].TIPO_VALORIZACION
      this.obras.TIPO_MONEDA= (data.data[0].TIPO_MONEDA==null || data.data[0].TIPO_MONEDA=='0')?"D":data.data[0].TIPO_MONEDA
      let numero= (data.data[0].TIPO_CAMBIO==null || data.data[0].TIPO_CAMBIO==".000")?"0":data.data[0].TIPO_CAMBIO      
      this.obras.TIPO_CAMBIO = Math.round(numero * 100) / 100
      this.obras.FECHA_TASACION = (data.data[0].FECHA_TASACION==null)?"":data.data[0].FECHA_TASACION
      this.obras.VALOR_CONSTRUCCIONES = (data.data[0].VALOR_CONSTRUCCIONES==null || data.data[0].VALOR_CONSTRUCCIONES==".00" || data.data[0].VALOR_CONSTRUCCIONES==0)?"0":data.data[0].VALOR_CONSTRUCCIONES      
      this.obras.VALOR_OBRAS = (data.data[0].VALOR_OBRAS==null || data.data[0].VALOR_OBRAS==".00")?"0":data.data[0].VALOR_OBRAS      
      this.obras.VALOR_TERRENO= (data.data[0].VALOR_TERRENO==null || data.data[0].VALOR_TERRENO==".00")?"0":data.data[0].VALOR_TERRENO
      
      this.obras.VALOR_INMUEBLE= (data.data[0].VALOR_INMUEBLE==null || data.data[0].VALOR_INMUEBLE==".00")?"0":data.data[0].VALOR_INMUEBLE
      this.obras.VALOR_SOLES=(data.data[0].VALOR_SOLES==null || data.data[0].VALOR_SOLES==".00")?"0":data.data[0].VALOR_SOLES      
      if (this.obras.TIPO_CAMBIO!=0)
        {
          this.flag= false 
        }

    }); 
  }

  CargarComplementarias(codigo){
    this.spinner.show();
    this.MigracionService.ObtenerData('OC',codigo).subscribe((data:any) =>{                                   
     this.obras.obrascomplementarias = []
     for (let i= 0; i < data.data.length; i++)      
        { 
          
          this.obras.obrascomplementarias.push(
            {             
              item : data.data[i].ITEM_INSPECCION,              
              codigoobra : data.data[i].CODIGO_OBRA,              
              denominacion: data.data[i].DENOMINACION,              
              antiguedad : data.data[i].ANTIGUEDAD,              
              valor_unitario: data.data[i].VALOR_UNITARIO,              
              cantidad: data.data[i].CANTIDAD,              
              codestado :data.data[i].CODIGO_ESTADO,              
              codmaterial : data.data[i].CODIGO_MATERIAL,              
              valor_estimado: data.data[i].VALOR_ESTIMADO,              
            }        
          );
        }     
     this.spinner.hide(); 
    }); 
  }
  
  cambiar(tipo)
  {    
    let valor_soles
    let valor_inmueble  
    if (tipo=="S")   
     {
       this.obras.TIPO_MONEDA = 'S'    
       if (this.obras.TIPO_CAMBIO>0)
       {
        if (this.auxnum!='')
        {
          valor_soles =   Number(this.obras.VALOR_CONSTRUCCIONES) +  Number(this.obras.VALOR_OBRAS) + parseFloat(this.auxnum)
        }
        else
        {
          valor_soles =   Number(this.obras.VALOR_CONSTRUCCIONES) +  Number(this.obras.VALOR_OBRAS) + parseFloat(this.obras.VALOR_TERRENO)
        }
        
        this.obras.VALOR_SOLES = 	(Math.round(valor_soles* 100) / 100).toString()
        valor_inmueble  = Number(this.obras.VALOR_SOLES) / this.obras.TIPO_CAMBIO
        this.obras.VALOR_INMUEBLE = 	Math.round(valor_inmueble* 100) / 100
       }       
     }
    else if (tipo=="D")
     {
       this.obras.TIPO_MONEDA = 'D'    
       if (this.obras.TIPO_CAMBIO>0)
       {
       if (this.auxnum!='')
       {
        valor_inmueble = Number(this.obras.VALOR_CONSTRUCCIONES) +  Number(this.obras.VALOR_OBRAS) + parseFloat(this.auxnum)      
       }
       else
       {
        valor_inmueble = Number(this.obras.VALOR_CONSTRUCCIONES) +  Number(this.obras.VALOR_OBRAS) + parseFloat(this.obras.VALOR_TERRENO)      
       }
             
       this.obras.VALOR_INMUEBLE = 	Math.round(valor_inmueble* 100) / 100      
       valor_soles   = this.obras.VALOR_INMUEBLE* this.obras.TIPO_CAMBIO
       this.obras.VALOR_SOLES = 	(Math.round(valor_soles* 100) / 100).toString()
       }
     }
    else if (tipo=="0") 
     {
        this.obras.TIPO_MONEDA = '0'
        this.obras.VALOR_SOLES = '0'
        //this.obras.VALOR_INMUEBLE = 0
     }
  }


  sumar_obras()
  {    
    let valor_soles
    let valor_inmueble
    if (this.obras.TIPO_MONEDA=='S')
    {         
      if (this.obras.TIPO_CAMBIO>0 )
      {                       
        valor_soles =   Number(this.obras.VALOR_CONSTRUCCIONES) +  Number(this.obras.VALOR_OBRAS) + parseFloat(this.obras.VALOR_TERRENO)          
        this.obras.VALOR_SOLES = 	(Math.round(valor_soles* 100) / 100).toString()
        valor_inmueble  = Number(this.obras.VALOR_SOLES) / Number(this.obras.TIPO_CAMBIO)           
        this.obras.VALOR_INMUEBLE = 	Math.round(valor_inmueble* 100) / 100              
      }     
    }
    else if (this.obras.TIPO_MONEDA=='D')
    {                 
      valor_inmueble = Number(this.obras.VALOR_CONSTRUCCIONES) +  Number(this.obras.VALOR_OBRAS) + Number(this.auxnum)            
      this.obras.VALOR_INMUEBLE = Math.round(valor_inmueble)
      if (this.obras.TIPO_CAMBIO> 0)       
      {
        valor_soles   = this.obras.VALOR_INMUEBLE* Number(this.obras.TIPO_CAMBIO) 
        this.obras.VALOR_SOLES = valor_soles
      }
    }
  }

  onTipoTerreno(event){ 
    let valor_soles
    let valor_inmueble
    if (this.obras.TIPO_MONEDA=='S')
    {          
      if (this.obras.TIPO_CAMBIO>0 )
      {
          if(this.auxnum!='')
          {    
          valor_soles =   Number(this.obras.VALOR_CONSTRUCCIONES) +  Number(this.obras.VALOR_OBRAS) + parseFloat(this.auxnum)
          }
          else 
          {
            valor_soles =   Number(this.obras.VALOR_CONSTRUCCIONES) +  Number(this.obras.VALOR_OBRAS) + parseFloat(this.obras.VALOR_TERRENO)
          }          
          this.obras.VALOR_SOLES = 	(Math.round(valor_soles* 100) / 100).toString()
          valor_inmueble  = Number(this.obras.VALOR_SOLES) / Number(event.target.value)           
          this.obras.VALOR_INMUEBLE = 	Math.round(valor_inmueble* 100) / 100    
          
      }
      else
      {     
        this.obras.VALOR_SOLES = '0'
        //this.obras.VALOR_INMUEBLE = 0
        this.auxnum ='0'
      }
    }
    else if (this.obras.TIPO_MONEDA=='D')
    {            
      if (this.auxnum!='')
      {
        valor_inmueble = Number(this.obras.VALOR_CONSTRUCCIONES) +  Number(this.obras.VALOR_OBRAS) + parseFloat(this.auxnum)      
      }
      else
      {
        valor_inmueble = Number(this.obras.VALOR_CONSTRUCCIONES) +  Number(this.obras.VALOR_OBRAS) + parseFloat(this.obras.VALOR_TERRENO)      
      }
      
      this.obras.VALOR_INMUEBLE = 	Math.round(valor_inmueble* 100) / 100 
      if (Number(event.target.value) > 0)       
      {
        valor_soles   = this.obras.VALOR_INMUEBLE* Number(event.target.value) 
        this.obras.VALOR_SOLES = 	(Math.round(valor_soles* 100) / 100).toString()
        this.auxVALOR_SOLES = (Math.round(valor_soles* 100) / 100).toString()

      }
    }
  }
  onConstrucciones(event){  
    let valor_soles
    let valor_inmueble  
    if (this.obras.TIPO_MONEDA=='S')
    {  
      if (this.obras.TIPO_CAMBIO>0)
      {        
        if (this.auxnum!='')
        {
        valor_soles =  parseFloat(event.target.value) +  Number(this.obras.VALOR_OBRAS) + parseFloat(this.auxnum)
        }
        else
        {
        valor_soles =  parseFloat(event.target.value) +  Number(this.obras.VALOR_OBRAS) + parseFloat(this.obras.VALOR_TERRENO)
        }
        
        this.obras.VALOR_SOLES = 	(Math.round(valor_soles* 100) / 100).toString()
        valor_inmueble  = Number(this.obras.VALOR_SOLES) / this.obras.TIPO_CAMBIO      
        this.obras.VALOR_INMUEBLE = 	Math.round(valor_inmueble* 100) / 100   
      }
    }
    else if (this.obras.TIPO_MONEDA=='D')
    {           
      if (this.auxnum!='')
      {
      valor_inmueble =  parseFloat(event.target.value) +  Number(this.obras.VALOR_OBRAS) + parseFloat(this.auxnum)      
      }
      else
      {
      valor_inmueble =  parseFloat(event.target.value) +  Number(this.obras.VALOR_OBRAS) + parseFloat(this.obras.VALOR_TERRENO)
      }
      this.obras.VALOR_INMUEBLE = 	Math.round(valor_inmueble* 100) / 100 
      if (this.obras.TIPO_CAMBIO>0)
      {
        valor_soles   = this.obras.VALOR_INMUEBLE* this.obras.TIPO_CAMBIO
        this.obras.VALOR_SOLES = 	(Math.round(valor_soles* 100) / 100).toString()
      }
    }
  }
  
  onObras(event){  
    let valor_soles
    let valor_inmueble       
    if (this.obras.TIPO_MONEDA=='S')
    {     
      if (this.obras.TIPO_CAMBIO>0)
      {
        if (this.auxnum!='')
        {
        valor_soles =  parseFloat(event.target.value) + Number(this.obras.VALOR_CONSTRUCCIONES) +  parseFloat(this.auxnum) 
        }
        else
        {
        valor_soles =  parseFloat(event.target.value) + Number(this.obras.VALOR_CONSTRUCCIONES) +  parseFloat(this.obras.VALOR_TERRENO) 
        }
        this.obras.VALOR_SOLES = 	(Math.round(valor_soles* 100) / 100).toString()
        valor_inmueble  = Number(this.obras.VALOR_SOLES) / this.obras.TIPO_CAMBIO        
        this.obras.VALOR_INMUEBLE = 	Math.round(valor_inmueble* 100) / 100 
      }
    }
    else if (this.obras.TIPO_MONEDA=='D')
    {      
      if (this.auxnum!='')
      {
        valor_inmueble =  parseFloat(event.target.value) + Number(this.obras.VALOR_CONSTRUCCIONES) +  parseFloat(this.auxnum) 
      }
      else
      {
        valor_inmueble =  parseFloat(event.target.value) + Number(this.obras.VALOR_CONSTRUCCIONES) +  parseFloat(this.obras.VALOR_TERRENO) 
      }
      
      this.obras.VALOR_INMUEBLE = 	Math.round(valor_inmueble* 100) / 100 
      if (this.obras.TIPO_CAMBIO>0)
      {
        valor_soles   = this.obras.VALOR_INMUEBLE* this.obras.TIPO_CAMBIO
        this.obras.VALOR_SOLES = 	(Math.round(valor_soles* 100) / 100).toString()
      }
    }
  }

  onTerreno(event){  
    let valor_soles
    let valor_inmueble      
 
    if (this.obras.TIPO_MONEDA=='S')
    {   
      if (this.obras.TIPO_CAMBIO>0)
      {        
        if (Number(event.target.value)>0)
          {          
          valor_soles =  parseFloat(event.target.value) +  Number(this.obras.VALOR_CONSTRUCCIONES) +  Number(this.obras.VALOR_OBRAS)                  
          this.obras.VALOR_SOLES = 	(Math.round(valor_soles* 100) / 100).toString()
          valor_inmueble  = Number(this.obras.VALOR_SOLES) / this.obras.TIPO_CAMBIO      
          this.obras.VALOR_INMUEBLE = 	Math.round(valor_inmueble* 100) / 100   
          }
        else
          {          
            this.obras.VALOR_SOLES = '0'
            //this.obras.VALOR_INMUEBLE = 0
            this.auxnum = '0'
          }
        
      }
      else 
      {
        this.obras.VALOR_SOLES = '0'
        //this.obras.VALOR_INMUEBLE = 0
        this.auxnum = '0'
      }
    }
    else if (this.obras.TIPO_MONEDA=='D')
    {      
      valor_inmueble = parseFloat(event.target.value) +  Number(this.obras.VALOR_CONSTRUCCIONES) +  Number(this.obras.VALOR_OBRAS)
      console.log(valor_inmueble)
      this.obras.VALOR_INMUEBLE = 	Math.round(valor_inmueble* 100) / 100 
      if (this.obras.TIPO_CAMBIO>0)
      {
        valor_soles   = this.obras.VALOR_INMUEBLE* this.obras.TIPO_CAMBIO
        this.obras.VALOR_SOLES = 	(Math.round(valor_soles* 100) / 100).toString()
        this.auxVALOR_SOLES = (Math.round(valor_soles* 100) / 100).toString()
      }
    }
  }


  default_sumar()
  {
    this.obras.VALOR_INMUEBLE = Number(this.obras.VALOR_CONSTRUCCIONES) + Number(this.obras.VALOR_OBRAS) + Number(this.obras.VALOR_TERRENO)
  }

  onUnitario(event)
  {
    if (event.target.value!='.')
    {this.obrascomplementarias.valor_estimado = this.obrascomplementarias.cantidad * Number(event.target.value)}
  }

  onCantidad(event)
  {
    this.obrascomplementarias.valor_estimado = this.obrascomplementarias.valor_unitario * Number(event.target.value)
  }


  cargarcombos(){
    this.spinner.show();
    this.dataservice.Valorizacion().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.valorizacion = data.data;                                             
    }); 

    this.spinner.show();
    this.service.Moneda().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.moneda = data.data;                                             
    }); 

    this.spinner.show();
    this.dataservice.Materiales().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.materiales = data.data;                                             
    }); 

    this.spinner.show();
    this.dataservice.Estado().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.estado = data.data;                                             
    }); 
  }

  limpiarobra()
  {
    this.obrascomplementarias.item = 0
    this.obrascomplementarias.codigoobra = 0
    this.obrascomplementarias.denominacion = ''
    this.obrascomplementarias.antiguedad = 0
    this.obrascomplementarias.valor_unitario = 0
    this.obrascomplementarias.cantidad = 0
    this.obrascomplementarias.codestado = '0'
    this.obrascomplementarias.codmaterial = '0'
    this.obrascomplementarias.valor_estimado = 0
  }  

  validarobrascomplemenatarias()
  {    
    if (this.obrascomplementarias.denominacion=="")
      {
         this.error("Ingrese Nombre")
         this.flagvalidar = true 
         return this.flagvalidar
      }
    else if(this.obrascomplementarias.antiguedad==0)
     {
      this.error("Ingresa Antiguedad")
      this.flagvalidar = true 
      return this.flagvalidar
     }  
    else if(this.obrascomplementarias.codmaterial=="0")
     {
      this.error("Seleccione Material")
      this.flagvalidar = true 
      return this.flagvalidar
     } 
    else if(this.obrascomplementarias.codestado=="0")
     {
      this.error("Seleccione Estado")
      this.flagvalidar = true 
      return this.flagvalidar
     } 
     else if(this.obrascomplementarias.valor_unitario==0)
     {
      this.error("Ingrese Valor Unitario")
      this.flagvalidar = true 
      return this.flagvalidar
     } 
     else if(this.obrascomplementarias.cantidad==0)
     {
      this.error("Ingrese Cantidad")
      this.flagvalidar = true 
      return this.flagvalidar
     } 
     else if(this.obrascomplementarias.valor_estimado==0)
     {
      this.error("Ingrese Valor Estimado")
      this.flagvalidar = true 
      return this.flagvalidar
     } 
  }

  agregarobra()
  {       
    let aux = this.validarobrascomplemenatarias()        
    if (aux===undefined)        
    {        
        this.ultimo ++       
        this.obras.obrascomplementarias.push(
          { 
            item : 1  ,
            codigoobra : this.ultimo,
            denominacion: this.obrascomplementarias.denominacion,
            antiguedad : this.obrascomplementarias.antiguedad,
            valor_unitario: this.obrascomplementarias.valor_unitario,
            cantidad: this.obrascomplementarias.cantidad,
            codestado : this.obrascomplementarias.codestado,
            codmaterial : this.obrascomplementarias.codmaterial,
            valor_estimado: this.obrascomplementarias.valor_estimado
          } 
        )  
        swal({
          type: 'success',
          title: 'Se agregó el registro',                 
          confirmButtonText: 'Listo'                  
          });         
        this.limpiarobra()    
        this.validarobra(this.obras)
                
        this.valor.suma = 0           
        let i = 0
        for (i =0; i< this.obras.obrascomplementarias.length; i++)
        {                                                      
          this.valor.suma = Number(this.valor.suma) + Number(this.obras.obrascomplementarias[i].valor_estimado)
          this.obras.VALOR_OBRAS = this.valor.suma                          
        }
        this.sumar_obras()
        
    }
  }

  editarobra()
  {                
    let aux = this.validarobrascomplemenatarias()        
    if (aux===undefined)        
    {   
    let obj = {
      item : 0,
      codigoobra : 0,
      denominacion: '',
      antiguedad : 0,
      valor_unitario:0,
      cantidad:0,
      codestado : '',
      codmaterial : '',
      valor_estimado:0
    }
    obj.item =  this.obrascomplementarias.item
    obj.codigoobra =  this.obrascomplementarias.codigoobra
    obj.denominacion =  this.obrascomplementarias.denominacion
    obj.antiguedad =  this.obrascomplementarias.antiguedad
    obj.valor_unitario =  this.obrascomplementarias.valor_unitario
    obj.cantidad =  this.obrascomplementarias.cantidad
    obj.codestado =  this.obrascomplementarias.codestado
    obj.codmaterial =  this.obrascomplementarias.codmaterial
    obj.valor_estimado =  this.obrascomplementarias.valor_estimado
    
    this.obras.obrascomplementarias[this.aux] = obj 
    
    swal({
      type: 'success',
      title: 'Se actualizó el registro',                 
      confirmButtonText: 'Listo'                  
      });  
            
      this.valor.suma = 0    
      let i =0 
      for (i =0; i< this.obras.obrascomplementarias.length; i++)
      {                                                      
        this.valor.suma = Number(this.valor.suma) + Number(this.obras.obrascomplementarias[i].valor_estimado)
        this.obras.VALOR_OBRAS = this.valor.suma                          
      }            
      this.validarobra(this.obras)       
      this.sumar_obras()

    }
  }

  

  validardecimal(numero,tipo)
  {    
    if (numero % 1 == 0) {      
      let aux_1 =numero.substr(0,1)    
      let aux_2 =numero.substr(0,2)
      if (aux_1 =='0')
      {
        this.error("Valor no válido,no permite 0 a la izquierda")
         if (tipo==1)
         {this.obrascomplementarias.antiguedad= 0}
         if (tipo==2)
         {this.obrascomplementarias.valor_unitario= 0}
         if (tipo==3)
         {this.obrascomplementarias.cantidad= 0}
         if (tipo==4)
         {this.obras.TIPO_CAMBIO= 0}
         if (tipo==5)
         {this.obras.VALOR_CONSTRUCCIONES= 0}
         if (tipo==6)
         {this.obras.VALOR_OBRAS= 0}
         if (tipo==7)
         {this.obras.VALOR_TERRENO= '0'}
         if (tipo==8)
         {this.obras.VALOR_SOLES= '0'}
      }      
      if (aux_2=='.0')
      {        
        this.error("Valor no válido,formato incorrecto solo permite X.X")       
         if (tipo==1)
         {this.obrascomplementarias.antiguedad= 0}
         if (tipo==2)
         {this.obrascomplementarias.valor_unitario= 0}
         if (tipo==3)
         {this.obrascomplementarias.cantidad= 0}
         if (tipo==4)
         {this.obras.TIPO_CAMBIO= 0}
         if (tipo==5)
         {this.obras.VALOR_CONSTRUCCIONES= 0}
         if (tipo==6)
         {this.obras.VALOR_OBRAS= 0}
         if (tipo==7)
         {this.obras.VALOR_TERRENO= '0'} 
         if (tipo==8)
         {this.obras.VALOR_SOLES= '0'}    
      }
   } else {          
      let aux_3 =numero.substr(0,1)
      let aux_4 =numero.substr(0,2)  
      let aux_5 =numero.substr(1,1)                     
      if (aux_3=='.')
      {        
        this.error("Valor no válido,formato incorrecto solo permite X.X")      
        if (tipo==1)
        {this.obrascomplementarias.antiguedad= 0}
        if (tipo==2)
        {this.obrascomplementarias.valor_unitario= 0}
        if (tipo==3)
        {this.obrascomplementarias.cantidad= 0}
        if (tipo==4)
        {this.obras.TIPO_CAMBIO= 0}
        if (tipo==5)
        {this.obras.VALOR_CONSTRUCCIONES= 0}
        if (tipo==6)
        {this.obras.VALOR_OBRAS= 0}
        if (tipo==7)
        {this.obras.VALOR_TERRENO= '0'}
        if (tipo==8)
         {this.obras.VALOR_SOLES= '0'}
      }           
      if (aux_4=='00' )
      {        
        this.error("Valor no válido,solo permite un 0 a la izquierda del .")
         if (tipo==1)
         {this.obrascomplementarias.antiguedad= 0}
         if (tipo==2)
         {this.obrascomplementarias.valor_unitario= 0}
         if (tipo==3)
         {this.obrascomplementarias.cantidad= 0}
         if (tipo==4)
         {this.obras.TIPO_CAMBIO= 0}
         if (tipo==5)
         {this.obras.VALOR_CONSTRUCCIONES= 0}
         if (tipo==6)
         {this.obras.VALOR_OBRAS= 0}
         if (tipo==7)
         {this.obras.VALOR_TERRENO= '0'}
         if (tipo==8)
         {this.obras.VALOR_SOLES= '0'}
      }
      if (aux_3=='0' && aux_5>'0')
      {        
        this.error("Valor no válido,no permite 0 a la izquierda")        
         if (tipo==1)
         {this.obrascomplementarias.antiguedad= 0}
         if (tipo==2)
         {this.obrascomplementarias.valor_unitario= 0}
         if (tipo==3)
         {this.obrascomplementarias.cantidad= 0}
         if (tipo==4)
         {this.obras.TIPO_CAMBIO= 0}
         if (tipo==5)
         {this.obras.VALOR_CONSTRUCCIONES= 0}
         if (tipo==6)
         {this.obras.VALOR_OBRAS= 0}
         if (tipo==7)
         {this.obras.VALOR_TERRENO= '0'}
         if (tipo==8)
         {this.obras.VALOR_SOLES= '0'}
      }
   }
  }

  ObtenerUltimoO(aux)
  {
    this.spinner.show();                   
    this.dataservice.ObtenerUltimo(aux).subscribe((data:any) =>{                       
      this.spinner.hide();      
        this.ultimo = data.data[0].ULTIMO                
    });
  }

  modificarobra(i,content)
  {        
    this.modal(content,1);      
    this.obrascomplementarias.item = this.obras.obrascomplementarias[i].item;
    this.obrascomplementarias.codigoobra = this.obras.obrascomplementarias[i].codigoobra;
    this.obrascomplementarias.denominacion = this.obras.obrascomplementarias[i].denominacion;
    this.obrascomplementarias.antiguedad = this.obras.obrascomplementarias[i].antiguedad;
    this.obrascomplementarias.valor_unitario = this.obras.obrascomplementarias[i].valor_unitario;
    this.obrascomplementarias.cantidad = this.obras.obrascomplementarias[i].cantidad;
    this.obrascomplementarias.codestado = this.obras.obrascomplementarias[i].codestado;
    this.obrascomplementarias.codmaterial = this.obras.obrascomplementarias[i].codmaterial;
    this.obrascomplementarias.valor_estimado = this.obras.obrascomplementarias[i].valor_estimado;
    this.aux = i       

  }
  quitarobra(index,item,valor){
    
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
          this.dataservice.EliminarO(this.obras.codigo_interno,item).subscribe((data:any) =>{                       
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
                this.obras.obrascomplementarias.splice(index ,1)  
                this.obras.VALOR_OBRAS = this.obras.VALOR_OBRAS - valor
                this.sumar_obras()
            }
                      
          });  
                  
        }
      });
  }

  setcombo()
  {
    this.obrascomplementarias.codmaterial = "0"
    this.obrascomplementarias.codestado = "0"
    this.obras.TIPO_VALORIZACION = "0"
    this.obras.TIPO_MONEDA = "0"

  }
   
  error(titulo)
  {
    swal({
      type: 'error',
      title: titulo,            
      confirmButtonText: 'Listo'
    });
  }
}
