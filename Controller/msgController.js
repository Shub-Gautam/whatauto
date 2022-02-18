const { Client, MessageMedia } = require("whatsapp-web.js");
const fs = require("fs").promises;
const path = require("path");

async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`Deleted ${filePath}`);
  } catch (error) {
    console.error(`Got an error trying to delete the file: ${error.message}`);
  }
}

exports.sendmsg = async (req, res) => {
  try {
    console.log("welcome");
    const { msg, countryCallingCode, gender, session } = req.body;

    if (req.body.session === undefined) {
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

      // get numbers from database
      // const numbersArray = await Models.numbers.find({countryCode:91});

      // Start the loop for each element of the numbersArray
      // numbersArray.forEach(numb => {
      //   // copy the logic here
      // });

      // res.end();

      const types = ["image/png", "image/jpeg", "image/gif"];

      console.log(req.file);

      const phone = 9457578837;
      const number = `${phone}`;
      const sanitized_number = number.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
      const final_number = `91${sanitized_number.substring(
        sanitized_number.length - 10
      )}`; // add 91 before the number here 91 is country code of India
      const number_det = final_number + "@c.us";

      if (req.file) {
        const media = MessageMedia.fromFilePath(`Uploads/${req.file.filename}`);
        await client.sendMessage(number_det, media);
      }
      await client.sendMessage(number_det, req.body.msg); // send message
      // Deleting File after use
      if (req.file)
        deleteFile(path.join(process.cwd(), `/Uploads/${req.file.filename}`));
    });

    await client.initialize();
  } catch (err) {
    // Delete File after use
    if (req.file)
      deleteFile(path.join(process.cwd(), `/Uploads/${req.file.filename}`));
    res.status(400).send("Client Err");
  }
};
