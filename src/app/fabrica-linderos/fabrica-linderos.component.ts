import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FabricalinderosService } from '../services/fabricalinderos.service';
import { MigracionService } from '../services/migracion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-fabrica-linderos',
  templateUrl: './fabrica-linderos.component.html',
  styleUrls: ['./fabrica-linderos.component.css']
})
export class FabricaLinderosComponent implements OnInit {
  
  restricciones = [];
  flagvalidar : boolean = false;
  detalle = []
  materias = []
  nombremateria=''
  listadoProcesosJud = []; 
  antecedentes = {
    CLASE_PROCESO: '',
    CODIGO_EXPEDIENTE: '',
    CODIGO_EXPEDIENTE_JUDICIAL: '',
    CODIGO_INTERNO: '',
    CODIGO_JUDICIAL: '',
    CODIGO_LEGAJO: '',
    CODIGO_MATRIZ: '',
    DEPARTAMENTO: '',
    DIRECCION_INMUEBLE: '',
    DISTRITO: '',
    FEC_FIN_PROCESO_JUDICIAL: '',
    FEC_INICIO_PROCESO_JUDICIAL: '',
    ITEM_JUDICIAL: '',
    FILA: '',
    MONTO: '',
    NRO_ASIENTO: '',
    OBSERVACION: '',
    PROVINCIA: ''
  };
  datosJudiciales = {
    AREA: '',
    COMENTARIO: '',
    DEMANDADO: '',
    DEMANDANTE: '',
    DILIG_PROCESAL: '',
    ESTADO_SITUACIONAL: '',
    EST_CONCLUIDO: '',
    EST_PROCESO: '',
    FECHA_DILIGENCIA_PROCESAL: '',
    MATERIA_LEGAL: '',
    NOMBRE_PREDIO: '',
    ORG_JURISDICCIONAL: '',
    TIPO_PROCESO: ''

  };
  sentencia = {
    
  }

  limitaciones = {
    codigo_interno : '',
    restricciones: '0',
    coddetalle  : '0',
    area : '0',
    codusuario : '',
    procesos : [],
    codigo_detalle: ''
  }
    
  tipo = 0
  aux = 0
  proceso = {
    item :0,
    codmateria : '',
    numero : '',
    demandante : '',
    demandado : '',
    area : 0,
    situacion : ''
  }
  ultimo : number =  0
  auxcargar = ''
  count = 0
  active : boolean
  modaladdProcJud;
  auxnum = ''
  acto = [];
  detalleacto = [];


  /************/

  fabricalinderos ={
    codigo_interno: 0,
    usuario : '',
    linderos : [],
    fabrica : []
  }

  linderolegal ={    
    item : 0,
    lindero : '',
    colindancia : '',
    tramos : 0,
    lados : 0.0,
    municipal : 0,
    nomlind : ''
  }

  fabrica = {
    item : 0,
    tipoacto : '0',
    nombreacto: '',
    detacto  : "0",
    nomdetalle: '',
    fecha : '',
    area  : 0,
    moneda : '',
    nommoneda : '',
    valorizacion : 0
  }

  lindero = [];
  modala;
  aux1 = 0
  ultimo1 = 0
  tipo1= 0
  moneda = [];
  countlinderos = 0
  

  /****************/



  @Input('bloquear')  bloquear;
  @Input('codigo_interno')  codinterno;
  @Input('cargar')  cargar;
  @Output('callback') salida = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private dataservice : FabricalinderosService,
    private MigracionService: MigracionService,
  ) {      
     this.limitaciones.codusuario =  sessionStorage.getItem('codigopersonal')
     //this.fabricalinderos.usuario =  '2222';
   }
  
  
  ngOnChanges(){  
    this.bloquear=='1'? this.active=true: this.active = false
    this.auxcargar = this.cargar
    this.fabricalinderos.codigo_interno= this.codinterno;  

    

    /* observaciones: se borra linderos */
    /* fecha: 26-01-2021 */
    this.countlinderos = this.countlinderos + 1
   
    if (this.fabricalinderos.codigo_interno !=0 && this.countlinderos == 1){
      this.ObtenerUltimoLL(this.fabricalinderos.codigo_interno)
      this.ObtenerUltimoLF(this.fabricalinderos.codigo_interno)
      this.CargarLindero(this.fabricalinderos.codigo_interno)
      this.CargarFabrica(this.fabricalinderos.codigo_interno)
     
      this.validarfabricalinderos(this.fabricalinderos)
    }
    /* fin de observaciones: se borra linderos */

    if (this.auxcargar =='9'){
      this.validarfabricalinderos(this.fabricalinderos)
      this.count = this.count + 1   

      if (this.fabricalinderos.codigo_interno !=0){
        this.ObtenerUltimoLL(this.fabricalinderos.codigo_interno)
        this.ObtenerUltimoLF(this.fabricalinderos.codigo_interno)
      }

      if (this.count==1) 
      { 
        //this.cargando()        
        this.cargarcombos()   
                            
      }   

    }
  }

  ngOnInit() {     
       
  }



  modificarlindero(i,content)
  {            
    this.modal(content,1);      
    this.linderolegal.item = this.fabricalinderos.linderos[i].item;
    this.linderolegal.lindero = this.fabricalinderos.linderos[i].lindero
    this.linderolegal.colindancia = this.fabricalinderos.linderos[i].colindancia
    this.linderolegal.tramos = this.fabricalinderos.linderos[i].tramos
    this.linderolegal.lados= this.fabricalinderos.linderos[i].lados
    this.linderolegal.municipal= this.fabricalinderos.linderos[i].municipal  
    this.linderolegal.nomlind = this.fabricalinderos.linderos[i].nomlind  
    this.aux = i     
  }

  agregarlindero()
  {       
    
    let aux = this.validarlindero()        
    if (aux===undefined)        
    { 
      this.ultimo++  
      this.fabricalinderos.linderos.push(
          { 
            item : this.ultimo ,
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
          title: 'Se agregó el registro',                 
          confirmButtonText: 'Listo'                  
          }); 
        this.limpiarlindero()   
        this.validarfabricalinderos(this.fabricalinderos)   
        this.modala.close();
        //this.closebutton.nativeElement.click()
             
    }
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
      this.fabricalinderos.linderos[this.aux] = obj  
      swal({
        type: 'success',
        title: 'Se actualizó el registro',
        confirmButtonText: 'Listo'                  
        });   
        this.modala.close();
      this.validarfabricalinderos(this.fabricalinderos)        
    }
  }

  quitarlindero(index,item)
  {        
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success ml-2',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
     })  
    swalWithBootstrapButtons({
      title: '¿Estás seguro de quitar el Lindero Legal?',            
      type: 'warning',
      showCancelButton: true,    
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      reverseButtons: true
      }).then((result) => {
        if (result.value) {      
          this.spinner.show();                   
          this.dataservice.EliminarLindero(this.codinterno,item).subscribe((data:any) =>{                       
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
                this.fabricalinderos.linderos.splice(index ,1)                  
            }
                      
          });  
                  
        }
      });
  }


  validarentero(numero,tipo)
  {             
      let aux_1 =numero.substr(0,1)       
      if (aux_1 =='0')
      {
        this.error("Área no válida,no permite 0 a la izquierda")
        if (tipo==1)
        {this.linderolegal.tramos = 0}
        if (tipo==2)
        {this.linderolegal.municipal = 0}
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

  validarfabricalinderos(data){
    this.salida.emit(data);         
   }
  
   ObtenerNombre()
  {
    this.dataservice.NombreLindero(this.linderolegal.lindero).subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.linderolegal.nomlind  = data.data[0].DESCRIPCION_LINDEROS        
    })
  }

  agregarfabrica()
  {       
    let aux = this.validarfabrica()        
    if (aux===undefined)        
    { 
      this.ultimo1++
      this.fabricalinderos.fabrica.push(
        { 
          item : this.ultimo1,
          tipoacto : this.fabrica.tipoacto,
          nombreacto : this.fabrica.nombreacto,
          detacto : this.fabrica.detacto,
          nomdetalle : this.fabrica.nomdetalle,
          fecha : this.fabrica.fecha,
          area : this.fabrica.area,
          moneda : this.fabrica.moneda,
          nommoneda : this.fabrica.nommoneda,
          valorizacion : this.fabrica.valorizacion
        } 
      )        
      swal({
        type: 'success',
        title: 'Se agrego el registro',                 
        confirmButtonText: 'Listo'                  
        }); 
      this.limpiarfabrica()
      this.validarfabricalinderos(this.fabricalinderos)
    }
  }

  editarfabrica()
  { 
    
    let aux = this.validarfabrica()        
    if (aux===undefined)        
    {                
      let obj = {
        item : this.fabricalinderos.fabrica.length +1 ,      
        tipoacto : this.fabrica.tipoacto,
        nombreacto : this.fabrica.nombreacto,
        detacto : this.fabrica.detacto,
        nomdetalle : this.fabrica.nomdetalle,
        fecha : this.fabrica.fecha,
        area : this.fabrica.area,
        moneda : this.fabrica.moneda,
        nommoneda : this.fabrica.nommoneda,
        valorizacion : this.fabrica.valorizacion
      }
      obj.item =  this.fabrica.item
      obj.tipoacto =this.fabrica.tipoacto
      obj.nombreacto = this.fabrica.nombreacto
      obj.detacto =  this.fabrica.detacto
      obj.nomdetalle = this.fabrica.nomdetalle
      obj.fecha = this.fabrica.fecha
      obj.area = this.fabrica.area
      obj.moneda = this.fabrica.moneda
      obj.nommoneda = this.fabrica.nommoneda
      obj.valorizacion = this.fabrica.valorizacion
      this.fabricalinderos.fabrica[this.aux1] = obj     
      swal({
        type: 'success',
        title: 'El actualizó el registro',
        confirmButtonText: 'Listo'                  
        });
      this.validarfabricalinderos(this.fabricalinderos)      
    }
  }

  limpiarfabrica()
  {   
    this.fabrica.tipoacto = '0';
    this.fabrica.detacto="0";
    this.fabrica.fecha= "";
    this.fabrica.area=0;
    this.fabrica.moneda="0";
    this.fabrica.valorizacion  = 0;
  }

  validarfabrica()
  {    
    if (this.fabrica.tipoacto=='0')
      {
         this.error("Selecciona Tipo de Acto")
         this.flagvalidar = true 
         return this.flagvalidar
      }
    else if(this.fabrica.detacto=="0")
     {
      this.error("Seleccione Detalle de Acto")
      this.flagvalidar = true 
      return this.flagvalidar
     }
    else if(this.fabrica.fecha=="")
     {
      this.error("Ingresa Fecha")
      this.flagvalidar = true 
      return this.flagvalidar
     }
     else if( this.fabrica.fecha<"1970-12-31"  || this.fabrica.fecha>"2030-12-31")
     {
      this.error("Fecha fuera de rango [1970-12-31 a 2030-12-31]")
      this.fabrica.fecha = ""
      this.flagvalidar = true 
      return this.flagvalidar
     }
    else if(this.fabrica.area==0)
     {
      this.error("Ingresa Área")
      this.flagvalidar = true 
      return this.flagvalidar
     }
    else if(this.fabrica.moneda=="0")
     {
      this.error("Seleccione Moneda")
      this.flagvalidar = true 
      return this.flagvalidar
     }
     else if(this.fabrica.valorizacion==0)
     {
      this.error("Ingrese Valorización")
      this.flagvalidar = true 
      return this.flagvalidar
     }
  }

  ObtenerMoneda(cod)
  {    
    if (cod=='S')
    {this.fabrica.nommoneda = 'SOLES'}
    else if  (cod=='D')
    {this.fabrica.nommoneda = 'DOLARES'}
    else if  (cod=='I')
    {this.fabrica.nommoneda = 'INTIS'}
  }

  validarfecha(){
    
  }

  ObtenerNombreDetalle()
  {
    if(this.fabrica.detacto == "0"){
      //this.fabrica.nomdetalle = ""
    }else{
      this.dataservice.NombreDetalleDatosFabrica(this.fabrica.detacto).subscribe((data:any) =>{ 
        this.spinner.hide();           
        this.fabrica.nomdetalle  = data.data[0].DSC_DETALLE        
      })
    }
      
  }


  detcAto(codigo)
  {          
    if (codigo == '01')
    {     
       this.fabrica.nombreacto = 'FABRICA'
    }
    if (codigo == '02')
    {       
       this.fabrica.nombreacto = 'DEMOLICION'
    }  
    this.fabrica.detacto = "0"
    
    
    
   this.detacto(codigo)
  }


  quitarfabrica(index,item)
  {     
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success ml-2',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
     })  
    swalWithBootstrapButtons({
      title: '¿Estás seguro de quitar la información de Fabrica/Demolición?',            
      type: 'warning',
      showCancelButton: true,    
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      reverseButtons: true
      }).then((result) => {
        if (result.value) {      
          this.spinner.show();                   
          this.dataservice.EliminarFabrica(this.codinterno,item).subscribe((data:any) =>{                       
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
                this.fabricalinderos.fabrica.splice(index ,1)  
            }
                      
          });  
                  
        }
      });
  }

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


  CargarLindero(codigo){
    
    this.spinner.show();    
    this.fabricalinderos.linderos = []
    
      this.MigracionService.ObtenerData('LL',codigo).subscribe((data:any) =>{  
                                              
        if (data.data.length > 0)
        {
         for (let i= 0; i < data.data.length; i++)      
         {
           this.fabricalinderos.linderos.push(
             {             
               item : data.data[i].ITEM,
               lindero : data.data[i].LINDERO,
               colindancia : data.data[i].DESCRIPCION,
               tramos : data.data[i].TRAMOS,
               lados : data.data[i].LADOS,
               municipal : data.data[i].NRO_MUNICIPAL,
               nomlind : data.data[i].DESCRIPCION_LINDEROS,
             }        
           );
         }
        
        }else{
         
          this.linderomemoria()  
        }
        this.spinner.hide(); 
       }); 

    }
    


  CargarFabrica(codigo){
    this.spinner.show();    
    this.MigracionService.ObtenerData('F',codigo).subscribe((data:any) =>{                                   
    this.fabricalinderos.fabrica = []
     for (let i= 0; i < data.data.length; i++)      
        {                   
          let auxnombre
          if (data.data[i].DETALLE_ACTO=="01")
            {
              auxnombre = "COMPLEMENTARIA"
            }
          else if (data.data[i].DETALLE_ACTO=="02")
            {
              auxnombre = "PRINCIPAL"
            }
          else if (data.data[i].DETALLE_ACTO=="03")
            {
              auxnombre = "PARCIAL"
            }
          else if (data.data[i].DETALLE_ACTO=="04")
            {
              auxnombre = "TOTAL"
            }
          this.fabricalinderos.fabrica.push(
            {                           
              item : data.data[i].ITEM,
              tipoacto : data.data[i].TIPO_ACTO,
              nombreacto :data.data[i].DSC_TIPO_ACTO,
              detacto :data.data[i].DETALLE_ACTO,
              nomdetalle : auxnombre,
              fecha :data.data[i].FECHA_INSCRIPCION,
              area :data.data[i].AREA,
              moneda : data.data[i].TIPO_MONEDA,
              nommoneda :data.data[i].DSC_TIPO_MONEDA,
              valorizacion : data.data[i].VALORIZACION
            }        
          );
        }
     this.spinner.hide(); 
    }); 
  }

  linderomemoria()
  {
    this.ultimo = 0
    //this.adquision.linderos = []
    this.fabricalinderos.linderos.push(
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

  cargarcombos(){            

    this.dataservice.Lindero().subscribe((data:any) =>{       
      this.lindero = data.data;                                            
    });

    this.dataservice.Acto().subscribe((data:any) =>{       
      this.acto = data.data;                                            
    });

    this.dataservice.Moneda().subscribe((data:any) =>{       
      this.moneda = data.data;                                            
    });    
  }


  /*********************************/
  


  

  validarlimitaciones(data){
    this.salida.emit(data);                    
   } 
   
  
 

  
  CargarProceso(codigo){    
    this.spinner.show();
    this.MigracionService.ObtenerData('PJ',codigo).subscribe((data:any) =>{ 
    this.limitaciones.procesos = []
     for (let i= 0; i < data.data.length; i++)      
        {           
          this.limitaciones.procesos.push(
            {             
              item :  data.data[i].ITEM,
              codmateria : data.data[i].CODIGO_MATERIAS,
              numero : data.data[i].NRO_EXPEDIENTEJUDICIAL,
              demandante : data.data[i].DEMANDANTE,              
              demandado :  data.data[i].DEMANDADO,
              area :  data.data[i].AREA,
              situacion :  data.data[i].SITUACION_ACTUAL,              
              nombremateria : data.data[i].DESCRIPCION_MATERIAS
            }        
          );
        }
     this.spinner.hide(); 
    }); 
  }

  modal(content,aux)
  {        
    this.tipo = aux
    this.limpiarlindero()
    let opciones : NgbModalOptions = {
      size : "lg",
      backdrop : "static"
    };
    this.modala=this.modalService.open(content,opciones);
  }

  error(titulo)
  {
    swal({
      type: 'error',
      title: titulo,            
      confirmButtonText: 'Listo'
    });
  }
  
  validarproceso()
  {    
    if (this.proceso.codmateria=="0")
      {
         this.error("Selecciona Materias")
         this.flagvalidar = true 
         return this.flagvalidar
      }
    else if(this.proceso.numero.trim()=="")
     {
      this.error("Ingrese Nº de Expediente Judicial")
      this.flagvalidar = true 
      return this.flagvalidar
     }
    else if(this.proceso.demandante.trim()=="")
     {
      this.error("Ingrese Demandante")
      this.flagvalidar = true 
      return this.flagvalidar
     }
    else if(this.proceso.demandado.trim()=="")
     {
      this.error("Ingrese Demandado")
      this.flagvalidar = true 
      return this.flagvalidar
     }
    /*else if(this.proceso.area==0)
     {
      this.error("Ingresa Área")
      this.flagvalidar = true 
      return this.flagvalidar
     }*/
     else if(this.proceso.situacion.trim()=="")
     {
      this.error("Ingrese Situacion Actual")
      this.flagvalidar = true 
      return this.flagvalidar
     }
  }

  limpiarproceso(){
    this.proceso.codmateria = '0'
    this.proceso.numero = ''
    this.proceso.demandado = ''
    this.proceso.demandante = ''
    this.proceso.area = 0
    this.proceso.situacion  = ''  
  }
  
  validardecimal(numero,tipo)
  {    
    if (numero % 1 == 0) {      
      let aux_1 =numero.substr(0,1)    
      let aux_2 =numero.substr(0,2)
      if (aux_1 =='0')
      {
        this.error("Área no válida,no permite 0 a la izquierda")
        if(tipo==1)
        {this.proceso.area = 0}
        if(tipo==2)
        {this.limitaciones.area = '0'}        
      }      
      if (aux_2=='.0')
      {        
        this.error("Área no válida,formato incorrecto solo permite X.X")
        if(tipo==1)
        {this.proceso.area = 0}
        if(tipo==2)
        {this.limitaciones.area = '0'}
      }
   } else {          
      let aux_3 =numero.substr(0,1)
      let aux_4 =numero.substr(0,2)  
      let aux_5 =numero.substr(1,1)                     
      if (aux_3=='.')
      {        
        this.error("Área no válida,formato incorrecto solo permite X.X")
        if(tipo==1)
        {this.proceso.area = 0}
        if(tipo==2)
        {this.limitaciones.area = '0'}
      }           
      if (aux_4=='00' )
      {        
        this.error("Área no válida,solo permite un 0 a la izquierda del .")
        if(tipo==1)
        {this.proceso.area = 0}
        if(tipo==2)
        {this.limitaciones.area = '0'}
      }
      if (aux_3=='0' && aux_5>'0')
      {        
        this.error("Área no válida,no permite 0 a la izquierda")
        if(tipo==1)
        {this.proceso.area = 0}
        if(tipo==2)
        {this.limitaciones.area = '0'}
``      }
   }
  }
  
  agregarproceso(){
    let aux = this.validarproceso()        
    if (aux===undefined)        
    {                  
      this.ultimo++
      this.limitaciones.procesos.push(
          { 
            item : this.ultimo,
            codmateria : this.proceso.codmateria,
            numero : this.proceso.numero,
            demandante : this.proceso.demandante,
            demandado : this.proceso.demandado,
            area : this.proceso.area,
            situacion : this.proceso.situacion,
            nombremateria : this.nombremateria
          } 
        )                    
        swal({
          type: 'success',
          title: 'Se agregó el registro',                 
          confirmButtonText: 'Listo'                  
          });          
        this.limpiarproceso()
        this.validarlimitaciones(this.limitaciones)
        this.modaladdProcJud.close()        
    }
  }

  editarproceso()
  {                
    let aux = this.validarproceso()        
    if (aux===undefined)        
    {                  
    let obj = {
      item :0,
      codmateria : '',
      numero : '',
      demandante : '',
      demandado : '',
      area : 0,
      situacion : '',
      nombremateria: '',
    }
    obj.item =  this.proceso.item
    obj.codmateria = this.proceso.codmateria
    obj.numero = this.proceso.numero
    obj.demandante = this.proceso.demandante
    obj.demandado = this.proceso.demandado
    obj.area = this.proceso.area
    obj.situacion = this.proceso.situacion            
    obj.nombremateria = this.nombremateria
    this.limitaciones.procesos[this.aux] = obj     
    swal({
      type: 'success',
      title: 'Se actualizó el registro',                 
      confirmButtonText: 'Listo'                  
      });
    this.validarlimitaciones(this.limitaciones)  
    this.modaladdProcJud.close()           
   }
 }

 
  

  modificarproceso(i,content)
  {        
    this.modal(content,1);    
    this.proceso.item = this.limitaciones.procesos[i].item;
    this.proceso.codmateria =this.limitaciones.procesos[i].codmateria                   
    this.proceso.numero = this.limitaciones.procesos[i].numero
    this.proceso.demandante = this.limitaciones.procesos[i].demandante
    this.proceso.demandado= this.limitaciones.procesos[i].demandado
    this.proceso.area= this.limitaciones.procesos[i].area
    this.proceso.situacion =this.limitaciones.procesos[i].situacion       
    this.aux = i 
  }


  modificarfabrica(i,content1)
  {        
    this.modal1(content1,1);          
    this.detacto(this.fabricalinderos.fabrica[i].tipoacto)
    this.fabrica.item =  this.fabricalinderos.fabrica[i].item
    this.fabrica.tipoacto = this.fabricalinderos.fabrica[i].tipoacto
    this.fabrica.nombreacto = this.fabricalinderos.fabrica[i].nombreacto    
    this.fabrica.detacto = this.fabricalinderos.fabrica[i].detacto
    this.fabrica.nomdetalle = this.fabricalinderos.fabrica[i].nomdetalle
    this.fabrica.fecha = this.fabricalinderos.fabrica[i].fecha
    this.fabrica.area  = this.fabricalinderos.fabrica[i].area
    this.fabrica.moneda  = this.fabricalinderos.fabrica[i].moneda
    this.fabrica.nommoneda = this.fabricalinderos.fabrica[i].nommoneda
    this.fabrica.valorizacion = this.fabricalinderos.fabrica[i].valorizacion             
    this.aux1 = i     
  }

  detacto(codigo)
  {
    this.dataservice.DetalleActo(codigo).subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.detalleacto = data.data;      
    })
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
  

  



}