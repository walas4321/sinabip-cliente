import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class estandarizacionService {

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

  buscarLiterales(data) {	
		return this.httpClient.post(this.API_URL + "estandarizacionRouter/buscarLiterales" ,data, this.httpOptions);
  }
  grabarEntidad(data) {	
		return this.httpClient.post(this.API_URL + "estandarizacionRouter/grabarEntidad", data, this.httpOptions);
  }

  VincularCusIndividual(data){
    return this.httpClient.post(this.API_URL + "estandarizacionRouter/VincularCusIndividual", data, this.httpOptions);
  }
  VincularCusMasivo(data) {	
		return this.httpClient.post(this.API_URL + "estandarizacionRouter/VincularCusMasivo", data, this.httpOptions);
  }

  VincularActoIndividual(data){
    return this.httpClient.post(this.API_URL + "estandarizacionRouter/VincularActoIndividual", data, this.httpOptions);
  }
  VincularActoMasivo(data) {	
		return this.httpClient.post(this.API_URL + "estandarizacionRouter/VincularActoMasivo", data, this.httpOptions);
  }

  VincularNiveles(data){
    return this.httpClient.post(this.API_URL + "estandarizacionRouter/VincularNiveles", data, this.httpOptions);
  }

  VincularPredios(data){
    return this.httpClient.post(this.API_URL + "estandarizacionRouter/VincularPredios", data, this.httpOptions);
  }

  cargarListaGobRegionales(data){
    return this.httpClient.post(this.API_URL + "estandarizacionRouter/cargarListaGobRegionales", data, this.httpOptions);
  }

  cambiar_gobRegional(data){
    return this.httpClient.post(this.API_URL + "estandarizacionRouter/cambiar_gobRegional", data, this.httpOptions);
  }

  cargarListaNivelGobierno(data){
    return this.httpClient.post(this.API_URL + "estandarizacionRouter/cargarListaNivelGobierno", data, this.httpOptions);
  }

  cargarListaNivelGeneral(data){
    return this.httpClient.post(this.API_URL + "estandarizacionRouter/cargarListaNivelGeneral", data, this.httpOptions);
  }

  cargarListaNivelSectorial(data){
    return this.httpClient.post(this.API_URL + "estandarizacionRouter/cargarListaNivelSectorial", data, this.httpOptions);
  }

  cargarListaOrganismo(data){
    return this.httpClient.post(this.API_URL + "estandarizacionRouter/cargarListaOrganismo", data, this.httpOptions);
  }
  
  obtenerDescripcionEntidad(data){
    return this.httpClient.post(this.API_URL + "estandarizacionRouter/obtenerDescripcionEntidad", data, this.httpOptions);
  }
  
}
