import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdquisicionService {

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

  Otorgante(data) {	
		return this.httpClient.post(this.API_URL + "busqueda/Otorgante",data,this.httpOptions);
  }
  TipoDocumento() {	
		return this.httpClient.get(this.API_URL + "busqueda/TipoDocumento/",this.httpOptions);
  }
  Modalidad() {	
		return this.httpClient.get(this.API_URL + "busqueda/Modalidad/",this.httpOptions);
  }
  DispositivoLegal() {	
		return this.httpClient.get(this.API_URL + "busqueda/DispositivoLegal/",this.httpOptions);
  }
  Documentos() {	
		return this.httpClient.get(this.API_URL + "busqueda/Documentos/",this.httpOptions);
  }
  Aporte() {	
		return this.httpClient.get(this.API_URL + "busqueda/Aporte/",this.httpOptions);
  }
  Detalle(filtro) {	
		return this.httpClient.get(this.API_URL + "busqueda/DetalleApoEquiUrb/"+filtro, this.httpOptions);
  }
  Instituciones(data) {	
		return this.httpClient.post(this.API_URL + "busqueda/Instituciones",data,this.httpOptions);
  }
  Oficina(coddepa) {	
		return this.httpClient.get(this.API_URL + "busqueda/Oficina/"+coddepa, this.httpOptions);
  }
  Obtener_Inst(codigo) {	
		return this.httpClient.get(this.API_URL + "busqueda/Obtener_Inst/"+codigo, this.httpOptions);
  }

  Partida() {	
		return this.httpClient.get(this.API_URL + "busqueda/Partida/",this.httpOptions);
  }
  //modal
  Lindero() {	
		return this.httpClient.get(this.API_URL + "busqueda/Lindero/",this.httpOptions);
  }
  NombreLindero(codlindero) {	
		return this.httpClient.get(this.API_URL + "busqueda/NombreLindero/" + codlindero,this.httpOptions);
  }
  Acto() {	
		return this.httpClient.get(this.API_URL + "busqueda/Acto/",this.httpOptions);
  }
  DetalleActo(codacto) {	
		return this.httpClient.get(this.API_URL + "busqueda/DetalleActo/"+ codacto,this.httpOptions);
  }
  DetalleNombreActo(coddetalle) {	
		return this.httpClient.get(this.API_URL + "busqueda/DetalleNombreActo/"+ coddetalle,this.httpOptions);
  }
  NombreDetalleDatosFabrica(coddetalle) {	
		return this.httpClient.get(this.API_URL + "busqueda/NombreDetalleDatosFabrica/"+ coddetalle,this.httpOptions);
  }
  Moneda() {	
		return this.httpClient.get(this.API_URL + "busqueda/Moneda/",this.httpOptions);
  }
  ObtenerUltimoLL(codigo){
    return this.httpClient.get(this.API_URL + "UltimoLL/" + codigo);
  }
  ObtenerUltimoLF(codigo){
    return this.httpClient.get(this.API_URL + "UltimoLF/" + codigo,this.httpOptions);
  }
  EliminarLindero(codigo,item){
    return this.httpClient.get(this.API_URL + "EliminarLL/" + codigo + "/" + item,this.httpOptions);
  }
  EliminarFabrica(codigo,item){
    return this.httpClient.get(this.API_URL + "EliminarLF/" + codigo + "/" + item,this.httpOptions);
  }
  ObtenerUltimoIA(codigo){
    return this.httpClient.get(this.API_URL + "UltimoIA/" + codigo,this.httpOptions);
  }

  ActoIA() {	
		return this.httpClient.get(this.API_URL + "busqueda/ActoIA/",this.httpOptions);
  }

  TipoRegistro() {	
		return this.httpClient.get(this.API_URL + "busqueda/TipoRegistro/",this.httpOptions);
  }
  EliminarIndependizacion(codigo,item){
    return this.httpClient.get(this.API_URL + "EliminarIndependizacion/" + codigo + "/" + item,this.httpOptions);
  }
  validar_cus(nrocus){
    return this.httpClient.get(this.API_URL + "validar_cus/" + nrocus,this.httpOptions);
  }

}


