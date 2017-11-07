import { LoginService } from './../login/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  form = new FormGroup({
    mail: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required)    
  });

  constructor( private log: LoginService ) { }

  ngOnInit() {
  }

  get mail(){
    return this.form.get('mail');
  }
  
  get password(){
   return this.form.get('password');
 }

}
