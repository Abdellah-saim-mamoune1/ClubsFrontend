import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { GetCartAPI } from "../../APIs/ClientAPIs";


export interface CartItem  {
 id :number,
 productId:number,
 name: string,
 imageUrl :string,
 totalPrice :number,
 totalQuantity :number,
 bookCopyQuantity:number,
 createdAt :string
}


interface CartState {
  Quantity: number;
  Items: CartItem[] ;
}



const initialState: CartState = {

  Quantity: 0,
  Items: [],
};

const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    // Add book to cart
    AddToCart: (state, action: PayloadAction<CartItem>) => {
      if (!state.Items) state.Items = [];

      const existingItem = state.Items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.totalQuantity += 1;
      } else {
        state.Items.push({ ...action.payload, totalQuantity: 1 });
      }

      state.Quantity += 1;
    },

    // Remove a book from the cart completely
    RemoveFromCart: (state, action: PayloadAction<number>) => {
      if (!state.Items) return;

      const index = state.Items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.Quantity -= state.Items[index].totalQuantity;
        state.Items.splice(index, 1);
      }

      if (state.Items.length === 0) state.Items = [];
    },

    UpdateItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      if (!state.Items) return;

      const item = state.Items.find((item) => item.id === action.payload.id);
      if (item) {
        state.Quantity-=item.totalQuantity ;
        item.totalQuantity= action.payload.quantity;
        state.Quantity += action.payload.quantity;
      }
    },
    
    ClearCart: (state) => {
      state.Items = [];
      state.Quantity = 0;
    },
  },

  extraReducers: (builder) => {
      builder
        .addCase(GetCartAPI.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
          state.Items = action.payload==null?[]:action.payload;
          let quantity=0;
          action.payload.length!=0&&action.payload.forEach(s=>quantity+=s.totalQuantity);
          state.Quantity=quantity;
         
        })
      
      }
});

export const {
  AddToCart,
  RemoveFromCart,
  UpdateItemQuantity,
  ClearCart,
} = CartSlice.actions;

export default CartSlice.reducer;
