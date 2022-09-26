import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeguridadService } from '../services/seguridad.service';
@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {
  validate = null;
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private security : SeguridadService) {
      
    this.route.queryParams.subscribe(params => {
        this.validate = JSON.parse(atob(params['validate']));           
        sessionStorage.setItem('token', JSON.stringify(this.validate));   
         
    });
    this.security.Usuario(this.validate).subscribe((_user:  any)=>{       
      sessionStorage.setItem('user',JSON.stringify(_user));     
      this.security.getLogged.emit(JSON.stringify(_user))
          this.router.navigate(['/']);      
    },
    );
   }
   
  ngOnInit() {   
  }
  
}
