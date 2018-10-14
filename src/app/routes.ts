import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { MyBooksCollectionComponent } from './pages/my-books-collection/my-books-collection.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuardService } from './Services/auth-guard.service';

export const appRoutes: Routes = [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'books/add',
        component: AddBookComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'books',
        component: MyBooksCollectionComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService]
      }
];
