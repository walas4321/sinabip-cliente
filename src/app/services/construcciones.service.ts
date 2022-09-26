import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstruccionesService {

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

  Estadohabilitacion() {	
		return this.httpClient.get(this.API_URL + "busqueda/EstadoHabilitacion/",this.httpOptions);
  }
  Situacionfisica() {	
		return this.httpClient.get(this.API_URL + "busqueda/SituacionFisica/",this.httpOptions);
  }
  Materialconstruccion() {	
		return this.httpClient.get(this.API_URL + "busqueda/MaterialConstruccion/",this.httpOptions);
  }
  Combos() {	
		return this.httpClient.get(this.API_URL + "busqueda/Combos/",this.httpOptions);
  }
  ObtenerUltimoC(codigo){
    return this.httpClient.get(this.API_URL + "UltimoC/" + codigo,this.httpOptions);
  }
  EliminarConstruccion(codigo,item){
    return this.httpClient.get(this.API_URL + "EliminarC/" + codigo + "/" + item,this.httpOptions);
  }
  EliminarDetallePiso(codigo,item,codconst){
    return this.httpClient.get(this.API_URL + "EliminarDP/" + codigo + "/" + item + "/"+ codconst,this.httpOptions);
  }
  ObtenerUltimoitemDetallePiso(codigo, codigo_construccion){
    return this.httpClient.get(this.API_URL + "UltimoDetPiso/" + codigo + '/' + codigo_construccion, this.httpOptions);
  }
  


}
