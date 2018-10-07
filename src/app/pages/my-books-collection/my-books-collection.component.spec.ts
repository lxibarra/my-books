import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBooksCollectionComponent } from './my-books-collection.component';

describe('MyBooksCollectionComponent', () => {
  let component: MyBooksCollectionComponent;
  let fixture: ComponentFixture<MyBooksCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBooksCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBooksCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
