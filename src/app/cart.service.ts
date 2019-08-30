import { Injectable } from '@angular/core';
import { IProduct } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = [];
  initialCart = [];

  constructor() { }

  addToCart(product: IProduct): void {
    this.cart === null ? this.cart = this.initialCart : this.cart;
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
    localStorage.removeItem('cart');
  }
}
