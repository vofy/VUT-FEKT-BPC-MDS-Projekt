import { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import "@fontsource/poppins";
import { parse as tomlParse } from 'smol-toml'

import VideoGrid from "./components/VideoGrid";
import Header from "./components/Header";
import VideoModal from "./components/VideoModal";

function App() {
  const {
    isOpen: isVideoModalOpen,
    onOpen: onVideoModalOpen,
    onClose: onVideoModalClose,
  } = useDisclosure();

  const [availableStreamUUIDs, setAvailableStreamUUIDs] = useState([]);

  useEffect(() => {
    document.title = "Pexel";
  }, []);

  useEffect(() => {
    fetch("https://mds.vofy.tech/config.toml")
      .then((response) => response.text())
      .then((data) => {
        var config = tomlParse(data);
        console.dir(config);
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
        let node = nodes.iterateNext();
        while (node) {
          let streamUUID = node.getElementsByTagName("name")[0].firstChild.nodeValue;
          setAvailableStreamUUIDs([...availableStreamUUIDs, streamUUID]);
          node = nodes.iterateNext();
        }
      })
      .catch(console.error);
  }, []);

  const streams = [
    {
      title: "Domažlice, Czech Republic",
      uuid: "e7472d3c-f072-4cdd-be98-e4a3d717beeb",
    },
    {
      title: "Valencia, Spain",
      uuid: "95d6cb6b-99f7-4ca0-9afc-86bbe63afa35",
    },
    {
      title: "Lexington-Fayette, United States",
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
