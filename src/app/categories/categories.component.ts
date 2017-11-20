import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories;
  constructor( private categoriesSerivice: CategoryService ) { 
    this.categoriesSerivice.getAll()
      .subscribe( categories => this.categories = categories );
  }

  ngOnInit() {
  }

}
