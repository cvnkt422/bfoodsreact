import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

import { CartItem } from "../Components/CartItem";
import { useSelector, useDispatch } from "react-redux";
import { formatCurrency } from "../utilities/formatCurrency";
import { proceedCheckOut } from "../redux/cartSlice";

export default function Cart() {
  const isLoggedin = useSelector((state) => state.user.isLoggedin);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button
        onClick={handleShow}
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
          {cart.totalQuantity}
        </div>
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        name="end"
        style={{ width: "500px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart Items</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            {cart.cart &&
              cart.cart.map(
                (item) => item.quantity > 0 && <CartItem item={item} />
              )}
            <div className="ms-auto fw-bold fs-5">
              Total {formatCurrency(cart.totalCartPrice)}
            </div>
          </Stack>
          {cart.totalQuantity > 0 && (
            <Button
              variant="outline-success"
              size="sm"
              as={Link}
              to={isLoggedin ? "/checkout" : "/login"}
              onClick={() => {
                setShow(false);
                dispatch(proceedCheckOut());
              }}
            >
              Proceed to Check Out
            </Button>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
