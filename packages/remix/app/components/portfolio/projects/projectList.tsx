import {
  Heading,
  Text,
  Flex,
  useColorModeValue,
  Image,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { FiGithub } from "react-icons/fi";
import type { projectType } from "~/api/strapi";

export const ProjectList = ({ projects }: { projects: projectType[] }) => {
  const elementColor = useColorModeValue("gray.300", "gray.700");
  const inverted = useColorModeValue("invert(0)", "invert(1)");

  return (
    <Flex direction={"column"} gap={1}>
      {projects.map((project: projectType) => {
        return (
          <Flex key={project.id} flexBasis={{ base: "100%", lg: "50%" }}>
            <Flex
              flexBasis={"100%"}
              direction="row"
              alignItems={"stretch"}
              justifyContent={"space-between"}
              background={elementColor}
              rounded={"lg"}
              gap={1}
              pos={"relative"}
              minHeight={"4em"}
            >
              <ChakraLink
                as={Link}
                to={`/project/${project.slug}`}
                variant={"hover"}
                flexGrow={1}
              >
                <Flex padding={3} gap={2} flexGrow={1}>
                  {project.thumbnail && (
                    <Flex
                      height={"4em"}
                      width={"4em"}
                      flexShrink={1}
                      justifyContent={"center"}
                    >
                      <Image
                        src={project.thumbnail.url}
                        maxHeight={"4em"}
                        maxWidth={"4em"}
                        filter={inverted}
                        padding={"0.5em"}
                        display={["none", null, "block"]}
                      />
                    </Flex>
                  )}
                  <Flex direction={"column"} flexGrow={1}>
                    <Heading size={"md"} marginBottom={0}>
                      {project.title}
                    </Heading>
                    <Text paddingRight={8}>{project.description}</Text>
                  </Flex>
                </Flex>
              </ChakraLink>
              <Flex
                direction={"column"}
                alignItems={"flex-end"}
                gap={1}
                pos={"absolute"}
                right={3}
                top={3}
                pointerEvents={"none"}
              >
                <Text
                  as={"span"}
                  fontSize={"0.7em"}
                  visibility={["hidden", null, "visible"]}
                >
                  {project.status}
                </Text>
                {project.repoUrl && (
                  <ChakraLink
                    href={project.repoUrl}
                    pointerEvents={"initial"}
                    padding={1}
                  >
                    <FiGithub />
                  </ChakraLink>
                )}
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};
