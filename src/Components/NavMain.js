import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import logo1 from "../static/images/Logo1.jpg";

function NavMain() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
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
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link href="#action2">Food Items</Nav.Link>
            <NavDropdown title="Orders" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">All Orders</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">
                Pending Orders
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Food Master" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/foodcategory">
                Food Main Category
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/foodproduct">
                Food Product
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search Food Items"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <div className="mx-4">
            <NavDropdown title="Account" id="navbarScrollingDropdown">
              {"userstate" ? null : (
                <NavDropdown.Item as={Link} to="/login">
                  Login
                </NavDropdown.Item>
              )}
              <NavDropdown.Item href="#action4">Profile</NavDropdown.Item>

              {"userstate" ? (
                <NavDropdown.Item as={Link} to="/login">
                  Logout
                </NavDropdown.Item>
              ) : null}
            </NavDropdown>
            <h6>
              {"userstate" ? (true ? "Mr " : "Mrs ") : null}
              {"userstate" ? "Venkata Rao Ch" : ""}
            </h6>
          </div>
          <Nav.Link href="#action2">
            <Button
              style={{
                width: "3em",
                height: "3rem",
                position: "relative",
              }}
              variant="outline-primary"
              className="rounded-circle mx-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="currentColor"
              >
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
              </svg>

              <div
                className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                style={{
                  color: "white",
                  width: "1.5rem",
                  height: "1.5rem",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  transform: "translate(25%, 25%)",
                }}
              >
                {0}
              </div>
            </Button>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavMain;
