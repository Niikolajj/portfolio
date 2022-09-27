import { Flex, Heading, List, VStack, ListItem } from "@chakra-ui/react";
import type { tagListType, tagType } from "~/api/strapi";
import ListElement from "./listElement";

export default function index({ skillList }: { skillList: tagListType }) {
  return (
    <Flex direction={"column"} alignItems={"flex-start"}>
      <Heading>{skillList?.title}</Heading>
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent={"space-around"}
        width={"100%"}
        paddingRight={2}
        marginY={2}
      >
        <SkillList title={skillList.leftTitle} list={skillList.leftList} />
        <SkillList title={skillList.middleTitle} list={skillList.middleList} />
        <SkillList title={skillList.rightTitle} list={skillList.rightList} />
      </Flex>
    </Flex>
  );
}

const SkillList = ({ list, title }: { list: tagType[]; title?: string }) => {
  return (
    <VStack alignItems={"flex-start"}>
      {title && <Heading size={"lg"}>{title}</Heading>}
      <List paddingLeft={{ base: "4", md: "0" }}>
        {list.map((element: tagType) => {
          return (
            <ListItem key={element.id}>
              <ListElement listElement={element} />
            </ListItem>
          );
        })}
      </List>
    </VStack>
  );
};
