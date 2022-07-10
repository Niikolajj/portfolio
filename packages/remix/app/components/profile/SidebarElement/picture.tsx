import { AspectRatio, Box, Image } from "@chakra-ui/react";
import type { themeType } from "~/routes/profile";

type pictureProps = {
  picture: string;
  theme: themeType;
};

export default function Picture({ picture, theme }: pictureProps) {
  return (
    <Box
      borderBottomRadius={"full"}
      overflow={"hidden"}
      backgroundColor={"#4eb393"}
      width={"100%"}
      transform={"translate(0,-35%)"}
      zIndex={600}
      marginBottom={"-35%"}
    >
      <AspectRatio ratio={1}>
        <Image src={`data:image/png;base64, ${picture}`} objectFit="fill" />
      </AspectRatio>
    </Box>
  );
}
