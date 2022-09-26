import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MigracionService } from '../../services/migracion.service';
import {NgbModalConfig, NgbModal, ModalDismissReasons, NgbModule} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-listado-predios-web',
  templateUrl: './listado-predios-web.component.html',
  styleUrls: ['./listado-predios-web.component.css']
})
export class ListadoPrediosWebComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private MigracionService: MigracionService,
    private ventanaModal: NgbModal,
  ) { }

  ngOnInit() {
    this.ListadoPrediosWeb();
  }

  
  /* Declaracion de variables */
  filtro : any = {        
    page : 1,
    records : 10
  };

  buscar : any = {    
    valor:'',
    page : 1,
    records : 10
  };

  menu ={
    estado :false
  }

  predio ={
    id:'',
    ruc : '',
    entidad: '',
    denominacion:'',
    departamento :'',
    provincia: '',
    distrito:'',
    direccion:'',
    propiedad :'',
    propietario:'',
    tomo : '',
    codigopredio:'',
    fichas: '',
    fojas:'',
    area_terreno:'',
    area_registral:''    
  }
  
  files = []
  flagvalidar = []
  extension = []
  adjuntossolicitud =[]
  predios=[]
  flag : boolean = false;
  formulario : boolean = false;
  contador : any = 0;
  dataResultado : any = [];

  /* Declaracion de Paginacion */
  itemsPerPage: number = 10; 
  page: any = 1;
  previousPage: any;
  total : any = 0;  

  /* Declaracion de Funciones */
  ListadoPrediosWeb(){ 
    this.spinner.show();
    this.MigracionService.getListadoPrediosWeb(this.filtro).subscribe((data : any) =>{
    this.spinner.hide();
    this.dataResultado = data.data;      
    this.total = ( this.dataResultado.listado.length > 0 ) ? this.dataResultado.listado[0].TOTAL : 0;    
    });
  }


  BuscarPrediosWeb(){ 
    this.spinner.show();
    this.MigracionService.getBuscarPrediosWeb(this.buscar).subscribe((data : any) =>{
    this.spinner.hide();
    this.dataResultado = data.data;        
    this.total = ( this.dataResultado.listado.length > 0 ) ? this.dataResultado.listado[0].TOTAL : 0;    
    
    });
  }
   

  LimpiarWeb()
  {
    this.ListadoPrediosWeb()
    this.buscar.valor = ''
  }


  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.ListadoPrediosWeb();
    }  
  }
  
  resetearpag(){
    this.filtro.page = 1;
    this.ListadoPrediosWeb(); 
  }


  pasar_datos(datos)
  {    
    this.predio.ruc = datos.RUC_ENTIDAD
    this.predio.entidad = datos.NOM_ENTIDAD
    this.predio.denominacion = datos.DENOMINACION_PREDIO
    this.predio.departamento = datos.DEPARTAMENTO
    this.predio.provincia = datos.PROVINCIA
    this.predio.distrito = datos.DISTRITO    
    this.predio.direccion= datos.DIRECCION
    this.predio.fichas = datos.FICHA
    this.predio.fojas = datos.FOJAS
    this.formulario = true
    //var element = <HTMLInputElement> document.getElementById("dato");
    //element.click()
  }

  regresar()
  {
    this.formulario  = false;
  }

  marcar(data,inx)
  {            
    if (data.estado ==true )
      {
        this.predios.push({
          ruc: data.RUC_ENTIDAD,
          denominacion_inmueble: data.DENOMINACION_PREDIO,
          departamento: data.DEPARTAMENTO,
          provincia: data.PROVINCIA,
          distrito:  data.DISTRITO,
          codigo_ubigeo: data.CODIGO_UBIGEO,          
          id : data.COD,
          cod_depa : data.COD_DEP,
          direccion : data.DIRECCION,
          ID_PREDIO_SBN: data.COD
        })
        this.contador = this.contador + 1           
      }
    else
      {
        this.predios.splice(inx,1) 
        this.contador = this.contador - 1 
      }
    
      this.contador>0?this.flag = true : this.flag= false
         
  }
/*
  migrar()
  {       
    const formData : FormData = new FormData();
    formData.append('predios',JSON.stringify(this.predios))     

    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success ml-2',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      })   
  
      swalWithBootstrapButtons({
        title: '¿Estas seguro de migrar los registros seleccionados?',            
        type: 'warning',
        showCancelButton: true,    
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
        reverseButtons: true
        }).then((result) => {
          if (result.value) {      
            this.spinner.show();          
            this.MigracionService.InsertarPrediosWeb(formData).subscribe((data : any) =>{    
              this.spinner.hide();
              swal({
              type: 'success',
              title: 'La migración se realizo con éxito',                  
              confirmButtonText: 'Migrado'                  
              });        
            }             
            ); 
            this.flag = false
            this.predios = [];
            this.ListadoPrediosWeb();
            }
          /*else
          {
            for (let i = 0; i++; i<=this.dataResultado.listado)
            {

            }
          }
          });
    }     */     
}
