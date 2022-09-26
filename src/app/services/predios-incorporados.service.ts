import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class prediosIncorporadosService {

  API_URL = environment.api;
  httpOptions = {};
    constructor(private httpClient: HttpClient) {
    let token = JSON.parse(sessionStorage.getItem('token'));  
    if(token != null){
      var headers_object = new HttpHeaders().set("Authorization", token.token_type + " " + token.access_token);
      this.httpOptions = {
        headers: headers_object
      }
    } 
  }

  traerData(data) {	  
		return this.httpClient.post(this.API_URL + "prediosIncorporados/traerData", data,this.httpOptions);
  }       

  detalleporDepartamento(codTecnico, codLegal, mes, anio) {	
		return this.httpClient.get(this.API_URL + "prediosIncorporados/detalleporDepartamento/" + codTecnico +  '/' + codLegal  +  '/' + mes  +  '/' + anio ,this.httpOptions);
  }

  detalleporEtapas(codTecnico, codLegal, etapa, anio) {	
		return this.httpClient.get(this.API_URL + "prediosIncorporados/detalleporEtapas/" + codTecnico +  '/' + codLegal  +  '/' + etapa  +  '/' + anio ,this.httpOptions);
  }

  descargarXLS(codTecnico, codLegal, etapa, anio) {	
		return this.httpClient.get(this.API_URL + "prediosIncorporados/descargarXLS/" + codTecnico +  '/' + codLegal  +  '/' + etapa  +  '/' + anio ,this.httpOptions);
  }

  detallesinPoligonos(anio, accion) {	
		return this.httpClient.get(this.API_URL + "prediosIncorporados/detallesinPoligonos/" + anio + '/' + accion ,this.httpOptions);
  }

  

}
