import { Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { MdEmail, MdLabel, MdLocationPin, MdPhone } from "react-icons/md";
import type { IconType } from "react-icons";
import type { themeType } from "~/routes/profile";
import type { strapiValueType } from "~/api/strapi";

export enum elementType {
  Rating,
  List,
}

export type elementConfig = {
  showIcon?: boolean;
  showLabel?: boolean;
  type?: elementType;
};

export type elementProps = {
  element: strapiValueType;
  config: elementConfig;
  theme: themeType;
};

const icons: { [key: string]: IconType } = {
  phone: MdPhone,
  email: MdEmail,
  location: MdLocationPin,
  default: MdLabel,
};

export default function Element({ element, config = {}, theme }: elementProps) {
  const { label, value, icon } = element;
  const {
    showIcon = false,
    showLabel = false,
    type = elementType.List,
  } = config;

  const before =
    type == elementType.List && !showIcon
      ? { content: '">"', paddingRight: "0.2rem", fontWeight: "bold" }
      : {};

  const IconOutput = icon ? icons[icon] : icons["default"];
  let valueOutput;

  switch (type) {
    case elementType.List:
      valueOutput = value;
      break;
    case elementType.Rating:
      if (typeof value === "number") {
        valueOutput = Array.from(Array(6).keys()).map((index) => {
          return (
            <Flex
              flexGrow={1}
              height={"1rem"}
              backgroundColor={
                index < value
                  ? theme?.backgroundColor ?? "gray.700"
                  : "gray.300"
              }
              key={index}
            />
          );
        });
        break;
      }
  }
  return (
    <VStack
      alignItems={"flex-start"}
      spacing={0}
      order={typeof value === "number" ? 6 - value : 0}
    >
      {showLabel && label && <Text>{label}</Text>}
      <HStack alignItems={"center"} width={"100%"}>
        {showIcon && <IconOutput />}
        <Flex _before={before} direction={"row"} width={"100%"}>
          {valueOutput}
        </Flex>
      </HStack>
    </VStack>
  );
}
