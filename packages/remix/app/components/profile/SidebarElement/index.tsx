import { Box, Flex, Heading, VStack } from "@chakra-ui/react";
import Element from "./element";
import { elementConfig } from "./element";

type sidebarData = {
  title: string;
  elements: elementData[];
  config: elementConfig;
};

export type elementData = {
  value: string | number;
  label?: string;
  icon?: string;
};

export default function index({ title, elements, config, theme }: any) {
  return (
    <VStack direction={"column"} alignItems={"stretch"} spacing={1}>
      <Heading
        alignSelf={"flex-start"}
        backgroundColor={theme.backgroundColor ?? "gray.700"}
        padding={2}
        paddingRight={6}
        color={theme.color ?? "white"}
        size={"lg"}
      >
        {title}
      </Heading>
      <VStack alignItems={"stretch"} spacing={0}>
        {elements.map((element: any, index: number) => {
          return (
            <Element
              element={element}
              config={config}
              key={index}
              theme={theme}
            />
          );
        })}
      </VStack>
    </VStack>
  );
}
