const router = require("express").Router();

const Routes = require("./Routes/");

router.use("/mg", Routes.message);
router.use("/nu", Routes.number);

module.exports = router;
