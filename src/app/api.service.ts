import { Injectable } from '@angular/core';

import { IProduct } from './models/product';
import { ProductTrackerError } from './models/ProductTrackerError';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private productsUrl = 'http://localhost:3000/api/v1/products';

  constructor(private http: HttpClient) { }

  // GET products from the server
  getProducts(): Observable<IProduct[] | ProductTrackerError> {
    return this.http.get<IProduct[]>(this.productsUrl).pipe(
      map((res: any) => res.data),
      catchError(this.handleError),
    );
  }

  // GET product by :id
  getProduct(id: number): Observable<IProduct | ProductTrackerError> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<IProduct>(url).pipe(
      map((res: any) => res.data),
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse): Observable<ProductTrackerError> {
    let dataError = new ProductTrackerError();
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    dataError.detailedMessage = `Resource not found: ${error.url}`;
    return throwError(dataError);
  }
}
