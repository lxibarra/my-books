// make this work to avoid clutter in the app.module
import { NgModule } from '@angular/core';
import { AddBookComponent } from './add-book/add-book.component';

@NgModule({
  declarations: [
    AddBookComponent
  ],
  imports: [
    AddBookComponent
  ],
  exports: [
    AddBookComponent
  ]
})
export class PageModule {
  constructor() { }
}
