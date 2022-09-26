import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { informeAsociadosService } from '../services/informeAsociados.service';


@Component({
  selector: 'app-i-datos-construcciones',
  templateUrl: './i-datos-construcciones.component.html',
  styleUrls: ['./i-datos-construcciones.component.css']
})
export class IDatosConstruccionesComponent implements OnInit {
  @Input('codigo_interno')  codigo_interno;
  @Input('codigo_preventivo')  codigo_preventivo;
  @Input('sol_ing')  sol_ing;
  @Input('accion')  accion; 

  datospredio = { 
    terreno: '',
    porcentaje : ''
   }

  listado =[]

  resultado = []
  cantidadRegistros: number = 0
  itemActual: number = 1
  dataRegistroActual ={
    PISO : '',
    MES : '',
    MURO : '',
    TECHO: '',
    ANHIO_CONSTRUCCION : '',
    VALOR_ESTIMADO : '',
    AREA_CONSTRUIDA : '',
    REVESTIMIENTO : '',
    BANHO : '',
    PUERTA_VENTANA : '',
    PISOS: '',
    CODIGO_MATERIAL: '',
    CODIGO_ESTADO : ''




  }

  constructor(
    private spinner: NgxSpinnerService,
    private dataservice : informeAsociadosService,
  ) { }

  ngOnInit() {
    this.CargarDatosExpediente('CONST1',this.codigo_interno,this.sol_ing,this.codigo_preventivo)
    this.CargarListado('CONST2',this.codigo_interno,this.sol_ing,this.codigo_preventivo)
  }

  CargarDatosExpediente(tipo,codint,sol,codprev)
  {
    this.spinner.show();
    this.dataservice.DetalleInformes(tipo,codint,sol,codprev,'0').subscribe((data:any) =>{ 
      this.spinner.hide();                 
      this.datospredio.terreno = data.data[0]["TIPO_TERRENO"]    
      this.datospredio.porcentaje = data.data[0]["PORCENTAJE_AVANCE"]    
    })
  }

  CargarListado(tipo,codint,sol,codprev)
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
              codigo :  data.data[i].CODIGO_CONSTRUCCION,
              nombre :   data.data[i].NOMBRE_CONSTRUCCION              
            }        
          );      
        }      
    })
  }

  cargar(codigo)
  {
    this.spinner.show();
    this.dataservice.DetalleInformes('CONST3',this.codigo_interno,this.sol_ing,3438,codigo).subscribe((data:any) =>{ 
      this.spinner.hide();                 
      console.log(data.data)
      this.resultado  = data.data;  
      this.cantidadRegistros = data.data.length
      this.itemActual = 1
      this.dataRegistroActual.VALOR_ESTIMADO = this.resultado[0].VALOR_ESTIMADO
      this.dataRegistroActual.PISOS = (this.resultado[0].PISOS==null)?"": this.resultado[0].PISOS
      this.dataRegistroActual.MES  = this.resultado[0].MES_CONSTRUCCION
      this.dataRegistroActual.MURO = this.resultado[0].MURO
      this.dataRegistroActual.TECHO = this.resultado[0].TECHO
      this.dataRegistroActual.ANHIO_CONSTRUCCION = this.resultado[0].ANHIO_CONSTRUCCION
      this.dataRegistroActual.VALOR_ESTIMADO = this.resultado[0].VALOR_ESTIMADO
      this.dataRegistroActual.AREA_CONSTRUIDA = this.resultado[0].AREA_CONSTRUIDA
      this.dataRegistroActual.REVESTIMIENTO = this.resultado[0].REVESTIMIENTO
      this.dataRegistroActual.BANHO = this.resultado[0].BANHO
      this.dataRegistroActual.PUERTA_VENTANA = this.resultado[0].PUERTA_VENTANA      
      this.dataRegistroActual.CODIGO_MATERIAL = this.resultado[0].CODIGO_MATERIAL
      this.dataRegistroActual.CODIGO_ESTADO = this.resultado[0].CODIGO_ESTADO
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
    this.dataRegistroActual.PISOS = (this.resultado[this.itemActual -1].PISOS==null)?"": this.resultado[0].PISOS
    this.dataRegistroActual.MES  = this.resultado[this.itemActual -1].MES_CONSTRUCCION
    this.dataRegistroActual.MURO = this.resultado[this.itemActual -1].MURO
    this.dataRegistroActual.TECHO = this.resultado[this.itemActual -1].TECHO
    this.dataRegistroActual.ANHIO_CONSTRUCCION = this.resultado[this.itemActual -1].ANHIO_CONSTRUCCION
    this.dataRegistroActual.VALOR_ESTIMADO = this.resultado[this.itemActual -1].VALOR_ESTIMADO
    this.dataRegistroActual.AREA_CONSTRUIDA = this.resultado[this.itemActual -1].AREA_CONSTRUIDA
    this.dataRegistroActual.REVESTIMIENTO = this.resultado[this.itemActual -1].REVESTIMIENTO
    this.dataRegistroActual.BANHO = this.resultado[this.itemActual -1].BANHO
    this.dataRegistroActual.PUERTA_VENTANA = this.resultado[this.itemActual -1].PUERTA_VENTANA
    this.dataRegistroActual.PISO = this.resultado[this.itemActual -1].PISO
    this.dataRegistroActual.CODIGO_MATERIAL = this.resultado[this.itemActual -1].CODIGO_MATERIAL
    this.dataRegistroActual.CODIGO_ESTADO = this.resultado[this.itemActual -1].CODIGO_ESTADO
  }

}
