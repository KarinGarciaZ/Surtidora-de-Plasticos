import { CategoryService } from './../../services/category.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    image: new FormControl('', [Validators.required]),
  });
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  get name() {
    return this.form.get('name');
  }

  get image() {
    return this.form.get('image');
  }

  save(){
    this.categoryService.saveCategory( this.name.value, this.image.value );
  }

}
