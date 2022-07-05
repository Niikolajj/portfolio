import { Heading, VStack } from "@chakra-ui/react";
import type { languageValueType, strapiValueType } from "~/api/strapi";
import type { themeType } from "~/routes/profile";
import Element from "./element";
import type { elementConfig } from "./element";

type sidebarProps = {
  title: string;
  elements: strapiValueType[] | languageValueType[];
  config?: elementConfig;
  theme: themeType;
};

export default function index({
  title,
  elements,
  config,
  theme,
}: sidebarProps) {
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
        {elements.map((element, index: number) => {
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
