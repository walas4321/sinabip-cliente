import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroSbnService {

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

  ListadoDocumentos(data) {	
		return this.httpClient.post(this.API_URL + "unidad/ListadoDocumentos" ,data,this.httpOptions);
  }
  TecnicoLegal(codusu) {	
		return this.httpClient.get(this.API_URL + "unidad/TecnicoLegal/"  + codusu,this.httpOptions);
  }
  GenerarUnidad(data) {	
		return this.httpClient.post(this.API_URL + "unidad/GenerarUnidad"  , data,this.httpOptions);
  }
  ListadoUnidad(data) {	
		return this.httpClient.post(this.API_URL + "unidad/ListadoUnidad" , data,this.httpOptions);
  }
  CargarVerificacion(cod_documental) {	
		return this.httpClient.get(this.API_URL + "unidad/CargarVerificacion/" + cod_documental,this.httpOptions);
  }
  Documentos(tipo) {	
		return this.httpClient.get(this.API_URL + "unidad/Documentos/" + tipo,this.httpOptions);
  }
  BuscarDocumento(data) {	
		return this.httpClient.post(this.API_URL + "unidad/BuscarDocumento" , data,this.httpOptions);
  }
  AgregarDocumento(data) {	
		return this.httpClient.post(this.API_URL + "unidad/AgregarDocumento" , data,this.httpOptions);
  }
  EliminarDocumento(data) {	
		return this.httpClient.post(this.API_URL + "unidad/EliminarDocumento" , data,this.httpOptions);
  }
  EliminarUnidad(codigo) {	
		return this.httpClient.get(this.API_URL + "unidad/EliminarUnidad/" + codigo,this.httpOptions);
  }
  
  BuscarUD(data) {	
		return this.httpClient.post(this.API_URL + "unidad/BuscarUD" ,data ,this.httpOptions); 
  }

  BusquedaCUSparaActualizar(data) {	 
		return this.httpClient.post(this.API_URL + "unidad/BusquedaCUSparaActualizar",data,this.httpOptions);
  }

  BuscarCodigoPredio(cod) {	 
		return this.httpClient.get(this.API_URL + "unidad/BuscarCodigoPredio/" + cod,this.httpOptions);
  }

  BuscarCUS(cus) {	 
		return this.httpClient.get(this.API_URL + "unidad/BuscarCUS/" + cus,this.httpOptions);
  }

  ValidarUD(cus) {	 
		return this.httpClient.get(this.API_URL + "unidad/ValidarUD/" + cus,this.httpOptions);
  }
 
  TerminarProceso(data) {	 
		return this.httpClient.post(this.API_URL + "unidad/TerminarProceso",data,this.httpOptions);
  }

  ActualizarTipoDetalleAccionUD(data){
    return this.httpClient.post(this.API_URL + "unidad/ActualizarTipoDetalleAccionUD",data,this.httpOptions);
  }

  ActualizaNotificacion(data) {	 
		return this.httpClient.post(this.API_URL + "unidad/ActualizaNotificacion",data,this.httpOptions);
  }

  ValidarEstadoUD(cod) {	 
		return this.httpClient.get(this.API_URL + "unidad/ValidarEstadoUD/" + cod,this.httpOptions);
  }

  verificacionExistenciaDocsTL(codud) {	 
		return this.httpClient.get(this.API_URL + "unidad/verificacionExistenciaDocsTL/" + codud,this.httpOptions);
  }

  EnviarSbn(data) {	 
		return this.httpClient.post(this.API_URL + "unidad/EnviarSbn",data,this.httpOptions);
  }

  traerProfesionalesUD(codud) {	 
		return this.httpClient.get(this.API_URL + "unidad/traerProfesionalesUD/" + codud,this.httpOptions);
  }

  actualizarProfesionales(data){
    return this.httpClient.post(this.API_URL + "unidad/actualizarProfesionales",data,this.httpOptions);
  }

  existeCUS(codcus) {	 
		return this.httpClient.get(this.API_URL + "unidad/existeCUS/" +codcus,this.httpOptions);
  }

  CargarPrediosExternos(data) {	
		return this.httpClient.post(this.API_URL + "unidad/CargarPrediosExternos", data,this.httpOptions);
  }

  openverDocumentos(codigoudocumental) {	 
		return this.httpClient.get(this.API_URL + "unidad/openverDocumentos/" + codigoudocumental,this.httpOptions);
  }

  openDocumentosxDefecto() {	 
		return this.httpClient.get(this.API_URL + "unidad/openDocumentosxDefecto",this.httpOptions);
  }

  ObtenerDatosDocumento(data) {	
		return this.httpClient.post(this.API_URL + "unidad/ObtenerDatosDocumento" , data,this.httpOptions);
  }

  CargarListadoAuditoriaPredios(data) {	
		return this.httpClient.post(this.API_URL + "unidad/CargarListadoAuditoriaPredios", data,this.httpOptions);
  }

  openDetalleAuditoria(data) {	
		return this.httpClient.post(this.API_URL + "unidad/openDetalleAuditoria" , data,this.httpOptions);
  }

  validarExistenciaRUC(nroRUC) {	
		return this.httpClient.get(this.API_URL + "unidad/validarExistenciaRUC/" + nroRUC, this.httpOptions);
  }

}


