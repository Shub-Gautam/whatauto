const router = require("express").Router();
const path = require("path");

const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "Uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage: storage,
  limit: { fileSize: 100000 * 100 },
});

// Controller file
const { message } = require("../../Controller/index");

// send message
router.post("/sendmsg", upload.single("myfile"), message.sendmsg);

module.exports = router;
