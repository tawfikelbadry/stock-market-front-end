import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpOffersComponent } from './up-offers.component';

describe('UpOffersComponent', () => {
  let component: UpOffersComponent;
  let fixture: ComponentFixture<UpOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
