import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { videoModalDataState } from "./../state/atoms";

import { Replay } from "vimond-replay";
import "vimond-replay/index.css";
import HlsjsVideoStreamer from "vimond-replay/video-streamer/hlsjs";

export default function VideoModal(props) {
  const [data, setData] = useRecoilState(videoModalDataState);

  const replayOptions = {
    videoStreamer: {
      hlsjs: {
        customConfiguration: {
          capLevelToPlayerSize: true,
          maxBufferLength: 45,
        },
      },
    },
    controls: {
      includeControls: [
        "playPauseButton",
        "gotoLiveButton",
        "timeDisplay",
        "qualitySelector",
        "fullscreenButton",
      ],
    },
  };

  return (
    <Modal {...props} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader padding={4}>{data.name}</ModalHeader>
        <ModalCloseButton marginY={1.5} />
        <ModalBody padding={0}>
          <Box maxWidth={"100vh"} padding={4} paddingTop={0}>
            <Replay
              source={"https://mds.vofy.tech/hls/" + data.uuid + ".m3u8"}
              initialPlaybackProps={{ isPaused: false }}
              options={replayOptions}
            >
              <HlsjsVideoStreamer />
            </Replay>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

VideoModal.propTypes = {
  isVideoModalOpen: PropTypes.bool,
  onVideoModalClose: PropTypes.func,
};
