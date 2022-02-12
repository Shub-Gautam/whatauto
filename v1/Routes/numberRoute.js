const router = require("express").Router();

// Controller file
const { number } = require("../../Controller/index");

router.get("/nu/:id", number.getNumberById);
router.post("/nu", number.addNumber);
router.put("/nu/:id", number.updateNumber);
router.delete("/nu/:id", number.deleteNumber);

module.exports = router;
