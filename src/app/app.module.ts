import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/Database';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

import { environment  } from '../environments/environment';
import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AddBookComponent } from './pages/add-book/add-book.component';

import { BookSearchComponent } from './components/book-search/book-search.component';
import { GoogleBooksAPIService } from './Services/google-books-api.service';
import { FirebaseAuthService } from './Services/firebaseAuth/firebase-auth.service';
import { DatabaseService } from './Services/firebaseDB/database.service';
import { AuthGuardService } from './Services/auth-guard.service';
import { BookSearchResultsComponent } from './components/book-search/book-search-results/book-search-results.component';
import { EscapeHTMLPipe } from './core/pipes/html.pipe';
import { BookReaderDetailsComponent } from './components/book-reader-details/book-reader-details.component';
import { LoginComponent } from './pages/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MyBooksCollectionComponent } from './pages/my-books-collection/my-books-collection.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BooksCollectionComponent } from './pages/books-collection/books-collection.component';

@NgModule({
  declarations: [
    AppComponent,
    EscapeHTMLPipe,
    NavBarComponent,
    AddBookComponent,
    BookSearchComponent,
    BookSearchResultsComponent,
    BookReaderDetailsComponent,
    LoginComponent,
    SignInComponent,
    MyBooksCollectionComponent,
    ProfileComponent,
    BooksCollectionComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'my-ssr' }),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireFunctionsModule
  ],
  providers: [
    GoogleBooksAPIService,
    FirebaseAuthService,
    DatabaseService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ) {
    const platform = isPlatformBrowser(platformId) ? 'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
