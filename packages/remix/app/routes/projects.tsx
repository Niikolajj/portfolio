import {
  Flex,
  Container,
  VStack,
  HStack,
  Link as ChakraLink,
  Heading,
} from "@chakra-ui/react";
import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import type { tagType } from "~/api/strapi";
import { getTags } from "~/api/strapi";
import { AiFillHome } from "react-icons/ai";
import TagLink from "~/components/portfolio/projects/tagLink";

export const loader: LoaderFunction = async (): Promise<{
  tags: tagType[];
}> => {
  const tags = await getTags();
  return { tags };
};

export default function Index() {
  const { tags } = useLoaderData() ?? {};
  const params = useParams();
  return (
    <Flex direction={"column"}>
      <Container maxWidth={"container.xl"} height={"6em"}></Container>
      <Container maxWidth={"container.xl"}>
        <HStack width={"100%"} alignItems={"flex-start"}>
          <VStack flex={"0 0 20%"} alignItems={"stretch"}>
            <ChakraLink as={Link} to={"/"} alignSelf={"flex-start"}>
              <Flex alignItems={"center"} gap={"2"}>
                <AiFillHome size={"2em"} />
                <Heading>{"Home"}</Heading>
              </Flex>
            </ChakraLink>
            <Flex direction={"column-reverse"} gap={"1"}>
              {tags.map((tag: tagType) => {
                return (
                  tag.projects.length > 0 && (
                    <TagLink tag={tag} paramSlug={params.tagSlug} />
                  )
                );
              })}
            </Flex>
          </VStack>
          <VStack flex={"0 1 80%"} alignItems={"stretch"}>
            <Outlet />
          </VStack>
        </HStack>
      </Container>
    </Flex>
  );
}
