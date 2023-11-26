import React from "react";
import { Box, Card, CardBody, Heading, Image } from "@chakra-ui/react";
import VideoJS from "./VideoJS";

export default function Video(props) {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "https://mds.vofy.tech/hls/" + props.uuid + ".m3u8",
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:y
    player.on("waiting", () => {
      //videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      //videojs.log("player will dispose");
    });
  };

  return (
    <Card overflow="hidden" role="group">
      <CardBody p={0} role="group">
        <Box pointerEvents="none" display='block' _groupHover={{display: 'none'}}>
            <Image w={100} h={100} src={"https://mds.vofy.tech/hls/" + props.uuid + ".webp"}></Image>
        </Box>
        <Box pointerEvents="none" display='none' _groupHover={{display: 'block'}}>
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        </Box>
        <Heading as="h1" size="md" m={4}>
          {props.title}
        </Heading>
      </CardBody>
    </Card>
  );
}
