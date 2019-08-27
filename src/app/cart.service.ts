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
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getCartItems() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  showAll() {
    return this.cart;
  }
}
