import { Router, ActivatedRoute } from '@angular/router';
import { BrandsService } from './../../services/brands.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';

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
  id;

  constructor( 
    private brandsService: BrandsService,
    private route: Router,
    private router: ActivatedRoute
  ) { 
    this.id = this.router.snapshot.paramMap.get('id');
    if ( this.id ) {
      this.brandsService.getBrand( this.id )
      .subscribe( brand => {
        this.name = brand.name;
        this.image = brand.image;
      });        
    }

  }

  ngOnInit() {
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

  save() {
    if ( this.id ) {
      let brand = { name: this.name.value, image: this.image.value }
      this.brandsService.update( this.id, brand );
    }
    else this.brandsService.createBrand( this.name.value, this.image.value );
    this.route.navigate(['/admin/brands']);
  }

}
