import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { defaults } from "react-sweet-state";
import App from "./App";

defaults.devtools = true;

const Main: React.FC = () => {
  return (
    <BrowserRouter>
      <App initialThemeMode={__CONFIG__.initialThemeMode} authInitState={__CONFIG__.authInitState} />
    </BrowserRouter>
  );
};

hydrate(<Main />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
