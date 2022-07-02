import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link as ChakraLink,
  VStack,
} from "@chakra-ui/react";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { checkCode, fetchStrapi, getApplication } from "~/api/strapi";
import CoverLetter from "../../components/profile/coverLetter";
import Vitae from "../../components/profile/vitae";
import { userPrefs } from "~/cookie";

export async function loader({ params, request }: any) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};
  const code = cookie.applicationCode?.toString() ?? "";

  if (await checkCode(code)) {
    const application = await getApplication(code);

    return application;
  }
  return redirect("/");
}

export default function Index() {
  const application = useLoaderData();
  const theme = {
    backgroundColor: application.company?.color ?? "#4EB393",
    color: "#FFF",
  };

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      height={"100vh"}
      sx={{
        "@page": { size: "A4", margin: 0 },
        "@media print": {
          "html, body": { width: "210mm", height: "297mm" },
          ".mainPage": {
            margin: 0,
            border: "initial",
            borderRadius: "initial",
            width: "initial",
            minHeight: "initial",
            boxShadow: "initial",
            background: "initial",
            pageBreakAfter: "always",
          },
          ".subPage": {
            padding: "1.5cm",
          },
        },
      }}
    >
      <Flex width={"210mm"} fontSize={"12pt"}>
        <CoverLetter profile={{ application }} company={null} />
        <Vitae data={{ ...application }} theme={theme} />
      </Flex>
    </Flex>
  );
}
