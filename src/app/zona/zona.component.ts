import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ZonaService } from '../services/zona.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MigracionService } from '../services/migracion.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-zona',
  templateUrl: './zona.component.html',
  styleUrls: ['./zona.component.css']
})
export class ZonaComponent implements OnInit {

  lam = [];
  playa =[];
  restringido = [];
  privado =[]; 
  zona ={
    codigo_interno : '',
    codlam : '0',
    observaciones : '',
    codzona : '0',
    areazona : 0,
    codrestringido : '0',
    arearestringido: 0,
    codprivado :'0',
    areaprivado : 0,
    codigo_usuario : sessionStorage.getItem("codigopersonal")   
  }
  auxcargar = ''
  count = 0
  
  active : boolean
  flag_bloq_1 :boolean = true;
  flag_bloq_2 :boolean = true;
  flag_bloq_3 :boolean = true;

  @Input('bloquear')  bloquear;
  @Input('codigo_interno')  codinterno;
  @Input('cargar')  cargar
  @Output('callback') salida = new EventEmitter();

  constructor(
    private dataservice : ZonaService,  
    private spinner: NgxSpinnerService,
    private MigracionService: MigracionService,
  ) {      
  }
  
  ngOnChanges(){    
    this.zona.codigo_interno= this.codinterno;
    this.auxcargar = this.cargar
    this.bloquear=='1'? this.active=true: this.active = false
    
    if (this.auxcargar=='7')
    {
      this.count = this.count+ 1      
      if (this.count==1) 
      { 
        this.cargarcombos()  
        this.setcombo();                   
      }    
      
      if (this.zona.codigo_interno !="0" && this.zona.codigo_interno!='' && this.count==1)
      {                           
        this.CargarZona(this.zona.codigo_interno)
      } 
    }  
    
  }

  ngOnInit() {
    this.validarzona(this.zona)
  }

  validarzona(data){
    this.salida.emit(data);                        
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
          {this.zona.areazona= 0}  
          if (tipo==2)
          {this.zona.arearestringido= 0} 
          if (tipo==3)
          {this.zona.areaprivado= 0}
       }      
       if (aux_2=='.0')
       {        
         this.error("Valor no válido,formato incorrecto solo permite X.X")       
          if (tipo==1)
          {this.zona.areazona= 0}  
          if (tipo==2)
          {this.zona.arearestringido= 0} 
          if (tipo==3)
          {this.zona.areaprivado= 0}  
       }
    } else {          
       let aux_3 =numero.substr(0,1)
       let aux_4 =numero.substr(0,2)  
       let aux_5 =numero.substr(1,1)                     
       if (aux_3=='.')
       {        
         this.error("Valor no válido,formato incorrecto solo permite X.X")         
          if (tipo==1)
          {this.zona.areazona= 0}  
          if (tipo==2)
          {this.zona.arearestringido= 0} 
          if (tipo==3)
          {this.zona.areaprivado= 0}     
       }           
       if (aux_4=='00' )
       {        
         this.error("Valor no válido,solo permite un 0 a la izquierda del .")
          if (tipo==1)
          {this.zona.areazona= 0}  
          if (tipo==2)
          {this.zona.arearestringido= 0} 
          if (tipo==3)
          {this.zona.areaprivado= 0}        
       }
       if (aux_3=='0' && aux_5>'0')
       {        
         this.error("Valor no válido,no permite 0 a la izquierda")        
         if (tipo==1)
         {this.zona.areazona= 0}  
         if (tipo==2)
         {this.zona.arearestringido= 0} 
         if (tipo==3)
         {this.zona.areaprivado= 0}       
       }
    }
   }

  cargarcombos(){
    this.spinner.show();
    this.dataservice.Lam().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.lam = data.data;                                             
    }); 

    this.spinner.show();
    this.dataservice.Playa().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.playa = data.data;                                             
    }); 

    this.spinner.show();
    this.dataservice.Privado().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.privado = data.data;                                             
    }); 

    this.spinner.show();
    this.dataservice.Restringido().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.restringido = data.data;                                             
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
  
  CargarZona(codigo){
    this.spinner.show();
    this.MigracionService.ObtenerData('ZP',codigo).subscribe((data:any) =>{  
      if (data.data.length>0)
      {
        this.zona.codlam        = data.data[0].LINEA_ALTAMAREA
        this.zona.observaciones = data.data[0].OBSERVACION_ZPLAYA
        this.zona.codzona       = data.data[0].ZONA_PLAYA
        this.zona.areazona      = data.data[0].AREA_ZPLAYA
        this.zona.codrestringido = data.data[0].ZONA_DOMINIO_REST
        this.zona.arearestringido = data.data[0].AREA_DOMINIO_REST
        this.zona.codprivado = data.data[0].ZONA_DOMINIO_PRIV
        this.zona.areaprivado = data.data[0].AREA_DOMINIO_PRIV    
        
        this.bloquear_1(this.zona.codzona)
        this.bloquear_2(this.zona.codrestringido)
        this.bloquear_3(this.zona.codprivado)
      }
      this.spinner.hide(); 
    }); 
  }

  setcombo()
  {
    this.zona.codlam = "0"
    this.zona.codprivado = "0"
    this.zona.codrestringido = "0"
    this.zona.codzona = "0"
  }

  bloquear_1(codigo)
  {
    codigo=='N' || codigo=='0' ? this.flag_bloq_1=true: this.flag_bloq_1 = false    
    if(codigo=='N' || codigo=='0'){
      this.zona.areazona = 0
    }
  }
  bloquear_2(codigo)
  {
    codigo=='N' || codigo=='0' ? this.flag_bloq_2=true: this.flag_bloq_2 = false   
    if(codigo=='N' || codigo=='0'){
      this.zona.arearestringido = 0
    } 
  }
  bloquear_3(codigo)
  {
    codigo=='N' || codigo=='0' ? this.flag_bloq_3=true: this.flag_bloq_3 = false   
    if(codigo=='N' || codigo=='0'){
      this.zona.areaprivado = 0
    } 
  }

}
