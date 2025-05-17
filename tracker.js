const dgram = require("dgram");
const url = require("url").parse;

module.exports.getPeers = (torrent, callback) => {
  const socket = dgram.createSocket("udp4");
  const url = torrent.announce.toString("utf8");

  udpSend(socket, buildConnReq(), url);

  socket.on("message", (msg) => {
    if (msg === "connect") {
    } else if (msg === "announce") {
    }
  });
};

function udpSend(socket, message, rawUrl, callback = () => {}) {
  const parsedUrl = url.parse(rawUrl);
  socket.send(
    message,
    0,
    message.length,
    parsedUrl.port,
    parsedUrl.host,
    callback
  );
}

function buildConnReq() {}
