import { TestBed } from '@angular/core/testing';
import { ErrorInterceptorService } from './error.interceptor.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorInterceptorService,
    ],
    imports: [ RouterTestingModule ]
  }));

  it('should be created', () => {
    const service: ErrorInterceptorService = TestBed.get(ErrorInterceptorService);
    expect(service).toBeTruthy();
  });
});
