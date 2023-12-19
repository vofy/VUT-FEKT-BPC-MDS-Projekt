import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Heading,
  Code,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { useClipboard } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { videoModalDataState } from "./../state/atoms";

import { Replay } from "vimond-replay";
import "vimond-replay/index.css";
import HlsjsVideoStreamer from "vimond-replay/video-streamer/hlsjs";
import { useEffect } from "react";

export default function VideoModal(props) {
  const [data, setData] = useRecoilState(videoModalDataState);
  const { onCopy, value, setValue, hasCopied } = useClipboard("");

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
        "timeDisplay",
        'timeline',
        "gotoLiveButton",
        "qualitySelector",
        "fullscreenButton",
      ],
    },
  };

  useEffect(() => {
    setValue("rtmp://mds.vofy.tech/live/" + data.uuid);
  }, [data]);

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
            <Spacer my={5} />
            <Heading as="h2" size="sm" my={2}>
              RTMP stream
            </Heading>
            <Code my={1}>rtmp://mds.vofy.tech/live/{data.uuid}</Code>
            <Button my={1} onClick={onCopy}>
              {hasCopied ? "Zkopírováno!" : "Kopírovat"}
            </Button>
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
