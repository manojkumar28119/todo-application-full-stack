import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
 
// Create the root DOM element where the React app will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the React application inside the root element
root.render(
  <React.StrictMode>
    {/* The Provider component makes the Redux store available to any nested components */}
       {/* The main App component that represents the entire application */}
      <App />
     
  </React.StrictMode>
);

// Measure and report the performance of the app (optional)
// This function can be used to log performance metrics or send them to an analytics endpoint
reportWebVitals();
