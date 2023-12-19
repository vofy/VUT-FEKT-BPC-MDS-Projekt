import { parse as tomlParse } from "smol-toml";

export async function parseConfig(url) {
 const response = await fetch(url);
 const data = await response.text();
 return tomlParse(data)["input"];
}

export async function parseStat(url) {
 const response = await fetch(url);
 const data = await response.text();

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
    availableStreams.push(node.getElementsByTagName("name")[0].firstChild.nodeValue);
    node = nodes.iterateNext();
 }

 return availableStreams;
}