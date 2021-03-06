import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../api.service';
import { of } from 'rxjs';
import { SpinnerComponent } from '../core/spinner/spinner.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  const activatedRouteSpy = {snapshot: { paramMap: {get: () => {}}}};
  const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getProduct']);
  const locationSpy = jasmine.createSpyObj('Location', ['back']);

  beforeEach(async(() => {
  apiServiceSpy.getProduct.and.returnValue(of(
    {
      attributes:
        {
        name: 'Bibimbap',
        price: 49, description: 'The best we offer.',
        image: 'http://richtree.com/wp-content/uploads/sites/2/2016/10/IMG_2392.jpg'
      }
    }));
  TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent, SpinnerComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: Location, useValue: locationSpy},
        {provide: ApiService, useValue: apiServiceSpy}],
      imports: [ RouterModule ]
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

  it('html should render product name in a <h5> tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h5').textContent).toContain('Bibimbap');
  });

  it('should get the product', () => {
    expect(component.getProduct).toBeDefined();
  });

  it('tracks that the product method was called', () => {
    expect(apiServiceSpy.getProduct).toHaveBeenCalled();
  });

  it('tracks all the arguments of its calls', () => {
    expect(apiServiceSpy.getProduct).toHaveBeenCalledWith(NaN);
  });

  it('html should render one product description', () => {
    const el = fixture.nativeElement.querySelector('p');
    expect(el.innerText).toContain('The best we offer.');
  });

  it('goBack() should go to products page', () => {
    const el = fixture.nativeElement.querySelector('button');
    el.dispatchEvent(new Event('click'));
    expect(locationSpy.back).toHaveBeenCalled();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
