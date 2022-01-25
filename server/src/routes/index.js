const router = require("express").Router();
const authRoutes = require("./api/auth.routes");

router.use("/auth", authRoutes);

module.exports = router;
