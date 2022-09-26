import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  @Output() getLogged: EventEmitter<any> = new EventEmitter();

  API_URL = environment.security;
  httpOptions = {};
  constructor(private httpClient: HttpClient,private router:Router) {
    let token = JSON.parse(sessionStorage.getItem('token'));  
    if(token != null){
      var headers_object = new HttpHeaders().set("Authorization", token.token_type + " " + token.access_token);
      this.httpOptions = {
        headers: headers_object
      }
    } 
  }

  Usuario(token){   
    var headers_object = new HttpHeaders().set("Authorization", token.token_type + " " + token.access_token);
    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.get(this.API_URL + "api/user",httpOptions);
  }

  ObtenerNombreUsuario(codigousuario,token) {
    
    var headers_object = new HttpHeaders().set("Authorization", token.token_type + " " + token.access_token);
    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.get(this.API_URL + "usuario/ObtenerNombreUsuario/" + codigousuario ,httpOptions);
  }

}