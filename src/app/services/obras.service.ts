import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObrasService {

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

  Valorizacion() {	
		return this.httpClient.get(this.API_URL + "busqueda/Valorizacion/",this.httpOptions);
  }
  Materiales() {	
		return this.httpClient.get(this.API_URL + "busqueda/Materiales/",this.httpOptions);
  }
  Estado() {	
		return this.httpClient.get(this.API_URL + "busqueda/Estado/",this.httpOptions);
  }
  EliminarO(codigo,item){
    return this.httpClient.get(this.API_URL + "EliminarO/" + codigo + "/" + item,this.httpOptions);
  }
  ObtenerUltimo(codigo){
    return this.httpClient.get(this.API_URL + "UltimoO/" + codigo,this.httpOptions);
  }
  ObtenerSuma(codigo) {	 
		return this.httpClient.get(this.API_URL + "unidad/ObtenerSuma/"+codigo,this.httpOptions);
  }
}
