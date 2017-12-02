// Set up MySQL connection.
const mysql = require("mysql");
let connection;

//  heroku's database, if it exists, we use it to create a connection, otherwise, we use the local one.
if (process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}else {
  connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "dariell",
    password: "password",
    database: "burgers_db",
    multipleStatements: true
  });
}

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
