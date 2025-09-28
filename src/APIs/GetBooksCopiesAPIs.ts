import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GetPaginatedBooksParams } from "../Interfaces/PublicInterfaces";
export const GetPaginatedBooksByCategory = createAsyncThunk(
  'Public/GetBooksByCategory',
  async (argument:GetPaginatedBooksParams) => {
 
    try {
      const response = await axios.get(
        `https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/public/book-copy/by-type/${argument.type},${argument.PageNumber},${argument.PageSize}`
      );
      return response.data.data;
    } catch (error) {
      return null;
    }
  }
);



export const GetBookInfo= createAsyncThunk(
  'Public/GetBookInfo',
  async (Id:any) => {
    
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/public/book-copy/by-id/${Id}`);
   
      return response.data.data;
    }catch(error){

      return null;
    }
  }
);





export const GetNewReleasedBooks= createAsyncThunk(
  'Public/GetInitialNewReleasedBooksCopiesData',
  async () => {
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/public/book-copy/new-releases/`);
      return response.data.data;
    }catch(error){
      return null;
    }
  }
);






export const GetRecommendedBooks= createAsyncThunk(
  'Public/GetRecommendedBooks',
  async () => {
    
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/public/book-copy/recommended/`);

      return response.data.data;
    }catch(error){
      return null;
    }
  }
);

export const GetBestSellersgBooks= createAsyncThunk(
  'Public/GetToSellersBooks',
  async () => {
    
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/public/book-copy/best-sellers/`);
 
      return response.data.data;
    }catch(error){
      return null;
    }
  }
);

export async function SearchBooksCopiesAPI(Name:string){
    
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/public/book-copy/by-name/${Name}`);
      
    return response.data.data;

  } catch (error: any) {
  
   return false;
  }
}

export const GetTopRatedBooks= createAsyncThunk(
  'Public/GetTopRatedBooks',
  async () => {
    
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/public/book-copy/top-rated/`);
 
      return response.data.data;
    }catch(error){
      return null;
    }
  }
);


export const GetBooksTypes= createAsyncThunk(
  'Public/GetBooksTypes',
  async () => {
    
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/public/book-copy/types/`);

      return response.data.data;
    }catch(error){
      return null;
    }
  }
);






