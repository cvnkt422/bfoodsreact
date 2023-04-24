import React from "react";
import { Button, Container, Table } from "react-bootstrap";

function FoodCategoryList() {
  return (
    <Container>
      <Button className="btn btn-sm btn-success float-start mb-4">
        {" "}
        Create Food Main Category
      </Button>
      <Table class="table">
        <thead class="thead-light">
          <tr>
            <th scope="col">SN</th>
            <th scope="col">Category Name</th>
            <th scope="col">Delete</th>
            <th scope="col">Update</th>
          </tr>
        </thead>
      </Table>
    </Container>
  );
}

export default FoodCategoryList;
