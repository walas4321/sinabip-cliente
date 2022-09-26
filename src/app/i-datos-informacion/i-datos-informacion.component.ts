import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { informeAsociadosService } from '../services/informeAsociados.service';


@Component({
  selector: 'app-i-datos-informacion',
  templateUrl: './i-datos-informacion.component.html',
  styleUrls: ['./i-datos-informacion.component.css']
})
export class IDatosInformacionComponent implements OnInit {
  @Input('codigo_interno')  codigo_interno;
  @Input('codigo_preventivo')  codigo_preventivo;
  @Input('sol_ing')  sol_ing;
  @Input('accion')  accion; 
  
  listado =[]

  constructor(
    private spinner: NgxSpinnerService,
    private dataservice : informeAsociadosService,
  ) { }

  ngOnInit() {
    this.CargarDatosExpediente('INFT',this.codigo_interno,this.sol_ing,this.codigo_preventivo)    
  }

  CargarDatosExpediente(tipo,codint,sol,codprev)
  {
    this.spinner.show();
    this.dataservice.DetalleInformes(tipo,codint,sol,codprev,'0').subscribe((data:any) =>{ 
      this.spinner.hide();                 
      this.listado = []
      let j = 0
      for (let i= 0; i < data.data.length; i++)      
        {  
          j++                    
          this.listado.push(
            {                           
              item : j ,
              tipo_documento :  data.data[i].TIPO_DOCUMENTO,
              num_documento :   data.data[i].NRO_DOCUMENTO              
            }        
          );      
        }      
    })
  }

}
