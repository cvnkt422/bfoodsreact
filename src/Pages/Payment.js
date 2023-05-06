import React from "react";

import { Button, Container, Form } from "react-bootstrap";

function Payment() {
  return (
    <Container>
      <br />
      <br />
      <br />
      <section>
        Order BFOOD000BYNI00123 Generated , Proceeding to Payment ....
      </section>
      <br />
      <Form>
        <Form.Label>Order Id</Form.Label>
        <Form.Control type="text" value="BFOOD000BYNI00123"></Form.Control>
        <Form.Label>Customer Id</Form.Label>
        <Form.Control type="text" value="BFOOD000CUST00123"></Form.Control>
        <Button className="my-2 float-end" variant="outline-success">
          Pay with Paytm
        </Button>
      </Form>
    </Container>
  );
}

export default Payment;
