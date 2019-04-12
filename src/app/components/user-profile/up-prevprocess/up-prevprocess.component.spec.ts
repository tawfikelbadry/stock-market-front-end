import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpPrevprocessComponent } from './up-prevprocess.component';

describe('UpPrevprocessComponent', () => {
  let component: UpPrevprocessComponent;
  let fixture: ComponentFixture<UpPrevprocessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpPrevprocessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpPrevprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
