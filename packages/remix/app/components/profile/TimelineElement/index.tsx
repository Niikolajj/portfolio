import { Heading, VStack, Text } from "@chakra-ui/react";
import type { occupationType } from "~/api/strapi";
import type { themeType } from "~/routes/profile";
import List from "./list";

type timelineData = {
  title: string;
  elements: occupationType[] | string;
  theme: themeType;
};

export default function index({ title, elements, theme }: timelineData) {
  const display =
    typeof elements === "object" ? (
      <List elements={elements} />
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
