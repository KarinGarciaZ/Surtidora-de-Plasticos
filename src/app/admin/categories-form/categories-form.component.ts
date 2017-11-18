import { ActivatedRoute, Router } from '@angular/router';
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
  id;
  web = true;
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    image: new FormControl('', [Validators.required, CustomValidators.url]),
  });
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.id = route.snapshot.paramMap.get('id');
    if ( this.id ) {
      this.categoryService.getCategory( this.id )
        .subscribe( category => {
          this.name = category.name;
          if ( category.imageUrl.startsWith('http')) 
            this.image = category.imageUrl;
          else {
            category.imageUrl = '../assets/pictures/CategoriesPictures/' + category.imageUrl;            
            this.image = category.imageUrl;
          }
        })
    }
  }

  ngOnInit() {
  }

  toggleWeb(){
    this.web = !this.web;
  }

  set name( name ) {
    this.form.controls['name'].setValue(name);
  }

  set image( image ) {
    this.form.controls['image'].setValue(image);
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
    if ( this.id ) {
      let obj = { name: this.name.value, imageUrl: this.image.value };
      this.categoryService.update( this.id, obj )
    } 
    else ( this.web )? this.categoryService.saveCategory( this.name.value, this.image.value, true ) : this.categoryService.saveCategory( this.name.value, this.ur, false );
  this.router.navigate(['/admin/categories']);
  }

}
