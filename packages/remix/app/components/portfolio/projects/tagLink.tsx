import { Flex, useColorModeValue, Text } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import React from "react";
import type { tagType } from "~/api/strapi";

export default function TagLink({
  tag,
  paramSlug,
}: {
  tag: tagType;
  paramSlug?: string;
}) {
  const selected = useColorModeValue("gray.700", "gray.200");

  return (
    <Flex
      as={Link}
      to={`/projects/${paramSlug == tag.slug ? "" : tag.slug}`}
      order={tag.projects.length}
      backgroundColor={tag.colour ? "#" + tag.colour : "gray.400"}
      color={paramSlug == tag.slug ? "white" : "black"}
      padding={"1"}
      _hover={{ color: "white" }}
      rounded={"lg"}
      key={tag.id}
      justifyContent={"space-between"}
      gap={"2"}
      borderLeftWidth={"0.5em"}
      borderColor={paramSlug == tag.slug ? selected : "transparent"}
    >
      <Text paddingLeft={0.5} as={"span"} textShadow={"#FFF7 0 0 1em"}>
        {tag.title}
      </Text>
      <Text
        as={"span"}
        backgroundColor={"white"}
        rounded={"lg"}
        paddingX={1}
        display={["none", null, "block"]}
        color={"black"}
      >
        {tag.projects.length}
      </Text>
    </Flex>
  );
}
