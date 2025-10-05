import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./API";


export async function GetStudentDataByIdAsync(id:number){

  try{
      const response=await api.get(`user/by-id/${id}`,{ withCredentials:true});
       return response.data.data;
  }catch{
    return false;
  }
}

export async function UpdateStudentImageAPIAsync(ImageUrl:string){

  try{
      await api.put(`user/image/`,{ImageUrl},{
         withCredentials:true,
         headers: {
       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
      });
       return true;
  }catch{
    return false;
  }
}

export const GetClientInfoAPI= createAsyncThunk(
  'Client/GetClientInfo',
  async () => {
    
    try{
      const response=await api.get(`user`,{
       headers: {
       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
    });
  
    return response.data.data;

  } catch (error: any) {
     
    return null;
  }
  
}
);

export async function IsStudentLoggedInAPI(){
    
    try{
     await api.post(`authentication/is-logged-in`,{},{
      withCredentials:true,
      headers: {
       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
    });
     
    return true;

  } catch (error: any) {
  
   return false;
  }
}
