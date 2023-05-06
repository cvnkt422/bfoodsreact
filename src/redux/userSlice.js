import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
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
    isLoggedin: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedin = true;
    },
    logout: (state) => {
      state.isLoggedin = false;
      state.user = {
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
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
