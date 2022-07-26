import { HStack, Divider, VStack, Text, Box } from "@chakra-ui/react";
import type { profileType, recipientType } from "~/api/strapi";
import type { themeType } from "~/routes/profile";

type headerProps = {
  personal: profileType["personal"];
  theme: themeType;
  recipient: recipientType;
  date: string;
};

export default function index({
  personal,
  theme,
  recipient,
  date,
}: headerProps) {
  const { firstName, lastName, adress, contacts } = personal;
  const { company } = recipient;

  return (
    <>
      <Box
        backgroundColor={theme.backgroundColor}
        color={theme.color}
        padding={4}
      >
        <HStack
          alignItems={"stretch"}
          spacing={4}
          divider={<Divider orientation="vertical" borderColor={theme.color} />}
        >
          <VStack alignItems={"flex-start"} spacing={0}>
            <Text size="md" fontWeight={100}>
              {firstName + " " + lastName}
            </Text>
            <Text size="md" fontWeight={100}>
              {adress.streetname + " " + adress.housenumber}
            </Text>

            <Text size="md" fontWeight={100}>
              {contacts.find((e) => e.icon == "phone")?.value}
            </Text>
          </VStack>
          <VStack
            alignItems={"flex-start"}
            justifyContent={"flex-end"}
            spacing={0}
          >
            <Text size="md" fontWeight={100}>
              {adress.postcode + " " + adress.city}
            </Text>
            <Text size="md" fontWeight={100}>
              {contacts.find((e) => e.icon == "email")?.value}
            </Text>
          </VStack>
        </HStack>
      </Box>
      <Box backgroundColor={theme.color} padding={4}>
        <VStack alignItems={"flex-start"} spacing={0}>
          {recipient.lastName && (
            <Text size="md" fontWeight={100}>
              {recipient.firstName + " " + recipient.lastName}
            </Text>
          )}
          {recipient.department && (
            <Text size="md" fontWeight={100}>
              {recipient.department}
            </Text>
          )}
          <Text size="md" fontWeight={100} color={theme.backgroundColor}>
            {company.name}
          </Text>
          <Text size="md" fontWeight={100}>
            {recipient.street}
          </Text>
          <Text size="md" fontWeight={100}>
            {recipient.city}
          </Text>
        </VStack>
      </Box>
      <Text textAlign={"right"}>
        {adress.city + ", " + new Date(date).toDateString()}
      </Text>
    </>
  );
}
