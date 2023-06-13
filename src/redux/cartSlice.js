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
    shipAddr: {
      address1: "",
      city: "",
      country: "",
      email: "",
      gender: "",
      mobile: "",
      name: "",
      pin: "",
      state: "",
      username: "",
    },
    showShipAddr: true,
    showPayment: false,
    filter: false,
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
    },
    removeCart: (state, action) => {
      const newItem = action.payload;
      //Find index of specific object using findIndex method.
      const objIndex = state.cart.findIndex((obj) => obj.id === newItem.id);

      if (objIndex !== -1) {
        if (state.cart[objIndex].quantity !== -1) {
          state.cart[objIndex].quantity--;
          state.cart[objIndex].totalItemPrice =
            state.cart[objIndex].totalItemPrice - newItem.price;
          state.totalQuantity--;
          state.totalCartPrice = state.totalCartPrice - newItem.price;
          if (state.cart[objIndex].quantity === 0) {
            state.cart.splice(objIndex, 1);
          }
        }
      }
    },
    emptyCart: (state) => {
      state.cart = null;
      state.totalQuantity = 0;
      state.totalCartPrice = 0;
      state.cart = [
        {
          id: "",
          name: "",
          desc: "",
          price: 0,
          totalItemPrice: 0,
          quantity: 0,
          base64Image: "",
        },
      ];
    },

    addShipAddr: (state, action) => {
      state.shipAddr = action.payload;
      state.showPayment = true;
      state.showShipAddr = false;
    },

    proceedCheckOut: (state) => {
      state.showPayment = false;
      state.showShipAddr = true;
    },

    filterProducts: (state) => {
      state.filter = false;
    },
  },
});

export const {
  addCart,
  removeCart,
  emptyCart,
  addShipAddr,
  proceedCheckOut,
  filterProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
