import {
  Heading,
  Flex,
  Container,
  VStack,
  HStack,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import type { projectType } from "~/api/strapi";
import { getProjectBySlug } from "~/api/strapi";
import ReactMarkdown from "react-markdown";
import { FiGithub } from "react-icons/fi";

export const loader: LoaderFunction = async ({
  params,
}): Promise<projectType> => {
  const slug = params.projectSlug;
  const projects = await getProjectBySlug(slug || "");
  return projects[0];
};

export default function Index() {
  const project = useLoaderData();
  const highlight = useColorModeValue("highlight", "highdark");
  const navigate = useNavigate()

  return (
    <>
      <Flex height={"10rem"} backgroundColor={highlight}>
        <Container>
          <Flex direction={"column"} height={"100%"} justifyContent={"flex-end"} alignItems={"flex-start"}>
            <ChakraLink onClick={() => navigate(-1)} color={"gray.800"} padding={1} paddingX={2}>{"<- zurück"}</ChakraLink>
          </Flex>
        </Container>
      </Flex>
      <Container marginTop={"1em"} marginBottom={"3em"}>
        <HStack>
          <VStack alignItems={"flex-start"}>
            <HStack mb={"2"}>
              <Heading size={"lg"}>
                {project.title}
              </Heading>
              <Flex>
                {project.tags}
              </Flex>
              {project.repoUrl && <Heading size={"lg"}>
                <ChakraLink href={project.repoUrl}>
                  <FiGithub />
                </ChakraLink>
              </Heading>}
            </HStack>
            <ReactMarkdown components={{ h1: HeadingRender, h2: HeadingRender, h3: HeadingRender, h4: HeadingRender, h5: HeadingRender, h6: HeadingRender, }}>{project.content}</ReactMarkdown>
          </VStack>
        </HStack>
      </Container>
    </>
  );
}

const HeadingRender = (props: any) => {
  const { level, children } = props
  const sizes = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
  return <Heading size={sizes[level]}>
    {children}
  </Heading>
}