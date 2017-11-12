import { BrandsService } from './../../services/brands.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands-form',
  templateUrl: './brands-form.component.html',
  styleUrls: ['./brands-form.component.css']
})
export class BrandsFormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    image: new FormControl('', [Validators.required]),
  });
  constructor( private brandsService: BrandsService ) { }

  ngOnInit() {
  }

  get name() {
    return this.form.get('name');
  }

  get image() {
    return this.form.get('image');
  }

  save() {
    this.brandsService.createBrand( this.name.value, this.image.value );
  }

}
