import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { AportefotosService } from '../services/aportefotos.service';
import { AngularFileUploaderComponent } from 'angular-file-uploader';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-aporte-fotos',
  templateUrl: './aporte-fotos.component.html',
  styleUrls: ['./aporte-fotos.component.css']
})
export class AporteFotosComponent implements OnInit {

   /* ZONA DE DECLARACION DE VARIABLES */
    auxcargar = ''
    count = 0
    active : boolean

    @Input('bloquear')  bloquear;
    @Input('codigo_interno')  codinterno;
    @Input('cargar')  cargar
    @Output('callback') salida = new EventEmitter();

    @ViewChild('labelImport4')
    labelImport4    : ElementRef;
    input4          : boolean = true
    preview4        : boolean = false
    urlDescarga4    : String = ''
    fileToUpload4   : FileList = null;
    formImport4: FormGroup;

    filtro = {
      codigo_interno: '0',
      cood_usuario: '',
      NMB_FOTO: '',
      nombreArchivo: "",
    }
    nombreArchivo:string = "";
    dataAporteFotos: any = [];
    ordenFoto: any = []
    NMB_FOTO:'';
    
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private dataservice : AportefotosService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) { 
    this.filtro.cood_usuario =  sessionStorage.getItem('codigopersonal')
  }

  ngOnChanges(){   
   
    this.filtro.codigo_interno= this.codinterno;
    this.auxcargar = this.cargar
    this.bloquear=='1'? this.active=true: this.active = false 
    if (this.filtro.codigo_interno !="")
    {               
      this.ListadoAporteFotos();   
      
    }   
  }

  cargaImagenesPrueba(){
    console.log(this.filtro)
    this.dataservice.cargaImagenesPrueba(this.filtro).subscribe((data : any) =>{ 
      this.spinner.hide();
      console.log(data.data);
      //this.dataAporteFotos = data.data;         
      
        
    });
  }

  ListadoAporteFotos(){
    this.dataservice.ListadoAporteFotos(this.filtro).subscribe((data : any) =>{ 
      this.spinner.hide();
      this.dataAporteFotos = data.data;         
      
      if(this.dataAporteFotos.listadoAporteFotos.length != 0){
        this.urlPDF = this.dataservice.API_URL + "VisualizarFoto/" + this.dataAporteFotos.listadoAporteFotos[0].NMB_FOTO+'/'+this.filtro.codigo_interno;
        this.ordenFoto = this.dataAporteFotos.listadoAporteFotos[0].ROW_NUMBER_ID-1
        this.NMB_FOTO = this.dataAporteFotos.listadoAporteFotos[0].NMB_FOTO;
      }      
    });
  }

  siguiente(orden){
    //console.log(this.dataAporteFotos.listadoAporteFotos[orden].NMB_FOTO)
    let vorden = parseInt(orden)+1    
    if(typeof this.dataAporteFotos.listadoAporteFotos[vorden] != 'undefined'){
      this.urlPDF = this.dataservice.API_URL + "VisualizarFoto/" + this.dataAporteFotos.listadoAporteFotos[vorden].NMB_FOTO+'/'+this.filtro.codigo_interno;
      this.ordenFoto = this.dataAporteFotos.listadoAporteFotos[vorden].ROW_NUMBER_ID-1      
      this.NMB_FOTO = this.dataAporteFotos.listadoAporteFotos[vorden].NMB_FOTO;

    }else{
      swal({
        position: 'center',
        type: 'info',
        title: 'No hay más imágenes', 
        showConfirmButton: false
        
      })
    }
  }
  atras(orden){
    let vorden = parseInt(orden)-1    
    if(typeof this.dataAporteFotos.listadoAporteFotos[vorden] != 'undefined'){
      this.urlPDF = this.dataservice.API_URL + "VisualizarFoto/" + this.dataAporteFotos.listadoAporteFotos[vorden].NMB_FOTO+'/'+this.filtro.codigo_interno;
      this.ordenFoto = this.dataAporteFotos.listadoAporteFotos[vorden].ROW_NUMBER_ID-1
      this.NMB_FOTO = this.dataAporteFotos.listadoAporteFotos[vorden].NMB_FOTO;
    }else{
      swal({
        position: 'center',
        type: 'info',
        title: 'No hay más imágenes', 
        showConfirmButton: false
        
      })
    }
  }
  

  VisualizarAporteFoto(NMB_FOTO, content2){
    this.spinner.show();
    this.modalService.open(content2, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      
    });
    this.urlPDF = this.dataservice.API_URL + "VisualizarFoto/" + NMB_FOTO;
    this.spinner.hide();
  }

  /*
  EliminarAporteFoto(NMB_FOTO){
    
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
      
        this.filtro.NMB_FOTO = NMB_FOTO;  

        this.spinner.show();
        this.dataservice.EliminarAporteFotos(this.filtro).subscribe((data : any) =>{  
          this.dataresultado = data.data;     
          if (this.dataresultado.resultado[0].RESULTADO == 'OK'){
            this.ListadoAporteFotos();
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
  */


  uploadForm: FormGroup;
  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: [''],
      prodName: [''],
      prodDesc: ['']
    });
    this.formImport4 = new FormGroup({
      importFile4: new FormControl('', Validators.required)
    });
  }

  onFileSelect(event){
    const file = event.target.files[0];
    this.uploadForm.get('profile').setValue(file);
  }

  selectedFile = null;
  name = 'Angular';
  urls = [];
  dataresultado: any = [];
  images = [];
  Adj_documento: string = "";
  //filtros: any = [];
  

  onFileSelected(event){  
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('',fd).subscribe(res => {    
    })
  }

  resetVar = false;
    closeResult: string;
    urlPDF;
    NomArchEstado = -1;
    @ViewChild('fileUpload1')
    private fileUpload1: AngularFileUploaderComponent;

    afuConfig = {
      multiple: true,
      uploadAPI: {
        url: sessionStorage.getItem("Adjuntar_InfFinal"),
      },
      hideResetBtn: true,
      uploadBtnText: "Adjuntar Archivo",
      uploadMsgText: "",
      formatsAllowed: ".png,.jpg",
      maxSize: 2
    };




  onSelectFile(event) {     
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event:any) => {
                   this.urls.push(event.target.result); 
                }
                reader.readAsDataURL(event.target.files[i]);
        }
        
    }
    
  }


  onFileMemoria(files: FileList) {
      this.urls = [];
      this.labelImport4.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
      this.fileToUpload4 = files;
      this.input4 = false;

      if (files && files[0]) {
        var filesAmount = files.length;
        if (filesAmount > 10){
          swal({
            position: 'center',
            type: 'warning',
            title: 'Solo se permite seleccionar 10 imágenes como máximo', 
            showConfirmButton: false
          })
          this.input4 = true;
          return;
        }
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = (event:any) => {
                   this.urls.push(event.target.result); 
                }
                reader.readAsDataURL(files[i]); 
        }
      }
  }

  importMemoria(): void {
      if (this.filtro.codigo_interno == ''){
        swal({
          position: 'center',
          type: 'error',
          title: 'Ha ocurrido un inconveniente!, Por favor Ingresar nuevamente', 
          showConfirmButton: false
          
        })
      }
      this.spinner.show();
      if(this.fileToUpload4 == null){
        alert('Este campo es requerido.');
          this.spinner.hide();
          return;
      }
      if(this.fileToUpload4.length > 0) {
       
          let file: File = this.fileToUpload4[0];
          var formData = new FormData();

          for (let index = 0; index < this.fileToUpload4.length; index++) {
            formData.append('uploadFile[]', this.fileToUpload4[index]);
          }
          formData.append('codigo_interno', this.filtro.codigo_interno);          
          
          this.dataservice.PostGuardar_imagenes(formData).subscribe((data : any) =>{ 
            this.spinner.hide();
            this.dataresultado = data.data;            
            //return;

            if(this.dataresultado.error == false){
              swal({
                position: 'center',
                type: 'success',
                title: 'El Aporte de fotos se ha realizado correctamente', 
                showConfirmButton: false
                
              })
              this.spinner.hide();
              this.urls = [];
              this.input4 = true;
              this.labelImport4.nativeElement.innerText = '';
              this.ListadoAporteFotos();
              return;
              
            }
            else
            {

                swal({
                  position: 'center',
                  type: 'error',
                  title: this.dataresultado.resultado,
                  showConfirmButton: false,
                  //timer: 2000
                })
            }

           
          },error => {
            alert('Ha ocurrido un error, comuníquese con TI '+ error+' Error');
            this.input4 = false
            this.spinner.hide();
            // });
          });

         
      }
  }

  EliminarAporteFotos(){
    swal({
      title: '¿Esta Ud. seguro de eliminar la foto aportada?',
      text: "¡No podrás revertir esto!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelado',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
      
    }).then((result) => {
      if (result.value) {
      
        this.filtro.NMB_FOTO = this.NMB_FOTO;  

        this.spinner.show();
        this.dataservice.EliminarAporteFotos(this.filtro).subscribe((data : any) =>{  
          this.dataresultado = data.data;          
          if (this.dataresultado.resultado[0].RESULTADO == 'OK'){
            //this.ListadoAporteFotos();
            this.ListadoAporteFotos();
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
          this.spinner.hide();
        });
  
      }
    })
  }

 
   mensajeDataUpload(data){
    if (typeof data.mensaje.file !== 'undefined') {       
        alert('Este campo es requerido.');
    }
    if (typeof data.mensaje.tipo !== 'undefined') {
        alert('Este campo es requerido.');
    }
}




}
