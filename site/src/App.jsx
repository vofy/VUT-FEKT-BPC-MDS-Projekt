import { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import "@fontsource/poppins";
import { parse as tomlParse } from "smol-toml";

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
    let inputs = {};

    fetch("https://mds.vofy.tech/config.toml")
      .then((response) => response.text())
      .then((data) => {
        inputs = tomlParse(data)["input"];
      })
      .catch(console.error);

    fetch("https://mds.vofy.tech/stat")
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "text/xml");
        const nodes = xml.evaluate(
          "/rtmp/server/application[./name='live']/live/stream",
          xml,
          null,
          XPathResult.ANY_TYPE,
          null
        );

        let availableStreams = [];

        let node = nodes.iterateNext();
        while (node) {
          availableStreams.push(
            inputs.find(
              (input) =>
                input.uuid ===
                node.getElementsByTagName("name")[0].firstChild.nodeValue
            )
          );
          node = nodes.iterateNext();
        }

        setStreams(availableStreams);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Header />
      <VideoGrid streams={streams} onVideoModalOpen={onVideoModalOpen} />
      <VideoModal isOpen={isVideoModalOpen} onClose={onVideoModalClose} />
    </>
  );
}

export default App;
