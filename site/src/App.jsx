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
      title: "Domažlice, Czech Republic",
      uuid: "e7472d3c-f072-4cdd-be98-e4a3d717beeb",
    },
    {
      title: "Coburg, Germany",
      uuid: "95d6cb6b-99f7-4ca0-9afc-86bbe63afa35",
    },
    {
      title: "Bayonne, France",
      uuid: "bb962ecd-f3d8-4d25-b835-544e8f6df5af",
    },
    {
      title: "Gatwick, United Kingdom",
      uuid: "56d229bb-a245-4b7c-bfde-91d9392e9fa2",
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
