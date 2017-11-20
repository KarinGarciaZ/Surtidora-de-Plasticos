import { BrandsService } from './../services/brands.service';
import { CategoryService } from './../services/category.service';
import { AppUser } from './../models/app-user';
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

  appUser: AppUser;
  categories;
  brands;

  constructor( private log: LoginService, private categoryService: CategoryService, private brandsService: BrandsService) {
    log.appUser.subscribe(appUser => this.appUser = appUser);
    this.categoryService.getAll()
      .subscribe( categories => this.categories = categories );
    this.brandsService.getAll()
      .subscribe( brands => this.brands = brands );
   }

  ngOnInit() {
  }

  settingCreateAccount(){
    this.log.createAccount = true;
  }

  get mail(){
    return this.form.get('mail');
  }
  
  get password(){
   return this.form.get('password');
 }

}
