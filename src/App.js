import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import React from "react";

import NavMain from "./Components/NavMain";
import Login from "./Pages/login";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import FoodCategory from "./Pages/admin/FoodCategory";

import FoodProductList from "./Pages/admin/FoodProductList";
import ShippingAddress from "./Pages/ShippingAddress";
import Payment from "./Pages/Payment";
import OAuthSuccess from "./Pages/OAuthSuccess";

import OAuthLogin from "./Pages/GoogleOAuth/OAuthLogin";

function App() {
  return (
    <>
      <NavMain />

      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={<FoodProductList role="user" filter={false} />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/oauthsuc" element={<OAuthSuccess />} />

        <Route path="/adduser" element={<Register />} />
        <Route path="/foodcategory" element={<FoodCategory />} />
        <Route
          path="/foodproduct"
          element={<FoodProductList role="admin" filter={false} />}
        />
        <Route path="/checkout" element={<ShippingAddress />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </>
  );
}

export default App;
