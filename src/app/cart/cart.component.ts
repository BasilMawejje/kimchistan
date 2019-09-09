import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { PaymentService } from '../payment.service';
import { ProductTrackerError } from '../models/ProductTrackerError';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  currentCart: any = [];
  initialCart = [];
  total_price: number;

  constructor(private cartSVC: CartService, 
              private paymentService: PaymentService,
              private orderService: OrderService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.currentCart = this.cartSVC.showAll();
    this.currentCart === null ? this.currentCart = this.initialCart : this.currentCart;
    this.getTotalPrice();
  }

  removeProduct(item) {
    this.cartSVC.deleteFromCart(item);
    this.cartSVC.showAll();
    this.getTotalPrice();
    console.log(this.cartSVC.orderSubTotal());
    this.toastr.success(`Successfully removed product from cart`);
  }

  clearCart() {
    this.cartSVC.clearCart();
    this.getTotalPrice();
    this.toastr.success(`Successfully cleared cart`);
  }

  getTotalPrice() {
    this.total_price = this.cartSVC.orderSubTotal();
  }

  openCheckout() {
    const amount = this.total_price * 100

    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_Okp6mq2W0Ttopccq3HFOy5zC',
      locale: 'auto',
      name: 'Kimchistan',
      currency: 'sek',
      amount: amount,
      token: (token: any) => {
        this.paymentService
          .createPayment(token, amount)
            .subscribe(
              () => {
                this.orderService.create(this.currentCart, token.email)
                  .subscribe((res) => res)
                  this.cartSVC.clearCart();
                  this.router.navigate(['products']);
                  this.toastr.success(`Successfully made your order. Your food is ready in 30 minutes.`);
              },
              (err: ProductTrackerError) => console.log(err),
            );
        }
    });

    handler.open({
      name: 'Kimchistan',
      description: 'Thanks! Your food is ready in 30 minutes.',
      amount: amount,
    });
  }
}
