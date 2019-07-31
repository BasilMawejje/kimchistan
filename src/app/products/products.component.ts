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
  selectedProduct: Product;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getProducts();
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  getProducts(): void {
    this.apiService.getProducts()
    .subscribe(products => this.products = products);
  }
}