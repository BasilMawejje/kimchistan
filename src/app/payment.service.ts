import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IPayment } from "./models/payment";
import { IOrder } from './models/order';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) { }

  createPayment(token: any, amount: number) {
    const payload = {
      data: {
        attributes: {
          email: token.email,
          token: token.id,
          amount: amount
        }
      }
    };

    return this.http.post<IPayment>(`${this.apiUrl}/payments`, payload).pipe(
      map((res: any) => res.json()),
    );
  }

  createOrder(cart: any, email: string) {
    const payload = {
      data: {
        attributes: {
          cart: cart,
          email: email
        }
      }
    };

    return this.http.post<IOrder>(`${this.apiUrl}/orders`, payload).pipe(
      map((res: any) => res.json()),
    );
  }
}
