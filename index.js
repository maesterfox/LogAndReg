// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import Contact from './Contact'; // Import the Contact component
import './index.css'; // Import your styles if needed

// Render the Contact component inside the loginForm element
ReactDOM.render(
  <React.StrictMode>
    <Contact />
  </React.StrictMode>,
  document.getElementById('loginForm') // Use the id of your login form element
);
