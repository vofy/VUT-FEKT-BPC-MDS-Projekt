import React, { useDisclosure } from "react";
import { Card, CardBody, Grid, GridItem, Text } from "@chakra-ui/react";
import Video from "./Video";

export default function VideoGrid(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
      }}
      gap={6}
      p={5}
    >
      {props.streams.map((stream) => (
        <GridItem w="100%" key={stream.uuid}>
          <Video
            uuid={stream.uuid}
            title={stream.title}
            onClick={onOpen}
          ></Video>
        </GridItem>
      ))}
    </Grid>
  );
}
