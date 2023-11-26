import { useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import "@fontsource/poppins";

import VideoGrid from "./components/VideoGrid";
import Header from "./components/Header";
import VideoModal from "./components/VideoModal";

function App() {
  const {
    isOpen: isVideoModalOpen,
    onOpen: onVideoModalOpen,
    onClose: onVideoModalClose,
  } = useDisclosure();

  useEffect(() => {
    document.title = "MDS-Player";
  }, []);

  const streams = [
    {
      title: "Tma",
      uuid: "e7472d3c-f072-4cdd-be98-e4a3d717beeb",
    },
    {
      title: "Tma",
      uuid: "e7472d3c-f072-4cdd-be98-e4a3d717beec",
    },
    {
      title: "Tma",
      uuid: "e7472d3c-f072-4cdd-be98-e4a3d717beed",
    },
    {
      title: "Tma",
      uuid: "e7472d3c-f072-4cdd-be98-e4a3d717beee",
    },
  ];

  return (
    <>
      <Header />
      <VideoGrid streams={streams} onVideoModalOpen={onVideoModalOpen} />
      <VideoModal isOpen={isVideoModalOpen} onClose={onVideoModalClose} />
    </>
  );
}

export default App;
