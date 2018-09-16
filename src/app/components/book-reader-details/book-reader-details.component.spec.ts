import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReaderDetailsComponent } from './book-reader-details.component';

describe('BookReaderDetailsComponent', () => {
  let component: BookReaderDetailsComponent;
  let fixture: ComponentFixture<BookReaderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookReaderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReaderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
