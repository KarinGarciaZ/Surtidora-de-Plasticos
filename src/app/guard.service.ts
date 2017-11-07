import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login/login.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class GuardService implements CanActivate{

  constructor(private log: LoginService, private route: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.log.user.map( user =>{
      if ( user ) return true;
      
      this.route.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    })
  }

}
