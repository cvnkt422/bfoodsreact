import React from "react";
import { Row, Container, Col, Button } from "react-bootstrap";

import { useDispatch } from "react-redux";

import { addCart } from "../redux/cartSlice";

function ViewProduct(props) {
  const dispatch = useDispatch();

  const addToCart = () => {
    console.log("addtocart clicked");
    dispatch(addCart(props.prod));
  };

  const deleteFromCart = () => {
    console.log("Removed from Cart");
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col
          md="auto"
          className="d-flex justify-content-center"
          style={{ backgroundColor: "" }}
        >
          <img
            src={`data:JPG;base64,${props.prod[0].base64Image}`}
            alt="product"
            style={{ width: "400px", height: "400px" }}
          ></img>
        </Col>
        <Col xs lg="4" style={{ backgroundColor: "lightcyan" }}>
          <div className="d-flex flex-column justify-content-center ">
            <h2 className="text-center mt-4">{props.prod[0].name}</h2>

            <h5 className="text-center mt-2">{props.prod[0].desc}</h5>

            <h5 className="text-center mt-2">
              <span>{props.prod[0].unitType}</span>-{" "}
              <span>{props.prod[0].units}</span>
            </h5>

            <h5 className="text-center mt-2">
              <span style={{ backgroundColor: "lightgreen", fontSize: "2rem" }}>
                Price: Rs {props.prod[0].price}.00
              </span>
            </h5>
            <h5 className="text-center mt-2">
              <span style={{ backgroundColor: "pink", fontSize: "1rem" }}>
                Discount%: Rs {props.prod[0].disc}.00
              </span>
            </h5>
            <div className="d-flex justify-content-center mt-4">
              <Button className="mx-2" onClick={addToCart}>
                Add to Cart
              </Button>
              <Button className="mx-2" onClick={deleteFromCart}>
                Place Order{" "}
              </Button>
            </div>
            <div
              className="mt-2 d-flex justify-content-center"
              onClick={(e) => props.updatePages(true, false, false)}
            >
              <Button>Back to Products</Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ViewProduct;
