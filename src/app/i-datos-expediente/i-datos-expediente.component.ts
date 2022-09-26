import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { informeAsociadosService } from '../services/informeAsociados.service';

@Component({
  selector: 'app-i-datos-expediente',
  templateUrl: './i-datos-expediente.component.html',
  styleUrls: ['./i-datos-expediente.component.css']
})
export class IDatosExpedienteComponent implements OnInit {

  @Input('codigo_interno')  codigo_interno;
  @Input('codigo_preventivo')  codigo_preventivo;
  @Input('sol_ing')  sol_ing;
  @Input('accion')  accion;
  
  datospredio = { 
    tecnico : '',
    legal : '',
    expediente : '',
    area : '',
    procedimiento : '',
    administrado  : '',
    razon_social : '',
    tramite : '',
    area_sol : '',
    fecha : ''
   }

  constructor(
    private spinner: NgxSpinnerService,
    private dataservice : informeAsociadosService,
  ) { 
    
  }
   
  ngOnInit() {    
    this.CargarDatosExpediente('DE',this.codigo_interno,this.sol_ing,this.codigo_preventivo)
  }

  CargarDatosExpediente(tipo,codint,sol,codprev)
  {
    this.spinner.show();
    this.dataservice.DetalleInformes(tipo,codint,sol,codprev,'0').subscribe((data:any) =>{ 
      this.spinner.hide();           
      console.log(data.data)
      this.datospredio.legal = data.data[0]["LEGAL"]    
      this.datospredio.tecnico = data.data[0]["TECNICO"]    
      this.datospredio.expediente = data.data[0]["CODIGO_MATRIZ"]    
      this.datospredio.area = data.data[0]["AREA"]    
      this.datospredio.procedimiento = data.data[0]["DSC_PROCEDIMIENTO"]    
      this.datospredio.administrado = data.data[0]["ADMINISTRADO"]    
      this.datospredio.razon_social = data.data[0]["RAZON_SOCIAL"]         
      this.datospredio.tramite = data.data[0]["TRAMITE"]         
      this.datospredio.area_sol = data.data[0]["AREA_SOLICITADA"]         
      this.datospredio.fecha = data.data[0]["FECHA"]         
    })
  }

}
