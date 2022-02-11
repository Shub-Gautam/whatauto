const { Client, MessageMedia } = require("whatsapp-web.js");

exports.login = async (req, res, next) => {
  try {
    const client = new Client();

    client.on("qr", (qr) => {
      console.log("QR RECEIVED", qr);
      res.send(qr);
    });
  } catch (err) {
    console.log(err);
  }
};
