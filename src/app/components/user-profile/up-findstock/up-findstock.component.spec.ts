import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpFindstockComponent } from './up-findstock.component';

describe('UpFindstockComponent', () => {
  let component: UpFindstockComponent;
  let fixture: ComponentFixture<UpFindstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpFindstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpFindstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
