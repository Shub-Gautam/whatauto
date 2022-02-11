const express = require("express");
const { sendmsg } = require("../controller/sendmsg");

const router = express.Router();

router.post("/api", sendmsg);

module.exports = router;
