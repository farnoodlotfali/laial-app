import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// ReactDOM.render(
//   // <React.StrictMode><App/></React.StrictMode>
//   <Fragment>
//     <Router>
//       <App />
//     </Router>
//   </Fragment>,
//   document.getElementById("root")
// );
const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(
    <Fragment>
      <Router>
        <App />
      </Router>
    </Fragment>,
    rootElement
  );
} else {
  ReactDOM.render(
    <Fragment>
      <Router>
        <App />
      </Router>
    </Fragment>,
    rootElement
  );
}

reportWebVitals();
