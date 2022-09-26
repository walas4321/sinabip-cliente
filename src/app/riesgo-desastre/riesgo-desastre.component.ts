import { RiesgoDesastreService } from '../services/riesgoDesastres.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
//import { ZonaService } from '../services/RiesgoDesastreService';
import { NgxSpinnerService } from 'ngx-spinner';
import { MigracionService } from '../services/migracion.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-riesgo-desastre',
  templateUrl: './riesgo-desastre.component.html',
  styleUrls: ['./riesgo-desastre.component.css']
})
export class RiesgoDesastreComponent implements OnInit {

  riesgo ={
    codigo_interno : '',
    codnivel : '0',
    fuenteNivel : '',
    fechaEvaluacion : '',
    fechaIngreso : '',
    observaciones : '',
    codigo_usuario : sessionStorage.getItem("codigopersonal")   
  }
  auxcargar = ''
  count = 0
  active : boolean
  listadoRiesgo = [];

  @Input('codigo_interno')  codinterno;
  @Input('cargar')  cargar
  @Input('bloquear')  bloquear;
  @Output('callback') salida = new EventEmitter();

  constructor(
    private dataservice : RiesgoDesastreService,  
    private spinner: NgxSpinnerService,
    private MigracionService: MigracionService,
  ) { }

  ngOnChanges(){    
    this.riesgo.codigo_interno= this.codinterno;
    this.auxcargar = this.cargar
    this.bloquear=='1'? this.active=true: this.active = false
    
    if (this.auxcargar=='10')
    {
      this.count = this.count+ 1      
      if (this.count==1) 
      { 
        this.cargarcombos()  
        //this.setcombo();                   
      }    
      
      if (this.riesgo.codigo_interno !="0" && this.riesgo.codigo_interno!='' && this.count==1)
      {                           
        console.log(this.auxcargar)
        this.CargarRiesgo(this.riesgo.codigo_interno)
      } 
    }  
    
  }

  ngOnInit() { 
    this.validarRiesgo(this.riesgo)
  }

  validarRiesgo(data){
    this.salida.emit(data);                        
   } 

   cargarcombos(){
    this.spinner.show();
    this.dataservice.listadoNivelRiesgos().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.listadoRiesgo = data.data;  
      console.log(this.listadoRiesgo)  
      this.spinner.hide();                                         
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

  CargarRiesgo(codigo){
    this.spinner.show();
    this.MigracionService.ObtenerData('RD',codigo).subscribe((data:any) =>{ 
      console.log(codigo) 
      if (data.data.length>0)
      {
        this.riesgo.codnivel        = (data.data[0].CODIGO_NIVEL_RIESGO=="")?'0':data.data[0].CODIGO_NIVEL_RIESGO  
        this.riesgo.fuenteNivel     = (data.data[0].FUENTE_NIVEL_RIESGO=="")?'':data.data[0].FUENTE_NIVEL_RIESGO
        this.riesgo.fechaEvaluacion = (data.data[0].FECHA_EVALUACION_NIVEL_RIESGO=="")?'':data.data[0].FECHA_EVALUACION_NIVEL_RIESGO
        this.riesgo.fechaIngreso    = (data.data[0].FECHA_INGRESO_NIVEL_RIESGO=="")?'':data.data[0].FECHA_INGRESO_NIVEL_RIESGO
        this.riesgo.observaciones   = (data.data[0].OBSERVACIONES_NIVEL_RIESGO=="")?'':data.data[0].OBSERVACIONES_NIVEL_RIESGO
        
        // this.bloquear_1(this.zona.codzona)
        // this.bloquear_2(this.zona.codrestringido)
        // this.bloquear_3(this.zona.codprivado)
        console.log(data.data)
      }
      this.spinner.hide(); 
    }); 
  }





}
