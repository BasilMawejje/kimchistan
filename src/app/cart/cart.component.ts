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

  constructor(private cartSVC: CartService) { }

  ngOnInit() {
    this.currentCart = this.cartSVC.showAll();
    this.currentCart === null ? this.currentCart = this.initialCart : this.currentCart;  
  }

  removeProduct(item) {
    this.cartSVC.deleteFromCart(item);
    console.log(this.currentCart);
  }

  clearCart() {
    this.cartSVC.clearCart();
    window.location.reload();
  }
}
