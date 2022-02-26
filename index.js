const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { Client, MessageMedia } = require("whatsapp-web.js");
const route = require("./route");
// const bodyParser = require("body-parser");


// var isMultipart = /^multipart\//i;

// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

// var urlencodedMiddleware = bodyParser.urlencoded({ extended: true });
// app.use(function (req, res, next) {
//   var type = req.get("Content-Type");
//   if (isMultipart.test(type)) return next();
//   return urlencodedMiddleware(req, res, next);
// });

app.use(express.json());
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000;

// Routes Api
app.use("/api", route);

// Loading frontend
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

// Scoket Connection
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3001"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("message", (msg) => {
    console.log(msg);
    const client = new Client();

    client.on("qr", (qr) => {
      console.log(qr);
      socket.emit("qrsend", qr);
    });

    client.on("authenticated", (session) => {
      socket.emit("qrauth", session);
    });

    client.initialize();
  });
});
