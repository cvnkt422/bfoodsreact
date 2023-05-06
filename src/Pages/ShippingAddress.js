import React, { useState, useEffect } from "react";

import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { Link } from "react-router-dom";
import { validateForm } from "../service/FormValidator";
import { useSelector, useDispatch } from "react-redux";

import { addShipAddr } from "../redux/cartSlice";
import Payment from "./Payment";

function ShippingAddress() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const showShipAddr = useSelector((state) => state.cart.showShipAddr);
  const showPayment = useSelector((state) => state.cart.showPayment);

  const [form, setForm] = useState(user.user);
  const [errors, setErros] = useState({});
  const [show, setShow] = useState(false);
  const setField = (field, value) => {
    setForm({ ...form, [field]: value });

    if (!!errors[field]) setErros({ ...errors, [field]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErros = validateForm(form);
    console.log(formErros);
    if (Object.keys(formErros).length > 3) {
      setErros(formErros);
    } else {
      dispatch(addShipAddr(form));
      setShow(true);
    }
  };

  return (
    <div>
      <Container>
        {showPayment && <Payment />}
        {showShipAddr && (
          <div>
            <h5 className="text-center mt-2">Enter Shipping Address</h5>
            <Form className="">
              <Row className="mb-3">
                <Form.Group as={Col} controlId="name">
                  <Form.Label>
                    Full Name
                    <span style={{ color: "red", fontSize: "15px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={form.name === "undefined" ? null : form.name}
                    required
                    onChange={(e) => {
                      setField("name", e.target.value.toUpperCase());
                    }}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="username">
                  <Form.Label>
                    Nick Name{" "}
                    <span style={{ color: "red", fontSize: "15px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nick Name"
                    name="username"
                    value={form.username}
                    required
                    onChange={(e) => {
                      setField("username", e.target.value);
                    }}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Label>
                  Address{" "}
                  <span style={{ color: "red", fontSize: "15px" }}>*</span>
                </Form.Label>
                <Form.Group as={Col} controlId="address1">
                  <Form.Control
                    type="text"
                    placeholder="H.no Street Area"
                    name="address1"
                    value={form.address1}
                    required
                    onChange={(e) => {
                      setField("address1", e.target.value);
                    }}
                    isInvalid={!!errors.address1}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address1}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="city">
                  <Form.Control
                    type="text"
                    placeholder="City"
                    name="city"
                    value={form.city}
                    required
                    onChange={(e) => {
                      setField("city", e.target.value);
                    }}
                    isInvalid={!!errors.city}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="state">
                  <Form.Control
                    type="text"
                    placeholder="State"
                    name="state"
                    value={form.state}
                    required
                    onChange={(e) => {
                      setField("state", e.target.value);
                    }}
                    isInvalid={!!errors.state}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.state}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="3" controlId="pin">
                  <Form.Control
                    type="text"
                    placeholder="PinCode"
                    name="pin"
                    value={form.pin}
                    required
                    onChange={(e) => {
                      setField("pin", e.target.value);
                    }}
                    isInvalid={!!errors.pin}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pin}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="3" controlId="country">
                  <Typeahead
                    //  selected={[form.country]}
                    id="country"
                    name="country"
                    value={form.country}
                    inputProps={{ required: true }}
                    placeholder="Choose Country"
                    options={[
                      "India",
                      "Pakistan",
                      "Sri Lanka",
                      "Bangladesh",
                      "China",
                    ]}
                    onChange={(selected) => {
                      setField("country", selected[0]);
                    }}
                    isInvalid={!!errors.country}
                    //maxLength={10}
                  ></Typeahead>
                  <Form.Control.Feedback type="invalid">
                    {errors.country}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="email">
                  <Form.Label>
                    Email{" "}
                    <span style={{ color: "red", fontSize: "15px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={form.email}
                    required
                    onChange={(e) => {
                      setField("email", e.target.value);
                    }}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="mobile">
                  <Form.Label>
                    Mobile Number{" "}
                    <span style={{ color: "red", fontSize: "15px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="Number"
                    placeholder="Mobile Number"
                    name="mobile"
                    value={form.mobile}
                    required
                    onChange={(e) => {
                      setField("mobile", e.target.value);
                    }}
                    isInvalid={!!errors.mobile}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mobile}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="float-end">
                <Form.Group controlId="submit">
                  <Link className="btn btn-danger my-2 mx-2" to="/home">
                    Cancel
                  </Link>
                  <Button
                    onClick={handleSubmit}
                    className="my-2"
                    to="/payment"
                    variant="outline-success"
                  >
                    Proceed to Payment
                  </Button>
                </Form.Group>
              </Row>
            </Form>
          </div>
        )}
      </Container>
    </div>
  );
}

export default ShippingAddress;
