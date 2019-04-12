import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpPaymentComponent } from './up-payment.component';

describe('UpPaymentComponent', () => {
  let component: UpPaymentComponent;
  let fixture: ComponentFixture<UpPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
