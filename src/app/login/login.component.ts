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
    mail: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    password2: new FormControl('',[Validators.required, Validators.minLength(6)])
  });

    
  constructor(public log: LoginService) {
    
   }
  
   login(){
     console.log(this.form)
   }

   get mail(){
     return this.form.get('mail');
   }
   get password(){
    return this.form.get('password');
  }
  get password2(){
    return this.form.get('password2');
  }


  ngOnInit() {
  }

}
