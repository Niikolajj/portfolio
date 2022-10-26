import { Flex, Link, useColorModeValue } from "@chakra-ui/react";
import { IoMdMusicalNote } from "react-icons/io";
import useNowPlaying from "~/hooks/useNowPlaying";

export default function NowListening({
  lastFMUsername,
  fallbackUrl,
}: {
  lastFMUsername: string;
  fallbackUrl: string;
}) {
  const song = useNowPlaying(lastFMUsername);
  const backgroundColor = useColorModeValue("gray.300", "gray.700");

  return (
    <Flex
      alignItems={"center"}
      gap={2}
      backgroundColor={backgroundColor}
      rounded={"lg"}
      paddingY={2}
      paddingX={3}
      alignSelf={"flex-start"}
      margin={2}
    >
      <Link
        target={"_blank"}
        href={`https://www.last.fm/user/${lastFMUsername}`}
      >
        <IoMdMusicalNote />
      </Link>

      <Flex gap={1.5}>
        Ich höre gerade
        {song ? (
          <Link target={"_blank"} href={song.url}>
            {song.artist["#text"] + "/" + song.name}
          </Link>
        ) : (
          <>
            {" keine Musik, aber"}
            <Link target={"_blank"} href={fallbackUrl}>
              hier ist eine Playlist von mir
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
}
