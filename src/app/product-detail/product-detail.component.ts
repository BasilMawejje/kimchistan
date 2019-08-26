import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IProduct } from '../models/product';
import { ApiService } from '../api.service';
import { ProductTrackerError } from '../models/ProductTrackerError';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {
  product: IProduct;
  products: IProduct[];
  loading = true;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private apiService: ApiService) { }

  ngOnInit() {
    this.getProduct();
  }

  showSpinner(value: boolean) {
    this.loading = value;
  }

  getProduct(): void {
    this.showSpinner(true);
    const id = +this.route.snapshot.paramMap.get('id');
    this.apiService.getProduct(id)
      .subscribe(
        (product: IProduct) => {
          this.product = product;
          this.showSpinner(false);
        },
        (err: ProductTrackerError) => console.log(err.detailedMessage),
      );
  }

  goBack(): void {
    this.location.back();
  }
}
