import { Flex, Heading, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import type { projectType } from "~/api/strapi";
import { Project } from "./projects/project";

export default function ProjectOverview({
  projects,
}: {
  projects: projectType[];
}) {
  return (
    <Flex direction={"column"}>
      <Heading>
        <ChakraLink as={Link} to={"/projects/"} variant={"hover"}>
          Projekte
        </ChakraLink>
      </Heading>
      <Flex flexWrap={"wrap"} alignItems={"stretch"}>
        {projects.map((project: projectType) => {
          return <Project project={project} key={project.id} />;
        })}
      </Flex>
      <Flex direction={"column"} alignItems={"flex-end"}>
        <ChakraLink as={Link} to={`/projects`} variant={"bg"}>
          weitere Projekte {"->"}
        </ChakraLink>
      </Flex>
    </Flex>
  );
}
