const express = require("express");

const router = express.Router();

// Import the model (cat.js) to use its database functions.
let burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    let hbsObject = {
      burgers: data
    };
    // console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/burger", function(req, res) {
  console.log(req.body)
  burger.create("burger_name", [req.body.burger], function(data) {
    res.redirect("/");
  });
});

router.put("/devour/:id", function(req, res) {
  let condition = "id = " + req.params.id;
  console.log("condition", condition);
  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
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
  burger.delete([condition], function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
