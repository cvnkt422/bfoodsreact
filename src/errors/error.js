import React, { useState } from "react";
import { Alert } from "react-bootstrap";

function Error(props) {
  const [show, setShow] = useState(props.show);
  return (
    <div>
      {show && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading className="text-center">
            Bad Credentials!
          </Alert.Heading>
        </Alert>
      )}
    </div>
  );
}

export default Error;
