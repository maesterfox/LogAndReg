import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

function Login() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const correctUsername = "root";
  const correctPassword = "pass";
  const [authorized, setAuthorized] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const enteredUsername = e.target.querySelector('input[type="text"]').value;
    const enteredPassword = e.target.querySelector(
      'input[type="password"]'
    ).value;

    if (
      enteredUsername === correctUsername &&
      enteredPassword === correctPassword
    ) {
      setAuthorized(true);
      window.location.href = "./game.html"; // Redirect to game.html on successful login
    } else {
      console.log("Incorrect login credentials");
    }
  }

  const LoginForm = ({ isMobile }) => (
    <div className={`form-box ${isMobile ? "mobile" : "desktop"}`}>
      {/* Your form structure here */}
    </div>
  );

  return (
    <div className="wrapper">
      {authorized ? (
        <div className="main">{/* Authenticated view */}</div>
      ) : (
        <LoginForm isMobile={isMobile} onSubmit={handleSubmit} />
      )}
    </div>
  );
}

export default Login;
