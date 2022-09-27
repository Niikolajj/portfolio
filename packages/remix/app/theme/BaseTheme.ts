import type { Colors, ThemeComponents, ThemeConfig } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values

const fonts = {
  body: "Manrope, sans-serif",
  heading: "Manrope, sans-serif",
  mono: "Jetbrains Mono, monospace",
};

const components: ThemeComponents = {
  Link: {
    baseStyle: (props) => ({
      color: props.colorMode === "dark" ? "highdark" : "highlight",

      _hover: {
        color: props.colorMode === "dark" ? "white" : "black",
        textDecoration: "none",
      },
    }),
    variants: {
      hover: (props) => ({
        color: props.colorMode === "dark" ? "white" : "black",
        _hover: {
          color: props.colorMode === "dark" ? "highdark" : "highlight",
        },
      }),
    },
  },
};

const colors: Colors = {
  highlight: "#ef758a",
  highdark: "#7cc9c3",
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

export default extendTheme({
  fonts,
  components,
  colors,
  config,
});
