import { TestBed } from '@angular/core/testing';
import { ErrorInterceptorService } from './error.interceptor.service';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError, of } from 'rxjs';

describe('ErrorService', () => {
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
    providers: [
      ErrorInterceptorService,
    ],
    imports: [ RouterTestingModule ]
  });
    service = TestBed.get(ErrorInterceptorService);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('intercepts error', () => {
    const spy = jasmine.createSpyObj('HttpHandler', ['handle']);
    const req = {};
    const error = { status: 404 };

    spy.handle.and.returnValue(throwError(error));

    service.intercept(req, spy).subscribe(() => {}, err => expect(err).toEqual(error));
  });
});
