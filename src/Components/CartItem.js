import { Button, Stack } from "react-bootstrap";
import React, { useState } from "react";

import { formatCurrency } from "../utilities/formatCurrency";
import idly from "../static/images/breakfast/idly.jpg";

export function CartItem(props) {
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={`data:JPG;base64,${props.item.base64Image}`}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {props.item.name}

          {true && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{props.item.quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(props.item.price)}
        </div>
      </div>
      <div> {formatCurrency(props.item.totalItemPrice)}</div>
      <Button variant="outline-danger" size="sm">
        &times;
      </Button>
    </Stack>
  );
}
