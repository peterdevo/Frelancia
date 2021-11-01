import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Router } from "react-router-dom";
import { store, StoreContext } from "./stores/store";
import {createBrowserHistory} from "history"

export const history=createBrowserHistory();
ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
