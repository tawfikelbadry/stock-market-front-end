import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpBlogComponent } from './up-blog.component';

describe('UpBlogComponent', () => {
  let component: UpBlogComponent;
  let fixture: ComponentFixture<UpBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
