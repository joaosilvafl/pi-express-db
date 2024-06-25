var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const now = new Date();
    const data = {
        title: "Express",
        name: "Jotape",
        date: now.toLocaleDateString("pt-BR", options),
        time: now.toLocaleTimeString("pt-BR"),
        // get.date,getmount.getfullyear
    };
    res.render("index", data);
});

module.exports = router;
