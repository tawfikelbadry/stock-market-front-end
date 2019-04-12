import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailNewComponent } from './detail-new.component';

describe('DetailNewComponent', () => {
  let component: DetailNewComponent;
  let fixture: ComponentFixture<DetailNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
