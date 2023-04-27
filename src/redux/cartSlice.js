import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [
      {
        id: "",
        name: "",
        desc: "",
        price: 0,
        totalItemPrice: 0,
        quantity: 0,
        base64Image: "",
      },
    ],
    totalQuantity: 0,
    totalCartPrice: 0,
    showCart: false,
  },
  reducers: {
    addCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.totalCartPrice += newItem.price;
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalItemPrice += newItem.price;
      } else {
        state.cart.push({
          id: newItem.id,
          name: newItem.name,
          desc: newItem.desc,
          price: newItem.price,
          totalItemPrice: newItem.price,
          quantity: 1,
          base64Image: action.payload.base64Image,
        });
      }
      console.log(newItem);
    },
    removeCart: (state) => {
      state.cart = [{}];
    },
    emptyCart: (state) => {
      state.cart = null;
      state.totalQuantity = 0;
      state.totalCartPrice = 0;
    },
  },
});

export const { addCart, removeCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
