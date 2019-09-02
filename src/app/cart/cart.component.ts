import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  currentCart: any = [];
  initialCart = [];
  total_price: number;

  constructor(private cartSVC: CartService) { }

  ngOnInit() {
    this.currentCart = this.cartSVC.showAll();
    this.currentCart === null ? this.currentCart = this.initialCart : this.currentCart;  
    this.getTotalPrice();
    console.log(this.cartSVC.orderSubTotal());
    
  }

  removeProduct(item) {
    this.cartSVC.deleteFromCart(item);
    this.cartSVC.showAll();
    this.getTotalPrice();
    console.log(this.cartSVC.orderSubTotal());
  }

  clearCart() {
    this.cartSVC.clearCart();
    this.getTotalPrice();
    window.location.reload();
  }

  getTotalPrice() {
    this.total_price = this.cartSVC.orderSubTotal();
  }
}
