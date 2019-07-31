import { Component, OnInit } from '@angular/core';
import { Product } from "../product";
import { ApiService } from '../api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  products: Product[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.apiService.getProducts()
    .subscribe(products => this.products = products);
  }
}