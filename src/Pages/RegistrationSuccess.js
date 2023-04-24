import Alert from "react-bootstrap/Alert";
import { useNavigate, Link, json } from "react-router-dom";

function RegistrationSuccess(user) {
  return (
    <Alert variant="success" className="text-center">
      <Alert.Heading>
        Congratulations{" "}
        <span>
          <strong>
            {user.gender === "M" ? "Mr. " : "Ms. "}
            {user.name}
          </strong>
        </span>
        , Username{" "}
        <span>
          <strong>{user.username}</strong>
        </span>{" "}
        Registered Successfully!!!!
        <hr />
        <h6>
          Click here to login{" "}
          <span>
            <Link className="btn btn-sm btn-success" to="/login">
              Login
            </Link>
          </span>{" "}
        </h6>
      </Alert.Heading>
    </Alert>
  );
}

export default RegistrationSuccess;
