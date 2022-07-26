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
      <VStack alignItems={"flex-start"} marginBottom={12}>
        <Text marginBottom={6}>{coverLetter.title}</Text>
        <Text>{titleArray.join(" ")}</Text>
        <ReactMarkdown>{coverLetter.opening}</ReactMarkdown>
        <ReactMarkdown>{coverLetter.body}</ReactMarkdown>
        <ReactMarkdown>{coverLetter.closing}</ReactMarkdown>
      </VStack>
      <Text>{coverLetter.formalClosing}</Text>
      <Text>{personal.firstName + " " + personal.lastName}</Text>
    </Box>
  );
}
