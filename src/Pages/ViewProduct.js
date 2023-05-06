import React, { useState } from "react";
import { Row, Container, Col, Button, Alert } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { addCart, removeCart } from "../redux/cartSlice";

function ViewProduct(props) {
  const dispatch = useDispatch();
  const [btnState, setBtnState] = useState(true);
  const cart = useSelector((state) => state.cart);
  if (
    cart.cart.find((item) => item.id === props.prod[0].id) !== undefined &&
    btnState
  )
    setBtnState(false);

  if (
    cart.cart.find((item) => item.id === props.prod[0].id) === undefined &&
    !btnState
  )
    setBtnState(true);

  const addToCart = () => {
    console.log("addtocart clicked");
    dispatch(addCart(props.prod[0]));
  };

  const deleteFromCart = () => {
    console.log("Removed from Cart");
    dispatch(removeCart(props.prod[0]));
  };

  return (
    <Container
      style={{ maxWidth: "100%", marginLeft: "0rem", marginRight: "1rem" }}
    >
      <br />
      <img
        src={`data:JPG;base64,${props.prod[0].base64Image}`}
        alt="product"
        style={{ width: "400px", height: "400px" }}
        className="border p-2"
      />

      <div className="border">
        <h6 className="text-center mt-4">{props.prod[0].name}</h6>

        <h6 className="text-center mt-2">{props.prod[0].desc}</h6>

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
          <div>
            <Button variant="outline-success" size="sm" onClick={addToCart}>
              Add to Cart
            </Button>
          </div>
          <Button
            variant="outline-danger"
            size="sm"
            className="mx-2"
            onClick={deleteFromCart}
            disabled={btnState}
          >
            Remove
          </Button>
        </div>

        <div
          className="mt-2 d-flex justify-content-center"
          onClick={(e) => props.updatePages(true, false, false)}
        >
          <Button variant="outline-primary" size="sm">
            Back to Products
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default ViewProduct;
