import Footer from "components/Footer.component";
import Header from "components/Header.component";
import { Grommet, Main, ThemeMode } from "grommet";
import Cookies from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { InitializeState, RecoilRoot } from "recoil";
import styled from "styled-components";
import authState, { AuthState } from "./atoms/auth.atom";
import RecoilDebug from "./components/RecoilDebug.component";
import myTheme from "./theme";
import Router from "./views/Router.view";

interface Props {
  initialThemeMode: "dark" | "light" | undefined;
  authInitState: AuthState;
}

const MyGrommet = styled(Grommet)`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const App: React.FC<Props> = ({ initialThemeMode, authInitState }: Props) => {
  const prefersDarkMode = useMediaQuery({ query: "(prefers-color-scheme: dark)" });
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialThemeMode);

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
        <Main width={{ width: "100%", max: "xlarge" }} pad={{ horizontal: "small" }} fill="vertical" animation="fadeIn">
          <Router />
        </Main>
        <Footer />
      </MyGrommet>
    </RecoilRoot>
  );
};

export default App;
