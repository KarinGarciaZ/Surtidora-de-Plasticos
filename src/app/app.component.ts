import { UserService } from './user.service';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor ( private log: LoginService, private userService: UserService, router: Router ) {
    log.user.subscribe( user => {
      if ( user ) {   
        userService.save(user);
        
        let returnUrl = localStorage.getItem('returnUrl'); 
        userService.save(user);
        localStorage.removeItem('returnUrl');
        
      }
    })
  }
}
