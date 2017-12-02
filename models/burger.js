// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

const burger = {
  all: function (cb) {
    // when this function is called, the call back with the res "(result)" paramater will be executed.. within the callback, we execute the first parameter passed into the function  all(cb), this way we send the information back to the controller file
    orm.all("burgers", function (res) {
      cb(res);
    });
  },
  create: function (col, val, cb) {
    orm.create("burgers", col, val, function (res) {
      cb(res);
    });
  },
  update: function (objColVal, condition, cb) {
    orm.update("burgers", objColVal, condition, function (res) {
      cb(res);
    });
  },
  delete: function (condition, cb) {
    orm.delete("burgers", condition, function (res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;
