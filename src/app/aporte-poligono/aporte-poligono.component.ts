import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LegajoService } from '../services/legajo.service';

@Component({
  selector: 'app-aporte-poligono',
  templateUrl: './aporte-poligono.component.html',
  styleUrls: ['./aporte-poligono.component.css']
})
export class AportePoligonoComponent implements OnInit {

  /* ZONA DE DECLARACION DE VARIABLES */
  auxcargar = ''
  count = 0
  @Input('codigo_interno')  codinterno;
  @Input('cargar')  cargar
  @Output('callback') salida = new EventEmitter();
  
  rutaAportePoligono : string;
  filtro = {
    codigo_cus : '',
    codigo_interno: '0',
    cood_usuario: '',
  }

  ipAddress:string; 
  constructor(
    private dataservice : LegajoService,
  ) { 
    this.filtro.cood_usuario =  sessionStorage.getItem('codigopersonal')
  }

  ngOnInit() {      
  }

  ngOnChanges(){   
    this.filtro.codigo_interno= this.codinterno;
    this.auxcargar = this.cargar
    
    if (this.filtro.codigo_interno !="")
    {               
      localStorage.setItem("codigo_interno", this.filtro.codigo_interno) 
    }   
  }

 

  buscar_cus_aporte_poligono(){
    //alert(this.filtro.codigo_cus)
    sessionStorage.setItem("codigo_cusAG", this.filtro.codigo_cus)
    this.rutaAportePoligono = "https://catastro.sbn.gob.pe/sdrcgeo/web/app.php/application/sdrc_sw_apo_pred" + "?nrocus=" + sessionStorage.getItem("codigo_cusAG");
  }

}
