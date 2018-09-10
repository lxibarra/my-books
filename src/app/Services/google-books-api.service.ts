import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksAPIService {

  constructor(private http: HttpClient) { }

  public searchBooks(criteria: string): Observable<any> {
    return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURI(criteria)}`);
  }
}
