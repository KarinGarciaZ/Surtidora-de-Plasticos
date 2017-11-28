import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  checar: number = 0;
  everyTen: number;
  constructor() { }

  ngOnInit() {
  }

  ejecutar() {
    for( let i = 0; i< 10000000; i++ ) {
      this.checar = i;
    }
  }

}
