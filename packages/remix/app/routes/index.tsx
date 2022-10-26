import { Flex, useColorModeValue, Container, useTheme } from "@chakra-ui/react";
import { useActionData, useLoaderData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { userPrefs } from "~/cookie";
import styles from "~/theme/animation.css";
import type { portfolioType, projectType } from "~/api/strapi";
import { checkCode, getPortfolio, getProjects } from "~/api/strapi";
import CodeInput from "~/components/page/codeInput";
import PortfolioText from "~/components/portfolio/text";
import Header from "~/components/portfolio/header";
import SkillList from "~/components/portfolio/skillList";
import ProjectOverview from "~/components/portfolio/projectOverview";
import NowListening from "~/components/portfolio/nowListening";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  if (await checkCode(values.code?.toString() ?? "")) {
    const cookieHeader = request.headers.get("Cookie");

    const cookie = (await userPrefs.parse(cookieHeader)) || {};
    cookie.applicationCode = formData.get("code");
    return redirect("/profile", {
      headers: {
        "Set-Cookie": await userPrefs.serialize(cookie),
      },
    });
  }
  const error = { name: "Invalid code" };
  return json({ error, values });
};

export const loader: LoaderFunction = async (): Promise<loaderFunctionType> => {
  const portfolio = await getPortfolio();
  const projects = await getProjects(6, {
    "sort[0]": "id%3Adesc",
    "pagination[pageSize]": 6,
  });
  return { portfolio, projects };
};

type loaderFunctionType = {
  portfolio: portfolioType;
  projects: projectType[];
};

export default function Index() {
  const actionData = useActionData();
  const { portfolio, projects } = useLoaderData<loaderFunctionType>() ?? {};
  const { header, aboutMe, skillList, toLearnList, nowListening } = portfolio;
  const backgroundColor = useColorModeValue("gray.100", "gray.800");
  const { colors } = useTheme();
  return (
    <Flex
      direction={"column"}
      fontSize={["1rem", "1.2rem", "1.4rem"]}
      gap={"1em"}
      backgroundColor={backgroundColor}
    >
      {header && (
        <Container maxWidth={"container.xl"}>
          <Header
            richText={header.text}
            highlight={header.highlight}
            colors={{
              colour1: "transparent",
              colour2: colors.highlight,
              colour3: colors.highdark,
            }}
          />
        </Container>
      )}
      <Container
        maxWidth={"container.xl"}
        marginTop={"-1em"}
        justifySelf={"flex-start"}
      >
        <Flex direction={"column"} gap={2}>
          <PortfolioText richText={aboutMe?.body || ""} />
          <NowListening
            lastFMUsername={nowListening.lastFMUsername}
            fallbackUrl={nowListening.fallbackUrl}
          />
        </Flex>
      </Container>
      {skillList && (
        <Container maxWidth={"container.xl"}>
          <Flex direction={"column"}>
            <SkillList skillList={skillList} />
            <PortfolioText richText={toLearnList?.body} />
          </Flex>
        </Container>
      )}
      {projects && (
        <Container maxWidth={"container.xl"}>
          <ProjectOverview projects={projects} />
        </Container>
      )}
      <CodeInput error={actionData?.error} />
    </Flex>
  );
}
