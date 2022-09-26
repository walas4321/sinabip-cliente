import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { informeAsociadosService } from '../services/informeAsociados.service';

@Component({
  selector: 'app-i-datos-predio',
  templateUrl: './i-datos-predio.component.html',
  styleUrls: ['./i-datos-predio.component.css']
})
export class IDatosPredioComponent implements OnInit {
   
  @Input('codigo_interno')  codigo_interno;
  @Input('codigo_preventivo')  codigo_preventivo;
  @Input('sol_ing')  sol_ing;
  @Input('accion')  accion;
  
  datospredio = { 
     normatividad : '',
     restricciones : '',
     observaciones : ''
   }

  constructor(
    private spinner: NgxSpinnerService,
    private dataservice : informeAsociadosService,
  ) { }

  ngOnInit() {    
    this.CargarDatosExpediente('DP',this.codigo_interno,this.sol_ing,this.codigo_preventivo)
  }

  CargarDatosExpediente(tipo,codint,sol,codprev)
  {
    this.spinner.show();
    this.dataservice.DetalleInformes(tipo,codint,sol,codprev,'0').subscribe((data:any) =>{ 
      this.spinner.hide();           
      console.log(data.data)
      this.datospredio.normatividad = data.data[0]["NORMATIVA_APLICADA"]          
      this.datospredio.restricciones = data.data[0]["RESTRICCIONES"]          
      this.datospredio.observaciones = data.data[0]["OBSERVACIONES_LEGALES"]          
    })
  }

}
