import { Box, Flex, Heading, Text as ChakraText } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

export default function Text({
  richText,
  title,
}: {
  richText: string;
  title?: string;
}) {
  return (
    <Box alignSelf={"flex-start"}>
      {title && <Heading>{title}</Heading>}
      <Flex direction={"column"} gap={2}>
        <ReactMarkdown components={{ p: ChakraText }}>{richText}</ReactMarkdown>
      </Flex>
    </Box>
  );
}
