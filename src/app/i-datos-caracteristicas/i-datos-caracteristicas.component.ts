import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { informeAsociadosService } from '../services/informeAsociados.service';


@Component({
  selector: 'app-i-datos-caracteristicas',
  templateUrl: './i-datos-caracteristicas.component.html',
  styleUrls: ['./i-datos-caracteristicas.component.css']
})
export class IDatosCaracteristicasComponent implements OnInit {
  @Input('codigo_interno')  codigo_interno;
  @Input('codigo_preventivo')  codigo_preventivo;
  @Input('sol_ing')  sol_ing;
  @Input('accion')  accion; 
   
  datospredio = { 
    zona: '',
    terreno : ''
   }

  listado =[]
  listado_2 = []
  listado_3 = []

  constructor(
    private spinner: NgxSpinnerService,
    private dataservice : informeAsociadosService,
  ) { }

  ngOnInit() {
    this.CargarDatosExpediente('IT2',this.codigo_interno,this.sol_ing,this.codigo_preventivo)
    this.CargarListadoTopo('CT1',this.codigo_interno,this.sol_ing,this.codigo_preventivo)
    this.CargarListadoSuelos('CT2',this.codigo_interno,this.sol_ing,this.codigo_preventivo)
    this.CargarListadoSaneamiento('CT3',this.codigo_interno,this.sol_ing,this.codigo_preventivo)
  }

 
  CargarDatosExpediente(tipo,codint,sol,codprev)
  {
    this.spinner.show();
    this.dataservice.DetalleInformes(tipo,codint,sol,codprev,'0').subscribe((data:any) =>{ 
      this.spinner.hide();                 
      this.datospredio.zona = data.data[0]["TIPO_ZONA"]    
      this.datospredio.terreno = data.data[0]["TIPO_TERRENO"]    
    })
  }

  CargarListadoTopo(tipo,codint,sol,codprev)
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
              tipo :  data.data[i].DESCRIPCION_TOPOGRAFICA,
              detalle :   data.data[i].DETALLE              
            }        
          );      
        }      
    })
  }

  CargarListadoSuelos(tipo,codint,sol,codprev)
  {
    this.spinner.show();
    this.dataservice.DetalleInformes(tipo,codint,sol,codprev,'0').subscribe((data:any) =>{ 
      this.spinner.hide();                 
      this.listado_2 = []
      let j = 0
      for (let i= 0; i < data.data.length; i++)      
        {  
          j++                    
          this.listado_2.push(
            {                           
              item : j ,
              tipo :  data.data[i].DESCRIPCION_SUELO,
              detalle :   data.data[i].DETALLE              
            }        
          );      
        }      
    })
  }

  CargarListadoSaneamiento(tipo,codint,sol,codprev)
  {
    this.spinner.show();
    this.dataservice.DetalleInformes(tipo,codint,sol,codprev,'0').subscribe((data:any) =>{ 
      this.spinner.hide();                 
      this.listado_3 = []
      let j = 0
      for (let i= 0; i < data.data.length; i++)      
        {  
          j++                    
          this.listado_3.push(
            {                           
              item : j ,
              servicio :  data.data[i].SERVICIO,
              instalado :   data.data[i].INSTALADO,
              factibilidad : data.data[i].FACTIBILIDAD
            }        
          );      
        }      
    })
  }

}
