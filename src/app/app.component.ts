import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor ( private log: LoginService, router: Router ) {
    log.user.subscribe( user => {
      if ( user ) {
        let returnUrl = localStorage.getItem('returnUrl'); 
        router.navigateByUrl( returnUrl );
        localStorage.removeItem('returnUrl');
      }
    })
  }
}
