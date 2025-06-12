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

function buildConnReq() {
  const buf = Buffer.alloc(16);

  // connection id
  buf.writeUInt32BE(0x417, 0);
  buf.writeUInt32BE(0x27101980, 4);

  // action
  buf.writeUInt32BE(0, 8);

  // transaction id
  crypto.randomBytes(4).copy(buf, 12);
}
