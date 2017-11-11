import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { LoginService } from './login/login.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(private log: LoginService, private userService: UserService) { }
  
    canActivate(): Observable<boolean> {  
      console.log('1', this.log.user);    
     return this.log.user
      .switchMap(user => this.userService.get(user.uid))
      .map( appUser => appUser.admin);
    }
}
