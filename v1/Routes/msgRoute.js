const router = require("express").Router();

// Controller file
const { message } = require("../../Controller/index");

// send message
router.post("/sendmsg", message.sendmsg);

module.exports = router;
