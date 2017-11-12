import { BrandsService } from './../../services/brands.service';
import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  brands$;

  constructor(
    brandsService: BrandsService, 
    categoryService: CategoryService, 
    private productService: ProductService
  ) {
    this.categories$ = categoryService.getCategories();
    this.brands$ = brandsService.getBrands();
   }

  ngOnInit() {
  }

  save(product){
    this.productService.create(product);
  }

}
