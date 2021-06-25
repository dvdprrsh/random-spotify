import { Footer, Grommet, Header, Heading, Main, Text } from "grommet";
import React from "react";
import { useRoutes } from "react-router-dom";
import styled from "styled-components";
import useMediaQuery from "./hooks/useMediaQuery";
import theme from "./theme";
import Home from "./views/Home";

const MyFooter = styled(Footer)`
  position: sticky;
  top: 100%;
`;

const App: React.FC = () => {
  const themeMode = useMediaQuery("(prefers-color-scheme: dark)", "dark" as const, "light" as const);
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return (
    <Grommet theme={theme} themeMode={themeMode} full="min">
      <Header background="brand" pad={{ vertical: "xsmall", horizontal: "xlarge" }} margin={{ bottom: "large" }} justify="center">
        <Heading color="contrast" margin="small" size="small">
          Randomise Spotify
        </Heading>
      </Header>
      <Main pad={{ horizontal: "xlarge" }} basis="full" fill="vertical">
        {element}
      </Main>
      <MyFooter background="background-strong" pad={{ vertical: "small", horizontal: "xlarge" }} margin={{ top: "large" }} justify="center">
        <Text size="medium">Spotify-Randomise</Text>
      </MyFooter>
    </Grommet>
  );
};

export default App;
