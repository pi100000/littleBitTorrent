const fs = require("fs");
const bencodeModule = await import("bencode");
const bencode = bencodeModule.default;
const tracker = require("./tracker");
const torrentParser = require("./torrent-parser");

const torrent = torrentParser.open(
  "manjaro-xfce-24.2.1-241216-linux612.iso.torrent"
);

tracker.getPeers(torrent, (peers) => {
  console.log("them peers: ", peers);
});
