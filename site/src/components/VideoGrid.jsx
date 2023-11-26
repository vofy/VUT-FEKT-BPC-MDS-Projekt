import React from "react";
import { Card, CardBody, Grid, GridItem, Text } from "@chakra-ui/react";
import Video from "./Video";

export default function VideoGrid(props) {
  var streams = [
    {
      title: "Tma",
      uuid: "e7472d3c-f072-4cdd-be98-e4a3d717beeb",
    },
  ];

  return (
    <Grid templateColumns={{base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)'}} gap={6} p={5}>
      {streams.map((stream) => (
        <GridItem w="100%" key={stream.uuid}>
          <Video uuid={stream.uuid} title={stream.title} ></Video>
        </GridItem>
      ))}
    </Grid>
  );
}
