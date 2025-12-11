const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("couriers route OK");
});

module.exports = router;
