export interface IBooksSearchResult {
  totalItems: number;
  kind: string;
  items: IBookSearchItem[];
}

export interface IBookSearchItem {
  accessInfo: any;
  etag: string;
  id: string;
  kind: string;
  saleInfo: {
    country: string;
    isEbook: boolean;
    saleability: string;
  };
  searchInfo: {
    textSnippet: string;
  };
  selfLink: string;
  volumeInfo: IBookVolumeInfo;
}

export interface IBookVolumeInfo {
  allowAnonLogging: boolean;
  authors: string[];
  averageRating: number;
  canonicalVolumeLink: string;
  categories: string[];
  contentVersion: string;
  description: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  industryIdentifiers: IBookISBN[];
  infoLink: string;
  language: string;
  maturityRating: string;
  pageCount: number;
  previewLink: string;
  printType: string;
  publishedDate: string;
  publisher: string;
  ratingsCount: number;
  readingModes: any;
  title: string;
}

export interface IBookISBN {
  type: string;
  identifier: string;
}
