import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

 

@Injectable({
  providedIn: 'root'
})
export class RiesgoDesastreService {  

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

  listadoNivelRiesgos() {	
		return this.httpClient.get(this.API_URL + "busqueda/listadoNivelRiesgos/",this.httpOptions);
  }
  
}
