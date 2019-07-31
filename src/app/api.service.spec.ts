import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

// Setup for tests
interface Product {
  id: number, 
  name: string, 
  price: number,
  description: string
}

const testUrl = '/data';

fdescribe('ApiService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ], 
      providers: [ ApiService ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  // Tests begin here
  it('should be created', () => {
    const apiService: ApiService = TestBed.get(ApiService);
    expect(apiService).toBeTruthy();
  });

  it('can get products via HttpClient GET method', () => {
    const testProduct: Product = {id: 1, name: 'Bibimbap', price: 49, description: 'The best we offer.'};

    httpClient.get<Product>(testUrl)
      .subscribe(data =>
        expect(data).toEqual(testProduct)
      );

    const req = httpTestingController.expectOne('/data');

    expect(req.request.method).toEqual('GET');

    req.flush(testProduct);

    httpTestingController.verify();
  });
});
