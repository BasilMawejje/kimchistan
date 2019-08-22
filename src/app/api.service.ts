import { Injectable } from '@angular/core';

import { IProduct } from './models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private productsUrl = 'http://localhost:3000/api/v1/products';

  constructor(private http: HttpClient) { }

  // GET products from the server
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productsUrl).pipe(map((res: any) => res.data));
  }

  // GET product by :id
  getProduct(id: number): Observable<IProduct> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<IProduct>(url).pipe(map((res: any) => res.data));
  }
}
