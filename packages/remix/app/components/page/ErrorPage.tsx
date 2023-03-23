import {
  Code,
  Container,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  useTheme,
} from "@chakra-ui/react";

export default function ErrorPage({ error }: { error: Error }) {
  const backgroundColor = useColorModeValue("gray.100", "gray.800");
  const { colors } = useTheme();
  const fontColor = useColorModeValue(colors.highlight, colors.highdark);
  console.log(error);
  return (
    <Flex
      direction={"column"}
      height={"100vh"}
      fontSize={["1rem", "1.2rem", "1.4rem"]}
      gap={"1em"}
      backgroundColor={backgroundColor}
      justifyContent={"center"}
    >
      <Container maxWidth={"container.xl"}>
        <Flex direction={"column"} alignItems={"center"}>
          <Heading color={fontColor}>Uh OH</Heading>
          <Text>Da stimmt wohl etwas nicht</Text>
          <Code
            fontSize={"lg"}
            color={"red.400"}
            paddingX={2}
            paddingY={1}
            marginTop={1}
          >
            {error.message}
          </Code>
        </Flex>
      </Container>
    </Flex>
  );
}
