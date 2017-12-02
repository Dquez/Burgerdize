const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
let port = process.env.PORT || 8080;
const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(methodOverride("_method"));

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const routes = require("./controllers/burger_controller.js");

// Whenever the app gets a request on the "/" route, it will refer to the routes file.
app.use("/", routes);

app.listen(port, function () {
    console.log("App listening on PORT " + port);
});
