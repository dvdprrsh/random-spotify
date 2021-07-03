import Footer from "components/Footer.component";
import Header from "components/Header.component";
import { Grommet, Main, ThemeMode } from "grommet";
import Cookies from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useRoutes } from "react-router-dom";
import { InitializeState, RecoilRoot } from "recoil";
import styled from "styled-components";
import Home from "views/Home";
import authState, { AuthState } from "./atoms/auth.atom";
import RecoilDebug from "./components/RecoilDebug.component";
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
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialThemeMode);
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  const handleThemeModeChange = useCallback((tm: { themeMode: ThemeMode } | null) => setThemeMode(tm?.themeMode), []);

  const initialiseState = useCallback<InitializeState>(({ set }) => set(authState, authInitState), [authInitState]);

  useEffect(() => {
    if (!themeMode) setThemeMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode, themeMode]);

  useEffect(() => {
    if (themeMode) Cookies.set("_thememode", themeMode);
  }, [themeMode]);

  return (
    <RecoilRoot initializeState={initialiseState}>
      <RecoilDebug />
      <MyGrommet theme={myTheme} themeMode={themeMode} full="min">
        <Header ref={handleThemeModeChange} initialThemeMode={initialThemeMode} />
        <Main margin={{ horizontal: "xlarge" }} pad={{ horizontal: "xlarge", vertical: "small" }} basis="full" fill="vertical" animation="fadeIn">
          {element}
        </Main>
        <Footer />
      </MyGrommet>
    </RecoilRoot>
  );
};

export default App;
