import React, { useState } from "react";

import { GoogleLogin, GoogleLogout } from "google-login-react";

import { useNavigate, Link } from "react-router-dom";

import { Form, Button, Row, Col, Container } from "react-bootstrap";

import logo1 from "../static/images/Logo1.jpg";
import gmail from "../static/images/gmail.jpg";
import facebook from "../static/images/facebook.jpg";
import { axiosservice } from "../service/axiosService";

import { useDispatch } from "react-redux";

import { login } from "../redux/userSlice";

import Error from "../errors/error";

export default function Login() {
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const clientId = "";

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [form, setForm] = useState({});
  const [errors, setErros] = useState({});
  const [showerror, setShowerror] = useState(false);
  const setField = (field, value) => {
    setForm({ ...form, [field]: value });

    if (!!errors[field]) setErros({ ...errors, [field]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowerror(false);
    const formErros = validateForm();
    if (Object.keys(formErros).length > 0) setErros(formErros);
    else {
      const auth = await axiosservice("POST", "authentication/", form);

      if (auth.status === 202) {
        dispatch(login(auth.data));
        navigate("/home");
      } else {
        setShowerror(true);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const { email, password } = form;

    const emailValidator =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email || email === "" || !emailValidator.test(email))
      newErrors.email = "Enter Valid Email";
    if (!password || password === "") newErrors.password = "Enter Password";

    return newErrors;
  };

  return (
    <Container>
      <div>
        <br />
        <br />
      </div>

      <div className="d-flex bd-highlight">
        {/* <div className="flex-fill bd-highlight mx-4">
          <img
            src={logo1}
            alt="logo1"
            style={{ width: "500px", height: "500px" }}
          ></img>
        </div> */}
        <div
          className="flex-fill bd-highlight align-self-center"
          style={{ minWidth: "400px" }}
        >
          <div className="d-flex flex-column mx-4">
            <Form>
              <br />
              <h5 className="mb-3">Login Here to Place Your Orders</h5>
              <Row className="mb-2">
                <Form.Group as={Col} controlId="name">
                  <Form.Label>
                    Email
                    <span style={{ color: "red", fontSize: "15px" }}>*</span>
                  </Form.Label>
                  <Form.Label className="float-end">
                    Don't have Account?
                    <a
                      href="/adduser"
                      style={{ color: "green", fontSize: "1rem" }}
                    >
                      {" "}
                      Signup{" "}
                    </a>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Email"
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
              </Row>
              <Row>
                <Form.Group as={Col} controlId="name">
                  <Form.Label>
                    Password
                    <span style={{ color: "red", fontSize: "15px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
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
              </Row>
              <div>
                <Row className="mt-2">
                  <Form.Group controlId="submit">
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      className="my-2 btn-sm w-100"
                      variant="primary"
                    >
                      Login
                    </Button>
                  </Form.Group>
                </Row>
              </div>
            </Form>
            <div>{showerror && <Error show={showerror} />}</div>

            <div>
              <div className="float-end mt-1">
                <span className="mx-2">Forgot Password ?</span>
                <Link to="/adduser">
                  <Button variant="outline-success" size="sm">
                    Reset
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-fill bd-highlight">
          <br />
        </div>

        <div className="flex-fill bd-highlight mx-4">
          <div class="vr mt-1 mx-4" style={{ height: "215px", width: "2px" }} />

          <div>
            <Button
              style={{
                width: "3em",
                height: "3rem",
                position: "relative",
              }}
              variant="info"
              className="rounded-circle"
            >
              Or
            </Button>
          </div>
          <div class="vr mt-1 mx-4" style={{ height: "215px", width: "2px" }} />
        </div>
        {
          <div className="flex-fill bd-highlight align-self-center">
            <div className="d-flex flex-column">
              <a
                className="btn btn-sm"
                href="http://localhost:9090/authenticate/login"
              >
                <img src={gmail} alt="gmail" />
              </a>

              <div className="btn btn-sm">
                <img src={facebook} alt="facebook" />
              </div>
            </div>
          </div>
        }
      </div>
    </Container>
  );
}
