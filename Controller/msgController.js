const { Client, MessageMedia } = require("whatsapp-web.js");
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

let uplaod = multer({
  storage: storage,
  limit: { fileSize: 100000 * 100 },
}).single("myfile");

exports.sendmsg = async (req, res) => {
  try {
    console.log("welcome");
    const { msg, countryCallingCode, gender, session } = req.body;

    console.log("This is my body " + req.body);
    console.log("session" + req.body.msg + req.body.session);
    if (!req.body.session) {
      return res.status(400).send("Login Again");
    }

    let sessionData = JSON.parse(session);

    const client = new Client({
      session: sessionData,
    });

    client.on("auth_failure", (msg) => {
      res.status(400).send("auth_failure");
    });

    client.on("ready", async () => {
      console.log("Client is ready!");
      // Sending Confirmation
      res.status(200).send("OK");

      uplaod(request, res, async (err) => {
        if (err) {
          return res.status(500).send({ error: err.message });
        }
      });

      // get numbers from database
      // const numbersArray = await Models.numbers.find({countryCode:91});

      // Start the loop for each element of the numbersArray
      // numbersArray.forEach(numb => {
      //   // copy the logic here
      // });

      // res.end();

      const types = ["image/png", "image/jpeg", "image/gif"];

      console.log(req.file);

      const media = await new MessageMedia.fromFilePath("./Uploads/");

      const phone = 9548425684;
      const number = `${phone}`;
      const sanitized_number = number.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
      const final_number = `91${sanitized_number.substring(
        sanitized_number.length - 10
      )}`; // add 91 before the number here 91 is country code of India
      const number_det = final_number + "@c.us";

      await client.sendMessage(number_det, media);
      await client.sendMessage(number_det, req.body.msg); // send message
    });

    await client.initialize();
  } catch (err) {
    res.status(400).send("Client Err");
  }
};
