import React from "react";
import { Button } from "react-bootstrap";

function GAuth() {
  const signIn = () => {
    console.log("Signing In");
    let oauthURL = "https://accounts.google.com/o/oauth2/v2/auth";
    let tokenURL = "https://accounts.google.com/o/oauth2/token";

    let form = document.createElement("form");
    form.setAttribute("method", "GET");
    form.setAttribute("action", oauthURL);

    let params = {
      client_id:
        "711943192186-sngn4rt48fl80suoe365l7i01e61utt8.apps.googleusercontent.com",
      redirect_uri: "http://localhost:3000/oauthsuc",
      //redirect_uri: "http://localhost:8080/login/oauth2/code/google",
      response_type: "code",
      scope:
        "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
      include_granted_scopes: true,
      state: "pass-through-value",
    };

    for (var p in params) {
      let input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div>
      <Button onClick={signIn}> Login with Google </Button>
    </div>
  );
}

export default GAuth;
