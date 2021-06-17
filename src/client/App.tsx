import React from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import Home from "./Home";

const App: React.FC = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return <div>{element}</div>;
};

export default App;
