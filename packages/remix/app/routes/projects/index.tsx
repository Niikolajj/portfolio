import {
  Heading,
} from "@chakra-ui/react";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import type { projectType} from "~/api/strapi";
import {
  getProjects
} from "~/api/strapi";
import { ProjectList } from "~/components/portfolio/projects/projectList";

export const loader: LoaderFunction = async (): Promise<{projects: projectType[]}> => {
  const projects = await getProjects(99,{"populate[0]": "thumbnail"});

  return { projects };
};

export default function Index() {
  const { projects } = useLoaderData();
  return (
    <>
      <Heading>Alle Projekte</Heading>
      <ProjectList projects={projects} />
    </>
  );
}
