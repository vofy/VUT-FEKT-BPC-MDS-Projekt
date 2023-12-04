import PropTypes from "prop-types";
import {
  AspectRatio,
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiCameraOff } from "react-icons/fi";
import VideoJS from "./VideoJS";
import React from "react";
import { useRecoilState } from "recoil";
import { videoModalDataState } from "../state/atoms";

const Video = (props) => {
  const playerRef = React.useRef(null);

  const [data, setData] = useRecoilState(videoModalDataState);

  const videoJsOptions = {
    responsive: true,
    autoplay: true,
    muted: true,
    controls: false,
    fluid: true,
    aspectRatio: '16:9',
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

  const handleModalOpen = () => {
    setData({
      name: props.name,
      uuid: props.uuid,
    });
    props.onVideoModalOpen();
  };

  return (
    <Card overflow="hidden" role="group" onClick={handleModalOpen}>
      <CardBody p={0} role="group">
        <Box
          pointerEvents="none"
          display="block"
          _groupHover={{ display: "none" }}
        >
          <AspectRatio
            ratio={16 / 9}
            _groupHover={{ display: "none" }}
          >
            <Image
              w={"100%"}
              src={"https://mds.vofy.tech/hls/" + props.uuid + ".png"}
              fallback={
                <Stack direction={"column"}>
                  <Icon
                    as={FiCameraOff}
                    size={70}
                    height={"unset"}
                    width={"unset"}
                  />
                  <Text>Preview not available</Text>
                </Stack>
              }
            />
          </AspectRatio>
        </Box>
        <Box
          pointerEvents="none"
          display="none"
          _groupHover={{ display: "block" }}
        >
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        </Box>
        <Heading as="h1" size="md" m={4}>
          {props.name}
        </Heading>
      </CardBody>
    </Card>
  );
};

Video.propTypes = {
  uuid: PropTypes.string,
  name: PropTypes.string,
  onVideoModalOpen: PropTypes.func,
};

export default function VideoGrid(props) {
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
      {props.streams &&
        props.streams.map(
          (stream) =>
            stream.uuid && (
              <GridItem w="100%" key={stream.uuid}>
                <Video
                  uuid={stream.uuid}
                  name={stream.name}
                  onVideoModalOpen={props.onVideoModalOpen}
                ></Video>
              </GridItem>
            )
        )}
    </Grid>
  );
}

VideoGrid.propTypes = {
  streams: PropTypes.array,
  onVideoModalOpen: PropTypes.func,
};
