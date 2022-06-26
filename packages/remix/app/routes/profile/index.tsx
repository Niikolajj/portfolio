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
    const fetches = ["personal", "adress", "birth", "experience", "profile"];
    let profile = {};
    await Promise.all(
      fetches.map(async (curr) => {
        const response = await fetchStrapi(curr);
        const data = await response.json();
        if (data.error) {
          console.log(data.error);
          throw new Response("Error getting data from Strapi", { status: 500 });
        }
        profile = { ...profile, [curr]: data };
      })
    );

    return {
      profile: { ...profile },
      application: {},
    };
  }
  return redirect("/");
}

export default function Index() {
  const { profile, application } = useLoaderData();
  const { personal, adress, birth, experience, profile: prof } = profile;

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
        <CoverLetter profile={{ personal, adress }} company={application} />
        <Vitae
          profile={{ personal, adress, birth, experience, prof }}
          theme={{ backgroundColor: "#0dbd8b", color: "#FFF" }}
        />
      </Flex>
    </Flex>
  );
}
