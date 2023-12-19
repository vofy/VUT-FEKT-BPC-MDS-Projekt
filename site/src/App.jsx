import { useEffect, useState } from "react";
import { Heading, Flex, useDisclosure } from "@chakra-ui/react";
import "@fontsource/poppins";
import { MdError } from "react-icons/md";
import { parseConfig, parseStat } from "./lib/parse";

import VideoGrid from "./components/VideoGrid";
import Header from "./components/Header";
import VideoModal from "./components/VideoModal";

function App() {
  const {
    isOpen: isVideoModalOpen,
    onOpen: onVideoModalOpen,
    onClose: onVideoModalClose,
  } = useDisclosure();

  const [streams, setStreams] = useState([]);

  useEffect(() => {
    document.title = "Pexel";
  }, []);

  useEffect(() => {
    let inputs = [];

    parseConfig("https://mds.vofy.tech/config.toml").then((data) => {
      inputs = data;
    });

    parseStat("https://mds.vofy.tech/stat").then((data) => {
      const availableStreams = data.map((name) =>
        inputs.find((input) => input.uuid === name)
      );

      setStreams(availableStreams);
    });
  }, []);

  return (
    <>
      <Header />
      {streams?.length > 0 ? (
        <VideoGrid streams={streams} onVideoModalOpen={onVideoModalOpen} />
      ) : (
        <Flex
          direction={"column"}
          spacing={4}
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
        >
          <MdError size={50} />
          <Heading as="h1" size="lg" margin={8}>
            Není vysílaný žádný přenos
          </Heading>
        </Flex>
      )}

      <VideoModal isOpen={isVideoModalOpen} onClose={onVideoModalClose} />
    </>
  );
}

export default App;
