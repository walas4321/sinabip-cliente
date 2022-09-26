import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MigracionService } from './services/migracion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  num: Number = 0
  constructor(private authSvc: MigracionService, private router: Router){
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token = JSON.parse(sessionStorage.getItem('token'));
  
      console.log(token) 
      if(token != null){
        return true;
      }else{
        window.location.assign('https://app.sbn.gob.pe/seguridad/login');
        return false;
        //this.router.navigate(['/notificaciones'])
       
      }
    
  }
  
}
