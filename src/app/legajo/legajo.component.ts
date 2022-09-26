import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgbModalConfig, NgbModal, ModalDismissReasons, NgbModule, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LegajoService } from '../services/legajo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFileUploaderComponent } from 'angular-file-uploader';
import swal from 'sweetalert2';
import { forEach } from '@angular/router/src/utils/collection';
import { DatePipe } from '@angular/common'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { exit } from 'process';

@Component({
  selector: 'app-legajo',
  templateUrl: './legajo.component.html',
  styleUrls: ['./legajo.component.css']
})
export class LegajoComponent implements OnInit {

   //Paginacion 
   itemsPerPage: number = 5;
   page: any = 1;
   previousPage: any;
   total : any = 0; 

  /* ZONA DE DECLARACION DE VARIABLES */
  auxcargar = ''
  count = 0
  active : boolean
  
  @Input('bloquear')  bloquear;
  @Input('codigo_interno')  codinterno;
  @Input('cargar')  cargar
  @Output('callback') salida = new EventEmitter();


   arraytipoDocumento = [];
   NombArch_Dat = { cod_inventario_ent: '0', estado: 0 }
   NomArch_arg: any = [];
   RegCabInvNuev: any = [];
   NombArch: string = "";
   NombArch2: string = "";
   dataresultado: any = [];
   dataAporte: any = [];
   dataAporteDocumentos = [];
   dataEliminacion: any = [];
   dataSituacionCatastral: any = [];
   dataSituacion = {
    origendatos: '',
    nivelPrecision: '',
    sistemaCoordenadas: '',
    fechaAporte: '',  
    responsableAporte: '',
    observaciones: ''
   }

   filtro = {
     codigo_personal: '',
     codigo_interno: '0',
     codigo_documento: '0',
     cood_usuario: '',
     item_documento: 0,
     nombreArchivo: "",
     CUS: "",
     page: this.page,
     records: this.itemsPerPage,
     observaciones: ''
   }
   Adj_documento: string = "";
   nombreArchivo:string = "";
   CUS:string = "";
   modalObs;
   modalVisualizador;
   disable: boolean = false;
   


   resetVar = false;
    closeResult: string;
    urlPDF;
    NomArchEstado = -1;
    @ViewChild('fileUpload1')

    afuConfig = {
      uploadAPI: this.dataservice.API_URL + "SubirDocumentoLegajo/" + "100" + "-" + 'DOCUMENTO',
      multiple: false,
      // uploadAPI: {
      //   //url: this.dataservice.API_URL + "SubirDocumentoLegajo/" + "100" + "-" + 'DOCUMENTO',
      //   url: 'aaa',
      //   //method:"POST",
      //   //responseType: 'blob',

      // },
      hideResetBtn: true,
      uploadBtnText: "Adjuntar Archivo",
      uploadMsgText: "",
      formatsAllowed: ".PDF,.pdf",
      maxSize: 50,
      replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Attach Files...',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !',
        sizeLimit: 'Size Limit'
      }
    };
    private fileUpload1: AngularFileUploaderComponent;


  constructor(
    private modalService: NgbModal,
    private dataservice : LegajoService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) { 
    this.filtro.codigo_personal =  sessionStorage.getItem('codigopersonal')
    this.filtro.cood_usuario =  sessionStorage.getItem('codigopersonal') 
    //this.filtro.codigo_personal = '2887'
    //this.filtro.cood_usuario = '2887'
  }

  ngOnChanges(){   
    this.filtro.codigo_interno= this.codinterno;
    this.auxcargar = this.cargar
    this.bloquear=='1'? this.active=true: this.active = false
    if (this.auxcargar=='8')
    {
      this.count = this.count+ 1      
      if (this.count==1) 
      {
        this.cargarcombos()           
      }           
    }
    if (this.filtro.codigo_interno !="" && this.count==1)
    {               
      this.traerDataAportes(); 
      this.datosSituacionCatastral();       
           
    }   
    this.disable = this.active
  }

  ngOnInit() {
    

  }

  cargar_ruta_aportes(){
    //alert(this.filtro.codigo_documento)
    if(this.filtro.codigo_documento == '0'){
      swal({
        position: 'center',
        type: 'success',
        title: 'Debe especificar el Tipo de Documento',
        showConfirmButton: false
        //timer: 2000        
      })                 
    }else{
      this.afuConfig.uploadAPI = this.dataservice.API_URL + "SubirDocumentoLegajo/" + "100" + "-" + 'DOCUMENTO';
      //this.fileUpload1.ApiResponse = 'sasas';
    
    }
  }

  cambios(){
    var select = document.getElementById("codigo_documento");
    var options=document.getElementsByTagName("option");
    console.log(select.innerText);
    //console.log(options[select.value-1].innerHTML)
    
  }

  openvistaPreviaDocumento(event,contentaux) {
    console.log(event)
    let indice;
    let dataAdjuntado = JSON.parse(event.response);  
    dataAdjuntado = dataAdjuntado.url;
    indice = dataAdjuntado.indexOf('//',0);
    this.nombreArchivo = dataAdjuntado.substr(indice + 2)   
    this.filtro.nombreArchivo =  this.nombreArchivo;
    
    this.spinner.show();
      
    let opciones : NgbModalOptions = {
      size: <any>'lg',
      backdrop : "static",
      keyboard : false
      };    
      this.modalVisualizador = this.modalService.open(contentaux,opciones);

/*
			this.modalService.open(contentaux, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			}, (reason) => {
        
      });
*/
			this.urlPDF = this.dataservice.API_URL + "VerPDF/" + this.nombreArchivo;
      this.spinner.hide();
  }


  VisualizarDocumentoAporte(codigo_inmueble, item_documento, nombreArchivo, CUS, content2){
    
    this.filtro.codigo_interno = codigo_inmueble;   
    this.filtro.CUS = CUS;
    this.filtro.item_documento = item_documento;
    this.nombreArchivo = nombreArchivo;
    this.CUS = CUS;
    this.spinner.show();
    this.modalService.open(content2, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      
    });
    this.urlPDF = this.dataservice.API_URL + "VisualizarPDF/" + this.nombreArchivo + "/" + this.CUS;
    this.spinner.hide();
  }

  AddObservaciones(content){
    let opciones : NgbModalOptions = {
      size: <any>'lg',  
      backdrop : "static",
      keyboard : false
      };    
      this.modalObs = this.modalService.open(content,opciones);

/*
    this.modalObs = this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      
    });
    */ //
  }

  AceptarArchivoAdjunto(){
    //modal.close()
    /* VALIDAR SI EXISTE EL ARCHIVO EN EL TEMPORAL */

    /*
    if (this.filtro.observaciones.trim() == ''){ 
      swal({
        position: 'center',
        type: 'info',
        title: 'Debe ingresar comentarios u observaciones del aporte',
        showConfirmButton: false
      })
      return;
    }
    */
    
    if(1==1){ //Si existe archivo temporal

      this.spinner.show();
      this.dataservice.AceptarArchivoAdjunto(this.filtro).subscribe((data : any) =>{
      this.spinner.hide();
      this.dataresultado = data.data;       

      if(this.dataresultado.resultado[0].RESULTADO == "OK"){
        swal({
          position: 'center',
          type: 'success',
          title: 'El Aporte se ha realizado correctamente',
          showConfirmButton: false
          //timer: 2000
        })
        this.modalObs.close()
        this.modalVisualizador.close()
        this.resetVar = true;
        this.filtro.codigo_documento == '0';
        this.dataservice.ListadoAporteDocumentos(this.filtro).subscribe((data : any) =>{ 
          this.spinner.hide();
          this.dataAporteDocumentos = data.data;           
        });
        /**/
      }
      else
      {
          swal({
            position: 'center',
            type: 'error',
            title: 'Ha ocurrido un inconveniente',
            showConfirmButton: false,
            //timer: 2000
          })
          this.resetVar = true;
          this.modalService.dismissAll();
      }
    });

    }else{
      swal({
        position: 'center',
        type: 'error',
        title: 'Ha ocurrido un problema con el archivo adjuntado, Debera volver a Adjuntarlo',
        showConfirmButton: false
        //timer: 2000
      })
      this.resetVar = true;
    }
  }

  EliminarArchivoAdjunto(){
    //this.modalService.dismissAll();
    this.dataservice.EliminarArchivoAdjunto(this.filtro).subscribe((data : any) =>{ 
      this.spinner.hide();
      this.dataEliminacion = data.data;  
      this.resetVar = true;     
    });
  }

  traerDataAportes(){
    this.dataservice.ListadoAporteDocumentos(this.filtro).subscribe((data : any) =>{ 
      this.spinner.hide();
      this.dataAporteDocumentos = data.data;    
      console.log(this.dataAporteDocumentos["listadoAportes"])
      console.log(this.dataAporteDocumentos["listadoAportes"].length)
      this.total = ( this.dataAporteDocumentos["listadoAportes"].length > 0 ) ? this.dataAporteDocumentos["listadoAportes"][0].TOTAL : 0;   
      console.log(this.total)
    });
  }

  cargarcombos(){
    this.spinner.show();
    this.dataservice.ListadoTipoDocumentos().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.arraytipoDocumento = data.data;                                             
    }); 

  }


  EliminarDocumentoAporte(codigo_inmueble, item_documento){ 

    swal({
      title: '¿Esta Ud. seguro de eliminar el Documento aportado?',
      text: "¡No podrás revertir esto!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelado',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
      
    }).then((result) => {
      if (result.value) {
      
        this.filtro.codigo_interno = codigo_inmueble;   
        this.filtro.item_documento = item_documento;         
  
       
        this.spinner.show();
        this.dataservice.EliminarDocumentoAporte(this.filtro).subscribe((data : any) =>{  
          this.dataresultado = data.data;           
    
          if (this.dataresultado.resultado[0].RESULTADO == 'OK'){
            this.traerDataAportes();
            swal(
              'Eliminado!',
              'El registro ha sido eliminado.',
              'success' 
            )
          }else{
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

  datosSituacionCatastral(){
    this.dataservice.datosSituacionCatastral(this.filtro).subscribe((data : any) =>{ 
      this.spinner.hide();
      this.dataSituacionCatastral = data.data;          
      this.dataSituacion.origendatos = this.dataSituacionCatastral.datosCatastral[0].ORIGEN_DATOS;
      this.dataSituacion.nivelPrecision = this.dataSituacionCatastral.datosCatastral[0].NIVEL_PRECISION;
      this.dataSituacion.sistemaCoordenadas = this.dataSituacionCatastral.datosCatastral[0].SISTEMA_COORDENADAS;
      this.dataSituacion.fechaAporte = this.dataSituacionCatastral.datosCatastral[0].FECHA_APORTE;
      this.dataSituacion.responsableAporte = this.dataSituacionCatastral.datosCatastral[0].RESPONSABLE_APORTE;
      this.dataSituacion.observaciones = this.dataSituacionCatastral.datosCatastral[0].OBSERVACIONES;
    });
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.traerDataAportes();
    }  
  }
  
  resetearpag(){
    this.filtro.page = 1;
    this.traerDataAportes();
  }

  GuardarObservacionLegal(){
    swal({
      title: '¿Esta Ud. seguro de guardar la observacion?',
      text: "¡No podrás revertir esto!",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelado',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Guardar!'
      
    }).then((result) => {
      if (result.value) {
      
        this.filtro.observaciones = this.dataSituacion.observaciones;         
        this.spinner.show();
        this.dataservice.GuardarObservaciones(this.filtro).subscribe((data : any) =>{  
          this.spinner.hide();
          this.dataresultado = data.data;           
    
          if (this.dataresultado.resultado[0].RESULTADO == 'OK'){
            swal(
              'Se guardo Satisfactoria!',
              'La observacion ha sido registrado satisfactoriamente.',
              'success' 
            )
          }else{
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

}



