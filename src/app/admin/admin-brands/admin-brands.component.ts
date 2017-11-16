import { BrandsService } from './../../services/brands.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-brands',
  templateUrl: './admin-brands.component.html',
  styleUrls: ['./admin-brands.component.css']
})
export class AdminBrandsComponent implements OnInit {
  brands$;
  constructor(private brandsService: BrandsService) {
    this.brands$ = this.brandsService.getAll();
   }

  ngOnInit() {
  }

}
