import { Flex } from "@chakra-ui/react";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import type { applicationType } from "~/api/strapi";
import { locales } from "~/api/strapi";
import { checkCode, getApplication } from "~/api/strapi";
import CoverLetter from "../../components/profile/coverLetter";
import Vitae from "../../components/profile/vitae";
import { userPrefs } from "~/cookie";

export const loader: LoaderFunction = async ({
  request,
}): Promise<applicationType | Response> => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await userPrefs.parse(cookieHeader)) || {};
  const code = cookie.applicationCode?.toString() ?? "";

  if (await checkCode(code)) {
    const application = await getApplication(code);

    const pictureUrl = application.profile.personal.picture.formats.medium.url;
    const response = await fetch(
      (process.env.STRAPI_URL_BASE ?? "") + (pictureUrl ?? "")
    );
    const blob = await response.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());
    const picture = buffer.toString("base64");

    return {
      ...application,
      picture,
    };
  }
  return redirect("/");
};

export type themeType = {
  backgroundColor: string;
  color: string;
  layout: locales;
};

export default function Index() {
  const application: applicationType = useLoaderData();
  const theme: themeType = {
    backgroundColor: application.company?.color ?? "#4EB393",
    color: "#FFF",
    layout: application.company?.locale ?? locales.German,
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
