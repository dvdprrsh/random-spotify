import Footer from "components/Footer.component";
import Header from "components/Header.component";
import useAuthContext, { AuthState } from "contexts/auth.context";
import { Grommet, Main, ThemeMode } from "grommet";
import Cookies from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useRoutes } from "react-router-dom";
import styled from "styled-components";
import Home from "views/Home";
import myTheme from "./theme";

interface Props {
  initialThemeMode: "dark" | "light" | undefined;
  authInitState: AuthState;
}

const MyGrommet = styled(Grommet)`
  display: flex;
  flex-flow: column;
`;

const App: React.FC<Props> = ({ initialThemeMode, authInitState }: Props) => {
  const prefersDarkMode = useMediaQuery({ query: "(prefers-color-scheme: dark)" });
  const [, actions] = useAuthContext();
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialThemeMode);
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  const handleThemeModeChange = useCallback((tm: { themeMode: ThemeMode } | null) => setThemeMode(tm?.themeMode), []);

  useEffect(() => {
    if (!themeMode) setThemeMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode, themeMode]);

  useEffect(() => {
    if (themeMode) Cookies.set("_thememode", themeMode);
  }, [themeMode]);

  useEffect(() => {
    actions.setState(authInitState);
  }, [actions, authInitState]);

  return (
    <MyGrommet theme={myTheme} themeMode={themeMode} full="min">
      <Header ref={handleThemeModeChange} initialThemeMode={initialThemeMode} />
      <Main margin={{ horizontal: "xlarge" }} pad={{ horizontal: "xlarge", vertical: "small" }} basis="full" fill="vertical" animation="fadeIn">
        {element}
      </Main>
      <Footer />
    </MyGrommet>
  );
};

export default App;
