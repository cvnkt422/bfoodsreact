import { configureStore } from "@reduxjs/toolkit";

import userSliceReducer from "./userSlice";
import cartSliceReducer from "./cartSlice";

export default configureStore({
  reducer: {
    user: userSliceReducer,
    cart: cartSliceReducer,
  },
});
