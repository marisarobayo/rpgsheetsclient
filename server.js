const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
const forceSecure = require("force-secure-express");

app.use(express.static(__dirname + "/dist/"));

app.use(forceSecure([
    "rpgsheets.herokuapp.com"
  ]));

app.get(/.*/, function(req, res) {
    res.sendfile(__dirname + "/dist/index.html");
})
app.listen(port);

console.log("Server started");