import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MigracionService } from '../services/migracion.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  departamentos : any = [];
  provincias : any = [];
  distritos : any = [];

  ubigeo = {
    coddepa : 0,
    codprov : 0,
    coddist : 0,
    tipo    : 0    
  }
  constructor(
    private MigracionService: MigracionService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.obtenerubigeo(0,0,0,1);
  }

  
  obtenerubigeo(coddepa,codprov,coddist,tipo)
  {
    this.ubigeo.coddepa = coddepa
    this.ubigeo.codprov = codprov
    this.ubigeo.coddist = coddist
    this.ubigeo.tipo  = tipo
    this.spinner.show();
    this.MigracionService.ObtenerUbigeo(this.ubigeo).subscribe((data : any) =>{
    this.spinner.hide();    
    if (tipo ==1)
      {
        this.departamentos = data.data;            
      }
    else if (tipo==2)
      {
        this.provincias = data.data 
      }
    else if (tipo==3)
      {
        this.distritos = data.data 
      }
    
    });
  }

}
