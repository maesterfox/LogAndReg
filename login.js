// Login.js

import React, { useState } from 'react';

function Login() {
  const correctUsername = 'MrFox';
  const correctPassword = 'Bergkamp';
  const [authorized, setAuthorized] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const enteredUsername = e.target.querySelector('input[type="text"]').value;
    const enteredPassword = e.target.querySelector('input[type="password"]').value;

    if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
      setAuthorized(true);
      window.location.href = './game.html'; // Redirect to game.html on successful login
    } else {
      // Handle incorrect login
      console.log('Incorrect login credentials');
    }
  }

  const loginForm = (
    <div className="wrapper">
      <div className="form-box login">
        <h2 className="animation" style={{ '--i': 0, '--j': 21 }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
            <input type="text" name="username" required />
            <label>Username</label>
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
            <input type="password" name="password" required />
            <label>Password</label>
            <i className="bx bxs-lock-alt"></i>
          </div>
          <div className="logreg-link">
            <button type="submit" className="btn animation" style={{ '--i': 3, '--j': 24 }}>Login</button>
            <div className="logreg-link animation" style={{ '--i': 4, '--j': 25 }}>
              <p>Don't have an account? <a href="#" className="register-link">Sign Up</a></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div>
      {authorized ? (
        <div className="main">
          <h1>The Foxy BetBuilder</h1>
          <p>This is a test for a game prediction app</p>
          <button onClick={() => window.location.reload()}>Logout</button>
          {/* Table for displaying outcomes */}
          <table id="results" className="resultsTable">
            {/* Your table content */}
          </table>
        </div>
      ) : (
        loginForm
      )}
    </div>
  );
}

export default Login;
