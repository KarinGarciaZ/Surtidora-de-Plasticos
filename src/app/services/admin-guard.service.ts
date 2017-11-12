import { LoginService } from './../login/login.service';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(private log: LoginService, private userService: UserService) { }
  
    canActivate(): Observable<boolean> {    
     return this.log.appUser
      .map( appUser => appUser.admin);
    }
}
