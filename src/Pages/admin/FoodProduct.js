import axios from "axios";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { axiosservice } from "../../service/axiosService";
import bfoodslogo from "../../static/images/Logo1.jpg";

function FoodProduct(props) {
  const [form, setForm] = useState(props.form && props.form[0]);
  const [errors, setErros] = useState({});
  const [foodcat, setFoodcat] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [image, setImage] = useState();
  const [imagedata, setImagedata] = useState();

  const token = useSelector((state) => state.user.id_token);

  const loadCategories = async () => {
    const result = await axiosservice(
      "GET",
      "admin/fetchAllCategories/",
      "",
      token
    );
    setFoodcat(result.data);
  };

  console.log(form);

  useEffect(() => {
    loadCategories();
  }, []);

  const setField = (field, value) => {
    setForm({ ...form, [field]: value });
    if (!!errors[field]) setErros({ ...errors, [field]: null });
  };

  ////// Validating Form ///////////////

  const validateForm = () => {
    console.log(form);
    console.log(imagedata);
    const { name, category, units, unitType, price } = form;
    const newErrors = {};

    if (!name || name === "") newErrors.name = "Enter Product Name";
    if (!category || category === "") newErrors.catid = "Select Category";
    if (!unitType || unitType === "") newErrors.units = "Select units type";
    if (!units || units === "") newErrors.units = "Enter units Value";
    if (!price || price === "") newErrors.price = "Enter Price per units";
    return newErrors;
  };

  ////// Validating Form ends ///////////////

  //////////  Submit handling  ////////////////

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErros = validateForm();
    if (Object.keys(formErros).length > 0) setErros(formErros);
    else {
      console.log("form data", form);
      const payload = new FormData();
      payload.append("id", form.id ? form.id : 0);
      payload.append("name", form.name);
      payload.append("category", form.category);
      payload.append("unitType", form.unitType);
      payload.append("units", form.units);
      payload.append("price", form.price);
      payload.append("desc", form.desc);
      payload.append("discount", form.discount);
      payload.append("image", imagedata);
      payload.append("quantity", form.quantity);
      payload.append("available", form.available);

      console.log("payload Data", payload);

      const result = await axiosservice(
        "POST",
        "admin/createProduct",
        payload,
        token
      );

      if (result.status === 201) {
        props.updatePages(true, false, false);
        setForm("");
      }
    }
  };

  //////////  Submit handling end ////////////////

  return (
    <div>
      <div className="d-flex justify-content-start mx-4 mt-2">
        <Form style={{ width: "800px" }}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="catid">
              <Form.Label>
                Food Category
                <span style={{ color: "red", fontSize: "15px" }}>*</span>
              </Form.Label>
              <Form.Select
                id="category"
                name="category"
                value={form && form.category}
                placeholder="Choose Main Category"
                onChange={(e) => {
                  setField("category", e.target.value);
                }}
                isInvalid={!!errors.category}
                defaultValue={form && form.category}
                //maxLength={10}
              >
                <option value="">--Select--</option>
                {foodcat &&
                  foodcat.map((cat, index) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.category}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="name">
              <Form.Label>
                Food Product Name
                <span style={{ color: "red", fontSize: "15px" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Dosa,Biryani etc.."
                name="name"
                value={form && form.name}
                required
                onChange={(e) => {
                  setField("name", e.target.value);
                }}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="unitType">
              <Form.Label>
                Food Unit Type
                <span style={{ color: "red", fontSize: "15px" }}>*</span>
              </Form.Label>
              <Form.Select
                id="unitType"
                name="unitType"
                value={form && form.unitType}
                onChange={(e) => {
                  setField("unitType", e.target.value);
                }}
                isInvalid={!!errors.unitType}
                defaultValue={form && form.unitType}
                //maxLength={10}
              >
                <option value="">--Select--</option>
                <option value="Gram">Grams</option>
                <option value="Kg">Kilo Grams</option>
                <option value="Ltr">Ltr</option>
                <option value="Count">Quantity</option>
                <option value="NA">NA</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.units}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="units">
              <Form.Label>
                Food units Value
                <span style={{ color: "red", fontSize: "15px" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="500 grams, 1 Kg etc.."
                name="units"
                value={form && form.units}
                required
                onChange={(e) => {
                  setField("units", e.target.value);
                }}
                isInvalid={!!errors.units}
                defaultValue={form && form.units}
              />
              <Form.Control.Feedback type="invalid">
                {errors.units}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="name">
              <Form.Label>
                Price
                <span style={{ color: "red", fontSize: "15px" }}>*</span>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                name="price"
                value={form && form.price}
                required
                onChange={(e) => {
                  setField("price", e.target.value);
                }}
                isInvalid={!!errors.price}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="quantity">
              <Form.Label>
                Quantity
                <span style={{ color: "red", fontSize: "15px" }}>*</span>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantity"
                name="quantity"
                value={form && form.quantity}
                required
                onChange={(e) => {
                  setField("quantity", e.target.value);
                }}
                isInvalid={!!errors.quantity}
              />
              <Form.Control.Feedback type="invalid">
                {errors.quantity}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md={4} controlId="discount">
              <Form.Label>Discount%</Form.Label>
              <Form.Control
                type="number"
                placeholder="Discount in %"
                name="discount"
                value={form && form.discount}
                required
                onChange={(e) => {
                  setField("discount", e.target.value);
                }}
                isInvalid={!!errors.discount}
              />
              <Form.Control.Feedback type="invalid">
                {errors.discount}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="available">
              <Form.Label>
                Available Today ?
                <span style={{ color: "red", fontSize: "15px" }}>*</span>
              </Form.Label>
              <Form.Select
                id="available"
                name="available"
                value={form && form.available}
                onChange={(e) => {
                  setField("available", e.target.value);
                }}
                isInvalid={!!errors.available}
                defaultValue={form && form.available}
                //maxLength={10}
              >
                <option value="">--Select--</option>
                <option value="Yes">Available</option>
                <option value="No">Not Available</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.available}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="name">
              <Form.Label>
                Image
                <span style={{ color: "red", fontSize: "15px" }}>*</span>
              </Form.Label>
              <Form.Control
                type="file"
                placeholder="Choose Image"
                name="image"
                required
                onChange={(e) => {
                  setImage(URL.createObjectURL(e.target.files[0]));
                  setShowPreview(true);
                  setImagedata(e.target.files[0]);
                }}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="catid">
              <Form.Label>
                Description
                <span style={{ color: "red", fontSize: "15px" }}>*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                id="desc"
                name="desc"
                value={form && form.desc}
                placeholder="please let foodie know about the food item"
                onChange={(e) => {
                  setField("desc", e.target.value);
                }}
                isInvalid={!!errors.desc}
                defaultValue={form && form.desc}
                //maxLength={10}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.desc}
              </Form.Control.Feedback>
            </Form.Group>
            {showPreview && (
              <Form.Group as={Col} md="6" controlId="imgprw">
                <img
                  src={image}
                  alt={"xx"}
                  style={{ width: "200px", height: "200px" }}
                ></img>
              </Form.Group>
            )}
          </Row>
          <Row className="float-end">
            <Form.Group controlId="submit">
              <Button
                type="submit"
                className="my-2 mx-2"
                variant="danger"
                onClick={(e) => props.updatePages(true, false, false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="my-2"
                variant="primary"
                onClick={handleSubmit}
              >
                Create
              </Button>
            </Form.Group>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default FoodProduct;
