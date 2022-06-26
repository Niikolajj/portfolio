import { Flex, HStack, Text, VStack } from "@chakra-ui/react";
import type { elementData } from ".";
import { MdEmail, MdLabel, MdLocationPin, MdPhone } from "react-icons/md";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import type { IconType } from "react-icons";

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
  element: elementData;
  config: elementConfig;
};

const icons: { [key: string]: IconType } = {
  phone: MdPhone,
  email: MdEmail,
  location: MdLocationPin,
  default: MdLabel,
};

export default function Element({ element, config = {} }: elementProps) {
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
      valueOutput = Array.from(Array(6).keys()).map((index) => {
        return (
          <Flex
            flexGrow={1}
            height={"1rem"}
            backgroundColor={index < value ? "#0dbd8b" : "gray.300"}
            key={index}
          />
        );
      });
      break;
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
