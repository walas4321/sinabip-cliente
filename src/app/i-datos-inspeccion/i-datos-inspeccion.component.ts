import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { informeAsociadosService } from '../services/informeAsociados.service';

@Component({
  selector: 'app-i-datos-inspeccion',
  templateUrl: './i-datos-inspeccion.component.html',
  styleUrls: ['./i-datos-inspeccion.component.css']
})
export class IDatosInspeccionComponent implements OnInit {

  @Input('codigo_interno')  codigo_interno;
  @Input('codigo_preventivo')  codigo_preventivo;
  @Input('sol_ing')  sol_ing;
  @Input('accion')  accion;

  datospredio = { 
    generico : '',
    especifico : '',
    referencia : '',
    lote : '',
    disp_legal : '',
    num_legal : '',
    fecha_legal : '',
    institucion : '',
    area_legal : '',
    distrito : '',
    tipo_via : '',
    direccion : '',
    nro_inmueble : '',
    proximidad : '',
    distancia : '',
    esquina : '',
    sector : '',
    tipo_habi : '',
    habilitacion : '' 
   }

  constructor(
    private spinner: NgxSpinnerService,
    private dataservice : informeAsociadosService,
  ) { }

  ngOnInit() {
    this.CargarDatosExpediente('IT1',this.codigo_interno,this.sol_ing,this.codigo_preventivo)
    this.CargarDatosExpediente_2('IT2',this.codigo_interno,this.sol_ing,this.codigo_preventivo)
  }

  CargarDatosExpediente(tipo,codint,sol,codprev)
  {
    this.spinner.show();
    this.dataservice.DetalleInformes(tipo,codint,sol,codprev,'0').subscribe((data:any) =>{ 
      this.spinner.hide();                 
      this.datospredio.generico = data.data[0]["GENERICO"]    
      this.datospredio.especifico = data.data[0]["ESPECIFICO"]                   
      this.datospredio.disp_legal = data.data[0]["TIPO_DISLEGAL"]               
      this.datospredio.num_legal = data.data[0]["NRO_DISLEGAL"]             
      this.datospredio.fecha_legal = data.data[0]["FEC_DISLEGAL"]   
      this.datospredio.institucion = data.data[0]["NOMBRE_INSTITUCION"]   
      this.datospredio.area_legal = data.data[0]["AREA_LEGAL"]   

    })
  }
  CargarDatosExpediente_2(tipo,codint,sol,codprev)
  {
    this.spinner.show();
    this.dataservice.DetalleInformes(tipo,codint,sol,codprev,'0').subscribe((data:any) =>{ 
      this.spinner.hide();                 
      this.datospredio.referencia = data.data[0]["REFERENCIA"]    
      this.datospredio.lote = data.data[0]["LOTE"]           
      this.datospredio.tipo_via = data.data[0]["TIPO_VIA"]                 
      this.datospredio.direccion = data.data[0]["DIRECCION_INMUEBLE"]           
      this.datospredio.nro_inmueble = data.data[0]["NRO_INMUEBLE"]           
      this.datospredio.proximidad = data.data[0]["PROXIMIDAD_ESQUINA"]           
      this.datospredio.distancia = data.data[0]["DISTANCIA_METROS"]           
      this.datospredio.esquina = data.data[0]["ESQUINA_REFERENCIA"]           
      this.datospredio.sector = data.data[0]["DSC_SECTOR"]        
      this.datospredio.tipo_habi = data.data[0]["TIPO_HABILITACION"]           
      this.datospredio.habilitacion = data.data[0]["CORPAC"]           
      this.datospredio.distrito = data.data[0]["NMBUBIGEO"]           
      
    })
  }

}
