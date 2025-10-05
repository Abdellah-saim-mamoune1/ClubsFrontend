import { configureStore } from '@reduxjs/toolkit';
import ClientInfoSliceReducer from "./ClientSlices/ClientInfoSlice"
import ClubsInfoSliceReducer from "./ClientSlices/ClubsSlice"
const store = configureStore({
  reducer: {
    
    ClientInfoSlice:ClientInfoSliceReducer,
    ClubsInfoSlice:ClubsInfoSliceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;