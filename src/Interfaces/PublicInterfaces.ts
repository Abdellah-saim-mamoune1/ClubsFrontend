
export interface Login{
  account:string;
  password:string;
}


export interface Book {
  id: number;
  name: string;
  imageUrl: string;
  price :number;
  authorName:string
}


export interface BookType {
  id: number;
  name: string;
}
export interface BooksByTypePaginated {
 quantity:number;
 totalPages:number;
 pageNumber:number;
 pageSize:number;
 booksCopies:Book[]|null;

}

export interface GetPaginatedBooksParams {
  type: string;
  PageNumber: number;
  PageSize: number;
}

export interface GetProductInfo {
   id:number,
   name:string,
   imageUrl:string,
   category:string,
   author:string,
   description :string,
   price:number,
   quantity:number,
   averageRating:number,
   ratingsCount:number   
}


export interface IPagination{
 pageNumber:number
 pageSize:number
}

export interface BooksState {
  NewReleasedBooks: Book[]|null;
  RecommendedBooks:Book[]|null;
  TopRatedBooks:Book[]|null;
  BestSellersBooks:Book[]|null;
  BooksTypes:BookType[]|null;
  BooksByCategory:BooksByTypePaginated|null;
  SelectedBookType:BookType|null;
  GetProductInfo :GetProductInfo |null;
}
