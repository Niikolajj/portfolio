import { Flex, Link, Text } from "@chakra-ui/react";
import { IoMdGlobe } from "react-icons/io";
import { Link as RemixLink } from "@remix-run/react";
import type { tagType } from "~/api/strapi";

export default function ListElement({ listElement }: { listElement: tagType }) {
  return (
    <Flex key={listElement.id} alignItems={"center"} gap={1}>
      {listElement.link ? (
        <Link
          as={RemixLink}
          to={`/projects/${listElement.slug}`}
        >
          {listElement.title}
        </Link>
      ) : (
        <Text>{listElement.title}</Text>
      )}
      {listElement.webLink && (
        <Link fontSize={"0.6em"} href={listElement.webLink}>
          <IoMdGlobe />
        </Link>
      )}
    </Flex>
  );
}
