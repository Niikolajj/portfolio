import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

export default function CodeInput({ error }: { error: any }) {
  const [valid, setValid] = useState(true);

  const primary = "#ef758a";
  const secondary = "#7cc9c3";
  const consoleFocus = useColorModeValue(secondary, "white");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setValid(!(error !== undefined));
  }, [error]);
  return (
    <>
      <Flex height={"2.5rem"} />
      <Flex
        direction={"row"}
        position={"fixed"}
        height="2.5rem"
        background={"black"}
        bottom={0}
        width={"100%"}
        color={"white"}
        fontFamily={"Jetbrains Mono, monospace"}
      >
        <Flex as={Form} method="post" action="." width={"100%"}>
          <FormControl isInvalid={!valid} pos={"relative"} width={"100%"}>
            <Flex
              position={"absolute"}
              left={0}
              top={0}
              bottom={0}
              width={["2rem"]}
              alignItems={"center"}
              justifyContent={"center"}
            >
              {">"}
            </Flex>

            <Input
              width={"100%"}
              name="code"
              type={"text"}
              autoFocus
              rounded={"none"}
              borderX={"none"}
              borderBottom={"none"}
              focusBorderColor={consoleFocus}
              autoComplete={"false"}
              errorBorderColor={primary}
              paddingX={"2em"}
              zIndex={1}
              ref={inputRef}
              onChange={() => {
                setValid(true);
              }}
              placeholder={"enter application code"}
            />
            <Button
              type="submit"
              position={"absolute"}
              right={"1em"}
              padding={0}
              background={"none"}
              zIndex={1}
              minHeight={0}
              minWidth={0}
              _hover={{
                backgroundColor: '"none"',
              }}
            >
              ↩
            </Button>

            {!valid && (
              <FormErrorMessage
                margin={0}
                position={"absolute"}
                left={((inputRef.current?.value.length || 1) + 5) * 0.65 + "em"}
                top={"0"}
                bottom={"0"}
              >
                {"<~~ " + error?.name}
              </FormErrorMessage>
            )}
          </FormControl>
        </Flex>
      </Flex>
    </>
  );
}
