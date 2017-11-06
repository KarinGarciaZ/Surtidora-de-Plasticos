import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    mail: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    password2: new FormControl('',Validators.required)
  });

    
  constructor(public log: LoginService) {
    
   }
  
   login(){
     console.log(this.form)
   }

  ngOnInit() {
  }

}
