import { extendTheme, Theme } from "@chakra-ui/react";

const theme: Partial<Theme> = {
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
};

export default extendTheme(theme);
