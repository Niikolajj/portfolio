import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Flex,
  Link as ChakraLink,
  VStack,
  Spacer,
  useColorModeValue,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { userPrefs } from "~/cookie";
import styles from "~/theme/animation.css";
import { fetchFindStrapi } from "~/api/strapi";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  const res = await fetchFindStrapi(
    "applications",
    values.code?.toString() ?? ""
  );
  const results = await res.json();

  if (results.data.length > 0) {
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

export default function Index() {
  const actionData = useActionData();
  const formBackgroundColor = useColorModeValue("gray.300", "gray.700");
  const backgroundColor = useColorModeValue("gray.100", "gray.800");
  const invalid = actionData && actionData.error !== undefined;

  console.log(actionData);

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"space-between"}
      height={"calc(var(--vh, 1vh) * 100)"}
      backgroundColor={backgroundColor}
    >
      <Flex></Flex>
      <Flex direction={"column"} gap={4}>
        <Heading
          size={"4xl"}
          background={
            "repeating-linear-gradient(-55deg, #ffbd69, #ffbd69 calc(100%*0.5/6), #ff6363 calc(100%*0.5/6), #ff6363 calc(100%*1.5/6), #543864 calc(100%*1.5/6), #543864 calc(100%*2.5/6), #ffbd69 calc(100%*2.5/6), #ffbd69 calc(100%*3.5/6), #ff6363 calc(100%*3.5/6), #ff6363 calc(100%*4.5/6), #543864 calc(100%*4.5/6), #543864 calc(100%*5.5/6), #ffbd69 calc(100%*5.5/6), #ffbd69 100%)"
          }
          backgroundSize={"200% auto"}
          animation={"gradient 30s linear infinite"}
          padding={2}
          backgroundClip={"text"}
        >
          undefine.dev ~wip
        </Heading>

        <Form method="post" action=".">
          <FormControl
            as={VStack}
            alignItems={"stretch"}
            backgroundColor={formBackgroundColor}
            padding={4}
            borderRadius={6}
            isInvalid={invalid}
          >
            <HStack justifyContent={"space-between"} alignItems={"flex-end"}>
              <FormLabel htmlFor="code">Application code</FormLabel>
            </HStack>
            <HStack>
              <Input name="code" type={"text"} autoFocus />
              <Button type="submit" alignSelf={"flex-end"}>
                Submit
              </Button>
            </HStack>
            {invalid && (
              <FormErrorMessage>{actionData.error?.name}</FormErrorMessage>
            )}
          </FormControl>
        </Form>
      </Flex>
      <Flex justifySelf={"flex-end"}>
        <ChakraLink
          href={"https://gitlab.com/"}
          padding={4}
          _hover={{ color: "#ff6363" }}
          transition={"color 0.5s ease"}
        >
          {"</>"}
        </ChakraLink>
      </Flex>
    </Flex>
  );
}
