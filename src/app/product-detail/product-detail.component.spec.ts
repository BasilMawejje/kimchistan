import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../api.service';
import { of } from 'rxjs';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  let activatedRouteSpy = {snapshot: { paramMap: {get: ()=> {}}}}
  let apiServiceSpy = jasmine.createSpyObj('ApiService', ['getProduct']);

  beforeEach(async(() => {
    apiServiceSpy.getProduct.and.returnValue(of({attributes: {name: 'Bibimbap', price: 49, description: 'The best we offer.', image: 'http://richtree.com/wp-content/uploads/sites/2/2016/10/IMG_2392.jpg'}}));
    TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      providers: [{provide: ActivatedRoute, useValue: activatedRouteSpy}, 
                  {provide: Location}, {provide: ApiService, useValue: apiServiceSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should render product in a <h5> tag", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h5').textContent).toContain('Bibimbap');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
