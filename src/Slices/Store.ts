import { configureStore } from '@reduxjs/toolkit';
import  booksSliceReducer  from "./PublicSlices/PGetBooksSlice";
import ClientInfoSliceReducer from "./ClientSlices/ClientInfoSlice"
import CartReducer from "./ClientSlices/CartSlice"
import EmployeeInfoSliceReducer from "./EmployeeSlices/EmployeeInfoSlice";
import ClubsInfoSliceReducer from "./ClientSlices/ClubsSlice"
const store = configureStore({
  reducer: {
    PublicSlice:booksSliceReducer,
    ClientInfoSlice:ClientInfoSliceReducer,
    CartSlice:CartReducer,
    EmployeeSlice:EmployeeInfoSliceReducer,
    ClubsInfoSlice:ClubsInfoSliceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;