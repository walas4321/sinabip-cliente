import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

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

   ListadoNotificaciones(data) {	 
		return this.httpClient.post(this.API_URL + "notificacion/ListadoNotificaciones",data,this.httpOptions);
  }

  Archivar_Notificacion(data) {	 
		return this.httpClient.post(this.API_URL + "notificacion/Archivar_Notificacion",data,this.httpOptions);
  }

  
}
