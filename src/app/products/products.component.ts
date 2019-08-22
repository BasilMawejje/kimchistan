import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models/product';
import { ApiService } from '../api.service';
import { ProductTrackerError } from '../models/ProductTrackerError';

@Component({
  // selector only needed if it will be used as a nested component. We are using routing for this now.
  // selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  products: IProduct[];
  loading = true;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getProducts();
  }

  showSpinner(value: boolean) {
    this.loading = value;
  }

  getProducts(): void {
    this.showSpinner(true);
    this.apiService.getProducts()
    .subscribe(
      (products: IProduct[]) => this.products = products, 
      (err: ProductTrackerError) => console.log(err),
    );
    this.showSpinner(false);
  }
}
