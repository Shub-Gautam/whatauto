const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { Client, MessageMedia } = require("whatsapp-web.js");
const route = require("./route");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
