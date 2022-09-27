import {
  Heading,
  Text,
  AspectRatio,
  Flex,
  useColorModeValue,
  Link as ChakraLink
} from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import type { projectType } from "~/api/strapi";

export const Project = ({ project }: { project: projectType }) => {
  const elementColor = useColorModeValue("gray.300", "gray.700");

  return (
    <Flex key={project.id} flexBasis={{ base: "100%", lg: "50%" }}>
      <Flex
        flexBasis={"100%"}
        direction="row"
        alignItems={"stretch"}
        margin={2}
        background={elementColor}
        borderRadius={"md"}
      >
        <ChakraLink
          as={Link}
          to={`/project/${project.slug}`}
          variant={"hover"}
          flexBasis={"100%"}
        >
          <Flex >
            <AspectRatio ratio={1} height={"100%"}>
              <Flex height={"100%"} width={"100%"}></Flex>
            </AspectRatio>
          </Flex>
          <Flex direction={"column"} padding={3} flexGrow={1}>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Heading size={"md"} marginBottom={1}>
                {project.title}
              </Heading>
              <Text as={"span"} fontSize={"0.7em"}>
                {project.status}
              </Text>
            </Flex>
            <Text>{project.description}</Text>
          </Flex>
        </ChakraLink>
      </Flex>
    </Flex>
  );
};
