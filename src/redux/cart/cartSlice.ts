import { createSlice } from "@reduxjs/toolkit";
import { TProducts } from "../../helpers";


type TCart = {
  cart: TProducts[];
};

const initialState: TCart = {
  cart: [],
};



const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const item: TProducts = action.payload;
      const stockOut = state.cart.find((i) => i._id === item._id);
      const existingItem: TProducts | undefined = state.cart.find(
        (i) => i._id === item._id
      );
      if (stockOut?.quantity === item.quantity) {
        console.log("stockOut :", stockOut);
        return;
      }
     
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
    },
    productIncrement: (state, action) => {
      const id = action.payload;
      const existingItem: TProducts | undefined = state.cart.find(
        (i) => i._id === id
      );
      if(existingItem){
        existingItem.quantity += 1;
      }
    },
    productDecrement: (state, action) => {
      const id = action.payload;
      const existingItem: TProducts | undefined = state.cart.find(
        (i) => i._id === id
      );
      if(existingItem && existingItem.quantity > 1){
        existingItem.quantity -= 1;
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((i) => i._id !== id);
    },
    checkOut : (state) => {
      state.cart = [];
    }
  },
});

export const { addToCart,productIncrement,productDecrement,removeFromCart,checkOut } = cartSlice.actions;
export default cartSlice.reducer;
