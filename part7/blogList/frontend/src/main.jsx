import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

store.subscribe(() => {
  console.log("store from main jsx:", store.getState());
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
