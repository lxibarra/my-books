import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Tech debt move all components to their own module where they can be imported by both modules (server and client)
import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { Page2Component } from './page2/page2.component';
import { Page1Component } from './page1/page1.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { BookSearchComponent } from './components/book-search/book-search.component';
import { GoogleBooksAPIService } from './Services/google-books-api.service';
import { BookSearchResultsComponent } from './components/book-search/book-search-results/book-search-results.component';

@NgModule({
  declarations: [
    AppComponent,
    Page2Component,
    Page1Component,
    NavBarComponent,
    AddBookComponent,
    BookSearchComponent,
    BookSearchResultsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'my-ssr' }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    GoogleBooksAPIService
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
