import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompnyprofileComponent } from './compnyprofile.component';

describe('CompnyprofileComponent', () => {
  let component: CompnyprofileComponent;
  let fixture: ComponentFixture<CompnyprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompnyprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompnyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
