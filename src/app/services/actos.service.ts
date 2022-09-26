import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActosService {

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

  ActoAd() {	
		return this.httpClient.get(this.API_URL + "busqueda/ActoAd/",this.httpOptions);
  }
  DetalleActoAd(codacto) {	
		return this.httpClient.get(this.API_URL + "busqueda/DetalleActoAd/" + codacto,this.httpOptions);
  }
  Instituciones(data) {	
		return this.httpClient.post(this.API_URL + "busqueda/Instituciones",data,this.httpOptions);
  }
  Documentos() {	
		return this.httpClient.get(this.API_URL + "busqueda/Documentos/",this.httpOptions);
  }
  Generico() {	
		return this.httpClient.get(this.API_URL + "busqueda/Generico/",this.httpOptions);
  }
  Especifico(codgenerico) {	
		return this.httpClient.get(this.API_URL + "busqueda/Especifico/"+ codgenerico,this.httpOptions);
  }
  DerechoInscrito() {	
		return this.httpClient.get(this.API_URL + "busqueda/DerechoInscrito/",this.httpOptions);
  }
  Vigencia() {	
		return this.httpClient.get(this.API_URL + "busqueda/Vigencia/",this.httpOptions);
  }
  NombreInstitucion(codinstitucion) {	
		return this.httpClient.get(this.API_URL + "busqueda/NombreInstitucion/" + codinstitucion,this.httpOptions);
  }
  ObtenerItem(codinterno) {	
		return this.httpClient.get(this.API_URL + "busqueda/ObtenerItem/" + codinterno,this.httpOptions);
  }
  EliminarActosAd(codigo,item){
    return this.httpClient.get(this.API_URL + "EliminarActosAd/" + codigo + "/" + item,this.httpOptions);
  }
}
