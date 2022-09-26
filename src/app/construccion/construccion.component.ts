import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ConstruccionesService } from '../services/construcciones.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MigracionService } from '../services/migracion.service';
import swal from 'sweetalert2';

import { ObrasService } from '../services/obras.service';
@Component({
  selector: 'app-construccion',
  templateUrl: './construccion.component.html',
  styleUrls: ['./construccion.component.css']
})
export class ConstruccionComponent implements OnInit {
  
  EstadoHabilitacion = [];
  SituacionFisica = [];
  MaterialesConstruccion= [];
  materiales =[]
  estado = []
  combo = []
  flagvalidar : boolean = false;
  
  construccion ={
    codigo_interno : '', 
    habilitacion : '',
    situacion : '0',
    nropiso : 0,
    porcentaje : 0,
    material : '0',
    codusuario : '',
    construcciones : [],
    detalle : []
  }
  
  aux ={
    objarray :[]
  }

  area ={    
    suma : 0
  }

  aux_item = 0
  flag_aux = 0

  construcciones = {    
    item: 0,
    codigo: 0,
    nombreconst : '',
    area : 0  
  }  


  detalle ={
    item : 0,
    codigoconstruccion : 0,
    itemx: 0,
    piso :0,
    mes : '',
    anio : '',
    muro : '',
    techo :'',
    elect : '',    
    valorunitario : 0,
    area : 0,
    valorestimado : 0,
    codmaterial :"0",
    codestado : "0",
    pisos : '',
    puerta : '',
    revest : '',
    banio : ''
  }

  tipoc = 0
  auxc = 0
  ultimoi = 0
  aux_ultimo = 0

  tipop = 0
  auxp = 0
  ultimop = 0
  coditem = 0
  auxcargar = ''
  count = 0
  contador = 0
  active : boolean
  modaladdConstrucciones;
  modalddDetallesConst;
  cod_construccion_actual = 0;
  additemCodPiso = 0;
  
  @Input('bloquear')  bloquear;
  @Input('codigo_interno')  codinterno;
  @Input('cargar')  cargar
  @Output('callback') salida = new EventEmitter();
  @Input('grabado') grabado;

  constructor(    
    private modalService: NgbModal,
    private dataservice : ConstruccionesService,
    private spinner: NgxSpinnerService,
    private service : ObrasService,
    private MigracionService: MigracionService,   
  ) { 
    this.construccion.codusuario =  sessionStorage.getItem('codigopersonal')
  }

  ngOnChanges(){       
    this.bloquear=='1'? this.active=true: this.active = false
    this.construccion.codigo_interno= this.codinterno;
    this.auxcargar = this.cargar
    this.additemCodPiso = 0
    

    if (this.auxcargar=='5')
    {
      this.count = this.count + 1
      if (this.count==1) 
      { 
        this.cargarcombos()  
        this.setcombos();                   
      } 

      if (this.construccion.codigo_interno !=""){
        this.ObtenerUltimoC(this.construccion.codigo_interno)
      }
      
      if (this.construccion.codigo_interno !="" &&  this.count==1)
      {                   
        this.CargarConstruccion(this.construccion.codigo_interno)
        if (this.construccion.construcciones.length==0)
          {
            this.CargarPiso(this.construccion.codigo_interno)
            this.CargarTodosDetallesPisos(this.construccion.codigo_interno)
          }
      }

      if (this.construccion.codigo_interno !=""  && this.grabado == "1")
      {                   
        
        this.CargarConstruccion(this.construccion.codigo_interno)
        if (this.construccion.construcciones.length==0)
          {
            this.CargarPiso(this.construccion.codigo_interno)
            this.CargarTodosDetallesPisos(this.construccion.codigo_interno)
          }
      }
    }
  }

  ngOnInit() {        
    this.validarconstruccion(this.construccion) 
  }  

  validarconstruccion(data){
    this.salida.emit(data);        
   } 

  modal(content,aux)
  {
    this.tipoc = aux     
    let opciones : NgbModalOptions = {
      size : "lg",
      backdrop : "static"
    };
    this.modaladdConstrucciones = this.modalService.open(content,opciones);
  }

  modal1(content1,aux)
  {
    this.tipoc = aux 
    this.limpiarconstruccion();
    let opciones : NgbModalOptions = {
      size : "lg",
      backdrop : "static"
    };
    this.modaladdConstrucciones = this.modalService.open(content1,opciones);
    
  }

  modal2(content1,codigo,aux,tipo,item)
  {
    //this.spinner.show()
    //this.dataservice.ObtenerUltimoitemDetallePiso(this.construccion.codigo_interno , codigo).subscribe((data:any) =>{                      
      //this.spinner.hide();      
      //this.aux_ultimo = data.data[0].ULTIMO  

      if (this.cod_construccion_actual != codigo){
        this.additemCodPiso = 0;
      }
      this.cod_construccion_actual = codigo;

      this.coditem = item 
      this.tipop = aux          
      if(codigo!="")
      {
        this.detalle.codigoconstruccion = codigo     
      }    
      if(tipo==0)
      {
        this.limpiardetalle()
      }
      let opciones : NgbModalOptions = {
        size : "lg",
        backdrop : "static"
      };        
      this.modalddDetallesConst = this.modalService.open(content1,opciones);    
      this.CargarDetalles(this.coditem) 

    //})
      
  }

  

  CargarDetMemoria()
  {            
    
    if (this.construccion.detalle.length >0)
    {   
      this.aux.objarray =[]   
      this.area.suma = 0     
  
      for (let i =0; i<= this.construccion.detalle.length - 1; i++)
       {           
        if (this.construccion.detalle[i].codigoconstruccion == this.detalle.codigoconstruccion)
         {                        
          this.aux.objarray.push(this.construccion.detalle[i])
          this.area.suma = Number(this.area.suma) + Number(this.construccion.detalle[i].area)      
          let value = this.construccion.construcciones.findIndex(element =>(element.codigo === this.detalle.codigoconstruccion));                                            
          let aux = value
          this.construccion.construcciones[aux].area = this.area.suma         
         }
       }           
    }        
  }

  validarconst()
  {    
    if (this.construcciones.nombreconst=="")
      {
         this.error("Ingrese Nombre")
         this.flagvalidar = true 
         return this.flagvalidar
      }
    /*else if(this.construcciones.area==0)
     {
      this.error("Ingresa Área")
      this.flagvalidar = true 
      return this.flagvalidar
     }*/  
  }

  validarfecha(fecha)
  {    
    if (fecha.length<4)
    {
      this.error("Fecha debe ser de 4 digitos")
      this.detalle.anio = ''      
    }
    if (fecha <= 1900 || fecha >= 2030)
      {
        this.error("Fecha fuera de rango [1901 - 2030]")
        this.detalle.anio = ''
      }
  }

  onArea(event)
  {
    if (event.target.value!='.')
    {this.detalle.valorestimado =  Number(event.target.value) * this.detalle.valorunitario}
  }

  onValor(event)
  {
    if (event.target.value!='.')
      {this.detalle.valorestimado = Number(event.target.value) * this.detalle.area}
  }
  validardetalle()
  {    
    if (this.detalle.piso==0)
      {
         this.error("Ingrese Piso")
         this.flagvalidar = true 
         return this.flagvalidar
      }
    // else if(this.detalle.mes=="")
    //  {
    //   this.error("Seleccione Mes")
    //   this.flagvalidar = true 
    //   return this.flagvalidar
    //  }  
    // else if(this.detalle.anio=="")
    //  {
    //   this.error("Ingresa Año")
    //   this.flagvalidar = true 
    //   return this.flagvalidar
    //  }  
     /*
    else if(this.detalle.muro=="0")
     {
      this.error("Seleccione Muro")
      this.flagvalidar = true 
      return this.flagvalidar
     }   
    else if(this.detalle.techo=="0")
     {
      this.error("Seleccione Techo")
      this.flagvalidar = true 
      return this.flagvalidar
     }   
    else if(this.detalle.elect=="0")
     {
      this.error("Seleccione Eléctricida")
      this.flagvalidar = true 
      return this.flagvalidar
     }   
    else if(this.detalle.valorunitario==0)
     {
      this.error("Ingrese Valor Unitario")
      this.flagvalidar = true 
      return this.flagvalidar
     }   
    else if(this.detalle.area==0)
     {
      this.error("Ingrese Valor Área")
      this.flagvalidar = true 
      return this.flagvalidar
     }    
     else if(this.detalle.valorestimado==0)
     {
      this.error("Ingrese Valor Estimado")
      this.flagvalidar = true 
      return this.flagvalidar
     }
     */
    //  else if(this.detalle.codmaterial=="0")
    //  {
    //   this.error("Seleccione Material")
    //   this.flagvalidar = true 
    //   return this.flagvalidar
    //  } 
    //  else if(this.detalle.codestado=="0")
    //  {
    //   this.error("Seleccione Estado")
    //   this.flagvalidar = true 
    //   return this.flagvalidar
    //  }  
     /* 
     else if(this.detalle.pisos=="0")
     {
      this.error("Seleccione Piso")
      this.flagvalidar = true 
      return this.flagvalidar
     }   
     else if(this.detalle.puerta=="0")
     {
      this.error("Seleccione Puerta/Ventana")
      this.flagvalidar = true 
      return this.flagvalidar
     }  
     else if(this.detalle.revest=="0")
     {
      this.error("Seleccione Revestimiento")
      this.flagvalidar = true 
      return this.flagvalidar
     }  
     else if(this.detalle.banio=="0")
     {
      this.error("Seleccione Baño")
      this.flagvalidar = true 
      return this.flagvalidar
     }  
     */


  }

  error(titulo)
  {
    swal({
      type: 'error',
      title: titulo,            
      confirmButtonText: 'Listo'
    });
  }

  quitarconstruccion(index,item)
  {                   
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success ml-2',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
     })  
    swalWithBootstrapButtons({
      title: '¿Estás seguro eliminar la construccion y sus detalles?',            
      type: 'warning',
      showCancelButton: true,    
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      reverseButtons: true
      }).then((result) => {
        if (result.value) {      
          this.spinner.show();                   
          this.dataservice.EliminarConstruccion(this.construccion.codigo_interno,item).subscribe((data:any) =>{                       
            this.spinner.hide();   
            if (data.data[0].RESULTADO=="ERROR")
            {
              this.error("No se pudo eliminar")
            }
            else 
            {
              swal({
                type: 'success',
                title: 'El registro fue eliminado',                 
                confirmButtonText: 'Listo'                  
                });
              this.construccion.construcciones.splice(index ,1)        
              this.construccion.detalle = this.construccion.detalle.filter(element =>(element.codigoconstruccion !== item))
              this.aux.objarray = this.aux.objarray.filter(element =>(element.codigoconstruccion !== item))
            }                     
          });                    
        }
      });
  }
  agregarconstruccion()
  {       
    let aux = this.validarconst()        
    if (aux===undefined)        
    {       
       this.ultimoi++                
        //let ultimo = this.construccion.construcciones.length + 1
        this.construccion.construcciones.push(
          { 
            item : 1,
            codigo : this.ultimoi,
            nombreconst : this.construcciones.nombreconst,
            area : this.construcciones.area         
          } 
        )
     
        swal({
          type: 'success',
          title: 'Se agregó el registro',                 
          confirmButtonText: 'Listo'                  
          });          
        this.limpiarconstruccion()                    
        this.validarconstruccion(this.construccion)     
        this.modaladdConstrucciones.close()                 
    }
  }
 
  editarconstruccion()
  {                
    let aux = this.validarconst()        
    if (aux===undefined)        
    {       
      let obj = {
        item: 0, 
        codigo: 0,
        nombreconst : '',
        area : 0  
      }
      obj.item =  this.construcciones.item
      obj.codigo =  this.construcciones.codigo
      obj.nombreconst =  this.construcciones.nombreconst
      obj.area =  this.construcciones.area    
      this.construccion.construcciones[this.auxc] = obj     
      swal({
        type: 'success',
        title: 'Se actualizó el registro',                 
        confirmButtonText: 'Listo'                  
        });
      this.validarconstruccion(this.construccion)  
      this.modaladdConstrucciones.close()      
    }
  }

  modificarconstruccion(i,content)
  {        
    this.modal(content,1);      
    this.construcciones.item = this.construccion.construcciones[i].item;
    this.construcciones.codigo = this.construccion.construcciones[i].codigo;
    this.construcciones.nombreconst = this.construccion.construcciones[i].nombreconst;
    this.construcciones.area = this.construccion.construcciones[i].area;
    this.auxc = i     
  }

  limpiarconstruccion(){
    this.construcciones.nombreconst = ''    
  }

  validardecimal(numero,tipo)
  {    
    if (numero % 1 == 0) {      
      let aux_1 =numero.substr(0,1)    
      let aux_2 =numero.substr(0,2)
      if (aux_1 =='0')
      {
        this.error("Área no válida,no permite 0 a la izquierda")
         if (tipo==1)
         {this.construccion.nropiso = 0}        
         if (tipo==3)
         {this.detalle.valorunitario = 0}
         if (tipo==4)
         {this.detalle.area = 0}
         if (tipo==5)
         {this.detalle.piso = 0}
         if (tipo==6)
         {this.construccion.porcentaje = 0}
      }      
      if (aux_2=='.0')
      {        
        this.error("Área no válida,formato incorrecto solo permite X.X")       
        if (tipo==1)
        {this.construccion.nropiso = 0}        
        if (tipo==3)
        {this.detalle.valorunitario = 0}
        if (tipo==4)
        {this.detalle.area = 0}
        if (tipo==5)
        {this.detalle.piso = 0} 
        if (tipo==6)
        {this.construccion.porcentaje = 0}
        
      }
   } else {          
      let aux_3 =numero.substr(0,1)
      let aux_4 =numero.substr(0,2)  
      let aux_5 =numero.substr(1,1)                     
      if (aux_3=='.')
      {        
        this.error("Área no válida,formato incorrecto solo permite X.X")
        if (tipo==1)
        {this.construccion.nropiso = 0}        
        if (tipo==3)
        {this.detalle.valorunitario = 0}
        if (tipo==4)
        {this.detalle.area = 0}
        if (tipo==5)
        {this.detalle.piso = 0} 
        if (tipo==6)
        {this.construccion.porcentaje = 0}  
      }           
      if (aux_4=='00' )
      {        
        this.error("Área no válida,solo permite un 0 a la izquierda del .")
        if (tipo==1)
        {this.construccion.nropiso = 0}        
        if (tipo==3)
        {this.detalle.valorunitario = 0}
        if (tipo==4)
        {this.detalle.area = 0}
        if (tipo==5)
        {this.detalle.piso = 0}
        if (tipo==6)
        {this.construccion.porcentaje = 0}
      }
      if (aux_3=='0' && aux_5>'0')
      {        
        this.error("Área no válida,no permite 0 a la izquierda")
        if (tipo==1)
        {this.construccion.nropiso = 0}     
        if (tipo==3)
        {this.detalle.valorunitario = 0}
        if (tipo==4)
        {this.detalle.area = 0}
        if (tipo==5)
        {this.detalle.piso = 0} 
        if (tipo==6)
        {this.construccion.porcentaje = 0}
      }
   }
  }

  validar_cantidad_porcentaje(){
    if(this.construccion.porcentaje <= 0 || this.construccion.porcentaje > 100){
      this.error("Porcentaje de avance debe estar comprendido entre [1-100]")
      this.construccion.porcentaje = 0
    }
  }
  
  quitardetallepiso(i,index,item,area)
  {      
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success ml-2',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
     })  
    swalWithBootstrapButtons({
      title: '¿Estás seguro eliminar el detalle?',            
      type: 'warning',
      showCancelButton: true,    
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      reverseButtons: true
      }).then((result) => {
        if (result.value) {      
          this.spinner.show();                   
          this.dataservice.EliminarDetallePiso(this.construccion.codigo_interno,index,item).subscribe((data:any) =>{                       
            this.spinner.hide();   
            if (data.data[0].RESULTADO=="ERROR")
            {
              this.error("No se pudo eliminar")
            }
            else 
            {
              swal({
                type: 'success',
                title: 'El registro fue eliminado',                 
                confirmButtonText: 'Listo'                  
                });

              this.aux.objarray.splice(i ,1)                         
              let value = this.construccion.detalle.findIndex(element =>(element.itemx === index && element.codigoconstruccion === item));                                            
              let aux = value
              this.construccion.detalle.splice(aux,1)                           
              let val = this.construccion.construcciones.findIndex(element =>(element.codigo === item ));
              this.construccion.construcciones[val].area =  this.construccion.construcciones[val].area - area     
            }
                      
          });  
                  
        }
      });
  }

  agregardetalle()
  {       

    for (let i =0; i<= this.construccion.detalle.length -1; i++)
    {            
      if (this.construccion.detalle[i].codigoconstruccion == this.detalle.codigoconstruccion)
      {                                    
         this.construccion.detalle[i].itemx
      }
    }    


    let aux = this.validardetalle()          
    if (aux===undefined)        
    {       
      //this.aux_ultimo++
      this.additemCodPiso++
      this.construccion.detalle.push(
      { 
        item : 1,           
        codigoconstruccion :this.detalle.codigoconstruccion,
        itemx: Number(this.aux_ultimo) + Number(this.additemCodPiso),
        piso : this.detalle.piso,
        mes : this.detalle.mes,
        anio : this.detalle.anio,
        //codmaterial : (this.detalle.codmaterial == '0')?null:this.detalle.codmaterial,
        //codestado :  (this.detalle.codestado == '0')?null:this.detalle.codestado,
        codmaterial : this.detalle.codmaterial,
        codestado : this.detalle.codestado,
        muro : this.detalle.muro,
        techo : this.detalle.techo,
        elect : this.detalle.elect,
        pisos : this.detalle.pisos,   
        puerta : this.detalle.puerta,
        revest : this.detalle.revest,
        banio : this.detalle.banio,                   
        valorunitario : this.detalle.valorunitario,
        area : this.detalle.area,
        valorestimado : this.detalle.valorestimado
      } 
    )        
    console.log(this.construccion.detalle)
    swal({
      type: 'success',
      title: 'Se agregó el registro',                 
      confirmButtonText: 'Listo'                  
      });  
              
    this.limpiardetalle()
    this.validarconstruccion(this.construccion)             
    this.CargarDetMemoria()  
    this.modalddDetallesConst.close()  

        
            
        
    }
  }
  

  modificardetalle(index, codigoconstruc, content1)
  {                         
    console.log(index)
    console.log(this.construccion.detalle)
    this.limpiardetalle()     
    let value = this.construccion.detalle.findIndex(element =>(element.itemx === index && element.codigoconstruccion === codigoconstruc));
    let i = value
    let val = this.aux.objarray.findIndex(element =>(element.itemx === index && element.codigoconstruccion === codigoconstruc));
    this.flag_aux = val
    this.detalle.item = this.construccion.detalle[i].item;
    this.detalle.codigoconstruccion = this.construccion.detalle[i].codigoconstruccion;
    this.detalle.itemx = this.construccion.detalle[i].itemx;
    this.detalle.piso = this.construccion.detalle[i].piso;
    this.detalle.mes = this.construccion.detalle[i].mes;
    this.detalle.anio = this.construccion.detalle[i].anio;
    this.detalle.codmaterial= this.construccion.detalle[i].codmaterial;
    this.detalle.codestado= this.construccion.detalle[i].codestado;
    this.detalle.muro = this.construccion.detalle[i].muro;
    this.detalle.techo = this.construccion.detalle[i].techo;
    this.detalle.elect = this.construccion.detalle[i].elect;
    this.detalle.pisos= this.construccion.detalle[i].pisos;
    this.detalle.puerta = this.construccion.detalle[i].puerta;
    this.detalle.revest = this.construccion.detalle[i].revest;
    this.detalle.banio = this.construccion.detalle[i].banio;
    this.detalle.valorunitario = this.construccion.detalle[i].valorunitario;
    this.detalle.area = this.construccion.detalle[i].area;
    this.detalle.valorestimado = this.construccion.detalle[i].valorestimado;
    this.auxp = i    
    this.aux_item = index
    this.modal2(content1,'',1,1,this.detalle.codigoconstruccion)
  }

  editardetalle(ind)
  {                
    //let aux = this.validardetalle()        
    let aux = undefined
    if (aux===undefined)        
    {    
      let obj = {
        item : 0,
        codigoconstruccion : 0,
        itemx: 0,
        piso :0,
        mes : '',
        anio : '',
        muro : '',
        techo :'',
        elect : '',
        pisos : '',
        puerta : '',
        revest : '',
        banio : '',
        valorunitario : 0,
        area : 0,
        valorestimado : 0.0,
        codmaterial :"0",
        codestado : "0"
      }
      obj.item  =  this.detalle.item
      obj.codigoconstruccion = this.detalle.codigoconstruccion
      obj.itemx = ind
      obj.piso = this.detalle.piso
      obj.mes = this.detalle.mes
      obj.anio = this.detalle.anio
      obj.muro = this.detalle.muro
      obj.techo = this.detalle.techo
      obj.elect = this.detalle.elect
      obj.pisos = this.detalle.pisos
      obj.puerta = this.detalle.puerta
      obj.revest = this.detalle.revest
      obj.banio = this.detalle.banio
      obj.valorunitario = this.detalle.valorunitario
      obj.area = this.detalle.area
      obj.valorestimado = this.detalle.valorestimado
      obj.codmaterial = this.detalle.codmaterial
      obj.codestado = this.detalle.codestado
            
      this.construccion.detalle[this.auxp] = obj     
      this.aux.objarray[this.flag_aux] = obj  

      swal({
        type: 'success',
        title: 'Se actualizó el registro',                 
        confirmButtonText: 'Listo'                  
        });

        this.area.suma = 0     
        for (let i =0; i<= this.construccion.detalle.length; i++)
         {            
          if (this.construccion.detalle[i].codigoconstruccion == this.detalle.codigoconstruccion)
           {                                    
            this.area.suma = Number(this.area.suma) + Number(this.construccion.detalle[i].area)             
            let value = this.construccion.construcciones.findIndex(element =>(element.codigo === this.detalle.codigoconstruccion));                                            
            let aux = value
            this.construccion.construcciones[aux].area = this.area.suma
           }
         }    
        this.validarconstruccion(this.construccion) 
        this.modalddDetallesConst.close()          
    }
  }

  limpiardetalle(){
    
    this.detalle.piso = 0
    this.detalle.mes = ''
    this.detalle.anio = ''
    this.detalle.valorunitario = 0
    this.detalle.area = 0,
    this.detalle.valorestimado = 0
    this.detalle.muro = "0"
    this.detalle.techo = "0"
    this.detalle.elect = "0"
    this.detalle.pisos = "0"
    this.detalle.puerta = "0"
    this.detalle.revest = "0"
    this.detalle.banio ="0"
    this.detalle.codmaterial = "0"
    this.detalle.codestado = "0"
  }

  cargarcombos(){
    this.spinner.show();
    this.dataservice.Estadohabilitacion().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.EstadoHabilitacion = data.data;                                             
    }); 

    this.spinner.show();
    this.dataservice.Situacionfisica().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.SituacionFisica = data.data;                                             
    }); 

    this.spinner.show();
    this.dataservice.Materialconstruccion().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.MaterialesConstruccion = data.data;                                             
    });
    
    this.spinner.show();
    this.dataservice.Combos().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.combo = data.data;                                             
    });
    

    this.spinner.show();
    this.service.Materiales().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.materiales = data.data;                                             
    }); 

    this.spinner.show();
    this.service.Estado().subscribe((data:any) =>{ 
      this.spinner.hide();           
      this.estado = data.data;                                             
    }); 
  }

  CargarConstruccion(codigo)
  {
    this.spinner.show();
    this.MigracionService.ObtenerData('C',codigo).subscribe((data:any) =>{    
      this.spinner.hide();        
      this.construccion.habilitacion = (data.data[0].EST_HABILITACION_TERRENO=="0")?"0":data.data[0].EST_HABILITACION_TERRENO
      this.construccion.situacion    = (data.data[0].CND_FISICA_TERRENO=="0")?"0":data.data[0].CND_FISICA_TERRENO
      this.construccion.nropiso      = data.data[0].NRO_PISOS_CONSTRUCCION
      this.construccion.porcentaje   = data.data[0].PORCENTAJE_AVANCE
      this.construccion.material     =  (data.data[0].MATERIAL_PREDOMINANTE=="0")?"0":data.data[0].MATERIAL_PREDOMINANTE
    }); 
  }
   
  CargarPiso(codigo){
    this.spinner.show();
    //this.construccion.construcciones =[]                                   
    this.MigracionService.ObtenerData('DC',codigo).subscribe((data:any) =>{     
     for (let i= 0; i < data.data.length; i++)      
        { 
          
          this.construccion.construcciones.push(
            {                                        
              item : data.data[i].ITEM_INSPECCION,
              codigo : data.data[i].CODIGO_CONSTRUCCION,
              nombreconst : data.data[i].NOMBRE_CONSTRUCCION,
              area : data.data[i].AREA_TOTAL_CONSTRUIDA
            }        
          );
        }
     this.spinner.hide(); 
    }); 
  }

  CargarDetalles(codigo){           
    this.detalle.codigoconstruccion = codigo  
    this.coditem = codigo   
    let value = this.construccion.detalle.find(element =>(element.codigoconstruccion === codigo));                                            
    if (value===undefined)
    {       
      this.spinner.show();       
      this.MigracionService.DetallesPiso(this.construccion.codigo_interno,codigo).subscribe((data:any) =>{                                   
      this.spinner.hide();           
      for (let i= 0; i < data.data.length; i++)      
          {                                   
            this.construccion.detalle.push(
              { 
               item : data.data[i].ITEM_INSPECCION,           
               codigoconstruccion : data.data[i].CODIGO_CONSTRUCCION,
               itemx: data.data[i].CODIGO_PISO ,
               piso :  data.data[i].NRO_PISO,
               mes : data.data[i].MES_CONSTRUCCION,
               anio : data.data[i].ANHIO_CONSTRUCCION,
               codmaterial : data.data[i].CODIGO_MATERIAL,
               codestado :  data.data[i].CODIGO_ESTADO,
               muro : data.data[i].MURO,
               techo : data.data[i].TECHO,
               elect : data.data[i].INSTALACIONES,
               pisos :data.data[i].PISOS,   
               puerta : data.data[i].PUERTA_VENTANA,
               revest : data.data[i].REVESTIMIENTO,
               banio : data.data[i].BANHO,                   
               valorunitario : data.data[i].VUE,
               area :data.data[i].AREA_CONSTRUIDA,
               valorestimado : data.data[i].VALOR_ESTIMADO
              });            
          }
          this.CargarDetMemoria()      
      });       
    }
    else
    {      
      this.CargarDetMemoria()
    }      
  }




  CargarTodosDetallesPisos(codigo){              
      this.spinner.show();       
      this.MigracionService.ObtenerData('DP',codigo).subscribe((data:any) =>{                                   
        this.spinner.hide();           
        for (let i= 0; i < data.data.length; i++)      
        {                                   
          this.construccion.detalle.push(
            { 
              item : data.data[i].ITEM_INSPECCION,           
              codigoconstruccion : data.data[i].CODIGO_CONSTRUCCION,
              itemx: data.data[i].CODIGO_PISO ,
              piso :  data.data[i].NRO_PISO,
              mes : data.data[i].MES_CONSTRUCCION,
              anio : data.data[i].ANHIO_CONSTRUCCION,
              codmaterial : data.data[i].CODIGO_MATERIAL,
              codestado :  data.data[i].CODIGO_ESTADO,
              muro : data.data[i].MURO,
              techo : data.data[i].TECHO,
              elect : data.data[i].INSTALACIONES,
              pisos :data.data[i].PISOS,   
              puerta : data.data[i].PUERTA_VENTANA,
              revest : data.data[i].REVESTIMIENTO,
              banio : data.data[i].BANHO,                   
              valorunitario : data.data[i].VUE,
              area :data.data[i].AREA_CONSTRUIDA,
              valorestimado : data.data[i].VALOR_ESTIMADO
            });            
        } 
      });       
      
    }





  
 
  setcombos(){
    this.construccion.habilitacion = "0"
    this.construccion.situacion = "0"
    this.construccion.material = "0"
    this.detalle.muro = "0"
    this.detalle.techo = "0"
    this.detalle.elect = "0"
    this.detalle.pisos = "0"
    this.detalle.puerta = "0"
    this.detalle.revest = "0"
    this.detalle.banio ="0"

  }

  ObtenerUltimoC(aux)
  {
    this.spinner.show();                   
    this.dataservice.ObtenerUltimoC(aux).subscribe((data:any) =>{                       
      this.spinner.hide();      
        this.ultimoi = data.data[0].ULTIMO                
        if (this.ultimoi==null)
         {this.ultimoi=0}        
    });
  
  }

  ObtenerUltimoitemDetallePiso(aux, codigo_construccion)
  {
    this.spinner.show();                   
    this.dataservice.ObtenerUltimoitemDetallePiso(aux, codigo_construccion).subscribe((data:any) =>{                       
      this.spinner.hide();      
      this.aux_ultimo = data.data[0].ULTIMO  
      console.log("item")  
      console.log(this.aux_ultimo)              
        //if (this.ultimoi==null)
         //{this.ultimoi=0}        
    });
  
  }

}
