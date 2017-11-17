import { Router, ActivatedRoute } from '@angular/router';
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
  product = {};
  id;

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    brandsService: BrandsService, 
    categoryService: CategoryService, 
    private productService: ProductService
  ) {
    this.categories$ = categoryService.getCategories();
    this.brands$ = brandsService.getBrands();

    this.id = this.router.snapshot.paramMap.get('id');
    if ( this.id ) {
      this.productService.getProduct( this.id )
      .subscribe( product => {
        console.log('product: ', product);
        this.product = product });

    }
   }

  ngOnInit() {
  }

  save(product){
    if ( this.id ) this.productService.update( this.id, product );
    else this.productService.create(product);
    
    this.route.navigate(['/admin/products']);
  }

  delete() {
    if ( confirm('¿Está seguero de que desea eliminar este producto?')) {
      this.productService.delete(this.id);
      this.route.navigate(['/admin/products']);
    }
  }
}
