import { Box, Text, VStack } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import type { coverLetterType, profileType, recipientType } from "~/api/strapi";
import type { themeType } from "~/routes/profile";

type headerProps = {
  personal: profileType["personal"];
  coverLetter: coverLetterType;
  recipient: recipientType;
  theme: themeType;
};

export default function index({
  personal,
  coverLetter,
  recipient,
}: headerProps) {
  const titleArray = [
    coverLetter.greeting,
    recipient.title,
    recipient.lastName,
  ];

  return (
    <Box paddingX={4}>
      <VStack alignItems={"flex-start"} marginBottom={8}>
        <Text paddingBottom={4}>Bewerbung als {coverLetter.title}</Text>
        <Text paddingBottom={4} textAlign={"justify"}>
          {titleArray.join(" ")}
        </Text>
        <ReactMarkdown components={{ p: TextField }}>
          {coverLetter.opening}
        </ReactMarkdown>
        <ReactMarkdown components={{ p: TextField }}>
          {coverLetter.body}
        </ReactMarkdown>
        <ReactMarkdown components={{ p: TextField }}>
          {coverLetter.closing}
        </ReactMarkdown>
      </VStack>
      <Text>{coverLetter.formalClosing}</Text>
      <Text>{personal.firstName + " " + personal.lastName}</Text>
    </Box>
  );
}

const TextField = (props: any) => {
  const { children } = props;
  return <Text textAlign={"justify"}>{children}</Text>;
};
