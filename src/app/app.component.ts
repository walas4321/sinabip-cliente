import { Component, ViewEncapsulation,OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { SeguridadService } from './services/seguridad.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'recepcion';
  user : any = null;  
  userid;
  codper;
  nickname;
  codigopersonal;
  rucempresa;
  entidad;
  nombre; 
  token;  
  respuesta = [];
  //codigosistema = 30;
  codigoarea;
  nombrearea;
  siglasarea;
  CodigoSID;
  ipAddress:string;

  constructor(private router : Router,private dataservice : LoginService, private security : SeguridadService)
	{                      
      security.getLogged.subscribe(data => {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.token = JSON.parse(sessionStorage.getItem('token'));                     
        //console.log(this.token)
      


        this.loadData();
      });        
     
      this.user = this.user = JSON.parse(sessionStorage.getItem('user'));       
      this.token = JSON.parse(sessionStorage.getItem('token'));                        
      this.loadData();
      
      
      if(window.location.pathname != "/validate"){
        // if(this.user == null){
        //   window.location.assign(environment.websecurity);
        // }
      }
     
  }
  
  ngOnInit() {            
     
  }
  
  obtenerIP()   
  {  
    this.dataservice.getIPAddress().subscribe((res:any)=>{  
      this.ipAddress=res.ip;           
    });  
  } 

  loadData(){       
    
    console.log(this.token)
    if(this.user != null){
      this.userid = this.user['PK_Usu_Codigo'];
      this.codper = this.user['FK_Per_Codigo'];
      this.dataservice.ObtenerDNIPersonal(this.userid,this.token).subscribe((data:any) =>{ 			        
          this.nickname = data.data[0].DNI                  
          this.cargar(this.userid);  
          this.cargarnombre(this.userid);      
          this.dataservice.ObtenerCodigoPersonal(this.nickname,this.token).subscribe((data:any) =>{ 			        
          this.codigopersonal = data.data[0].CODIGO_PERSONAL           
          sessionStorage.setItem("codigopersonal",this.codigopersonal );          
          });
      });    
      
      this.dataservice.ObtenerRucEmpresa(this.codper,this.token).subscribe((dato:any) =>{ 	  		                                      
        this.rucempresa = dato.data[0].RUC      
        this.entidad = dato.data[0].Entidad      
        sessionStorage.setItem("codigoruc",this.rucempresa);
        sessionStorage.setItem("entidad",this.entidad);
        });   
    }                  
  }
   

  logout()
  {    
    sessionStorage.removeItem('user')
    window.location.assign(environment.websecurity);
    //window.location.assign('http://test.sbn.gob.pe:8888/seguridad/login');
    //window.location.assign('http://localhost:4200/login');
  }

  cargar(codigousuario)
	{              		  
    console.log("fn carga",this.token)    
    this.dataservice.MenuporUsuario(codigousuario,this.token.codigosistema,this.token.codiperfil, this.token.codmodulo,this.token).subscribe((data:any) =>{ 			
      this.respuesta = data;    
      });         
  }

  cargarnombre(id)
  {
    this.security.ObtenerNombreUsuario(id,this.token).subscribe((data:any) =>{ 
      this.nickname = data[0]['Doc'];
      this.nombre = data[0]['Nom'] + ' ' + data[0]['ApPat'] + ' '+ data[0]['ApMat'];
      sessionStorage.setItem('nombre', JSON.stringify(this.nombre));             
    });
  }


}

window["$"] = $;
window["jQuery"] = $;

