import {
  Heading,
  Flex,
  Text
} from "@chakra-ui/react";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import type { tagType } from "~/api/strapi";
import { getProjectsByTag } from "~/api/strapi";
import { ProjectList } from "~/components/portfolio/projects/projectList";

export const loader: LoaderFunction = async ({ params }): Promise<{tag: tagType}> => {
  const slug = params.tagSlug;
  const tags = await getProjectsByTag(slug || "");
  const tag = tags[0]
  return { tag: tag };
};

export default function Index() {
  const { tag } = useLoaderData();
  return (
    <>
      <Flex>
        <Heading><Text as={"span"} color={`#${tag.colour}`}>{tag.title}</Text> Projekte</Heading>
      </Flex>
      <ProjectList projects={tag.projects} />
    </>
  );
}
