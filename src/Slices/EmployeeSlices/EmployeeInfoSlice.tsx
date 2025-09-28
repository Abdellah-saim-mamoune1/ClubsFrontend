import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmployee, IGetEmployee } from "../../Interfaces/EmployeeInterfaces";
import { GetEmployeeInfoAPI } from "../../APIs/EmployeeAPIs";
const initialState:IEmployee={
    UserType:localStorage.getItem("UserType")??"Client",
    IsLoggedIn:false,
    EmployeeInfo:null,
}



const EmployeeInfoSlice = createSlice({
  name: 'Employee',
  initialState,
  reducers: {
    SetEmployeeLoggedInState:(state,action: PayloadAction<boolean>)=>{
    state.IsLoggedIn=action.payload;
   },
   SetUserType:(state,action: PayloadAction<string>)=>{
    state.UserType=action.payload;
   }
  },
  extraReducers: (builder) => {
      builder 
       .addCase(GetEmployeeInfoAPI.fulfilled, (state, action: PayloadAction<IGetEmployee>) => {
               state.EmployeeInfo=action.payload
         })
      
       
  },
});
export const { SetEmployeeLoggedInState,SetUserType } = EmployeeInfoSlice.actions;
export default EmployeeInfoSlice.reducer;
