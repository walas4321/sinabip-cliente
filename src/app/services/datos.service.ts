import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DatosService {

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

  Zonas() {	
		return this.httpClient.get(this.API_URL + "busqueda/Zona/",this.httpOptions);
  }
  Terrenos() {	
		return this.httpClient.get(this.API_URL + "busqueda/Terreno/",this.httpOptions);
  }
  ObPoseedor(codigo) {	
		return this.httpClient.get(this.API_URL + "busqueda/ObPoseedor/"+codigo,this.httpOptions);
  }
  Zonificaciones() {	
		return this.httpClient.get(this.API_URL + "busqueda/Zonificacion/",this.httpOptions);
  }
  Ocupacion() {	
		return this.httpClient.get(this.API_URL + "busqueda/Ocupacion/",this.httpOptions);
  }
  Instituciones() {	
		return this.httpClient.get(this.API_URL + "busqueda/Instituciones/",this.httpOptions);
  }
  TipoDocumento() {	
		return this.httpClient.get(this.API_URL + "busqueda/TipoDocumento/",this.httpOptions);
  }
  Especifico(codgenerico) {	
		return this.httpClient.get(this.API_URL + "busqueda/Especifico/" + codgenerico,this.httpOptions);
  }

  ObtenerUltimo(codigo){
    return this.httpClient.get(this.API_URL + "UltimoLT/" + codigo,this.httpOptions);
  }
  EliminarLT(codigo,item){
    return this.httpClient.get(this.API_URL + "EliminarLT/" + codigo + "/" + item,this.httpOptions);
  }

}
