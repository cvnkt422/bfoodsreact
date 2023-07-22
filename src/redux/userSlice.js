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
    id_token: "",
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedin = true;
    },
    gOAuthLogin: (state, action) => {
      state.id_token = action.payload;
      state.isLoggedin = true;
    },
    logout: (state) => {
      state.isLoggedin = false;
      state.id_token = "";
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
        id_token: "",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, gOAuthLogin } = userSlice.actions;

export default userSlice.reducer;
