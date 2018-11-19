import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/';
import { IBookSearchItem } from '../../interfaces/IGoogleBooks';

@Component({
  selector: 'app-book-description',
  templateUrl: './book-description.component.html',
  styleUrls: ['./book-description.component.scss']
})
export class BookDescriptionComponent implements OnInit {

  @Output() selectBook = new EventEmitter<{ component: any,  book: IBookSearchItem}>();

  private _item: IBookSearchItem;
  _item$ = new BehaviorSubject<IBookSearchItem>(null);
  @Input() set item (value: IBookSearchItem) {
    this._item$.next(value);
  }

  _actionLabel: string;
  _actionLabel$ = new BehaviorSubject<string>('');
  @Input() set actionLabel(value: string) {
    this._actionLabel$.next(value);
  }

  _actionButtonVisible = true;
  _actionButtonVisible$ = new BehaviorSubject<boolean>(true);
  @Input() set actionButtonVisible(value: boolean) {
    this._actionButtonVisible$.next(value);
  }

  constructor() { }

  onSelectBook(book: IBookSearchItem) {
    // i left here figure out a way to communicate state between indivual components and
    // child ones depending on actions.
    // Redux might be the solution to avoid having unknown state at a given time.
    // but i feel it might be to much because i have to modify the state on each search
    this.selectBook.emit({
      component: {
        actionButtonVisible: value => this._actionButtonVisible$.next(value)
      },
      book
    });
  }

  ngOnInit() {
    this._item$.subscribe(value => this._item = value);
    this._actionButtonVisible$.subscribe(value => this._actionButtonVisible = value);
    this._actionLabel$.subscribe(value => this._actionLabel = value);
  }

}
