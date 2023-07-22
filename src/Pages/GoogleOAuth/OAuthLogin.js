import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { Container, Row, Col } from "react-bootstrap";
import React from "react";

export default function OAuthLogin({ setToken }) {
  return (
    <Container>
      <Row>
        <Col xs={4} className="align-self-center">
          <GoogleOAuthProvider clientId="711943192186-sngn4rt48fl80suoe365l7i01e61utt8.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse.credential);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        </Col>
      </Row>
    </Container>
  );
}
