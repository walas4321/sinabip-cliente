import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { informeAsociadosService } from '../services/informeAsociados.service';


@Component({
  selector: 'app-i-datos-valorizacion',
  templateUrl: './i-datos-valorizacion.component.html',
  styleUrls: ['./i-datos-valorizacion.component.css']
})
export class IDatosValorizacionComponent implements OnInit {
  
  @Input('codigo_interno')  codigo_interno;
  @Input('codigo_preventivo')  codigo_preventivo;
  @Input('sol_ing')  sol_ing;
  @Input('accion')  accion; 


  resultado = []
  cantidadRegistros: number = 0
  itemActual: number = 1

  datospredio = { 
    moneda: '',
    cambio : '',
    val_construcciones : '',
    val_obras : '',
    val_terreno : '',
    val_predio_dolar:'',
    val_predio_soles : '',
    observaciones : ''
   }

   obras = {
     denominacion : '',
     antiguedad : '',
     val_unitario : '',
     cantidad : '',
     material : '',
     estado : '',
     estimado : ''
   }

  constructor(
    private spinner: NgxSpinnerService,
    private dataservice : informeAsociadosService,
  ) { }

  ngOnInit() {
    this.CargarDatosExpediente('VC',this.codigo_interno,this.sol_ing,this.codigo_preventivo)
    this.CargarDatosExpediente_1('CONST4',this.codigo_interno,this.sol_ing,this.codigo_preventivo)
    this.CargarDatosExpediente_2('CONST5',this.codigo_interno,this.sol_ing,this.codigo_preventivo)
  }

  CargarDatosExpediente(tipo,codint,sol,codprev)
  {
    this.spinner.show();
    this.dataservice.DetalleInformes(tipo,codint,sol,codprev,'0').subscribe((data:any) =>{ 
      this.spinner.hide();                 
      this.datospredio.moneda = data.data[0]["TIPO_MONEDA"]    
      this.datospredio.cambio = data.data[0]["TIPO_CAMBIO"]    
      this.datospredio.val_construcciones = data.data[0]["VALOR_CONSTRUCCIONES"]    
      this.datospredio.val_obras = data.data[0]["VALOR_OBRAS"]    
      this.datospredio.val_terreno = data.data[0]["VALOR_TERRENO"]    
      this.datospredio.val_predio_dolar = data.data[0]["VALOR_INMUEBLE"]    
      this.datospredio.val_predio_soles = data.data[0]["VALOR_SOLES"]    
    })
  }

  CargarDatosExpediente_1(tipo,codint,sol,codprev)
  {
    this.spinner.show();
    this.dataservice.DetalleInformes(tipo,codint,sol,codprev,'0').subscribe((data:any) =>{ 
      this.spinner.hide();     
      this.resultado  = data.data;  
      this.cantidadRegistros = data.data.length
      this.itemActual = 1            
      this.obras.denominacion = this.resultado[0].DENOMINACION
      this.obras.antiguedad = this.resultado[0].ANTIGUEDAD
      this.obras.val_unitario = this.resultado[0].VALOR_UNITARIO
      this.obras.cantidad = this.resultado[0].CANTIDAD
      this.obras.material = this.resultado[0].MATERIAL
      this.obras.estado = this.resultado[0].ESTADO
      this.obras.estimado = this.resultado[0].VALOR_ESTIMADO      
    })
  }

  CargarDatosExpediente_2(tipo,codint,sol,codprev)
  {
    this.spinner.show();
    this.dataservice.DetalleInformes(tipo,codint,sol,codprev,'0').subscribe((data:any) =>{ 
      this.spinner.hide();                 
      this.datospredio.observaciones = data.data[0]["OBSERVACIONES"]    
    })
  }


  
  moveItemListado(accion){    
    if(accion == 'S'){
      if(this.itemActual != this.cantidadRegistros){
        this.itemActual += 1
      }
    }else if(accion == 'A'){
      if(this.itemActual != 1){
        this.itemActual -= 1
      }
    }else if(accion == 'P'){
      this.itemActual = 1
    }else if(accion == 'U'){      
      this.itemActual = this.cantidadRegistros
    }
    
    this.obras.denominacion = this.resultado[this.itemActual -1].DENOMINACION
    this.obras.antiguedad = this.resultado[this.itemActual -1].ANTIGUEDAD
    this.obras.val_unitario = this.resultado[this.itemActual -1].VALOR_UNITARIO
    this.obras.cantidad = this.resultado[this.itemActual -1].CANTIDAD
    this.obras.material = this.resultado[this.itemActual -1].CODIGO_MATERIAL
    this.obras.estado = this.resultado[this.itemActual -1].CODIGO_ESTADO
    this.obras.estimado = this.resultado[this.itemActual -1].VALOR_ESTIMADO 
  }

}
