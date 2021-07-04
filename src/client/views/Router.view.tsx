import authState from "client/atoms/auth.atom";
import Redirect from "client/components/Redirect.component";
import React, { FC } from "react";
import { useRoutes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Dashboard from "./Dashboard.view";
import Home from "./Home.view";

interface Props {}

const Router: FC<Props> = () => {
  const auth = useRecoilValue(authState);
  const element = useRoutes([
    {
      path: "/",
      element: !auth ? <Home /> : <Redirect to="/dashboard" />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
  ]);

  return element;
};

export default Router;
