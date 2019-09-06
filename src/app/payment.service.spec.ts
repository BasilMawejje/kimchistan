import { TestBed } from '@angular/core/testing';

import { PaymentService } from './payment.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: PaymentService = TestBed.get(PaymentService);
    expect(service).toBeTruthy();
  });
});
