import React, { useState, useEffect } from "react";
import FoodProduct from "./FoodProduct";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

import { axiosservice } from "../../service/axiosService";
import ProductItem from "./ProductItem";
import ViewProduct from "../ViewProduct";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function FoodProductList(props) {
  const isFilter = useSelector((state) => state.cart.filter);

  const user = useSelector((state) => state.user.user);

  const token = useSelector((state) => state.user.id_token);

  console.log(user);

  const [showprods, setShowprods] = useState(true);
  const [showcreate, setShowcreate] = useState(false);
  const [showprod, setShowprod] = useState(false);
  const [selprod, setSelprod] = useState({});
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredproducts, setFilteredproducts] = useState([]);
  const [filter, setFilter] = useState(isFilter);

  const updatePages = (showprods, showcreate, showprod) => {
    setShowprods(showprods);
    setShowcreate(showcreate);
    setShowprod(showprod);
  };

  const fetchCategories = async () => {
    const result = await axiosservice(
      "GET",
      "admin/fetchAllCategories/",
      "",
      token
    );
    setCategories(result.data);
  };

  const fetchProducts = async () => {
    const prods = await axiosservice(
      "GET",
      user.username === "ADMIN"
        ? `admin/getAllProducts/`
        : `admin/getActiveProducts/`,
      "",
      token
    );

    setProducts(prods.data);
    setFilteredproducts(prods.data);
  };

  const filterProducts = (id) => {
    setFilter(true);
    setFilteredproducts(
      products.filter((product) => product.category === +id || id === "all")
    );
    updatePages(true, false, false);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [filter, showprods]);
  return (
    <>
      <div
        className="Row d-flex mt-4 bd-highlight"
        style={{ maxWidth: "100%" }}
      >
        <div className="bd-highlight">
          <div className="d-flex flex-column">
            <Navbar
              expand="lg"
              className="mt-4"
              style={{ backgroundColor: "white" }}
            >
              <Container fluid>
                <Nav className="flex-column">
                  <Nav.Link onClick={(e) => filterProducts("all")}>
                    All Items
                  </Nav.Link>

                  {categories &&
                    categories.map((cat, index) => (
                      <Nav.Link onClick={(e) => filterProducts(cat.id)}>
                        <span>{cat.name}</span>
                      </Nav.Link>
                    ))}
                </Nav>
              </Container>
            </Navbar>
          </div>
        </div>
        {true && (
          <div className="d-flex flex-grow-1 bd-highlight">
            <div className="d-flex flex-column">
              <div className="mx-1">
                <h4 className="text-center mb-2">
                  Today Deliverable Food Items
                </h4>
              </div>
              <div className="d-flex bd-highlight mx-2 flex-wrap">
                {props.role === "admin" && (
                  <Button
                    className="btn btn-sm btn-success mx-4"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      updatePages(false, true, false);
                    }}
                  >
                    Create New Product
                  </Button>
                )}
              </div>
              <div>
                {showcreate && <FoodProduct updatePages={updatePages} />}
              </div>
              <div>
                {showprod && (
                  <div className="d-flex bd-highlight mt-4 mx-4">
                    {user.username !== "ADMIN" && (
                      <ViewProduct
                        updatePages={updatePages}
                        prod={filteredproducts.filter(
                          (product) => product.id === +selprod
                        )}
                      />
                    )}

                    {showprod && user.username === "ADMIN" && (
                      <FoodProduct
                        form={filteredproducts.filter(
                          (product) => product.id === +selprod
                        )}
                        updatePages={updatePages}
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="d-flex bd-highlight mx-2 flex-wrap">
                {filteredproducts &&
                  filteredproducts.map((product, index) => (
                    <ProductItem
                      product={product}
                      updatePages={updatePages}
                      setSelprod={setSelprod}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FoodProductList;
