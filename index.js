const fs = require("fs");

async function decodeTorrent() {
  try {
    const bencodeModule = await import("bencode");
    const bencode = bencodeModule.default;

    const torrentFile = bencode.decode(
      fs.readFileSync("manjaro-xfce-24.2.1-241216-linux612.iso.torrent"),
    );
    console.log(torrentFile.announce.toString("utf8"));
  } catch (error) {
    console.error("error:", error);
  }
}

decodeTorrent();
