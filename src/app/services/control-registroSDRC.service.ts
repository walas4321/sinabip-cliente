import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class controlregistroSDRCService {

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


  ObtenerUbigeo(data) {
		return this.httpClient.post(this.API_URL + "ObtenerUbigeo", data)
  }
  Busqueda_Cus_registrados_internos(data) {
		return this.httpClient.post(this.API_URL + "controlregistroSDRC/Busqueda_Cus_registrados_internos", data)
  }
  Busqueda_Cus_registrados_externos(data) {
		return this.httpClient.post(this.API_URL + "controlregistroSDRC/Busqueda_Cus_registrados_externos", data)
  }

  Aprobar_cus(data) {
		return this.httpClient.post(this.API_URL + "controlregistroSDRC/Aprobar_cus", data)
  }

  UpdateNotificacion(codinterno,cod_user,observacion,idControlCalidad) {
		return this.httpClient.get(this.API_URL + "controlregistroSDRC/UpdateNotificacion/"+ codinterno + "/"+ cod_user + "/"+ observacion + "/" + idControlCalidad)
  }
  
  obtenerTipoAccionDetalleUD(data) {
		return this.httpClient.post(this.API_URL + "controlregistroSDRC/obtenerTipoAccionDetalleUD", data)
  }

  Busqueda_Cus_registrados_notificados(data) {
		return this.httpClient.post(this.API_URL + "controlregistroSDRC/Busqueda_Cus_registrados_notificados", data)
  }

  Busqueda_Cus_registrados_aprobados(data) {
		return this.httpClient.post(this.API_URL + "controlregistroSDRC/Busqueda_Cus_registrados_aprobados", data)
  }

  verificador_errores_registro(codinterno, idControlCalidad) {
		return this.httpClient.get(this.API_URL + "controlregistroSDRC/verificador_errores_registro/"+ codinterno + "/" + idControlCalidad)
  }

  Verificar_cusCheck(codinterno, idControlCalidad, pestana) {
		return this.httpClient.get(this.API_URL + "controlregistroSDRC/Verificar_cusCheck/"+ codinterno + "/"+ idControlCalidad + "/" + pestana)
  }

  GuardarNotificacion(data) {
		return this.httpClient.post(this.API_URL + "controlregistroSDRC/GuardarNotificacion", data)
  }
  
}
