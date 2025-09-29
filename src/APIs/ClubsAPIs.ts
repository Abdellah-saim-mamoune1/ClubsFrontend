import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetNewClubsAPI= createAsyncThunk(
  'Clubs/GetNew',
  async () => {
    
    try{
      const response=await axios.get(`https://localhost:7048/api/clubs/new`);    
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
      const response=await axios.get(`https://localhost:7048/api/clubs/most-active`);    
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
      const response=await axios.get(`https://localhost:7048/api/clubs/events/upcoming`);    
      return response.data.data;

  } catch (error: any) {
  return false;
  }
  
  }
);