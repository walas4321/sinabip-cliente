import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LimitacionesService {

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

  Restricciones() {	
		return this.httpClient.get(this.API_URL + "busqueda/Restricciones/",this.httpOptions);
  }
  DetalleRestricciones(codrestriccion) {	
		return this.httpClient.get(this.API_URL + "busqueda/DetalleRestricciones/" + codrestriccion,this.httpOptions);
  }
  Materias() {	
		return this.httpClient.get(this.API_URL + "busqueda/Materias/",this.httpOptions);
  }
  NombreMateria(codmateria) {	
		return this.httpClient.get(this.API_URL + "busqueda/GetNombreMaterias/" + codmateria,this.httpOptions);
  }
  EliminarProceso(codigo,item){
    return this.httpClient.get(this.API_URL + "EliminarProceso/" + codigo + "/" + item,this.httpOptions);
  }
  ObtenerUltimo(codigo){ 
    return this.httpClient.get(this.API_URL + "UltimoProceso/" + codigo,this.httpOptions);
  }
  ListadoProcesosJudiciales(codigo_interno) {	
		return this.httpClient.get(this.API_URL + "busqueda/ListadoProcesosJudiciales/" + codigo_interno,this.httpOptions);
  }

  antecedentes(codigo_interno, codigo_detalle) {	
		return this.httpClient.get(this.API_URL + "busqueda/antecedentes/" + codigo_interno + '/' + codigo_detalle,this.httpOptions);
  }

  datosJudiciales(codigo_detalle) {	
		return this.httpClient.get(this.API_URL + "busqueda/datosJudiciales/" + codigo_detalle,this.httpOptions);
  }

  sentencia(codigo_detalle) {	
		return this.httpClient.get(this.API_URL + "busqueda/sentencia/" + codigo_detalle,this.httpOptions);
  }
}
