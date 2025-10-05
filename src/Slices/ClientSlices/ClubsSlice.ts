import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetClubsTypesAPI, GetLatestEventsAPI, GetMostActiveClubsAPI, GetNewClubsAPI } from "../../APIs/ClubsAPIs";
import { IClub, IClubState, IClubType, IEvent } from "../../Interfaces/ClubsIntefaces";

const initialState:IClubState={
    NewClubs:null,
    MostActiveClubs:null,
    LatestEvents:null,
    ClubsTypes:null
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
       .addCase(GetLatestEventsAPI.fulfilled, (state, action: PayloadAction<IEvent[]|null|false>) => {
               state.LatestEvents=action.payload
         })
        .addCase(GetClubsTypesAPI.fulfilled, (state, action: PayloadAction<IClubType[]|null|false>) => {
               state.ClubsTypes=action.payload
         })   
  },
});

export default ClubsInfoSlice.reducer;
