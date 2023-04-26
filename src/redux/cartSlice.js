import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [{}] },
  reducers: {
    addCart: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.cart = [...state.cart, action.payload];
    },
    emptyCart: (state) => {
      state.cart = [{}];
    },
  },
});

export const { addCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
