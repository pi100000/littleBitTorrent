const dgram = require("dgram");
const url = require("url").parse;
const util = require("./util");

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

function parseConnResp(resp) {
  return {
    action: resp.readUInt32BE(0),
    transactionId: resp.readUInt32BE(4),
    connectionId: resp.slice(8),
  };
}

function buildAnnounceReq(connId, torrent, port = 6881) {
  const buf = Buffer.allocUnsafe(98);

  // connection id
  connId.copy(buf, 0);

  // action
  buf.writeUInt32BE(1, 8);

  // transaction id
  crypto.randomBytes(4).copy(buf, 12);

  // info hash
  // todo

  // peerId
  util.genId().copy(buf, 36);

  // downloaded
  Buffer.alloc(8).copy(buf, 56);

  // left
  // todo

  // uploaded
  Buffer.alloc(8).copy(buf, 72);

  // event
  buf.writeUInt32BE(0, 80);

  // ip address
  buf.writeUInt32BE(0, 80);

  // key
  crypto.randomBytes(4).copy(buf, 88);

  // num want
  buf.writeInt32BE(-1, 92);

  // port
  buf.writeUInt16BE(port, 96);

  return buf;
}
