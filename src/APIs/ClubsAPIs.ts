import { createAsyncThunk } from "@reduxjs/toolkit";
import { IClubJoiningRequest } from "../Interfaces/ClubsIntefaces";
import api from "./API";

export const GetNewClubsAPI= createAsyncThunk(
  'Clubs/GetNew',
  async () => {
    
    try{
      const response=await api.get(`clubs/new`);    
      return response.data.data;

  } catch (error: any) {
  return false;
  }
  
  }
);

export const GetMostActiveClubsAPI= createAsyncThunk(
  'Clubs/GetMostActive',
  async () => {
    
    try{
      const response=await api.get(`clubs/most-active`);    
      return response.data.data;

  } catch (error: any) {
  return false;
  }
  
  }
);

export const GetLatestEventsAPI= createAsyncThunk(
  'Clubs/GetLatestEvents',
  async () => {
    
    try{
      const response=await api.get(`clubs/events/upcoming`);    
      return response.data.data;

  } catch (error: any) {
  return false;
  }
  
  }
);

export const GetClubsTypesAPI= createAsyncThunk(
  'Clubs/GetClubsTypesAPI',
  async () => {
    
    try{
      const response=await api.get(`clubs/types`);     
      return response.data.data;

  } catch (error: any) {
  return false;
  }
  
  }
);


export async function GetClubInfoAPI(StudentId:number,id:number){
  try{
      const response=await api.get(`clubs/by-id/${StudentId},${id}`);    
      return response.data.data;

  } catch (error: any) {
  return false;
  }
}


export async function GetClubsPaginatedAPI(Name:string,PageNumber:number,PageSize:number){
  try{
      const response=await api.get(`clubs/search-by-name`,
        {
            params: {
      name: Name ?? "",   
      pageNumber: PageNumber,
      pageSize: PageSize,
    },
        }
      );    
      return response.data.data;

  } catch (error: any) {
  return false;
  }
}

export async function GetClubsByTypeAPI(TypeId:number,Name:string){
  try{
      const response=await api.get(`clubs/by-type/`,{
      params: {
      typeId: TypeId,   
      name: Name ?? "",   
    },
      });    
      return response.data.data;

  } catch (error: any) {
  return false;
  }
}


export async function ViewEventByIdAPI(Id:number){
  try{
      const response=await api.post(`clubs/event/${Id}/view`);    
      return response.data.data;

  } catch (error: any) {
  return false;
  }
}



export async function GetClubEventsAPI(UserId:number,id:number){
  try{
      const response=await api.get(`clubs/events/${UserId},${id}`);    
      return response.data.data;

  } catch (error: any) {
  return false;
  }
}


export async function JoiningClubRequestAPI(form:IClubJoiningRequest){
  try{
      await api.post(`clubs/join/`,form,{
        headers:{Authorization:`header ${localStorage.getItem("authToken")}`}
      });    
      return true;

  } catch (error: any) {
  return false;
  }
}


export async function JoiningClubEventAPI(EventId:number){
  try{
      await api.post(`clubs/event/${EventId}/join/`,{},{
        headers:{
           Authorization: `bearer ${localStorage.getItem("authToken")}`,
        }
      });
      return true;

  } catch (error: any) {
  return false;
  }
}


export async function GetClubEventByIdAPI(StudentId:number,id:number){
  try{
      const response=await api.get(`clubs/event/${StudentId},${id}`);    
      return response.data.data;

  } catch (error: any) {
  return false;
  }
}


export async function GetEventsPaginatedAPI(PageNumber:number,PageSize:number){
  try{
      const response=await api.get(`clubs/events/${PageNumber},${PageSize}`);    
      return response.data.data;

  } catch (error: any) {
  return false;
  }
}

export async function SearchEventsByNameAPI(Name:string,PageNumber:number,PageSize:number){
  try{
   const response = await api.get(
      `clubs/events/search-by-name`,
      {
        params: {
      name: Name ?? "",   
      pageNumber: PageNumber,
      pageSize: PageSize,
    },
      }
    );
      return response.data.data;

  } catch (error: any) {
  return false;
  }
}

export async function GetClubMembersAPI(id:number){
  try{
      const response=await api.get(`clubs/members/${id}`);    
      return response.data.data;

  } catch (error: any) {
  return false;
  }
}