import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { videoModalDataState } from "./../state/atoms";
import VideoJS from "./VideoJS";
import React from "react";

export default function VideoModal(props) {
  const [data, setData] = useRecoilState(videoModalDataState);
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    responsive: true,
    controls: true,
    autoplay: true,
    fluid: true,
    sources: [
      {
        src: "https://mds.vofy.tech/hls/" + data.uuid + ".m3u8",
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
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{data.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

VideoModal.propTypes = {
  isVideoModalOpen: PropTypes.bool,
  onVideoModalClose: PropTypes.func,
};
