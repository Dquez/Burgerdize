const express = require("express");
// create an instance of our router to use instead of only using app,get()
const router = express.Router();

// Import the model (burger.js) to use its database functions.
let burger = require("../models/burger.js");

// Home route that displays the main page
router.get("/", function (req, res) {
  burger.all(function (data) {
    let hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

// post request on burger route that will execute the function to create a new burger and then once the callback is finished, it will reroute the user to the home page via "/" route
router.post("/burger", function (req, res) {
  burger.create("burger_name", [req.body.burger], function (data) {
    res.redirect("/");
  });
});

// Updates the burger's "state" from not devoured to devoured
router.put("/devour/:id", function (req, res) {
  let condition = "id = " + req.params.id;
  burger.update({
    devoured: req.body.devoured
  }, condition, function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/delete/:id", function (req, res) {
  let condition = "id = " + req.params.id;
  burger.delete([condition], function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).redirect("/");
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
