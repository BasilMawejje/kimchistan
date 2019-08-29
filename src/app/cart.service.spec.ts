import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  type: string;
  available: boolean;
}

describe('CartService', () => {
  const testProduct: Product = {id: 1, name: 'Bibimbap', price: 49, description: 'The best we offer.', image: 'http://placehold.it/100x100', type: 'dish', available: true};

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ CartService ]
  }));

  it('should be created', () => {
    const service: CartService = TestBed.get(CartService);
    expect(service).toBeTruthy();
  });
  
  it('addToCart: add items to cart', () => {
    const service: CartService = TestBed.get(CartService);
    expect(service.cart.length).toEqual(0);
    service.addToCart(testProduct);
    expect(service.cart.length).toEqual(1);
    expect(service.cart[0]).toEqual({
      id: 1,
      name: 'Bibimbap',
      price: 49,
      description: 'The best we offer.',
      image: 'http://placehold.it/100x100',
      type: 'dish',
      available: true
    });
    service.addToCart(testProduct);
    expect(service.cart.length).toEqual(2);
  });

  it('showAll: returns all items in cart', () => {
    const service: CartService = TestBed.get(CartService);
    service.addToCart(testProduct);
    service.addToCart(testProduct);
    let cart = service.showAll();
    expect(cart[0]).toEqual(testProduct);
  });

  it('removeProduct: removes item from cart', () => {
    const service: CartService = TestBed.get(CartService);
    service.addToCart(testProduct);
    service.addToCart(testProduct);
    service.addToCart(testProduct);
    service.addToCart(testProduct);
    service.addToCart(testProduct);
    expect(service.cart.length).toEqual(5);
    service.deleteFromCart(testProduct);
    service.deleteFromCart(testProduct);
    service.deleteFromCart(testProduct);
    expect(service.cart.length).toEqual(2);
  });
});
