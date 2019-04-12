import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpStockComponent } from './up-stock.component';

describe('UpStockComponent', () => {
  let component: UpStockComponent;
  let fixture: ComponentFixture<UpStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
