import {
  Heading,
  Text,
  Flex,
  List,
  ListItem,
  ListIcon,
  HStack,
  StackDivider,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import type { elementData } from ".";

type elementProps = {
  element: elementData;
};

export default function Element({ element }: any) {
  const { start, end } = element.date_range;
  const startDate = new Date(start).toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
  });
  const endDate = new Date(end).toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
  });
  return (
    <HStack
      divider={<StackDivider borderColor="gray.700" borderWidth={"0.03rem"} />}
      width={"100%"}
      spacing={1.5}
      alignItems={"stretch"}
    >
      <VStack
        flex={"0 1 12.5%"}
        alignItems={"flex-end"}
        alignContent={"stretch"}
      >
        <VStack
          height={"100%"}
          alignItems={"center"}
          justifyContent={end ? "space-between" : "center"}
          spacing={1}
        >
          {end && (
            <>
              <Text> {endDate}</Text>
              {/* <Text> - </Text> */}
            </>
          )}
          <Text>{startDate}</Text>
        </VStack>
      </VStack>
      <VStack flex={"0 1 87.5%"} alignItems={"flex-start"} spacing={1}>
        <Heading size="md">{element.title}</Heading>
        <HStack>
          <Text>{element.organization.name}</Text>
          <Text>-</Text>
          <Text>{element.organization.location}</Text>
        </HStack>
        {element.tasks && (
          <List>
            {element.tasks.map((task, index) => {
              return (
                <ListItem key={index}>
                  <Flex
                    _before={{
                      content: '">"',
                      fontWeight: "bold",
                      paddingRight: "0.2rem",
                    }}
                  >
                    {task.value}
                  </Flex>
                </ListItem>
              );
            })}
          </List>
        )}
      </VStack>
    </HStack>
  );
}
