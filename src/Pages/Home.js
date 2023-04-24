import React, { useEffect } from "react";
import {
  Carousel,
  Stack,
  Form,
  Button,
  Row,
  Col,
  Nav,
  Navbar,
} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import logo1 from "../static/images/Logo1.jpg";
import gmail from "../static/images/gmail.jpg";
import facebook from "../static/images/facebook.jpg";
import { StoreItem } from "./StoreItem";
import storeItems from "../static/data/items.json";
import { useState } from "react";
import { Link } from "react-router-dom";

import Offcanvas from "react-bootstrap/Offcanvas";

import { axiosservice } from "../service/axiosService";

import FoodProductList from "./admin/FoodProductList";

function Home() {
  return <FoodProductList role="user" category="all" />;
}

export default Home;
