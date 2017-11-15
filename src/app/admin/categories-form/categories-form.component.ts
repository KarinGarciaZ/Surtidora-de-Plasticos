import { CategoryService } from './../../services/category.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {
  ur; 
  web = true;
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    image: new FormControl('', [Validators.required, CustomValidators.url]),
  });
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  toggleWeb(){
    this.web = !this.web;
  }

  get name() {
    return this.form.get('name');
  }

  get image() {
    return this.form.get('image');
  }

  get photo(){
    return ( this.web )? this.form.get('image').value : '../assets/pictures/CategoriesPictures/'+this.ur;
  }

  onChange(event) {
    console.log('event: ', event);
    this.ur = event.srcElement.files[0].name;  
  }

  save(){
    ( this.web )? this.categoryService.saveCategory( this.name.value, this.image.value, true ) : this.categoryService.saveCategory( this.name.value, this.ur, false );
  }

}
