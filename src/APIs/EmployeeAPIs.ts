import axios from "axios";
import { IPagination } from "../Interfaces/PublicInterfaces";
import { IAddEmployee, IAddNewBookCopy,IGetBook,IPerson,IUpdateBookCopy } from "../Interfaces/EmployeeInterfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SetEmployeeLoggedInState, SetUserType } from "../Slices/EmployeeSlices/EmployeeInfoSlice";
import { SetUserTypeToLocalStorage } from "../Utilities/UClient";
import { IRestPassword } from "../Interfaces/ClientInterfaces";

export async function  GetTotalsAPI(){
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/statistics/`,{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {
   
   return false;
  }
}


export async function  GetResentOrders(){
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/statistics/resent-orders/`,{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {
   
   return false;
  }
}

export async function  GetNewClients(){
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/statistics/new-clients/`,{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {
  
   return false;
  }
}

export async function  GetAllClients(){
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/statistics/clients/`,{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {
   
   return false;
  }
}


export async function  GetPaginatedAuthors(pagination:IPagination){
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/author/${pagination.pageNumber},${pagination.pageSize}`,{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {

   return false;
  }
}

export async function  GetPaginatedBooks(pagination:IPagination){
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/book/${pagination.pageNumber},${pagination.pageSize}`,{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {
  
   return false;
  }
}




export async function  AddBook(data:string){
    try{
      const response=await axios.post(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/book/${data}`,{},{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {
   console.log(error);
   return false;
  }
}

export async function  DeleteBook(Id:Number){
    try{
      const response=await axios.delete(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/book/${Id}`,{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {
   
   return false;
  }
}

export async function  UpdateBook(data:IGetBook){
    try{
      const response=await axios.put(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/book/`,data,{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {
 
   return false;
  }
}


export async function  UpdateAuthor(Id:number,Name:string){
    try{
      const response=await axios.put(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/author/${Id},${Name}`,{},{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {
  
   return false;
  }
}

export async function  AddNewAuthor(Name:string){
    try{
      const response=await axios.post(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/author/${Name}`,{},{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {
  
   return false;
  }
}


export async function  DeleteAuthor(Id:number){
    try{
      const response=await axios.delete(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/author/${Id}`,{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {
   
   return false;
  }
}



export async function  GetPaginatedBookCopies(Pagination:IPagination){
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/client/book-copy/${Pagination.pageNumber},${Pagination.pageSize}`,{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {
 
   return false;
  }
}

export async function  DeleteBookCopy(Id:number){
    try{
      const response=await axios.delete(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/client/book-copy/${Id}`,{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {
  
   return false;
  }
}



export async function AddNewBookCopy(data:IAddNewBookCopy){
    try{
      const response=await axios.post(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/client/book-copy/`,data,{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {
   
   return false;
  }
}

export async function UpdateBookCopy(data:IUpdateBookCopy){
    try{
      const response=await axios.put(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/client/book-copy/`,data,{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {
  
   return false;
  }
}




export async function GetAllOrders(pagination:IPagination){
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/order/${pagination.pageNumber},${pagination.pageSize}`,{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {
   
   return false;
  }
}

export async function SetOrderStatus(OrderId:number,Status:string){
    try{
      const response=await axios.put(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/order/set-status/${OrderId},${Status}`,{},{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {
   
   return false;
  }
}





export async function GetAllEmployees(){
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/employees/`,{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {
   
   return false;
  }
}


export async function AddNewEmployee(data:IAddEmployee){
    try{
      const response=await axios.post(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/`,data,{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {
   console.log(error);
   return false;
  }
}


export async function DeleteEmployee(Id:number){
    try{
      const response=await axios.delete(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/${Id}`,{
      withCredentials: true,
    });
    return response.data.data;

  } catch (error: any) {
   
   return false;
  }
}

export async function ResetPassword(data:IRestPassword){
    try{
      const response=await axios.put(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/password/`,data,
         { withCredentials: true}
      );
    return response.data.data;

  } catch (error: any) {
   
   return false;
  }
}

export async function UpdatePersonlaInfoAPI(data:IPerson){
    try{
      const response=await axios.put(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/`,data,
       { withCredentials: true}
      );
    return response.data.data;

  } catch (error: any) {
   
   return false;
  }
}

export async function GetClientsMessagesAPI(){
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/contact/`,
       { withCredentials: true}
      );
    return response.data.data;

  } catch (error: any) {
   
   return false;
  }
}



export async function DeleteClientMessageAPI(Id:number){
    try{
      const response=await axios.delete(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/contact/${Id}`,
       { withCredentials: true}
      );
    return response.data.data;

  } catch (error: any) {
   
   return false;
  }
}

export async function SearchAuthorByIdAPI(Id:number){
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/public/employee/by-id/${Id}`,
       { withCredentials: true}
      );
    return response.data.data;

  } catch (error: any) {
   
   return false;
  }
}

export async function SearchAuthorByNameAPI(Name:string){
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/public/employee/by-name/${Name}`,
       { withCredentials: true}
      );
    return response.data.data;

  } catch (error: any) {
   
   return false;
  }
}

export async function SearchBookByIdAPI(Id:number){
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/book/by-id/${Id}`,
       { withCredentials: true}
      );
    return response.data.data;

  } catch (error: any) {
   
   return false;
  }
}


export async function SearchBookByNameAPI(Name:string){
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/book/by-name/${Name}`,
       { withCredentials: true}
      );
     
    return response.data.data;

  } catch (error: any) {
   
   return false;
  }
}

export async function SearchBookCopyByIdAPI(Id:number){
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/client/book-copy/by-id/${Id}`,
       { withCredentials: true}
      );
      
    return response.data.data;

  } catch (error: any) {
   
   return false;
  }
}



export const GetEmployeeInfoAPI= createAsyncThunk(
  'Employee/GetEmployeeInfoAPI',
  async () => {
    
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/employee/employee/`,{
      withCredentials: true,
    });
    
    return response.data.data;

  } catch (error: any) {
    
  }
  
  return null;}
);



export const RefreshEmployeeTokens= createAsyncThunk(
    'Cart/GetCart',
  async (_,thunkAPI) => {
    
  try {
    
    const Role=localStorage.getItem("UserType");
    console.log(Role);
    await axios.post(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/Authorization/refresh-tokens/${Role}`,{}, {
      withCredentials: true,
    });
    thunkAPI.dispatch(SetEmployeeLoggedInState(true));
    
    return true;
  } catch (error: any) {
    thunkAPI.dispatch(SetEmployeeLoggedInState(false));
    thunkAPI.dispatch(SetUserType("Client"));
    SetUserTypeToLocalStorage("Client");

    return false;
  }
})
