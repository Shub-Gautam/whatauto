import "./CSS/sendpage.css";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SendPage() {
  let navigate = useNavigate();
  const btn = useRef(null);
  const [msg, setMessage] = useState("");
  const [myfile, setImage] = useState();

  const countryCallingCode = localStorage.getItem("countryCallingCode");
  const gender = localStorage.getItem("gender");
  const session = localStorage.getItem("session");

  const sendReq = async () => {
    btn.current.textContent = "Sending Your Request";
    btn.current.disabled = true;

    const formData = new FormData();
    formData.append("myfile", myfile);
    formData.append("countryCallingCode", countryCallingCode);
    formData.append("msg", msg);
    formData.append("session", session);
    formData.append("gender", gender);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const r = await axios.post(
      "http://localhost:3000/api/v1/mg/sendmsg",
      { formData },
      config
    );

    localStorage.removeItem("gender");
    localStorage.removeItem("countryCallingCode");
    localStorage.removeItem("session");

    if (r.status === 200) {
      navigate("/confirmation");
    } else {
      navigate("/nopage");
    }
  };

  return (
    <div>
      <div className="App">
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
                onChange={(e) => setImage(e.target.files[0])}
                className="form-control"
                id="inputGroupFile01"
              />
            </div>
            <button ref={btn} onClick={sendReq} className="btn btn-success">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendPage;
