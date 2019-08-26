import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentCart: any;

  constructor(private cartSVC: CartService) { }

  ngOnInit() {
    this.currentCart = this.cartSVC.getCartItems();
  }

}
