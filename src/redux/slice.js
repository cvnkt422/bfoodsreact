import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "cart",
  initialState: {
    cartCount: 11111,
  },
  reducers: {
    addtocart: (state) => {
      console.log("inside slice ", state.cartCount);
      state.cartCount = state.cartCount;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addtocart } = slice.actions;

export default slice.reducer;
