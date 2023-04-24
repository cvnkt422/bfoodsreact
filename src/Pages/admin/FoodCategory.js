import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container, Table } from "react-bootstrap";

import { axiosservice, fetchCategories } from "../../service/axiosService";

function FoodCategory() {
  const [showcreate, setShowcreate] = useState(false);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({});
  const [errors, setErros] = useState({});

  const setField = (field, value) => {
    setForm({ ...form, [field]: value });

    if (!!errors[field]) setErros({ ...errors, [field]: null });
  };

  // const fetchCategories = async () => {
  //   const result = await axiosservice("GET", "admin/fetchAllCategories/", "");
  //   setCategories(result.data);
  // };

  const delCat = async (id) => {
    const result = await axiosservice("POST", "admin/deleteByCatId/", {
      id: id,
    });
    result && setCategories(await fetchCategories());
  };

  const updateCat = (id, name) => {
    setShowcreate(true);
    setForm({ name: name, id: id });
  };

  const loadCategories = async () => {
    const result = await axiosservice("GET", "admin/fetchAllCategories/", "");
    setCategories(result.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    const formErros = validateForm();
    if (Object.keys(formErros).length > 0) setErros(formErros);
    else {
      console.log(JSON.stringify(form));

      let payload = form;

      const result = await axiosservice(
        "POST",
        "admin/createcategory/",
        payload
      );

      console.log(result);
      console.log(fetchCategories);

      if (result.status === 201) setShowcreate(false);
      setCategories(await fetchCategories());
      setForm("");
    }
  };

  const validateForm = () => {
    const { name } = form;
    const newErrors = {};

    if (!name || name === "") newErrors.name = "Enter Category";
    return newErrors;
  };

  return (
    <Container>
      <h3 className="text-center mt-4 mb-4"> Food Category Master </h3>
      <div className="d-flex justify-content-center">
        <div>
          {!showcreate && (
            <Container>
              <Button
                className="btn btn-sm btn-success float-start mb-4"
                onClick={() => setShowcreate(true)}
              >
                {" "}
                Create Food Main Category
              </Button>
              <Table class="table">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Update</th>
                  </tr>
                </thead>
                <tbody>
                  {categories &&
                    categories.map((cat, index) => (
                      <tr>
                        <th>{index + 1}</th>
                        <td>{cat.name}</td>

                        <td>
                          <Button
                            class="btn btn-danger btn-sm"
                            data-id={cat.id}
                            onClick={(e) => {
                              console.log(
                                "delete",
                                e.target.getAttribute("data-id")
                              );
                              delCat(e.target.getAttribute("data-id"));
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                        <td>
                          <Button
                            class="btn btn-warning btn-sm"
                            data-id={cat.id}
                            data-name={cat.name}
                            onClick={(e) =>
                              updateCat(
                                e.target.getAttribute("data-id"),
                                e.target.getAttribute("data-name")
                              )
                            }
                          >
                            Update
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Container>
          )}
        </div>
        {showcreate && (
          <div className="d-flex justify-content-center">
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="name">
                  <Form.Label>
                    Enter Food Category
                    <span style={{ color: "red", fontSize: "15px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type Category"
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
              <Row className="float-end">
                <Form.Group controlId="submit">
                  <Button
                    className="btn btn-sm btn-danger my-2 mx-2"
                    onClick={() => {
                      setShowcreate(false);
                      setForm("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="my-2 btn-sm"
                    variant="primary"
                    onClick={handleSubmit}
                  >
                    Create
                  </Button>
                </Form.Group>
              </Row>
            </Form>
          </div>
        )}
      </div>
    </Container>
  );
}

export default FoodCategory;
