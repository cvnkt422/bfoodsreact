import React from "react";

function OAuthSuccess() {
  console.log(window.location.href);

  //window.history.pushState({}, document.title, "/" + "oauthsuc");

  const logout = () => {
    console.log("logged out successfully");
  };

  return (
    <div>
      Google OAuth Login Success!!!!!!
      <h2>Your Full Name is : </h2>
      <img id="image" />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default OAuthSuccess;
