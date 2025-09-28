import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IClient, IGetClientInfo } from "../../Interfaces/ClientInterfaces";
import { GetClientInfoAPI } from "../../APIs/ClientAPIs";
const initialState:IClient={
    IsLoogedIn:false,
    ClientInfo:null,
}



const ClientInfoSlice = createSlice({
  name: 'Client',
  initialState,
  reducers: {
    SetLoggedInState:(state,action: PayloadAction<boolean>)=>{
    state.IsLoogedIn=action.payload;
    console.log( state.IsLoogedIn)
   }
  },
  extraReducers: (builder) => {
      builder 
       .addCase(GetClientInfoAPI.fulfilled, (state, action: PayloadAction<IGetClientInfo>) => {
               state.ClientInfo=action.payload
         })
      
       
  },
});
export const { SetLoggedInState } = ClientInfoSlice.actions;
export default ClientInfoSlice.reducer;
