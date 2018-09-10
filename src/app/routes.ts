import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddBookComponent } from './pages/add-book/add-book.component';

export const appRoutes: Routes = [
      {
        path: 'books/add',
        component: AddBookComponent
      },
];
