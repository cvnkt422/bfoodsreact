import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { axiosservice } from "../../service/axiosService";
import bfoodslogo from "../../static/images/Logo1.jpg";

function FoodProduct(props) {
  const [form, setForm] = useState({});
  const [errors, setErros] = useState({});
  const [foodcat, setFoodcat] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [image, setImage] = useState(undefined);
  const [imagedata, setImagedata] = useState();

  const loadCategories = async () => {
    const result = await axiosservice("GET", "admin/fetchAllCategories/", "");
    setFoodcat(result.data);
    console.log(result.data[0].name);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const setField = (field, value) => {
    setForm({ ...form, [field]: value });

    if (!!errors[field]) setErros({ ...errors, [field]: null });
  };

  ////// Validating Form ///////////////

  const validateForm = () => {
    const { name, catid, utype, unit, price } = form;
    const newErrors = {};

    if (!name || name === "") newErrors.name = "Enter Product Name";
    if (!catid || catid === "") newErrors.catid = "Select Category";
    if (!utype || utype === "") newErrors.utype = "Select Unit type";
    if (!unit || unit === "") newErrors.unit = "Enter Unit Value";
    if (!price || price === "") newErrors.price = "Enter Price per Unit";
    return newErrors;
  };

  ////// Validating Form ends ///////////////

  //////////  Submit handling  ////////////////

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    const formErros = validateForm();
    if (Object.keys(formErros).length > 0) setErros(formErros);
    else {
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("category", form.catid);
      payload.append("unitType", form.utype);
      payload.append("units", form.unit);
      payload.append("price", form.price);
      payload.append("desc", form.desc);
      payload.append("discount", form.disc);
      payload.append("image", imagedata);

      console.log(payload);

      const result = await axiosservice(
        "POST",
        "admin/createProduct/",
        payload
      );

      console.log(result);
      // console.log(fetchCategories());

      if (result.status === 201) {
        props.updatePages(true, false, false);
        setForm("");
      }
    }
  };

  //////////  Submit handling end ////////////////

  return (
    <Container>
      <h3 className="text-center"> Create Food Product </h3>
      <div className="d-flex justify-content-center">
        <div className="mx-2">
          <img
            src={bfoodslogo}
            alt="bfoodslog"
            style={{ width: "500px", height: "500px" }}
          />
        </div>
        <Form style={{ width: "800px" }}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="catid">
              <Form.Label>
                Food Category
                <span style={{ color: "red", fontSize: "15px" }}>*</span>
              </Form.Label>
              <Form.Select
                id="catid"
                name="catid"
                value={form.catid}
                placeholder="Choose Main Category"
                onChange={(e) => {
                  setField("catid", e.target.value);
                }}
                isInvalid={!!errors.catid}
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
                {errors.catid}
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
                value={form.name}
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
            <Form.Group as={Col} md="4" controlId="catid">
              <Form.Label>
                Food Units
                <span style={{ color: "red", fontSize: "15px" }}>*</span>
              </Form.Label>
              <Form.Select
                id="utype"
                name="utype"
                value={form.utype}
                onChange={(e) => {
                  setField("utype", e.target.value);
                }}
                isInvalid={!!errors.utype}
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
                {errors.utype}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="name">
              <Form.Label>
                Food Unit Value
                <span style={{ color: "red", fontSize: "15px" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="500 grams, 1 Kg etc.."
                name="unit"
                value={form.unit}
                required
                onChange={(e) => {
                  setField("unit", e.target.value);
                }}
                isInvalid={!!errors.unit}
              />
              <Form.Control.Feedback type="invalid">
                {errors.unit}
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
                value={form.price}
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
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md={4} controlId="name">
              <Form.Label>Discount%</Form.Label>
              <Form.Control
                type="number"
                placeholder="Discount in %"
                name="disc"
                value={form.disc}
                required
                onChange={(e) => {
                  setField("disc", e.target.value);
                }}
                isInvalid={!!errors.disc}
              />
              <Form.Control.Feedback type="invalid">
                {errors.disc}
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
                value={form.image}
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
                value={form.desc}
                placeholder="please let foodie know about the food item"
                onChange={(e) => {
                  setField("desc", e.target.value);
                }}
                isInvalid={!!errors.desc}
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
    </Container>
  );
}

export default FoodProduct;
