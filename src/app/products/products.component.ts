import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Product } from './../models/product';
import { BrandsService } from './../services/brands.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
products = [];
filtereted = [];
brands;
brand;
categories;
category;
cart: any;
subcription: Subscription;

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

  async ngOnInit() {
    this.subcription = (await this.cartService.getCart())
      .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
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

  removeItem( product: Product ) {
    this.cartService.removeItem(product);
  }

  getQuantity(product: Product) {
    if ( !this.cart ) return 0;
    let item = this.cart.items[product.$key];
    return item ? item.quantity : 0;
  }
}
