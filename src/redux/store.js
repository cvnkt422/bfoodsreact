import { createStore } from "@reduxjs/toolkit";
import cartreducer from "../redux/slice";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const reducerFunction = (state = { cartCount: 0 }, action) => {
  if (action.type === "addToCart") {
    console.log("coming here reducer function");
    return { cartCount: action.payload };
  }

  if (action.type === "removeFromCart") {
    console.log("coming here reducer function");
    return { cartCount: action.payload };
  }
  return state;
};

//const store = createStore(reducerFunction);

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartCount: 0 },
  reducers: {
    add(state, action) {
      state.cartCount++;
    },
    decrement(state, action) {
      state.cartCount--;
    },
    login(state, action) {
      state.user = action.payload;
    },
    logout(state, action) {
      state.user = null;
    },
  },
});
export const actions = cartSlice.actions;

const store = configureStore({ reducer: cartSlice.reducer });

export default store;
