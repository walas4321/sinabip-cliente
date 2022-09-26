import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LegajoService {

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

  ListadoTipoDocumentos() {	
		return this.httpClient.get(this.API_URL + "busqueda/ListadoTipoDocumentos",this.httpOptions);
  }

  Registrar_Aporte_Legajo_temporal(data) {
		return this.httpClient.post(this.API_URL + "busqueda/Registrar_Aporte_Legajo_temporal",data);
  }
  
  AceptarArchivoAdjunto(data){
    return this.httpClient.post(this.API_URL + "busqueda/AceptarArchivoAdjunto",data);
  }

  EliminarArchivoAdjunto(data){
    return this.httpClient.post(this.API_URL + "busqueda/EliminarArchivoAdjunto",data);
  }

  ListadoAporteDocumentos(data){
    return this.httpClient.post(this.API_URL + "busqueda/ListadoAporteDocumentos",data);
  }

  EliminarDocumentoAporte(data){
    return this.httpClient.post(this.API_URL + "busqueda/EliminarDocumentoAporte",data);
  }

  

  PostNombArchInffActConc(id) {
		return this.httpClient.post(this.API_URL + "busqueda/NombArchInffActConc", id,this.httpOptions);
  }
  

  getIPAddress(){
    return this.httpClient.get("http://api.ipify.org/?format=json");
  }

  datosSituacionCatastral(data){ 
    return this.httpClient.post(this.API_URL + "busqueda/datosSituacionCatastral",data);
  }

  GuardarObservaciones(data){
    return this.httpClient.post(this.API_URL + "busqueda/GuardarObservaciones",data);
  }
  
}
