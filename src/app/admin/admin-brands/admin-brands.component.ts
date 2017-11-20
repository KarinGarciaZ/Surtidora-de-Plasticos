import { BrandsService } from './../../services/brands.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-brands',
  templateUrl: './admin-brands.component.html',
  styleUrls: ['./admin-brands.component.css']
})
export class AdminBrandsComponent implements OnInit {
  brands = [];
  filtered = [];
  constructor(private brandsService: BrandsService) {
    this.brandsService.getAll()
      .subscribe( brands => this.brands = this.filtered = brands);
   }

  ngOnInit() {
  }

  delete( id ) {
    if (confirm('¿Está seguro de querer borrar esa marca?')) {
      this.brandsService.delete( id );
      window.location.reload();
    }    
  }

  filter( name:string ) {
    this.filtered = ( name ) ?
      this.filtered.filter( p => p.name.toLowerCase().includes( name.toLowerCase())) :
      this.brands;

      this.brands;
  }
}
