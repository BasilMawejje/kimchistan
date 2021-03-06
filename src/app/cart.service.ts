import { Injectable } from '@angular/core';
import { IProduct } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: any = [];

  constructor() { }

  addToCart(product: IProduct): void {
    this.cart === null ? this.cart = localStorage.setItem('cart', JSON.stringify([])) : this.cart;
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

  deleteFromCart(item): void {
    let index = this.cart.indexOf(item);
    if(index > -1) {
      this.cart.splice(index, 1);
      this.saveCart();
    }
    console.log(this.cart);
  }

  clearCart() {
    this.cart.length = 0;
    this.saveCart();
  }

  orderSubTotal() {
    this.cart === null ? this.cart = localStorage.setItem('cart', JSON.stringify([])) : this.cart;
    return this.cart.map(item => item.attributes.price).reduce((a, b) => a + b, 0);
  }
}
