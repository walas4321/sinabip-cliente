import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegistroSbnService } from '../services/registro-sbn.service';
import { MigracionService } from '../services/migracion.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registro-externo',
  templateUrl: './auditoria-predios.component.html',
  styleUrls: ['./auditoria-predios.component.css']
})
export class AuditoriaPrediosComponent implements OnInit {
  
  //Paginacion 
  itemsPerPage: number = 10;
  page: any = 1;
  previousPage: any;
  total : any = 0; 

  unidad = { 
    documental   : 1 ,    
    tipodocumento :'O'  ,
    codigodocumento : '100',
    numerodocumento :'100-sdrc',
    codtecnico   : '',
    codlegal      : '',
    codigousuario  :'', 
    externo: 1,
    page: this.page,
    records: this.itemsPerPage,
    cus : '',
    fechaini : '',
    fechafin : ''
   }

   paramDetalleAuditoria = {
     codigo_interno : 0,
     accion : ''
   }
 
   aux ={
    codigodepa : 0,    
    codigo_interno  : 0,
    coddocumental : '',
    cargar:'',
    tipo_registro : '',
    detalle: '',
    grabado: "",
    nroCUS : '',
    codigodocumento : this.unidad.codigodocumento,
    nro_documento : this.unidad.numerodocumento
   }
   flag = '';
   nroCUS : 0;
   tipoUsuario: string = ''
   aux_cus : 0
   accion = ''
 
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
    linderos : [],
    fabrica : [],
    documentosTL: [],
    codigodocumento : '',
    nro_documento : '',
    aux_reg : '',
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

  tipodocumento =
   {
     coddocunental : 0,
     codtipodoc : ''
   }

  enviar = 
  {
    NRO_SINABIP : 0,
    COD_USER_APRO : ''
  }

  codigodocumental = ""
  listadoverificacion =[];
  listadoPredios = [];
  documentos = [];
  nombre
  flagvalidar : boolean = false;

  numero_cus = ''

  documentosadd ={
    codigo_interno : '',
    codigo_usuario : '',
    docs : [] 
  }
  accionDocs: string = "M";
  modal;
  etapaUD = '';
   

  filtro = {
    fecha : 
    {
      month : 10,
      year  : 2018
    },
    forma_adquisicion : 1,
    nro_documento     : '',
    estado            : '1',
    page : this.page, records : this.itemsPerPage
  }
  modaladdDocTL;
  numerocus = ''   
  tipoRegistro = ''
  listadoDetalleAuditoria = []

  constructor(
    private spinner: NgxSpinnerService,   
    private modalService: NgbModal,
    private dataservice : RegistroSbnService,
    private service : MigracionService,
  ) { 
    //this.enviar.COD_USER_APRO = sessionStorage.getItem("codigopersonal")   
    this.unidad.codigousuario = sessionStorage.getItem("codigopersonal")  
    //this.unidad.codigousuario = "2222" 
    //this.unidad.codigousuario = "2622"
    
  }

  ngOnInit() {
    
    this.CargarListadoAuditoriaPredios();
    
    
  }

  CargarVerificacion(codigo)
  {  
  this.spinner.show();    
  this.dataservice.CargarVerificacion(codigo).subscribe((data:any) =>{ 
    this.spinner.hide();           
    this.listadoverificacion = data.data;                                             
  }); 
}

cargar(dato)
{
  this.aux.cargar = dato
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
              this.CargarVerificacion(data.data[0].ID)
              this.codigodocumental = data.data[0].ID
              this.tipodocumento.coddocunental = data.data[0].ID
              this.spinner.hide();
              swal({
              type: 'success',
              title: ' Se Generaron los Documentos con éxito (cambiar)',                 
              confirmButtonText: 'Listo'                  
              });
              this.option_enabled()    
              this.button_disabled()
            }); 
          }
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
}

validarconstruccion()
{    
    //DATOS GENERALES
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



error(titulo,texto)
  {
    swal({
      type: 'error',
      title: titulo,       
      text : texto,     
      confirmButtonText: 'Listo'
    });
  }

  modaleditar2(modal,numerocus)
  {
    if (numerocus!=0)
    {

      /* VALIDAR SI U.D. ESTA ABIERTA */
      this.dataservice.ValidarEstadoUD(this.aux.nroCUS).subscribe((data:any) =>{       
        let estadoUD =  data.data[0].ETAPA_UDOCUMENTAL        
        if ( estadoUD == '8' ){
          swal({
            type: 'info',
            title: 'CUS se encuentra cerrado',                 
            confirmButtonText: 'Listo'                  
            });
            return;
        }else{

          this.spinner.show();
          this.dataservice.BuscarCodigoPredio(this.aux.nroCUS).subscribe((data:any) =>{ 
            this.spinner.hide();           
            let existeCUS =  data.data[0].aux_codinterno
            if (existeCUS !='0'){         
              this.aux.codigo_interno = existeCUS
              this.numero_cus = numerocus                             
              existeCUS = '';
              //poner validacion
              let opciones : NgbModalOptions = {
              size: <any>'xl',
              backdrop : "static"
              };
              this.modalService.open(modal,opciones);
              this.desbloquear();
            }else{
              swal({
                type: 'error',
                title: 'El CUS ingresado no existe',                 
                confirmButtonText: 'Listo'                  
                });  
            }
          });

        }
      });

    }
    else 
    {
      this.error("Ingrese Nº de CUS",'')
    }
  }

  modalregistro(modalpredio)
  {            
    if (this.listadoverificacion.length>0)
    {
      this.aux.codigo_interno = 0
      this.aux.coddocumental = this.codigodocumental
      this.aux.tipo_registro = 'CP'
      let opciones : NgbModalOptions = {
        size: <any>'xl',
        backdrop : "static"
      };
      this.modalService.open(modalpredio,opciones);      
      this.bloquear()
    }    
    else 
    {
      this.error("Debe Generar Mínimo un Documento","")
    }
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
      title: '¿Estás seguro de agregar el documento?',            
      type: 'warning',
      showCancelButton: true,    
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      reverseButtons: true
      }).then((result) => {
        if (result.value) {      
          this.spinner.show(); 
          console.log(this.accionDocs)
          if (this.accionDocs == 'M'){

            this.dataservice.BuscarDocumento(this.tipodocumento).subscribe((data:any) =>{
              this.spinner.hide();
              if (data.data[0].CANTIDAD ==1)
                {
                  swal({
                    type: 'warning',
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
                    this.modaladdDocTL.close();                                                     
                    this.CargarVerificacion(this.tipodocumento.coddocunental)
                });
              }
                         
            });

          }else{
            for (let i= 0; i < this.documentosadd.docs.length; i++)      
            {
              if (this.documentosadd.docs[i].CODIGO_TIPO_DOCUMENTO == codigo){
                this.spinner.hide();
                swal({
                  type: 'warning',
                  title: 'El documento ya existe',                 
                  confirmButtonText: 'Listo'                  
                }); 
                return;
              }
            }

            this.documentosadd.docs.length
            this.dataservice.ObtenerDatosDocumento(this.tipodocumento).subscribe((data:any) =>{
              this.spinner.hide();
              this.documentosadd.docs.push(
                {           
                  ROW_NUMBER_ID         :  (this.documentosadd.docs.length + 1).toString(), 
                  CODIGO_UDOCUMENTAL    :  data.data[0].CODIGO_UDOCUMENTAL,  
                  CODIGO_TIPO_DOCUMENTO :  data.data[0].CODIGO_TIPO_DOCUMENTO,
                  DESCRIPCIONTIPO       :  data.data[0].DESCRIPCIONTIPO,
                  TIPODOC_UDOCUMENTAL   :  data.data[0].TIPODOC_UDOCUMENTAL
                  
                })
                this.listadoverificacion = this.documentosadd.docs;  
                swal({
                  type: 'success',
                  title: 'El documento fue agregado',                  
                  confirmButtonText: 'Listo'                  
                }); 
                this.modaladdDocTL.close();
               
            })
            
          }
                                  
        }
      });                                        
  }

eliminardocumento(coddoc,codtip)
{
  this.tipodocumento.coddocunental = coddoc  
  this.tipodocumento.codtipodoc = codtip 

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
          if (this.accionDocs == 'M'){
            console.log("tipo documento")
            console.log(this.tipodocumento)
            this.dataservice.EliminarDocumento(this.tipodocumento).subscribe((data:any) =>{ 
              this.spinner.hide();
              swal({
              type: 'success',
              title: 'El documento fue eliminado',                 
              confirmButtonText: 'Listo'                  
              }); 
              this.CargarVerificacion(this.tipodocumento.coddocunental)           
            });           
          }else{
            
            for (let i= 0; i < this.documentosadd.docs.length; i++)     
            //this.documentosadd.docs[i].CODIGO_TIPO_DOCUMENTO 
            {
              if (this.documentosadd.docs[i].CODIGO_TIPO_DOCUMENTO == codtip){ 
                this.spinner.hide();
                this.documentosadd.docs.splice(i,1);
                this.listadoverificacion = this.documentosadd.docs;
                swal({
                  type: 'info',
                  title: 'Documento ha sido eliminado',             
                  confirmButtonText: 'Listo'
                }); 
                return;
              }
              
            }

          }
                
        }
      });  
}

Documentos(tipo)
{
  this.spinner.show();
  this.dataservice.Documentos(tipo).subscribe((data:any) =>{ 
    this.spinner.hide();           
    this.documentos = data.data   
  }); 
}

send_sbn(cus)
{
  this.enviar.NRO_SINABIP = cus 
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success ml-2',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
     }) 
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
          this.dataservice.EnviarSbn(this.enviar).subscribe((data:any) =>{ 
            this.spinner.hide();
            swal({
            type: 'success',
            title: 'La Información fue enviada con éxito',               
            confirmButtonText: 'Listo'                  
            });  
            this.modalService.dismissAll()
          }); 
        }
      });
}

option_disabled()
{
  let  opt1 = document.getElementById("option");
  opt1.classList.add('disabled');
}

option_enabled()
{
  let  opt1 = document.getElementById("option");
  opt1.classList.remove('disabled');
}

button_disabled()
{
  let  opt1 = document.getElementById("button");
  opt1.classList.add('disabled');
}

button_enabled()
{
  let  opt1 = document.getElementById("button");
  opt1.classList.remove('disabled');
}

LimpiarUD()
{
  this.option_disabled()
  this.button_enabled()
  this.listadoverificacion = []
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
  /*let  opt9 = document.getElementById("nav-pol-tab");
  opt9.classList.add('disabled');*/
  //let  opt10 = document.getElementById("enviar_sbn");
  //opt10.classList.add('disabled');
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
  /*let  opt9 = document.getElementById("nav-pol-tab");
  opt9.classList.remove('disabled');*/
  //let  opt10 = document.getElementById("enviar_sbn");
  //opt10.classList.remove('disabled');
}


actualizarcodigo(data){
  this.aux.codigodepa = data.coddepa
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
  if (data.tipoproceso =="")
  {this.predio.tipoproceso = 0}
 else
  {this.predio.tipoproceso = data.tipoproceso}

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
  this.predio.documentosTL = this.listadoverificacion
  this.predio.codigodocumento = this.unidad.codigodocumento
  this.predio.nro_documento = this.unidad.numerodocumento
  this.predio.aux_reg ='E'
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
this.predio.linderos = data.linderos;
this.predio.fabrica = data.fabrica;  
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
                      this.numero_cus = dato.data[0].NRO_CUS;                        
                    });
                    this.CargarListadoAuditoriaPredios();
                    this.desbloquear()         
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
  
  //let aux = this.validarobras()        
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
  
  //let aux = this.validardatostecnicos()        
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

//let aux = this.validarconstruccion()        
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
              title: ' El Registro se realizo con éxito',                 
              confirmButtonText: 'Listo'                  
              });                 
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
              title: ' El Registro se realizo con éxito',                 
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


 /* RESTRUCTURACION DE REGISTRO EXTERNO */
 CargarListadoAuditoriaPredios()
{  

  this.spinner.show();    
  console.log(this.unidad) 
  this.dataservice.CargarListadoAuditoriaPredios(this.unidad).subscribe((data:any) =>{ 
    this.spinner.hide();
    this.listadoPredios = data.data;                                         
    this.total = ( this.listadoPredios.length > 0 ) ? this.listadoPredios[0].TOTAL : 0;
  }); 
}

openverDocumentos(content, codigoudocumental, nrocus, etapa)  
{    
  this.etapaUD = etapa
  this.accionDocs = 'M';
  this.tipodocumento.coddocunental = codigoudocumental
  this.nroCUS = nrocus
    
  this.dataservice.openverDocumentos(codigoudocumental).subscribe((data:any) =>{ 
    this.listadoverificacion = data.data;     
    let opciones : NgbModalOptions = {
      size : "lg",
      backdrop : "static"
    };
    this.modalService.open(content,opciones);          
  }); 
    
}


nuevoPredio(content,value){
  this.cargar('') 
  this.flag = value
  this.aux.grabado = ""
  this.accionDocs = 'N';
  this.tipoRegistro = 'ESTATAL'
  this.aux.codigo_interno = 0;
  this.numero_cus = '';
  this.nroCUS = 0;
  this.spinner.show();
  this.dataservice.openDocumentosxDefecto().subscribe((data:any) =>{
    this.documentosadd.docs = [];
    
    for (let i= 0; i < data.data.length; i++)      
    {
      this.documentosadd.docs.push(
        {             
          ROW_NUMBER_ID         :  data.data[i].ROW_NUMBER_ID,
          CODIGO_UDOCUMENTAL    :  data.data[i].CODIGO_UDOCUMENTAL,
          CODIGO_TIPO_DOCUMENTO :  data.data[i].CODIGO_TIPO_DOCUMENTO,
          DESCRIPCIONTIPO       :  data.data[i].DESCRIPCIONTIPO,
          TIPODOC_UDOCUMENTAL   :  data.data[i].TIPODOC_UDOCUMENTAL
          
          //dispuesta :  (data.data[i].AREA_DISPUESTA==null || data.data[i].AREA_DISPUESTA==".00")?"0":data.data[i].AREA_DISPUESTA,
          //areare :  (data.data[i].AREA_REMANENTE==null || data.data[i].AREA_REMANENTE==".00")?"0":data.data[i].AREA_REMANENTE
        }        
      );
    }
    this.listadoverificacion = this.documentosadd.docs;    
    this.spinner.hide();    
    let opciones : NgbModalOptions = {
      size : "lg",
      backdrop : "static"
    };
    this.modalService.open(content,opciones);          
  }); 

}


ventana(content,tipo)
{
  /*
  if (this.tipodocumento.coddocunental!=0)
   {
     */
    this.Documentos(tipo)
    if (tipo == 'L')
        {this.nombre = "Legal"}
    else 
        {this.nombre = "Técnico"}

    let opciones : NgbModalOptions = {
        size : "lg",
        backdrop : "static"
      };
    this.modaladdDocTL = this.modalService.open(content,opciones);
    
    /*
  }
  else 
  {
    this.error("Selecciona un Documento",'')
  }
  */
}

bloque (modal,cus)
{
  this.cargar('')
        this.aux.grabado = ""
        this.tipoUsuario = 'E'
        if (cus == 0){                            
          let opciones : NgbModalOptions = {
            size: <any>'xl',
            backdrop : "static",
            keyboard : false
            };    
            this.modalService.open(modal,opciones);
            this.bloquear();            
        }else{          
        this.dataservice.BuscarCodigoPredio(cus).subscribe((data:any) =>{
          this.spinner.hide();           
          this.aux.codigo_interno = data.data[0].aux_codinterno   
          this.tipoRegistro = data.data[0].DSC_ASIENTO  
          this.numero_cus = cus;                      ``
            let opciones : NgbModalOptions = {
              size: <any>'xl',
              backdrop : "static",
              keyboard : false
              };          
              this.modalService.open(modal,opciones);
              this.desbloquear();            
              this.spinner.show();
          });    
        }
}


modal_editar2(modal)
{
  this.bloque(modal,this.aux_cus)
}

modaleditar(modal,flag,cus, codigodocumental,valor,content)
  {   
    if (valor == 0)
      {
        this.bloque(modal,cus)
      }
    else 
      {
        this.spinner.show();
        this.dataservice.ValidarUD(cus).subscribe((data:any) =>{
        this.spinner.hide();           
        let total = data.data[0].total   
        if (total==1) //flujo normal
           {
            this.bloque(modal,cus)
           }
        else //debe crear UD
           {            
            this.aux_cus = cus
            this.nuevoPredio(content,1)            
           }
    });
      }

      
      
  }

  Limpiar()
  {
    this.unidad.cus = ''
    this.CargarListadoAuditoriaPredios()    
  }


  TerminarProceso(CODIGO_UDOCUMENTAL, CODIGO_INTERNO, NRO_CUS){
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success ml-2',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
     })  
  
    

     swalWithBootstrapButtons({
      title: '¿Está Ud seguro(a) de finalizar el proceso de CUS Nro. ' +  NRO_CUS +' ?',         
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
          
            if (data.data[0].RESULTADO=="PROCESO"){
                this.error("No es posible cerrar proceso porque CUS se encuentra en Control de Calidad", "Control de Calidad")
                this.spinner.hide();
            }else if(data.data[0].RESULTADO=="CERRADO"){
              this.error("No es posible cerrar U.D.", "U.D. se encuentra cerrado")
              this.spinner.hide();
            }else if(data.data[0].RESULTADO=="OK" || data.data[0].RESULTADO=="NOTIFICADO"){
              this.dataservice.ActualizaNotificacion(dataarray).subscribe((data:any) =>{
                this.spinner.hide();
                if (data.data[0].RESULTADO=="OK")
                {
                  swal({
                    type: 'success',
                    title: 'Se ha cerrado el CUS Nro.' + NRO_CUS, 
                    confirmButtonText: 'Listo'  
                    });      
                    this.CargarListadoAuditoriaPredios();
                }
                else{
                  this.error("Ha ocurrido un inconveniente", "Intentar nuevamente")
                }
              });
            }else{
              this.error("Ha ocurrido un inconveniente", "Intentar nuevamente")
            }
                  
          });         
        }
      });
   }

   verCreacionRegistro(content1, codigo_interno, accion){
    this.accion = accion
    this.spinner.show();
    this.paramDetalleAuditoria.accion = accion
    this.paramDetalleAuditoria.codigo_interno = codigo_interno
    //console.log(this.paramDetalleAuditoria)
    this.dataservice.openDetalleAuditoria(this.paramDetalleAuditoria).subscribe((data:any) =>{
      this.listadoDetalleAuditoria = data.data;    
      console.log(this.listadoDetalleAuditoria.length)
      //return
      this.spinner.hide();    
      
      let opciones : NgbModalOptions = {
        size : "lg",
        backdrop : "static"
      };
      this.modalService.open(content1,opciones);
    });

   }

   verModificacionRegistro(content1){
    
   }

   loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.CargarListadoAuditoriaPredios();
    }  
  }
  
  resetearpag(){
    this.filtro.page = 1;
    this.CargarListadoAuditoriaPredios();
  }




  
}
