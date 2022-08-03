import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export default extendTheme({
  fonts: {
    body: "Manrope, sans-serif",
    heading: "Manrope, sans-serif",
    mono: "Jetbrains Mono, monospace",
  },
  components: {
    VStack: {
      baseStyle: {
        align: "flex-start",
      },
    },
    HStack: {
      baseStyle: {
        alignItems: "flex-start",
      },
    },
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
});
