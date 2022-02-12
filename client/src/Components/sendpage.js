import "./CSS/sendpage.css";
import React, { useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
// import { Client } from "whatsapp-web.js";
// import { redirect } from "express/lib/response";
var QRCode = require("qrcode.react");

// Setting up socket connection
const socket = io("http://localhost:3000");

function SendPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMessage] = useState("");
  const [qrcode, setQRCode] = useState(false);
  const [content, setImage] = useState("");

  const search = useLocation().search;
  const params = new URLSearchParams(search);

  const countryCallingCode = params.get("countryCallingCode");
  const gender = params.get("gender");

  const getQRCode = async () => {
    setLoading(true);
    socket.emit("message", "sendqr");
    socket.on("qrsend", (qr) => {
      setQRCode(qr);
    });
    setLoading(false);
  };

  socket.on("qrauth", async (session) => {
    await axios.post("http://localhost:3000/api", {
      countryCallingCode,
      gender,
      msg,
      content,
      session,
    });
  });

  return (
    <div className="App">
      <script>{/* scripts here */}</script>
      <div className="App-header">
        <div>
          <div className="form-group">
            <label for="comment">Write your msg here :</label>
            <textarea
              className="form-control"
              rows="5"
              id="comment"
              value={msg}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          upload you image here :
          <div class="input-group mb-3">
            <input
              type="file"
              name="content"
              accept=".png, .jpg"
              onChange={(e) => setImage(e.target.value)}
              className="form-control"
              id="inputGroupFile01"
            />
          </div>
          <button onClick={getQRCode} className="btn btn-success">
            generate QR to send msg
          </button>
          <br />
          {!loading && qrcode && (
            <div style={{ margin: "10px" }}>
              <QRCode value={qrcode} />
            </div>
          )}
          {loading && "Waiting for QRCode..."}
        </div>
      </div>
    </div>
  );
}

export default SendPage;
