import { Injectable } from '@angular/core';

import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private productsUrl = 'http://localhost:3000/api/v1/products';

  constructor(private http: HttpClient) { }

  // GET products from the server
  getProducts (): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(map((res: any) => res.data));
  }

  // GET product by :id
  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(map((res: any) => res.data));
  }
}
