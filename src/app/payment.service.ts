import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPayment } from "./models/payment";

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

    return this.http.post<IPayment>(`${this.apiUrl}/payments`, payload)
  }
}
