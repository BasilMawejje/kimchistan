import { Injectable } from '@angular/core';
import { IOrder } from './models/order';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) { }

  create(cart: any, email: string) {
    const payload = {
      data: {
        attributes: {
          cart: cart,
          email: email
        }
      }
    };

    return this.http.post<IOrder>(`${this.apiUrl}/orders`, payload);
  }
}
