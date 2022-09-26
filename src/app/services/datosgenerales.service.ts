import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosgeneralesService {  
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

  CondicionRegistro() {	
		return this.httpClient.get(this.API_URL + "busqueda/CondicionRegistro/",this.httpOptions);
  }
  Calificacion() {	
		return this.httpClient.get(this.API_URL + "busqueda/Calificacion/",this.httpOptions);
  }
  Via() {	
		return this.httpClient.get(this.API_URL + "busqueda/Via/",this.httpOptions);
  }
  Detalle() {	
		return this.httpClient.get(this.API_URL + "busqueda/Detalle/",this.httpOptions);
  }
  Habilitacion() {	
		return this.httpClient.get(this.API_URL + "busqueda/Habilitacion/",this.httpOptions);
  }
  Competencia() {	
		return this.httpClient.get(this.API_URL + "busqueda/Competencia/",this.httpOptions);
  }


}
