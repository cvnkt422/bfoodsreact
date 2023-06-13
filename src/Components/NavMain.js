import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import logo1 from "../static/images/Logo1.jpg";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { removeCart, emptyCart, filterProducts } from "../redux/cartSlice";
import Cart from "../Pages/Cart";
import { axiosservice } from "../service/axiosService";

function NavMain() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart);
  const isLoggedin = useSelector((state) => state.user.isLoggedin);
  const [searchTag, setSearchTag] = useState("");

  const prodSearch = async () => {
    const products = await axiosservice("POST", "admin/searchProducts/", {
      searchTag: searchTag,
    });
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "white" }}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/home">
          <div>
            <img
              src={logo1}
              alt="logo1"
              className="img-fluid"
              style={{ width: "200px", height: "100px" }}
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              as={Link}
              to="/home"
              onClick={(e) => dispatch(filterProducts())}
            >
              Home
            </Nav.Link>

            <NavDropdown title="Orders" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">All Orders</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">
                Pending Orders
              </NavDropdown.Item>
            </NavDropdown>
            {user.username === "ADMIN" && (
              <NavDropdown title="Food Master" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/foodcategory">
                  Food Main Category
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/foodproduct">
                  Food Product
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search Food Items"
              className="me-2"
              aria-label="Search"
              value={searchTag}
              onChange={(e) => setSearchTag(e.target.value)}
            />
            <Button variant="outline-success" onClick={prodSearch}>
              Search
            </Button>
          </Form>
          <div className="mx-4">
            <NavDropdown title="Account" id="navbarScrollingDropdown">
              {!isLoggedin && (
                <NavDropdown.Item as={Link} to="/login">
                  Login
                </NavDropdown.Item>
              )}
              {isLoggedin && (
                <NavDropdown.Item href="#action4">Profile</NavDropdown.Item>
              )}
              {isLoggedin && (
                <NavDropdown.Item
                  as={Link}
                  to="/login"
                  onClick={() => {
                    dispatch(logout());
                    dispatch(emptyCart());
                  }}
                >
                  Logout
                </NavDropdown.Item>
              )}
            </NavDropdown>
            <h6>{user ? user.name : null}</h6>
          </div>

          <Nav.Link>
            <Cart />
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavMain;
