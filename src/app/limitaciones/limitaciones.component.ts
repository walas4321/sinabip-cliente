import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LimitacionesService } from '../services/limitaciones.service';
import { MigracionService } from '../services/migracion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-limitaciones',
  templateUrl: './limitaciones.component.html',
  styleUrls: ['./limitaciones.component.css']
})
export class LimitacionesComponent implements OnInit {
  
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
  ultimo : 0
  auxcargar = ''
  count = 0
  active : boolean
  modaladdProcJud;
  auxnum = ''

  @Input('bloquear')  bloquear;
  @Input('codigo_interno')  codinterno;
  @Input('cargar')  cargar;
  @Output('callback') salida = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private dataservice : LimitacionesService,
    private MigracionService: MigracionService,
  ) {      
     this.limitaciones.codusuario =  sessionStorage.getItem('codigopersonal')
     //this.limitaciones.codusuario =  '2222';
   }
  
  
  ngOnChanges(){  
    this.bloquear=='1'? this.active=true: this.active = false
    this.auxcargar = this.cargar
    this.limitaciones.codigo_interno= this.codinterno;  

    if (this.auxcargar =='2'){
      this.count = this.count + 1   
      if (this.count==1) 
      { 
        this.cargarcombos()  
        this.setcombos();                   
      }   

      if (this.limitaciones.codigo_interno !="0" && this.limitaciones.codigo_interno !="" && this.count==1)
      {                           
        this.CargarLimitaciones(this.limitaciones.codigo_interno)        
        this.CargarProceso(this.limitaciones.codigo_interno)
        this.ObtenerUltimo(this.limitaciones.codigo_interno)  
        
      }
    }
  }

  ngOnInit() {        
  }
  
  setcombos (){
    this.limitaciones.restricciones = "0"
    this.limitaciones.coddetalle = "0"
  }

  ObtenerUltimo(aux)
  {
    this.spinner.show();                   
    this.dataservice.ObtenerUltimo(aux).subscribe((data:any) =>{                       
      this.spinner.hide();      
        this.ultimo = data.data[0].ULTIMO
        if(this.ultimo==null)
        {
          this.ultimo=0
        }
       
    });    
  } 

  validarlimitaciones(data){
    this.salida.emit(data);                    
   } 
   
  
  CargarLimitaciones(codigo){   

    this.spinner.show();    
    this.MigracionService.ObtenerData('P',codigo).subscribe((data:any) =>{                                           
      this.limitaciones.restricciones = (data.data[0].CONDICION_ASIENTO=='')?"0":data.data[0].CONDICION_ASIENTO      
      this.cargadetalle(data.data[0].CONDICION_ASIENTO)
      this.limitaciones.coddetalle    = (data.data[0].TIPO_APORTE_REGLAMENTARIO_LIMITACION=='')?"0":data.data[0].TIPO_APORTE_REGLAMENTARIO_LIMITACION      
      this.limitaciones.area          = data.data[0].AREA_MODIFICACION      
      this.validarlimitaciones(this.limitaciones)
      this.processMyValue(1) 
      this.spinner.hide(); 
    }); 
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
    this.limpiarproceso()
    let opciones : NgbModalOptions = {
      size : "lg",
      backdrop : "static"
    };
    this.modaladdProcJud=this.modalService.open(content,opciones);
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
      }
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

 
  quitarproceso(index,item)
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
          this.dataservice.EliminarProceso(this.limitaciones.codigo_interno,item).subscribe((data:any) =>{                       
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
              this.limitaciones.procesos.splice(index ,1)                
            }
                      
          });  
                  
        }
      });
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

  cargarcombos(){
    this.spinner.show();
    this.dataservice.Restricciones().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.restricciones = data.data;                                            
    }); 

    this.spinner.show();
    this.dataservice.Materias().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.materias = data.data;                                            
    }); 
  }

  ObtenerNombre(id)
  {
    this.spinner.show();
    this.dataservice.NombreMateria(id).subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.nombremateria = data.data[0].materia;                                             
    }); 
  }

  cargadetalle(codrestriccion){        
    this.spinner.show();
    this.dataservice.DetalleRestricciones(codrestriccion).subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.detalle = data.data;    
    }); 
  }

  cargadetalleCambiar(codrestriccion){        
    this.spinner.show();
    this.dataservice.DetalleRestricciones(codrestriccion).subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.detalle = data.data; 
      this.limitaciones.coddetalle = "0"
    }); 
  }

  procesoJudiales(content,aux){
    this.limpiarDatosJudiciales();
    this.ListadoProcesosJudiciales(this.limitaciones.codigo_interno); 

    this.tipo = aux
    this.limpiarproceso()
    let opciones : NgbModalOptions = {
      size : "lg",
      backdrop : "static"
    };
    this.modalService.open(content,opciones);
  }

  ListadoProcesosJudiciales(codigo_interno)
  {
    
    this.spinner.show();
    this.dataservice.ListadoProcesosJudiciales(codigo_interno).subscribe((data:any) =>{ 
      this.spinner.hide();
      this.listadoProcesosJud = data.data;        
                                           
    }); 
  }


  

  



  verDetallesProceso(codigo_detalle, fila){
    this.limitaciones.codigo_detalle = codigo_detalle;    
    
    this.dataservice.antecedentes(this.limitaciones.codigo_interno, codigo_detalle).subscribe((data:any) =>{      
      this.antecedentes.CLASE_PROCESO = data.data[0].CLASE_PROCESO,
      this.antecedentes.CODIGO_EXPEDIENTE = data.data[0].CODIGO_EXPEDIENTE,
      this.antecedentes.CODIGO_EXPEDIENTE_JUDICIAL = data.data[0].CODIGO_EXPEDIENTE_JUDICIAL,
      this.antecedentes.CODIGO_INTERNO = data.data[0].CODIGO_INTERNO, 
      this.antecedentes.CODIGO_JUDICIAL = data.data[0].CODIGO_JUDICIAL,
      this.antecedentes.CODIGO_LEGAJO = data.data[0].CODIGO_LEGAJO,
      this.antecedentes.CODIGO_MATRIZ = data.data[0].CODIGO_MATRIZ,
      this.antecedentes.DEPARTAMENTO = data.data[0].DEPARTAMENTO,
      this.antecedentes.DIRECCION_INMUEBLE = data.data[0].DIRECCION_INMUEBLE,
      this.antecedentes.DISTRITO = data.data[0].DISTRITO,
      this.antecedentes.FEC_FIN_PROCESO_JUDICIAL = data.data[0].FEC_FIN_PROCESO_JUDICIAL,
      this.antecedentes.FEC_INICIO_PROCESO_JUDICIAL = data.data[0].FEC_INICIO_PROCESO_JUDICIAL,
      this.antecedentes.ITEM_JUDICIAL = data.data[0].ITEM_JUDICIAL,
      this.antecedentes.FILA = fila,
      this.antecedentes.MONTO = data.data[0].MONTO,
      this.antecedentes.NRO_ASIENTO = data.data[0].NRO_ASIENTO,
      this.antecedentes.OBSERVACION = data.data[0].OBSERVACION,
      this.antecedentes.PROVINCIA = data.data[0].PROVINCIA                                      
    }); 
    
    this.dataservice.datosJudiciales(codigo_detalle).subscribe((data:any) =>{      
      this.datosJudiciales.AREA = data.data[0].AREA,
      this.datosJudiciales.COMENTARIO  = data.data[0].COMENTARIO,
      this.datosJudiciales.DEMANDADO = data.data[0].DEMANDADO,
      this.datosJudiciales.DEMANDANTE = data.data[0].DEMANDANTE,
      this.datosJudiciales.DILIG_PROCESAL = data.data[0].DILIG_PROCESAL,
      this.datosJudiciales.ESTADO_SITUACIONAL = data.data[0].ESTADO_SITUACIONAL,
      this.datosJudiciales.EST_CONCLUIDO = data.data[0].EST_CONCLUIDO,
      this.datosJudiciales.EST_PROCESO = data.data[0].EST_PROCESO,
      this.datosJudiciales.FECHA_DILIGENCIA_PROCESAL = data.data[0].FECHA_DILIGENCIA_PROCESAL,
      this.datosJudiciales.MATERIA_LEGAL = data.data[0].MATERIA_LEGAL,
      this.datosJudiciales.NOMBRE_PREDIO = data.data[0].NOMBRE_PREDIO,
      this.datosJudiciales.ORG_JURISDICCIONAL = data.data[0].ORG_JURISDICCIONAL,
      this.datosJudiciales.TIPO_PROCESO = data.data[0].TIPO_PROCESO                    
    }); 
    
    this.dataservice.sentencia(codigo_detalle).subscribe((data:any) =>{      
      this.sentencia = data.data;       
    }); 
    

  }

  limpiarDatosJudiciales(){
    this.antecedentes.CLASE_PROCESO = ''
    this.antecedentes.CODIGO_EXPEDIENTE = '',
    this.antecedentes.CODIGO_EXPEDIENTE_JUDICIAL = '',
    this.antecedentes.CODIGO_INTERNO = '',
    this.antecedentes.CODIGO_JUDICIAL = '',
    this.antecedentes.CODIGO_LEGAJO = '',
    this.antecedentes.CODIGO_MATRIZ = '',
    this.antecedentes.DEPARTAMENTO = '',
    this.antecedentes.DIRECCION_INMUEBLE = '',
    this.antecedentes.DISTRITO = '',
    this.antecedentes.FEC_FIN_PROCESO_JUDICIAL = '',
    this.antecedentes.FEC_INICIO_PROCESO_JUDICIAL = '',
    this.antecedentes.ITEM_JUDICIAL = '',
    this.antecedentes.FILA = '',
    this.antecedentes.MONTO = '',
    this.antecedentes.NRO_ASIENTO = '',
    this.antecedentes.OBSERVACION = '',
    this.antecedentes.PROVINCIA = ''
  
    this.datosJudiciales.AREA = '',
    this.datosJudiciales.COMENTARIO = '',
    this.datosJudiciales.DEMANDADO = '',
    this.datosJudiciales.DEMANDANTE = '',
    this.datosJudiciales.DILIG_PROCESAL = '',
    this.datosJudiciales.ESTADO_SITUACIONAL = '',
    this.datosJudiciales.EST_CONCLUIDO = '',
    this.datosJudiciales.EST_PROCESO = '',
    this.datosJudiciales.FECHA_DILIGENCIA_PROCESAL = '',
    this.datosJudiciales.MATERIA_LEGAL = '',
    this.datosJudiciales.NOMBRE_PREDIO = '',
    this.datosJudiciales.ORG_JURISDICCIONAL = '',
    this.datosJudiciales.TIPO_PROCESO = ''
  
    this.sentencia = []
  }


  processMyValue(opcion) {      
    if(opcion==1)
    {
      if(this.limitaciones.area!='')   
      {
        this.auxnum = this.limitaciones.area
        let noTruncarDecimales = {maximumFractionDigits: 10}
        let numberVal = parseFloat(this.auxnum).toLocaleString('en-US', noTruncarDecimales);
        this.limitaciones.area = numberVal;         
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
        this.limitaciones.area = this.auxnum     
      }
    }
    
  }

}