import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AportefotosService {

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


  // ListadoAporteFotoss() {	
	// 	return this.httpClient.get(this.API_URL + "busqueda/ListadoTipoDocumentos",this.httpOptions);
  // }

  ListadoAporteFotos(data) {
		return this.httpClient.post(this.API_URL + "aporteFotos/ListadoAporteFotos",data);
  }

  EliminarAporteFotos(data) {
		return this.httpClient.post(this.API_URL + "aporteFotos/EliminarAporteFotos",data);
  }
  
  
  PostGuardar_imagenes(data){
    return this.httpClient.post(this.API_URL + "aporteFotos/Guardar_imagenes",data);
  }

  cargaImagenesPrueba(data) {
		return this.httpClient.post(this.API_URL + "aporteFotos/cargaImagenesPrueba",data);
  }
  
  
}
