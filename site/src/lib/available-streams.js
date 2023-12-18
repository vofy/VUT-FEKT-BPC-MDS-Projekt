import { parse as tomlParse } from "smol-toml";

export default function getAvailableStreams() {
  let availableStreams = [];
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
    })
    .catch(console.error);

  return availableStreams;
}
