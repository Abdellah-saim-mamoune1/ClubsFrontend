import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetMostActiveClubsAPI, GetNewClubsAPI } from "../../APIs/ClubsAPIs";
import { IClub, IClubState } from "../../Interfaces/ClubsIntefaces";

const initialState:IClubState={
    NewClubs:null,
    MostActiveClubs:null
}
const ClubsInfoSlice = createSlice({
  name: 'Clubs',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
      builder 
       .addCase(GetNewClubsAPI.fulfilled, (state, action: PayloadAction<IClub[]|null|false>) => {
               state.NewClubs=action.payload
         })
       .addCase(GetMostActiveClubsAPI.fulfilled, (state, action: PayloadAction<IClub[]|null|false>) => {
               state.MostActiveClubs=action.payload
         })   
  },
});

export default ClubsInfoSlice.reducer;
