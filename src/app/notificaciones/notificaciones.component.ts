import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal, ModalDismissReasons, NgbModule, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NotificacionesService } from '../services/notificaciones.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularFileUploaderComponent } from 'angular-file-uploader';
import swal from 'sweetalert2';
import { forEach } from '@angular/router/src/utils/collection';
import { DatePipe } from '@angular/common'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { controlregistroSDRCService } from '../services/control-registroSDRC.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  /* ZONA DE DECLARACION DE VARIABLES */
  dataresultado: any = [];
  dataNotificaciones: any = [];

  filtro = {
    codigo_entidad: 0,
    cood_usuario: '',
    id_notificacion: 0
  }
  closeResult: string;
  urlPDF_H;  

  constructor(
    private modalService: NgbModal,
    private dataservice : NotificacionesService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private controlregistroSDRCService: controlregistroSDRCService,
  ) { 
    this.filtro.cood_usuario = sessionStorage.getItem('codigopersonal') 
    //this.filtro.cood_usuario = '1959'
  }

  ngOnInit() {
    
    this.ListadoNotificaciones();
    
    
  }

  ListadoNotificaciones(){  
    console.log(this.filtro)
    this.dataservice.ListadoNotificaciones(this.filtro).subscribe((data : any) =>{ 
      this.spinner.hide();
      this.dataNotificaciones = data.data;       
    });
  }

  
  Verificar_historico(contentHistorico, idControlCalidad){
    {                        
      this.modalService.open(contentHistorico, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
      });
      this.urlPDF_H = this.controlregistroSDRCService.API_URL+"Verificar_historico/"+idControlCalidad;
    }
  }

  Archivar_Notificacion(id){
    this.filtro.id_notificacion = id;

    //------------------
    swal({
      title: '¿Esta Ud. seguro de archivar mensaje?',
      text: "¡No podrás volvel a ver el mensaje!",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelado',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Archivarlo!'
      
    }).then((result) => {
      if (result.value) {
      
        this.filtro.id_notificacion = id;       
  
        this.spinner.show();
        this.dataservice.Archivar_Notificacion(this.filtro).subscribe((data : any) =>{ 
          if(data.data[0].RESULTADO == 'OK'){
            swal({
              type: 'success',
              title: ' Se procedio a realizar el archivado de la notificación',                 
              confirmButtonText: 'Listo'                  
              }); 
            this.ListadoNotificaciones();
          }else{
            swal({
              type: 'error',
              title: ' Se encontro un problema',                 
              confirmButtonText: 'Listo'                  
              });  
          }  
  
        });
  
      }
    })

  }

}
