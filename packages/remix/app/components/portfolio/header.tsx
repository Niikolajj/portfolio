import { Flex, Heading } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

const generateStripes = ({
  colour1,
  colour2,
  colour3,
}: {
  colour1: string;
  colour2: string;
  colour3: string;
}): string => {
  return `repeating-linear-gradient(-55deg, ${colour1}, ${colour1} calc(100%*0.4/6), ${colour2} calc(100%*0.4/6), ${colour2} calc(100%*1.5/6), ${colour3} calc(100%*1.5/6), ${colour3} calc(100%*2.5/6), ${colour1} calc(100%*2.5/6), ${colour1} calc(100%*2.75/6), ${colour2} calc(100%*2.75/6), ${colour2} calc(100%*4.5/6), ${colour3} calc(100%*4.5/6), ${colour3} calc(100%*5.5/6), ${colour1} calc(100%*5.5/6), ${colour1} 100%)`;
};

export default function header({
  richText = "",
  highlight = "",
  colors = { colour1: "#0F0", colour2: "#F00", colour3: "transparent" },
}: {
  richText?: string;
  highlight?: string;
  colors?: { colour1: string; colour2: string; colour3: string };
}) {
  return (
    <Flex
      direction={"column"}
      alignItems={"flex-start"}
      justifyContent={"center"}
      minHeight={"calc(var(--vh, 1vh) * 100 - 2.5rem)"}
    >
      <Heading fontSize={["6em"]} paddingTop={3}>
        <ReactMarkdown>{richText}</ReactMarkdown>
      </Heading>
      <Heading
        fontSize={["6em"]}
        margin={0}
        background={generateStripes(colors)}
        backgroundSize={"400% auto"}
        animation={"gradient 90s linear infinite"}
        backgroundClip={"text"}
        position={"sticky"}
        top={"40%"}
        lineHeight={"normal"}
      >
        {highlight}
      </Heading>
    </Flex>
  );
}
