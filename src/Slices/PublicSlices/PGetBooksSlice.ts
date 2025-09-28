
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {GetBooksTypes, GetNewReleasedBooks} from '../../APIs/GetBooksCopiesAPIs.ts'
import { GetBestSellersgBooks} from '../../APIs/GetBooksCopiesAPIs.ts';
import { GetRecommendedBooks } from '../../APIs/GetBooksCopiesAPIs.ts';
import { GetPaginatedBooksByCategory } from '../../APIs/GetBooksCopiesAPIs.ts';
import { Book } from '../../Interfaces/PublicInterfaces';
import { BooksState } from '../../Interfaces/PublicInterfaces';
import { BookType } from '../../Interfaces/PublicInterfaces';
import { BooksByTypePaginated } from '../../Interfaces/PublicInterfaces';
import { GetProductInfo } from '../../Interfaces/PublicInterfaces'; 
import { GetBookInfo } from '../../APIs/GetBooksCopiesAPIs.ts';
import { GetTopRatedBooks } from '../../APIs/GetBooksCopiesAPIs.ts';

const initialState: BooksState = {
  NewReleasedBooks: null,
  RecommendedBooks:null,
  TopRatedBooks:null,
  BestSellersBooks:null,
  BooksTypes:null,
  SelectedBookType:null,
  BooksByCategory:null,
  GetProductInfo :null
};


const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    SetSelectedCategory:(state,action: PayloadAction< BookType>)=>{
    state. SelectedBookType=action.payload;
   },
   SetSelectedBook:(state,action :PayloadAction<GetProductInfo>)=>{
    state.GetProductInfo=action.payload
   }
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetNewReleasedBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.NewReleasedBooks = action.payload==null?null:action.payload;
      })
      .addCase(GetNewReleasedBooks.rejected, (state)=> {
        state.NewReleasedBooks = null;
      })
       .addCase(GetRecommendedBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.RecommendedBooks = action.payload==null?null:action.payload;
      })
      .addCase(GetRecommendedBooks.rejected, (state)=> {
        state.RecommendedBooks= null;
      })
       .addCase(GetBestSellersgBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.BestSellersBooks = action.payload==null?null:action.payload;
      })
      .addCase(GetBestSellersgBooks.rejected, (state)=> {
        state.BestSellersBooks= null;
      })
      .addCase(GetBooksTypes.fulfilled, (state, action: PayloadAction<BookType[]>) => {
        state.BooksTypes = action.payload==null?null:action.payload;
      })
      .addCase(GetPaginatedBooksByCategory.fulfilled, (state, action: PayloadAction< BooksByTypePaginated >) => {
       
       state.BooksByCategory= action.payload==null?null:action.payload;
      })
      .addCase( GetBookInfo.fulfilled, (state, action: PayloadAction< GetProductInfo>) => {
       state.GetProductInfo= action.payload==null?null:action.payload;
      })
      .addCase(GetTopRatedBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
       state.TopRatedBooks= action.payload==null?null:action.payload;
      })
    
     
  },
});
export const { SetSelectedCategory,SetSelectedBook } = booksSlice.actions;
export default booksSlice.reducer;
