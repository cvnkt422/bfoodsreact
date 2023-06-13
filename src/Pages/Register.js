import React, { useState } from "react";

import { Form, Button, Row, Col } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import FormContainer from "./FormContainer";
import { useNavigate, Link, json } from "react-router-dom";
import RegistrationSuccess from "./RegistrationSuccess";
import config from "../config/config";
import axios from "axios";

import { validateForm } from "../service/FormValidator";

export default function Register() {
  const [form, setForm] = useState({});
  const [errors, setErros] = useState({});
  const [registered, setRegistered] = useState(false);
  var response;

  const setField = (field, value) => {
    setForm({ ...form, [field]: value });

    if (!!errors[field]) setErros({ ...errors, [field]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErros = validateForm(form);
    if (Object.keys(formErros).length > 0) setErros(formErros);
    else {
      const { confirmpassword, ...payload } = form;
      payload.dob = +Date.parse(payload.dob);
      payload.country = payload.country[0];
      payload.role = "User";

      let url = config.url;
      // const response = await axios.post(`${url}/users/register/`, payload);

      try {
        response = await axios.post(`${url}/users/register/`, payload);

        // Work with the response...
      } catch (error) {
        if (error.response) {
          response = error.response;

          setErros(response.data);
        } else if (error.request) {
          response = error.request;
        } else {
          // Anything else
        }
      }

      if (response.status === 201) setRegistered(true);
    }
  };

  return (
    <div className="p-1 my-2">
      {registered && (
        <RegistrationSuccess
          name={form.name}
          username={form.username}
          gender={form.gender}
        />
      )}
      {!registered && (
        <div>
          <h5 className="text-center mt-2">
            For New Registration , Please Fill below Details
          </h5>
          <FormContainer>
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
                    value={form.name}
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
                    User Name{" "}
                    <span style={{ color: "red", fontSize: "15px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="username"
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
                  PassWord
                  <span style={{ color: "red", fontSize: "15px" }}>*</span>
                </Form.Label>
                <Form.Group as={Col} controlId="password">
                  <Form.Control
                    type="password"
                    placeholder="New Password"
                    name="password"
                    value={form.password}
                    required
                    onChange={(e) => {
                      setField("password", e.target.value);
                    }}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="confirmpassword">
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    name="confirmpassword"
                    value={form.confirmpassword}
                    required
                    onChange={(e) => {
                      setField("confirmpassword", e.target.value);
                    }}
                    isInvalid={!!errors.confirmpassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmpassword}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="gender">
                  <Form.Label>
                    Gender{" "}
                    <span style={{ color: "red", fontSize: "15px" }}>*</span>
                  </Form.Label>
                  <br />
                  <Form.Check
                    label="Male"
                    name="gender"
                    required
                    inline
                    type="radio"
                    value="Male"
                    onChange={(e) => {
                      setField("gender", e.target.value);
                    }}
                    isInvalid={!!errors.gender}
                  />
                  <Form.Check
                    label="Female"
                    name="gender"
                    value="Female"
                    required
                    inline
                    type="radio"
                    onChange={(e) => {
                      setField("gender", e.target.value);
                    }}
                    isInvalid={!!errors.gender}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.gender}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="dob">
                  <Form.Label>
                    Date of Birth{" "}
                    <span style={{ color: "red", fontSize: "15px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Date of Birth"
                    name="dob"
                    value={form.dob}
                    required
                    onChange={(e) => {
                      setField("dob", e.target.value);
                    }}
                    isInvalid={!!errors.dob}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dob}
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
                      setField("country", selected);
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

              <Row className="mb-3">
                <Form.Group as={Col} controlId="aadhar">
                  <Form.Label>Aadhar</Form.Label>
                  <Form.Control
                    type="Number"
                    placeholder="Aadhar Number"
                    name="aadhar"
                    value={form.aadhar}
                    //required
                    onChange={(e) => {
                      setField("aadhar", e.target.value);
                    }}
                    isInvalid={!!errors.aadhar}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.aadhar}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="pan">
                  <Form.Label>PAN</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="PAN Number"
                    name="pan"
                    value={form.pan}
                    required
                    onChange={(e) => {
                      setField("pan", e.target.value.toUpperCase());
                    }}
                    isInvalid={!!errors.pan}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pan}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="float-end">
                <Form.Group controlId="submit">
                  <Link className="btn btn-danger my-2 mx-2" to="/login">
                    Cancel
                  </Link>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="my-2"
                    variant="primary"
                  >
                    Register
                  </Button>
                </Form.Group>
              </Row>
            </Form>
          </FormContainer>
        </div>
      )}
    </div>
  );
}
