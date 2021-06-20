import { Center, ChakraProvider, ColorModeScript, Container, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useRoutes } from "react-router-dom";
import useMediaQuery from "./hooks/useMediaQuery";
import theme from "./theme";
import Home from "./views/Home";

const App: React.FC = () => {
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)", "dark" as const, "light" as const);
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Container as="header" maxWidth="none" padding="5" background="Background" mb="10">
        <Flex width="full" align="center">
          <Center flex="1">
            <Heading fontWeight="bold" textTransform="uppercase">
              Randomise Spotify
            </Heading>
          </Center>
        </Flex>
      </Container>
      <Container>{element}</Container>
      <Container as="footer" maxWidth="none" background="Background" padding="5" mt="10">
        <Flex width="full" align="center">
          <Center flex="1">
            <Text colorScheme="spotify">Spotify-Randomise</Text>
          </Center>
        </Flex>
      </Container>
    </ChakraProvider>
  );
};

export default App;
