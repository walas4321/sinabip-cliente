import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class informeAsociadosService {

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

  postListadoInformesAsociados(data) {	
		return this.httpClient.post(this.API_URL + "informeAsociados/ListadoInformesAsociados",data,this.httpOptions);
  }

  DetalleInformes(accion,cod_interno,sol_ingreso,cod_prevent,cod_const) {	
		return this.httpClient.get(this.API_URL + "informeAsociados/Detalle_Informes_Asociados/"+ accion + "/" + cod_interno + "/" + sol_ingreso + "/" + cod_prevent + "/" + cod_const,this.httpOptions);
  }  
  

}


