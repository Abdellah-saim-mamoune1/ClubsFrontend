import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { IAddOrder, IContactUs, IRestPassword, ISignUp, IUpdateClientInfo, UpdateCartItem } from "../Interfaces/ClientInterfaces";
import { IPagination } from "../Interfaces/PublicInterfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SetLoggedInState } from "../Slices/ClientSlices/ClientInfoSlice";



export const GetCartAPI= createAsyncThunk(
  'Cart/GetCart',
  async () => {
    
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/client/cart`,{
      withCredentials: true,
    });
    
    return response.data.data;

  } catch (error: any) {
    console.log(error.response.data);
  
  }
  
  return null;}
);



export const GetClientInfoAPI= createAsyncThunk(
  'Client/GetClientInfo',
  async () => {
    
    try{
      const response=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/client/manage`,{
      withCredentials: true,
    });
    
    return response.data.data;

  } catch (error: any) {
     
  
  }
  
  return null;}
);

export async function UpdateClientInfoAPI(data:IUpdateClientInfo){
    
    try{
     await axios.patch(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/client/manage`,data,{
      withCredentials: true,
    });
     
    return true;

  } catch (error: any) {
  
   return false;
  }
}

export async function  DeleteCookiesAPI(){
    try{
      await axios.delete(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/public/authentication/cookies/`,{
      withCredentials: true,
    });
    
    return true;

  } catch (error: any) {
   
   return false;
  }
}





export async function ResetPasswordAPI(data:IRestPassword){
    
    try{
      await axios.put(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/client/manage/password/`,data,{
      withCredentials: true,
    });
      
    return true;

  } catch (error: any) {
    console.log(error.response.data);
   return false;
  }
}


export async function AddOrderAPI(data:IAddOrder,navigate:NavigateFunction){
    
    try{
      await axios.post(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/client/orders/`,data,{
      withCredentials: true,
    });
      
    return true;

  } catch (error: any) {
     const refreshed = await CheckAuth(navigate);
      if (refreshed) {
        return await  AddOrderAPI(data,navigate);
      }
   return false;
  }
}



export const RefreshClientTokens2= createAsyncThunk(
    'Cart/GetCart',
  async (_,thunkAPI) => {
    
  try {
   
    const Role="Client";
    await axios.post(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/public/authentication/refresh-tokens/${Role}`,{}, {
      withCredentials: true,
    });
    thunkAPI.dispatch(SetLoggedInState(true));
   
    return true;
  } catch (error: any) {
  
    return false;
  }
})


export async function ContactUsAPI(data:IContactUs){
  try {
   
    const result=await axios.post(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/public/contact/`,data);
    return result.data.data;
  } catch (error: any) {
     
    return false;
  }
}


export async function GetOrdersAPI(pagination:IPagination){
   
  try {
   
    const result=await axios.get(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/client/orders/${pagination.pageNumber},${pagination.pageSize}`, {
      withCredentials: true,
    });
    return result.data.data;
  } catch (error: any) {
   
    return null;
  }
}



export async function SignUpAPI(data:ISignUp){
   
  
  try {
   
    const result=await axios.post(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/public/sign-up/`,data);
    return result.data;
  } catch (error: any){
    return false;
  }
}


async function CheckAuth(navigate:NavigateFunction): Promise<boolean> {
  try {
    if (await RefreshClientTokens()) {
      return true;
    }
  } catch (error: any) {

    navigate("/Login")
  }
  return false;
}


export async function RefreshClientTokens(){
  try {
    const Role="Client";
    await axios.post(`https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/public/authentication/refresh-tokens/${Role}`,{}, {
      withCredentials: true,
    });
      
    console.log("logged in");
    return true;
  } catch (error: any) {
    console.log("not logged in")
    console.log(error)
    return false;
  }
}


 export async function AddProductToCartAPI(Id:number,navigate:NavigateFunction) {
  try {
    const response = await axios.post(
      `https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/client/cart/${Id}`,{},
      { withCredentials: true }
    );

    return response.data.data;

  } catch (error: any) {

      const refreshed = await CheckAuth(navigate);
      if (refreshed) {
        return await  AddProductToCartAPI(Id,navigate);
      }
    } 

  return false;
}




export async function UpdateCartProductAPI(data:UpdateCartItem,navigate:NavigateFunction) {
  try {
   
    const response = await axios.put(
      `https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/client/cart/`,data,
      { withCredentials: true }
    );

    console.log("Cart Data:", response.data);
    return response.data;

  } catch (error: any) {
    console.log(error.response.data);
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized, trying to refresh...");

      const refreshed = await CheckAuth(navigate);
      if (refreshed) {
     
        return await  UpdateCartProductAPI(data,navigate);
      }
    } 
  }

  return null;
}




export async function DeleteCartProductAPI(Id:number,navigate:NavigateFunction) {
  try {
   
    const response = await axios.delete(
      `https://mybackendecommerce-app-argfascphqaedvaq.spaincentral-01.azurewebsites.net/api/client/cart/${Id}`,
      { withCredentials: true }
    );

    console.log("Cart Data:", response.data);
    return response.data;

  } catch (error: any) {
    console.log(error.response.data);
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized, trying to refresh...");

      const refreshed = await CheckAuth(navigate);
      if (refreshed) {
       
        return await  DeleteCartProductAPI(Id,navigate);
      }
    } 
  }

  return null;
}

