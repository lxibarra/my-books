import { TestBed, inject } from '@angular/core/testing';

import { GoogleBooksAPIService } from './google-books-api.service';

describe('GoogleBooksAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleBooksAPIService]
    });
  });

  it('should be created', inject([GoogleBooksAPIService], (service: GoogleBooksAPIService) => {
    expect(service).toBeTruthy();
  }));
});
