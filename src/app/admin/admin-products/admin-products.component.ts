import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  tableResourse: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor( private productService: ProductService ) {
    this.subscription = this.productService.getAll()
    .subscribe( products => {
      this.filteredProducts = this.products = products;
      this.initializeTable( products );      
    });
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter( query: string ) {
    this.filteredProducts = ( query ) ?
      this.products.filter( p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  reloadItems( event ) {
    if ( !this.tableResourse ) return false;

    this.tableResourse.query(event)
    .then( items => this.items = items );
  }

  initializeTable( products: Product[] ) {
    this.tableResourse = new DataTableResource(products);
    this.tableResourse.query({ offset: 0 })
      .then( items => this.items = items );
    this.tableResourse.count()
      .then( count => this.itemCount = count );
  }

}
