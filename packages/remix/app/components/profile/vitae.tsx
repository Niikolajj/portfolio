import {
  Box,
  Heading,
  Flex,
  Link as ChakraLink,
  VStack,
  Text,
  Spacer,
  HStack,
} from "@chakra-ui/react";
import { Link, useLoaderData } from "@remix-run/react";
import { fetchStrapi } from "~/api/strapi";
import SidebarElement from "./SidebarElement";
import { elementType } from "./SidebarElement/element";
import TimelineElement from "./TimelineElement";

export default function Vitae({
  profile,
  theme,
}: {
  profile: any;
  theme: any;
}) {
  const { personal, adress, birth, experience, prof } = profile;
  const { strengths, software, languages, interests, summary } =
    prof.data.attributes;
  const { work, education, internships } = experience.data.attributes;
  return (
    <Flex
      width={"210mm"}
      min-height={"297mm"}
      margin={"10mm auto"}
      direction={"column"}
      boxShadow={"0 0 0.5cm rgba(0,0,0,0.5)"}
      backgroundColor={"white"}
      className={"mainPage"}
    >
      <Flex
        direction={"column"}
        color={"black"}
        backgroundColor={"white"}
        padding={"1.5cm"}
        height={"297mm"}
        minHeight={"297mm"}
        className={"subPage"}
      >
        <Box
          backgroundColor={theme.backgroundColor ?? "gray.700"}
          color={"white"}
          padding={4}
        >
          <Heading fontWeight={100} textAlign={"right"}>
            {personal.data.attributes.firstName +
              " " +
              personal.data.attributes.lastName}
          </Heading>
        </Box>

        <HStack height={"100%"} alignItems={"stretch"} overflow={"hidden"}>
          <VStack
            direction={"column"}
            flexBasis={"33%"}
            alignItems={"flex-start"}
            padding={2}
            spacing={2}
          >
            <SidebarElement
              title={"Contacts"}
              elements={personal.data.attributes.contacts.data}
              config={{ showIcon: true, showLabel: false }}
              theme={theme}
            />
            <SidebarElement
              title={"Skills"}
              elements={strengths.data}
              theme={theme}
            />
            <SidebarElement
              title={"Software"}
              elements={software.data}
              theme={theme}
            />
            <SidebarElement
              title={"Languages"}
              config={{ type: elementType.Rating, showLabel: true }}
              elements={languages.data}
              theme={theme}
            />
            <SidebarElement
              title={"Interests"}
              elements={interests.data}
              theme={theme}
            />
          </VStack>
          <VStack
            direction={"column"}
            flexBasis={"66%"}
            padding={2}
            backgroundColor={`gray.200`}
            spacing={2}
          >
            <TimelineElement
              title={"About me"}
              elements={summary}
              theme={theme}
            />
            <TimelineElement title={"Work"} elements={work} theme={theme} />
            <TimelineElement
              title={"Education"}
              elements={education}
              theme={theme}
            />
            <TimelineElement
              title={"Internships"}
              elements={internships}
              theme={theme}
            />
          </VStack>
        </HStack>
      </Flex>
    </Flex>
  );
}
