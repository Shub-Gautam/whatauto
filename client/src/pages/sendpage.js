import "./CSS/sendpage.css";
import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Client } from "whatsapp-web.js";
import { redirect } from "express/lib/response";
var QRCode = require("qrcode.react");

function SendPage() {
  const [loading, setLoading] = useState(false);
  // const [phone, setPhone] = useState("");
  const [msg, setMessage] = useState("");
  const [qrcode, setQRCode] = useState(false);

  const search = useLocation().search;
  const params = new URLSearchParams(search);

  const countryCallingCode = params.get("countryCallingCode");
  const gender = params.get("gender");

  const getQRCode = async () => {
    setLoading(true);
    const client = new Client();
    await client.on("qr", (qr) => {
      setQRCode(qr);
    });
    setLoading(false);
    client.on("authenticated", async (session) => {
      await axios.post("http://localhost:3000/api", {
        gender,
        countryCallingCode,
        msg,
        session,
      });

      redirect("/thankyou");
    });
  };

  return (
    <div className="App">
      <script>{/* scripts here */}</script>
      <div className="App-header">
        <div>
          <div class="form-group">
            <label for="comment">Write your msg here :</label>
            <textarea
              class="form-control"
              rows="5"
              id="comment"
              value={msg}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          upload you image here :
          <div class="input-group mb-3">
            <input type="file" class="form-control" id="inputGroupFile01" />
          </div>
          <button onClick={getQRCode} class="btn btn-success">
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
