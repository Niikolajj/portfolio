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
import { fetchFindStrapi, fetchStrapi } from "~/api/strapi";
import CoverLetter from "../../components/profile/coverLetter";
import Vitae from "../../components/profile/vitae";
import { userPrefs } from "~/cookie";

export async function loader({ params, request }: any) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};
  const res = await fetchFindStrapi(
    "applications",
    cookie.applicationCode?.toString() ?? ""
  );
  const results = await res.json();
  if (results.data.length > 0) {
    const app = await fetchStrapi("main-application");
    const response = await app.json();
    let profile = {};
    profile = {
      experience: response.data.attributes.experience,
      profile: response.data.attributes.profile,
    };

    return {
      profile: { ...profile },
      application: {},
    };
  }
  return redirect("/");
}

export default function Index() {
  const { profile, experience } = useLoaderData();

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
        <CoverLetter profile={{ profile }} company={null} />
        <Vitae
          data={{ ...profile }}
          theme={{ backgroundColor: "#0dbd8b", color: "#FFF" }}
        />
      </Flex>
    </Flex>
  );
}
