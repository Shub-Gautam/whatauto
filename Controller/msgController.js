const { Client, MessageMedia } = require("whatsapp-web.js");

exports.sendmsg = async (req, res) => {
  try {
    const { msg, countryCallingCode, gender, session } = req.body;

    const client = new Client({
      session: session,
    });

    if (!client) {
      res.status(400).send("Login Err");
    } else {
      res.status(200).send("OK");
    }

    client.on("ready", async () => {
      console.log("Client is ready!");

      // get numbers from database
      // const numbersArray = await Models.numbers.find({countryCode:91});

      // Start the loop for each element of the numbersArray
      // numbersArray.forEach(numb => {
      //   // copy the logic here
      // });

      // res.end();

      const types = ["image/png", "image/jpeg", "image/gif"];

      // const media = await new MessageMedia("image/jpeg", content);

      const phone = 9548425684;
      const number = `${phone}`;
      const sanitized_number = number.toString().replace(/[- )(]/g, ""); // remove unnecessary chars from the number
      const final_number = `91${sanitized_number.substring(
        sanitized_number.length - 10
      )}`; // add 91 before the number here 91 is country code of India
      const number_det = final_number + "@c.us";

      // await client.sendMessage(number_det, media);
      await client.sendMessage(number_det, msg); // send message
    });

    client.initialize();
  } catch (err) {
    console.log(err);
  }
};
