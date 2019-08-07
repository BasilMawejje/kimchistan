import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { ApiService } from '../api.service';

@Component({
  //selector only needed if it will be used as a nested component. We are using routing for this now. 
  // selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  products: IProduct[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.apiService.getProducts()
    .subscribe(products => this.products = products);
  }
}
