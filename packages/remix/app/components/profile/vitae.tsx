import { Box, Heading, VStack, HStack } from "@chakra-ui/react";
import type { applicationType } from "~/api/strapi";
import { locales } from "~/api/strapi";
import type { themeType } from "~/routes/profile";
import SidebarElement from "./SidebarElement";
import { elementType } from "./SidebarElement/element";
import Picture from "./SidebarElement/picture";
import TimelineElement from "./TimelineElement";

type viteaProps = {
  data: applicationType;
  theme: themeType;
};

export default function Vitae({ data, theme }: viteaProps) {
  const { profile, experience, picture } = data;
  const { personal, strengths, softwares, interests, summary, languages } =
    profile;
  const { work, education, internships } = experience;

  const isGerman = theme.layout === locales.German;

  return (
    <>
      <Box
        backgroundColor={theme.backgroundColor ?? "gray.700"}
        color={"white"}
        padding={4}
      >
        <Heading fontWeight={100} textAlign={"right"}>
          {personal.firstName + " " + personal.lastName}
        </Heading>
      </Box>

      <HStack height={"100%"} alignItems={"stretch"} spacing={0}>
        <VStack
          direction={"column"}
          flexBasis={"33%"}
          alignItems={"flex-start"}
          padding={2}
          spacing={2}
        >
          {isGerman && picture && <Picture picture={picture} theme={theme} />}
          <SidebarElement
            title={isGerman ? "Kontakt" : "Contacts"}
            elements={personal.contacts}
            config={{ showIcon: true, showLabel: false }}
            theme={theme}
          />
          <SidebarElement
            title={isGerman ? "Fähigkeiten" : "Skills"}
            elements={strengths}
            theme={theme}
          />
          <SidebarElement
            title={"Software"}
            elements={softwares}
            theme={theme}
          />
          <SidebarElement
            title={isGerman ? "Sprachen" : "Languages"}
            config={{ type: elementType.Rating, showLabel: true }}
            elements={languages}
            theme={theme}
          />
          <SidebarElement
            title={isGerman ? "Interessen" : "Interests"}
            elements={interests}
            theme={theme}
          />
        </VStack>
        <VStack
          direction={"column"}
          flexBasis={"67%"}
          padding={2}
          backgroundColor={`gray.200`}
          spacing={2}
        >
          <TimelineElement
            title={isGerman ? "Über mich" : "About me"}
            elements={summary}
            theme={theme}
          />
          <TimelineElement
            title={isGerman ? "Arbeit" : "Work"}
            elements={work}
            theme={theme}
          />
          <TimelineElement
            title={isGerman ? "Schule" : "Education"}
            elements={education}
            theme={theme}
          />
          <TimelineElement
            title={isGerman ? "Praktikas" : "Internships"}
            elements={internships}
            theme={theme}
          />
        </VStack>
      </HStack>
    </>
  );
}
