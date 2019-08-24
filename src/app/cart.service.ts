import { Injectable } from '@angular/core';
import { IProduct } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = [];

  constructor() { }

  addToCart(product: IProduct): void {
    this.cart.push(product);
  }  
}
