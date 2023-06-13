import Card from "react-bootstrap/Card";

function ProductItem(prop) {
  const handleSubmit = async (id) => {
    await prop.setSelprod(id);
    await prop.updatePages(false, false, true);
  };

  return (
    <>
      <div
        className="btn"
        data-id={prop.product.id}
        onClick={(e) => {
          handleSubmit(e.currentTarget.getAttribute("data-id"));
        }}
      >
        <Card className="mx-2" style={{ width: "15rem", height: "15rem" }}>
          <Card.Img
            variant="top"
            src={`data:JPG;base64,${prop.product.base64Image}`}
            style={{ width: "15rem", height: "8rem" }}
          />
          <Card.Body>
            <Card.Title style={{ fontSize: "1rem" }}>
              {prop.product.name}
            </Card.Title>
            <Card.Subtitle
              className=""
              style={{ fontSize: "0.8rem", height: "2.5rem" }}
            >
              {prop.product.desc}
            </Card.Subtitle>
            <Card.Text className="mt-1">
              <span
                className=""
                style={{
                  fontSize: "0.5rem",
                  marginTop: "10rem",
                  color: "pink",
                }}
              >
                Discount : {prop.product.discount}%
              </span>
              <span className="mx-2">
                Rs.{" "}
                <strong
                  style={{
                    fontSize: "1.2rem",

                    color: "green",
                  }}
                >
                  {prop.product.price}.00
                </strong>
              </span>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default ProductItem;
