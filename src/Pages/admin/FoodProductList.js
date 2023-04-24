import React, { useState, useEffect } from "react";
import FoodProduct from "./FoodProduct";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Table,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { axiosservice, fetchCategories } from "../../service/axiosService";
import ProductItem from "./ProductItem";
import ViewProduct from "../ViewProduct";

function FoodProductList(props) {
  const [showprods, setShowprods] = useState(true);
  const [showcreate, setShowcreate] = useState(false);
  const [showprod, setShowprod] = useState(false);

  const [selprod, setSelprod] = useState({});

  const [activeindex, setActiveindex] = useState();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredproducts, setFilteredproducts] = useState([]);

  const updatePages = (showprods, showcreate, showprod) => {
    setShowprods(showprods);
    setShowcreate(showcreate);
    setShowprod(showprod);
  };

  const fetchCategories = async () => {
    const result = await axiosservice("GET", "admin/fetchAllCategories/", "");
    setCategories(result.data);
  };

  const fetchProducts = async () => {
    const prods = await axiosservice("GET", "admin/getProducts/", "");
    setProducts(prods.data);
    setFilteredproducts(prods.data);
  };

  const filterProducts = async (id) => {
    setFilteredproducts(products.filter((product) => product.category === +id));
    updatePages(true, false, false);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);
  return (
    <>
      <div className="Row d-flex mt-4 bd-highlight">
        <div className="bd-highlight">
          <div className="d-flex flex-column">
            <Navbar bg="light" expand="lg">
              <Container fluid>
                <Nav defaultActiveKey="/home" className="flex-column">
                  <Nav.Link href="/home">All Items</Nav.Link>

                  {categories &&
                    categories.map((cat, index) => (
                      <Nav.Link onClick={(e) => filterProducts(cat.id)}>
                        {cat.name}
                      </Nav.Link>
                    ))}
                </Nav>
              </Container>
            </Navbar>
          </div>
        </div>
        {showprods && (
          <div className="flex-grow-1 bd-highlight">
            <div className="d-flex flex-column">
              <div className="bg-light mx-4">
                <h3 className="text-center"> Displaying {} Food Items</h3>
              </div>
              {props.role === "admin" && (
                <div>
                  <Button
                    className="btn btn-sm btn-success float-end mx-4 mt-2 mb-2"
                    onClick={() => updatePages(false, true, false)}
                  >
                    Create New Product
                  </Button>
                </div>
              )}
              <div className="d-flex bd-highlight mx-4 flex-wrap">
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
        {showcreate && <FoodProduct updatePages={updatePages} />}
        {showprod && (
          <ViewProduct
            updatePages={updatePages}
            prod={filteredproducts.filter((product) => product.id === +selprod)}
          />
        )}
      </div>
    </>
  );
}

export default FoodProductList;
