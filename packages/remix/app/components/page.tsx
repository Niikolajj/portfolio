import { Flex } from "@chakra-ui/react";
import type { ReactNode } from "react";

export default function page({ children }: { children: ReactNode }) {
  return (
    <Flex
      width={"210mm"}
      height={"297mm"}
      margin={"10mm auto"}
      direction={"column"}
      boxShadow={"0 0 0.5cm rgba(0,0,0,0.5)"}
      backgroundColor={"white"}
      className={"mainPage"}
    >
      <Flex
        direction={"column"}
        color={"black"}
        backgroundColor={"white"}
        padding={"1.5cm"}
        height={"297mm"}
        minHeight={"297mm"}
        className={"subPage"}
        overflow={"hidden"}
        width={"210mm"}
      >
        {children}
      </Flex>
    </Flex>
  );
}
