import { Button, Card } from "react-bootstrap";
import logo1 from "../static/images/Logo1.jpg";

export function StoreItem() {
  return (
    <div className="mx-2">
      <img
        src={logo1}
        className="img-circle"
        style={{ width: "200px", height: "200px" }}
      ></img>
    </div>
  );
}
