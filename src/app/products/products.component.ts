import { ShoppingCartService } from './../services/shopping-cart.service';
import { Product } from './../models/product';
import { BrandsService } from './../services/brands.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
products = [];
filtereted = [];
brands;
brand;
categories;
category;

  constructor( private productService: ProductService, 
    private categoryService: CategoryService,
    private brandsService: BrandsService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) { 
    
    this.productService.getAll()
      .subscribe( products => {
        this.products = this.filtereted = products;

        this.categoryService.getAll()
        .subscribe( categories => this.categories = categories );  
        route.queryParamMap.subscribe( params => {
          if (params.get('category')) {
            this.category = params.get('category');   
            this.filterC( this.category );   
          } 
        });

        this.brandsService.getAll()
        .subscribe( brands => this.brands = brands );  
        route.queryParamMap.subscribe( params => {
          if (params.get('brand')) {
            this.brand = params.get('brand');   
            this.filterB( this.brand );   
          }         
        });
      });   
  }

  filterC( key ) {
    this.brand = "";
    if (key) this.filtereted = this.products.filter( p => p.category == key )
    else this.filtereted = this.products;
  }

  filterB( key ) {
    this.category = "";
    if (key) this.filtereted = this.products.filter( p => p.brand == key )
    else this.filtereted = this.products;
  }

  all() {
    this.category = "";
    this.brand = "";
    this.filtereted = this.products;
  }

  addToCart( product: Product ) {
    this.cartService.addToCart(product);
  }
}
