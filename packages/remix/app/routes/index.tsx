import { Heading, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useActionData } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { userPrefs } from "~/cookie";
import styles from "~/theme/animation.css";
import { checkCode } from "~/api/strapi";
import { useRef, useState } from "react";
import CodeInput from "~/components/page/codeInput";

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

const generateStripes = (
  colour1: string,
  colour2: string,
  colour3: string
): string => {
  return `repeating-linear-gradient(-55deg, ${colour1}, ${colour1} calc(100%*0.4/6), ${colour2} calc(100%*0.4/6), ${colour2} calc(100%*1.5/6), ${colour3} calc(100%*1.5/6), ${colour3} calc(100%*2.5/6), ${colour1} calc(100%*2.5/6), ${colour1} calc(100%*2.75/6), ${colour2} calc(100%*2.75/6), ${colour2} calc(100%*4.5/6), ${colour3} calc(100%*4.5/6), ${colour3} calc(100%*5.5/6), ${colour1} calc(100%*5.5/6), ${colour1} 100%)`;
};

export default function Index() {
  const actionData = useActionData();
  const backgroundColor = useColorModeValue("gray.100", "gray.800");
  const primary = "#ef758a";
  const secondary = "#7cc9c3";

  return (
    <Flex direction={"column"} fontSize={["0.75rem", "1rem", "1.5rem"]}>
      <Flex
        direction={"column"}
        alignItems={"flex-start"}
        justifyContent={"center"}
        minHeight={"calc(var(--vh, 1vh) * 100 - 2.5rem)"}
        backgroundColor={backgroundColor}
      >
        <Flex direction={"column"}>
          <Heading fontSize={"8em"} padding={3}>
            Hi, <br /> this is <br />
            <Text
              as={"span"}
              background={generateStripes("transparent", primary, secondary)}
              backgroundSize={"400% auto"}
              animation={"gradient 90s linear infinite"}
              backgroundClip={"text"}
            >
              Nikolaj
            </Text>
          </Heading>
        </Flex>
      </Flex>
      <CodeInput error={actionData?.error} />
    </Flex>
  );
}
