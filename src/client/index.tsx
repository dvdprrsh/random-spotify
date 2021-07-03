import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const Main: React.FC = () => {
  return (
    <BrowserRouter>
      <App {...__CONFIG__} />
    </BrowserRouter>
  );
};

hydrate(<Main />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
