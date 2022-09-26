import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
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

  LoguearUsuario(data) {
		return this.httpClient.post(this.API_URL + "login/LoguearUsuario", data);
  }

  MenuporUsuario(codigousuario,codigosistema,codperfil, codmodulo,token) {    
    var headers_object = new HttpHeaders().set("Authorization", token.token_type + " " + token.access_token);
    const httpOptions = {
        headers: headers_object
    };
    return this.httpClient.get(environment.security + "usuario/_Menu/" + codigousuario +"/"+ codigosistema + "/" + codperfil+ "/" + codmodulo,httpOptions);
  }
   
  ObtenerCodigoPersonal(dni,token) {	
    var headers_object = new HttpHeaders().set("Authorization", token.token_type + " " + token.access_token);
    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.get(environment.security + "personal/ValidarPersonal_SID/"+ dni ,httpOptions);
  }

  ObtenerRucEmpresa(codigopersona,token) 
  {	   
    var headers_object = new HttpHeaders().set("Authorization", token.token_type + " " + token.access_token);
    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.get(environment.security + "personal/ObtenerRucEmpresa/"+ codigopersona ,httpOptions);
  }

  ObtenerDNIPersonal(user,token) {	
    var headers_object = new HttpHeaders().set("Authorization", token.token_type + " " + token.access_token);
    const httpOptions = {
      headers: headers_object
    };
    return this.httpClient.get(environment.security + "usuario/ObtenerDni/"+ user ,httpOptions);
  }

  getIPAddress(){
    return this.httpClient.get("http://api.ipify.org/?format=json");
  }
  
  Usuario(token){
    var headers_object = new HttpHeaders().set("Authorization", token.token_type + " " + token.access_token);
    const httpOptions = {
      headers: headers_object
    };
		return this.httpClient.get(this.API_URL + "api/user",this.httpOptions);
   }

}
