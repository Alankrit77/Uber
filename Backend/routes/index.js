const router = require("express").Router();
const userRoutes = require("./user.routes.js");
const captainRoutes = require("./captain.routes.js");

router.use("/users", userRoutes);
router.use("/captains", captainRoutes);

module.exports = router;
