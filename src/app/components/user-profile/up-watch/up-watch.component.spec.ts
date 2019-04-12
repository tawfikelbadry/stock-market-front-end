import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpWatchComponent } from './up-watch.component';

describe('UpWatchComponent', () => {
  let component: UpWatchComponent;
  let fixture: ComponentFixture<UpWatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpWatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
