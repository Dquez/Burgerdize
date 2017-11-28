const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const port = 8080;

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
// const routes = require("./controllers/catsController.js");

// app.use("/", routes);

app.listen(port, function(err, response) {
    if (err) throw err 
    else {
        console.log("On port : " + port);
    }
});
