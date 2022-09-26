/* IMPORTACIONES DE LIBRERIAS */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ValidateComponent } from './validate/validate.component';
import { SafePipe } from './services/safe';
//import { AngularDraggableModule } from 'angular2-draggable';
  
/* IMPORTACIONES DE COMPONENTES */
import { ListadoPrediosWebComponent } from './migracion-predios/listado-predios-web/listado-predios-web.component';
import { RegistroPrediosComponent } from './registro-predios/registro-predios.component';
import { DatosGeneralesComponent } from './datos-generales/datos-generales.component';
import { AdquisicionComponent } from './adquisicion/adquisicion.component';
import { ActosComponent } from './actos/actos.component';
import { CaracteristicasComponent } from './caracteristicas/caracteristicas.component';
import { ObrasComponent } from './obras/obras.component';
import { ZonaComponent } from './zona/zona.component';
import { ConstruccionComponent } from './construccion/construccion.component';
import { LegajoComponent } from './legajo/legajo.component';
import { DatosTecnicosComponent } from './datos-tecnicos/datos-tecnicos.component';
import { RegistroSbnComponent } from './registro-sbn/registro-sbn.component';
import { RegistroExternoComponent } from './registro-externo/registro-externo.component';
import { LimitacionesComponent } from './limitaciones/limitaciones.component';
import { ControlComponent } from './control/control.component';
import { BusquedaGraficaComponent } from './busqueda-grafica/busqueda-grafica.component';
import { AportePoligonoComponent } from './aporte-poligono/aporte-poligono.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { NotificacionesComponent } from './notificaciones/notificaciones.component';

import { ControlRegistroSDRCComponent } from './control-registro-sdrc/control-registro-sdrc.component';
import { AporteFotosComponent } from './aporte-fotos/aporte-fotos.component';
import { TwoDigitDecimaNumberDirective } from './two-digit-decima-number.directive';
import { RectificacionComponent } from './rectificacion/rectificacion.component';
import { NumberPipePipe } from './number-pipe.pipe';
//import { ModalModule } from 'ng-modal-lib';
import { AuditoriaPrediosComponent } from './auditoria-predios/auditoria-predios.component';
import { FabricaLinderosComponent } from './fabrica-linderos/fabrica-linderos.component';
import { FourDigitDecimaNumberDirective } from './four-digit-decima-number.directive';
import { InformesAsociadosComponent } from './informes-asociados/informes-asociados.component';
import { IDatosExpedienteComponent } from './i-datos-expediente/i-datos-expediente.component';
import { IDatosPredioComponent } from './i-datos-predio/i-datos-predio.component';
import { IDatosInspeccionComponent } from './i-datos-inspeccion/i-datos-inspeccion.component';
import { IDatosInformacionComponent } from './i-datos-informacion/i-datos-informacion.component';
import { IDatosCaracteristicasComponent } from './i-datos-caracteristicas/i-datos-caracteristicas.component';
import { IDatosConstruccionesComponent } from './i-datos-construcciones/i-datos-construcciones.component';
import { IDatosValorizacionComponent } from './i-datos-valorizacion/i-datos-valorizacion.component';
import { EstandarizacionComponent } from './estandarizacion/estandarizacion.component';
import { PrediosIncorporadosComponent } from './components/predios-incorporados/predios-incorporados.component';
import { RiesgoDesastreComponent } from './riesgo-desastre/riesgo-desastre.component';

import { AuthGuard } from './auth.guard';
//import { CanActivate } from '@angular/router';

const appRoutes: Routes = [
   //{ path: '', redirectTo:'registro-predios',pathMatch:'full' },
  //{ path: '', component: RegistroPrediosComponent, canActivate: [AuthGuard]},
  // { path: '**', component: RegistroPrediosComponent, canActivate: [AuthGuard]},

  { path: 'busqueda-predios', component: RegistroPrediosComponent }, //migraciones
  { path: 'registro-sbn', component: RegistroSbnComponent },
  { path: 'registro-externo', component: RegistroExternoComponent },
  { path: 'busqueda-grafica', component: BusquedaGraficaComponent },
  { path: 'aporte-poligono', component: AportePoligonoComponent},
  { path: 'validate', component: ValidateComponent},
  { path: 'notificaciones', component: NotificacionesComponent},
  { path: 'control-registro', component: ControlRegistroSDRCComponent },
  { path: 'legajos', component: LegajoComponent},
  { path: 'aporteFotos', component: AporteFotosComponent },
  { path: 'rectificacion', component: RectificacionComponent },
  { path: 'auditoria-predios', component: AuditoriaPrediosComponent },
  { path: 'fabrica-linderos', component: FabricaLinderosComponent },
  { path: 'estandarizacion', component: EstandarizacionComponent},
  //{ path: 'validate', component: ValidateComponent },
  { path: 'predios-incorporados', component: PrediosIncorporadosComponent }
];

@NgModule({
  declarations: [
    AppComponent,  
    ValidateComponent,
    SafePipe,    
    ListadoPrediosWebComponent, 
    RegistroPrediosComponent, 
    DatosGeneralesComponent, 
    AdquisicionComponent, 
    ActosComponent,  
    CaracteristicasComponent, 
    ObrasComponent, 
    ZonaComponent, 
    ConstruccionComponent, 
    LegajoComponent, 
    DatosTecnicosComponent, 
    RegistroSbnComponent, 
    RegistroExternoComponent, 
    LimitacionesComponent, 
    ControlComponent, 
    BusquedaGraficaComponent, 
    AportePoligonoComponent, 
    NotificacionesComponent, 
    ControlRegistroSDRCComponent, 
    AporteFotosComponent, TwoDigitDecimaNumberDirective, 
    RectificacionComponent, 
    AuditoriaPrediosComponent,
    FourDigitDecimaNumberDirective, 
    FabricaLinderosComponent,
    NumberPipePipe,
    InformesAsociadosComponent,    
    IDatosExpedienteComponent, 
    IDatosPredioComponent, 
    IDatosInspeccionComponent, 
    IDatosInformacionComponent, 
    IDatosCaracteristicasComponent, 
    IDatosConstruccionesComponent, 
    IDatosValorizacionComponent, 
    EstandarizacionComponent, 
    PrediosIncorporadosComponent,
    RiesgoDesastreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFileUploaderModule,
    //AngularDraggableModule,
    //ModalModule,
    RouterModule.forRoot(
			appRoutes,
			{ enableTracing: true } // <-- debugging purposes only
		),
  ],
  providers: [    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
