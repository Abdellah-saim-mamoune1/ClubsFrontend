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
   },
    SetNewImageState:(state,action: PayloadAction<string>)=>{
    if(state.ClientInfo!==null)
      state.ClientInfo.imageUrl=action.payload;
   },
   ClearClientInfo:(state)=>{
    state.ClientInfo=null;
    state.IsLoogedIn=false;
     localStorage.clear();
  },
},
  extraReducers: (builder) => {
      builder 
       .addCase(GetClientInfoAPI.fulfilled, (state, action: PayloadAction<IGetClientInfo>) => {
               state.ClientInfo=action.payload
         })
      
       
  },
});
export const { SetLoggedInState,SetNewImageState,ClearClientInfo } = ClientInfoSlice.actions;
export default ClientInfoSlice.reducer;
