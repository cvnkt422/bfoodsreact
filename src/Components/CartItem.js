import { Button, Stack } from "react-bootstrap";
import React, { useState } from "react";

import { formatCurrency } from "../utilities/formatCurrency";

import { useDispatch } from "react-redux";

import { addCart, removeCart } from "../redux/cartSlice";

export function CartItem(props) {
  const dispatch = useDispatch();
  const incrCart = () => {
    dispatch(addCart(props.item));
  };
  const decrCart = () => {
    dispatch(removeCart(props.item));
  };
  return (
    <>
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center"
      >
        <img
          src={`data:JPG;base64,${props.item.base64Image}`}
          style={{ width: "125px", height: "100px", objectFit: "cover" }}
        />
        <div className="me-auto">
          <div>{props.item.name}</div>

          <div className="text-muted mb-2" style={{ fontSize: "1rem" }}>
            <span>{formatCurrency(props.item.price)} / Item</span>
          </div>
          <div>
            <Button
              variant="outline-success"
              size="sm"
              //style={{ width: "1.5rem", height: "1.5rem" }}
              onClick={incrCart}
            >
              +
            </Button>
            <span> {props.item.quantity} </span> Item
            <span>{props.item.quantity > 1 && `s`} </span>
            <Button variant="outline-danger" size="sm" onClick={decrCart}>
              -
            </Button>
          </div>
        </div>
        <div> {formatCurrency(props.item.totalItemPrice)}</div>
      </Stack>
    </>
  );
}
