import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  	providedIn: 'root'
})
export class MigracionService {
	
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

	getListadoPrediosWeb(data){
		return this.httpClient.post(this.API_URL + "ListadoPrediosWeb",data,this.httpOptions);
	}

	getBuscarPrediosWeb(data){
		return this.httpClient.post(this.API_URL + "BuscarPrediosWeb",data,this.httpOptions);
	}

	postBusquedaAvanzadaPredios(data){
		return this.httpClient.post(this.API_URL + "BusquedaAvanzadaPredios",data,this.httpOptions);
	}

	getListadoPrediosCS(data){
		return this.httpClient.post(this.API_URL + "ListadoPrediosCS",data,this.httpOptions);
	}

	getObtenerEntidades(data){
		return this.httpClient.post(this.API_URL + "ObtenerEntidades",data,this.httpOptions);
	}

	getBuscarPrediosCS(data){
		return this.httpClient.post(this.API_URL + "BuscarPrediosCS",data,this.httpOptions);
	}

	InsertarPrediosWeb(data){
		return this.httpClient.post(this.API_URL + "InsertarPrediosWeb",data,this.httpOptions);
	}

	/* Validacion en el Logueo de Usuario */
	postValidacionLogueoUsuario(data) {
		return this.httpClient.post(this.API_URL + "ValidacionLogueoUsuario", data,this.httpOptions)
	}

	ObtenerUbigeo(data) {
		return this.httpClient.post(this.API_URL + "ObtenerUbigeo", data,this.httpOptions)
	}

	ActualizarRUC(data) {
		return this.httpClient.post(this.API_URL + "ActualizarRUC", data,this.httpOptions)
	}

	/* METODOS SINABIP */
	DatosPrincipales(data) {
		return this.httpClient.post(this.API_URL + "DatosPrincipales", data,this.httpOptions)
	}

	fabricaLinderos(data) {
		return this.httpClient.post(this.API_URL + "fabricaLinderos", data,this.httpOptions)
	}

	Limitaciones(data) {
		return this.httpClient.post(this.API_URL + "Limitaciones", data,this.httpOptions)
	}
	
	Actos(data) {
		return this.httpClient.post(this.API_URL + "Actos", data,this.httpOptions)
	}

	
	DatosTecnicos(data) {
		return this.httpClient.post(this.API_URL + "DatosTecnicos", data,this.httpOptions)
	}

	Obras(data) {
		return this.httpClient.post(this.API_URL + "Obras", data,this.httpOptions)
	}

	Zona(data) {
		return this.httpClient.post(this.API_URL + "Zona", data,this.httpOptions)
	}

	Riesgo(data) {
		return this.httpClient.post(this.API_URL + "Riesgo", data,this.httpOptions)
	}

	Construcciones(data) {
		return this.httpClient.post(this.API_URL + "Construcciones", data,this.httpOptions)
	}
	
	ObtenerData(accion,codinterno) {	
		return this.httpClient.get(this.API_URL + "ObtenerData/" + accion + "/" + codinterno,this.httpOptions);
	}
	DetallesPiso(codinterno,codconst) {	
		return this.httpClient.get(this.API_URL + "DetallesPiso/" + codinterno + "/" + codconst,this.httpOptions);
	}
	Desvincular(codigo) {
		return this.httpClient.post(this.API_URL + "Desvincular/" + codigo,this.httpOptions)
	}
	AgregarExpediente(data) {
		return this.httpClient.post(this.API_URL + "AgregarExpediente", data,this.httpOptions)
	}
	CargarListadoExpedientesRelacionados(data) {
		return this.httpClient.post(this.API_URL + "CargarListadoExpedientesRelacionados", data,this.httpOptions)
	}
	QuitarExpediente(data) {
		return this.httpClient.post(this.API_URL + "QuitarExpediente", data,this.httpOptions)
	}
	
	AgregarCus(data) {
		return this.httpClient.post(this.API_URL + "AgregarCus", data,this.httpOptions)
	}
	CargarListadoCusRelacionados(data) {
		return this.httpClient.post(this.API_URL + "CargarListadoCusRelacionados", data,this.httpOptions)
	}
	QuitarCus(data) {
		return this.httpClient.post(this.API_URL + "QuitarCus", data,this.httpOptions)
	}
	postsubirArchivo(data) {
		return this.httpClient.post(this.API_URL + "subirArchivo", data,this.httpOptions)
	}
	getExportaPrediosExcel(ruc) {	
		return this.httpClient.get(this.API_URL + "ExportaPrediosExcel/" + ruc,this.httpOptions);
	}
	getValidarExistenciaRUC(ruc) {	
		return this.httpClient.get(this.API_URL + "ValidarExistenciaRUC/" + ruc,this.httpOptions);
	}
}

