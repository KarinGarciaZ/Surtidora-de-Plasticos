import { BrandsService } from './../services/brands.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands;
  constructor(private brandsService: BrandsService) {
    this.brandsService.getAll()
      .subscribe( brands => this.brands = brands );
   }

  ngOnInit() {
  }

}
