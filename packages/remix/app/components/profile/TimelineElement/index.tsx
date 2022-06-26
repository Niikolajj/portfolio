import { Box, Flex, Heading, VStack, Text } from "@chakra-ui/react";
import Element from "./element";
import List from "./list";

type timelineData = {
  title: string;
  elements: elementData[];
};

export type companyData = {
  name: string;
  location: string;
};

export type elementData = {
  date: string | { start: string; end: string };
  title: string;
  organization: companyData;
  tasks?: string[];
};

export default function index({ title, elements, theme }: any) {
  const display =
    typeof elements === "object" ? (
      <List elements={elements.data} />
    ) : (
      <Text textAlign={"justify"}>{elements}</Text>
    );
  return (
    <VStack width={"100%"} alignItems={"flex-start"} spacing={2}>
      <Heading
        backgroundColor={theme.color ?? "white"}
        padding={2}
        paddingRight={8}
        color={theme.backgroundColor ?? "gray.700"}
        size={"lg"}
      >
        {title}
      </Heading>
      <VStack direction={"column"} width={"100%"} alignSelf={"stretch"}>
        {display}
      </VStack>
    </VStack>
  );
}
