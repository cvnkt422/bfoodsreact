import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { axiosservice } from "../src/service/axiosService";

import NavMain from "./Components/NavMain";
import Login from "./Pages/login";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import FoodCategory from "./Pages/admin/FoodCategory";

import FoodProductList from "./Pages/admin/FoodProductList";

import { StateProvider } from "./context/StateProvider";

function App() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const result = await axiosservice("GET", "admin/fetchAllCategories/", "");
    setCategories(result.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <NavMain />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />

        <Route path="/adduser" element={<Register />} />
        <Route path="/foodcategory" element={<FoodCategory />} />
        <Route path="/foodproduct" element={<FoodProductList role="admin" />} />
      </Routes>
    </>
  );
}

export default App;
