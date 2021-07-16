const express = require("express");
const app = require("../app.js");
const router = express.Router();

const appController = require("../controllers/appController.js");

// Display the dashboard page
router.get("/", appController.dashboard);

//search datatables
router.post("/search", appController.search);

//test page
router.get("/test", (req, res) => {
    res.render("test");
});

module.exports = router;