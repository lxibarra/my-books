import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { LoginComponent } from './pages/login/login.component';
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
];
