import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { prediosIncorporadosService  } from '../../services/predios-incorporados.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-predios-incorporados',
  templateUrl: './predios-incorporados.component.html',
  styleUrls: ['./predios-incorporados.component.css']
})
export class PrediosIncorporadosComponent implements OnInit {
  busqueda={
    anio: 2022
  }
  walas: string = '';
  dataResultado1 = [];
  dataResultado2 = [];  
  dataResultadoDetalle = [];
  codusuario: string = ''
  empresarialIncor: number = 0
  municipalIncor: number = 0
  estatalIncor: number = 0
  provisionalIncor: number = 0;
  empresarialActua: number = 0
  municipalActua: number = 0
  estatalActua: number = 0
  provisionalActua: number = 0;
  totalIncorporados: number = 0;
  totalActualizados: number = 0;
  totalGeneral: number = 0;
  totIncorUDExterno: number = 0;
  totIncorUDInterno: number = 0;
  totActuaUDExterno: number = 0;
  totActuaUDInterno: number = 0;

  porcIncorporadosEmpresariales: number = 0;
  porcIncorporadosMunicipal: number = 0;
  porcIncorporadosEstatal: number = 0;
  porcIncorporadosProvisional: number = 0;
  porcActuaEmpresariales: number = 0;
  porcActuaMunicipal: number = 0;
  porcActuaEstatal: number = 0;
  porcActuaProvisional: number = 0;
  porcIncorSBN: number = 0;
  porcIncorExterno: number = 0;
  porcActuaSBN: number = 0;
  porcActuaExterno: number = 0;
  porcIncorConPol: number = 0;
  porcIncorSinPol: number = 0;
  porcActuaConPol: number = 0;
  porcActuaSinPol: number = 0;


  totIncorSinPolig: number = 0;
  totIncorConPolig: number = 0;
  totActuaSinPolig: number = 0;
  totActuaConPolig: number = 0;

  listaBrigadas = [];
  listaBrigadaDistinct = [];
  filas = [];
  fila = {
    item: 0, 
    brigada: '',
    total: 0,
    enero: 0,
    febrero: 0,
    marzo: 0,
    abril: 0,
    mayo: 0,
    junio: 0,
    julio: 0,
    agosto: 0,
    setiembre: 0,
    octubre: 0,
    noviembre: 0,
    diciembre: 0,
    cod_tecnico: '',
    cod_legal: ''
  };

  filas2 = [];
  fila2 = {
    brigada: '',
    total: 0,
    generado: 0,
    evaluacionTecnica: 0,
    evaluacionLegal: 0,
    informeLegal: 0,
    informeTecnico: 0,
    proyectoRespuesta: 0,
    controlCalidad: 0,
    finalizado: 0,
    cod_tecnico: '',
    cod_legal: ''
  }

  resultadoFinal =[{
    brigada : '',
    totalAnual : 0,
    enero: 0,
    febrero: 0,
    marzo: 0,
    abril: 0,
    mayo: 0,
    junio: 0,
    julio: 0,
    agosto: 0,
    setiembre: 0,
    octubre: 0,
    noviembre: 0,
    diciembre: 0
  }];

  codigoTecnico: string = ''
  codigoLegal: string = ''
  mes: number = 0
  accion: string = ''
  


  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private service : prediosIncorporadosService,
    
  ) { 
    
    this.codusuario =  sessionStorage.getItem('codigopersonal')
  }

  ngOnInit() {
    this.traerData();
  }

 


  
  traerData()
  {                 
    this.empresarialIncor = 0
    this.municipalIncor = 0
    this.estatalIncor = 0
    this.provisionalIncor = 0;
    this.empresarialActua = 0
    this.municipalActua = 0
    this.estatalActua = 0
    this.provisionalActua = 0;
    this.totalIncorporados = 0;
    this.totalActualizados = 0;
    this.totalGeneral = 0;
    this.porcIncorporadosEmpresariales = 0;
    this.porcIncorporadosMunicipal = 0;
    this.porcIncorporadosEstatal = 0;
    this.porcIncorporadosProvisional = 0;
    this.porcActuaEmpresariales = 0;
    this.porcActuaMunicipal = 0;
    this.porcActuaEstatal = 0;
    this.porcActuaProvisional = 0;
    this.porcIncorSBN = 0;
    this.porcIncorExterno = 0;
    this.porcActuaSBN = 0;
    this.porcActuaExterno = 0;
  
    this.totIncorSinPolig = 0;
    this.totIncorConPolig = 0;
    this.totActuaSinPolig = 0;
    this.totActuaConPolig = 0;

    this.porcIncorConPol = 0;
    this.porcIncorSinPol = 0;
    this.porcActuaConPol = 0;
    this.porcActuaSinPol = 0;
    


      this.spinner.show();                   
      this.service.traerData(this.busqueda).subscribe((data:any) =>{                       
        this.spinner.hide();   
        //this.dataResultado1 = data.data.resultado;
        this.dataResultado2 = [];
        this.dataResultado2 = data.data.resultado;
        this.filas = [];
        this.filas2 = [];
        this.listaBrigadas = [];
        this.listaBrigadaDistinct = [];

        
        for (let index = 0; index < this.dataResultado2.length; index++) {
          const element = this.dataResultado2[index].brigada2;
          this.listaBrigadas.push(
              
              element
            
          )
          
        }
        

        const distinct = (value, index, self) => {
          return self.indexOf(value) === index;
        }
        //const years = [2016, 2017, 2017, 2016, 2019, 2018, 2019];
        this.listaBrigadaDistinct = this.listaBrigadas.filter(distinct);
        
        

        let count = 0
        this.listaBrigadaDistinct.forEach((data : any) => {
          //let contador2 = 0;
          //let contador3 = 0;
          this.fila.brigada = '', this.fila.total = 0, this.fila.enero = 0, this.fila.febrero = 0,
          this.fila.marzo = 0, this.fila.abril = 0, this.fila.mayo = 0, this.fila.junio = 0,
          this.fila.julio = 0, this.fila.agosto = 0, this.fila.setiembre = 0, this.fila.octubre = 0,
          this.fila.noviembre = 0, this.fila.diciembre = 0

          this.fila2.brigada = '', this.fila2.generado = 0, this.fila2.evaluacionTecnica = 0,
          this.fila2.evaluacionLegal = 0, this.fila2.informeLegal = 0, this.fila2.informeTecnico = 0,
          this.fila2.proyectoRespuesta = 0, this.fila2.controlCalidad = 0, this.fila2.finalizado = 0
          
          
          
          this.dataResultado2.forEach((data1 : any) => {
            
            if(data == data1.brigada2){
              /* POR MES */
              //this.fila.item = contador2 + 1 
              this.fila.cod_tecnico = data1.resp_evaluacion_tecnica;
              this.fila.cod_legal = data1.resp_evaluacion_legal;
              switch (data1.Mes) {
                    case '1':
                      this.fila.enero ++;
                      //contador2 += 1;
                      break;
                    case '2':
                      this.fila.febrero ++;
                      //contador2 += 1;
                      break;
                    case '3':
                      this.fila.marzo ++;
                      //contador2 += 1;
                      break;
                    case '4':
                      this.fila.abril ++; 
                      //contador2 += 1;
                      break;
                    case '5':
                      this.fila.mayo ++; 
                      //contador2 += 1;
                      break;
                    case '6':
                      this.fila.junio ++; 
                      //contador2 += 1;
                      break;
                    case '7':
                      this.fila.julio ++; 
                     
                      //contador2 += 1;
                      break;
                    case '8':
                      this.fila.agosto ++; 
                      //contador2 += 1;
                      break;
                    case '9':
                      this.fila.setiembre ++; 
                      //contador2 += 1;
                      break;
                    case '10':
                      this.fila.octubre ++; 
                      //contador2 += 1;
                      break;
                    case '11':
                      this.fila.noviembre ++; 
                      //contador2 += 1;
                      break;
                    case '12':
                      this.fila.diciembre ++; 
                      //contador2 += 1;
                      break;
                    default:
                      //contador2 += 1;
                      break;
                  }


                /* POR ETAPA */
                this.fila2.cod_tecnico = data1.resp_evaluacion_tecnica;
                this.fila2.cod_legal = data1.resp_evaluacion_legal;
                switch (data1.etapa_udocumental) {
                  case '1':
                    this.fila2.generado ++;
                    //contador3 += 1;
                    break;
                  case '2':
                    this.fila2.evaluacionTecnica ++;
                    //contador3 += 1;
                    break;
                  case '3':
                    this.fila2.evaluacionLegal ++;
                    //contador3 += 1;
                    break;
                  case '4':
                    this.fila2.informeLegal ++; 
                    //contador3 += 1;
                    break;
                  case '5':
                    this.fila2.informeTecnico ++; 
                    //contador3 += 1;
                    break;
                  case '6':
                    this.fila2.proyectoRespuesta ++; 
                    //contador3 += 1;
                    break;
                  case '7':
                    this.fila2.controlCalidad ++; 
                    //contador3 += 1;
                    break;
                  case '8':
                    this.fila2.finalizado ++; 
                    //contador3 += 1;
                    break;
                  default:
                    //contador3 += 1;
                    break;
                }
                  
            }
            
          }); //fin de while
         

          /* CALCULAR TOTALES POR MES */
          this.fila.total = this.fila.enero + this.fila.febrero + this.fila.marzo + this.fila.abril + 
            this.fila.mayo + this.fila.junio + this.fila.julio + this.fila.agosto + this.fila.setiembre + 
            this.fila.octubre + this.fila.noviembre + this.fila.diciembre

            this.fila.brigada = data
            
           

          count += 1
          this.filas.push(
            {       
              item : count,       
              brigada :  data,      
              enero :   this.fila.enero,
              febrero :   this.fila.febrero,
              marzo :   this.fila.marzo,
              abril :   this.fila.abril,
              mayo :   this.fila.mayo,
              junio :   this.fila.junio,
              julio :   this.fila.julio,
              agosto :   this.fila.agosto,
              setiembre :   this.fila.setiembre,
              octubre :   this.fila.octubre,  
              noviembre :   this.fila.noviembre,
              diciembre :   this.fila.diciembre,
              total: this.fila.total,
              cod_tecnico: this.fila.cod_tecnico,
              cod_legal:  this.fila.cod_legal
            }        
          );



          /* CALCULAR TOTALES POR ETAPA */
          this.fila2.total = this.fila2.generado + this.fila2.evaluacionTecnica + this.fila2.evaluacionLegal + 
            this.fila2.informeLegal + this.fila2.informeTecnico + this.fila2.proyectoRespuesta + 
            this.fila2.controlCalidad + this.fila2.finalizado

          this.filas2.push(
            {             
              item : count, 
              brigada :  data,      
              generado :   this.fila2.generado,
              evaluacionTecnica :   this.fila2.evaluacionTecnica,
              evaluacionLegal :   this.fila2.evaluacionLegal,
              informeLegal :   this.fila2.informeLegal,
              informeTecnico :   this.fila2.informeTecnico,
              proyectoRespuesta :   this.fila2.proyectoRespuesta,
              controlCalidad :   this.fila2.controlCalidad,
              finalizado :   this.fila2.finalizado, 
              total: this.fila2.total,
              cod_tecnico: this.fila2.cod_tecnico,
              cod_legal:  this.fila2.cod_legal
            }        
          );

          //contador1 += 1;
        }); //fin de while
        
              
      
        /* TIPO DE REGISTRO */
        this.dataResultado2.forEach((data3 : any) => {
          this.totalGeneral ++
          if(data3.codigo_tipo_accion == '03' || data3.codigo_tipo_accion == '3'){ //SI ES U.D DE INCORPORACION
            this.totalIncorporados ++
            switch (data3.Tipo_Registro) {
              case 'EMPRESARIAL':
                this.empresarialIncor ++
                break;
              case 'MUNICIPAL':
                this.municipalIncor++
                break;
              case 'ESTATAL':
                this.estatalIncor ++
                break;
              case 'PROVISIONAL':
                this.provisionalIncor ++
                break;
              default:
                break;
            }
            /* VERIFICAR SI TIENE POLIGONO */
            if(data3.fec_digitalizacion == '01/01/1900' || data3.fec_digitalizacion == null){
              this.totIncorSinPolig ++
            }else{
              this.totIncorConPolig ++
            }

            /* VERIFICAR UD INTERNO O EXTERNO */
            if(data3.canal == 'WEB'){
              this.totIncorUDExterno += 1
            }else{
              this.totIncorUDInterno += 1
            }
            


          }else if(data3.codigo_tipo_accion == '01' || data3.codigo_tipo_accion == '1'){ //SI ES U.D DE ACTUALIZACION
            this.totalActualizados ++
            switch (data3.Tipo_Registro) {
              case 'EMPRESARIAL':
                this.empresarialActua ++
                break;
              case 'MUNICIPAL':
                this.municipalActua ++
                break;
              case 'ESTATAL':
                this.estatalActua ++
                break;
              case 'PROVISIONAL':
                this.provisionalActua ++
                break;
              default:
                break;
            }

            /* VERIFICAR SI TIENE POLIGONO */
            if(data3.fec_digitalizacion == '01/01/1900' || data3.fec_digitalizacion == null){
              this.totActuaSinPolig ++
            }else{
              this.totActuaConPolig ++
            }

            /* VERIFICAR UD INTERNO O EXTERNO */
            if(data3.canal == 'WEB'){
              this.totActuaUDExterno ++
            }else{
              this.totActuaUDInterno ++
            }

          }
        })

        this.porcIncorporadosEmpresariales = Number(((this.empresarialIncor / this.totalIncorporados) * 100).toFixed(2));
        this.porcIncorporadosMunicipal = Number(((this.municipalIncor / this.totalIncorporados) * 100).toFixed(2));
        this.porcIncorporadosEstatal = Number(((this.estatalIncor / this.totalIncorporados) * 100).toFixed(2));
        this.porcIncorporadosProvisional = Number(((this.provisionalIncor / this.totalIncorporados) * 100).toFixed(2));

        this.porcActuaEmpresariales = Number(((this.empresarialActua / this.totalActualizados) * 100).toFixed(2));
        this.porcActuaMunicipal = Number(((this.municipalActua / this.totalActualizados) * 100).toFixed(2));
        this.porcActuaEstatal = Number(((this.estatalActua / this.totalActualizados) * 100).toFixed(2));
        this.porcActuaProvisional = Number(((this.provisionalActua / this.totalActualizados) * 100).toFixed(2));

        this.porcIncorSBN = Number(((this.totIncorUDInterno / this.totalIncorporados) * 100).toFixed(2));
        this.porcIncorExterno = Number(((this.totIncorUDExterno / this.totalIncorporados) * 100).toFixed(2));
        this.porcActuaSBN = Number(((this.totActuaUDInterno / this.totalActualizados) * 100).toFixed(2));
        this.porcActuaExterno = Number(((this.totActuaUDExterno / this.totalActualizados) * 100).toFixed(2));

        this.porcIncorConPol = Number(((this.totIncorConPolig / this.totalIncorporados) * 100).toFixed(2));
        this.porcIncorSinPol = Number(((this.totIncorSinPolig / this.totalIncorporados) * 100).toFixed(2));
        this.porcActuaConPol = Number(((this.totActuaConPolig / this.totalActualizados) * 100).toFixed(2));
        this.porcActuaSinPol = Number(((this.totActuaSinPolig / this.totalActualizados) * 100).toFixed(2));





      });         
      
    }

    open_brigadaDepartamento(content, codTecnico, codLegal, mes){
      this.codigoTecnico = codTecnico
      this.codigoLegal = codLegal
      this.mes = mes

      let opciones : NgbModalOptions = {
        size : "lg",
        backdrop : "static"
      };
      this.spinner.show();                   
      this.service.detalleporDepartamento(codTecnico, codLegal, mes, this.busqueda.anio).subscribe((data:any) =>{
      
        this.dataResultadoDetalle = data.data.resultado
        this.spinner.hide();
      })       
      this.modalService.open(content,opciones);

                   
              
    }


    open_brigadaEtapas(content, codTecnico, codLegal, etapa){
      this.codigoTecnico = codTecnico
      this.codigoLegal = codLegal
      this.mes = etapa
      let opciones : NgbModalOptions = {
        size : "lg",
        backdrop : "static"
      };
      this.spinner.show();                   
      this.service.detalleporEtapas(codTecnico, codLegal, etapa, this.busqueda.anio).subscribe((data:any) =>{
       
        this.dataResultadoDetalle = data.data.resultado
        this.spinner.hide();
     
      })       
      this.modalService.open(content,opciones);
                         
    }

    // descargarXLS(){
    //   this.service.API_URL + "descargarXLS/"+ this.codigoTecnico + '/' + this.codigoLegal + '/' + this.mes + '/' + this.busqueda.anio
    //   this.walas = this.service.API_URL + "descargarXLS/"+ this.codigoTecnico + '/' + this.codigoLegal + '/' + this.mes + '/' + this.busqueda.anio;
    //   // this.spinner.show();                   
    //   // this.service.descargarXLS(this.codigoTecnico, this.codigoLegal, this.mes, this.busqueda.anio).subscribe((data:any) =>{
    
    //   //   //descargarXLS/{codTecnico}/{codLegal}/{etapa}/{anio}
        
    //   //   this.dataResultadoDetalle = data.data.resultado
    //   //   location.href = api_larave.api + 'ruta/'+oeiei
    //   //   location.tar
    //   //   this.spinner.hide();
    //   //   //alert(this.dataResultadoDetalle.length)
    //   // })       
    // }


    open_UDsinPoligonos(content, accion){ 
      this.accion = accion
     
      let opciones : NgbModalOptions = {
        size : "lg",
        backdrop : "static"
      };
      this.spinner.show();                   
      this.service.detallesinPoligonos(this.busqueda.anio, accion).subscribe((data:any) =>{
     
        this.dataResultadoDetalle = data.data.resultado
        this.spinner.hide();
      })       
      this.modalService.open(content,opciones);
                         
    }
    
     

}
