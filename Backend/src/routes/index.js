const router = require("express").Router();
const userRoutes = require("./user.routes.js");
const captainRoutes = require("./captain.routes.js");

router.use("/users", userRoutes);
router.use("/captains", captainRoutes);
router.use("/maps", require("./map.routes.js"));
router.use("/rides", require("./ride.routes.js"));

module.exports = router;
