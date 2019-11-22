const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
const forceSecure = require("force-secure-express");

app.use(express.static(__dirname + "/dist/"));

/*app.use(forceSecure([
    "rpgsheets.herokuapp.com"
  ]));*/

//app.prepare().then(() => {
  //app.use(requireHTTPS);
  app.get(/.*/, function(req, res) {
    res.sendfile(__dirname + "/dist/index.html");
  })

  app.use((req,res,next) => {
    if (req.headers['x-forwarded-proto'] === 'http' || req.hostname === 'rpgsheets.herokuapp.com') {
      res.redirect(301, 'https://' + req.get('host') + req.baseUrl);
      return;
    }
  
    res.setHeader('strict-transport-security', 'max-age=31536000; includeSubDomains; preload');
    next();
  })
  
  app.listen(port);
  console.log("Server started");
  

//})



function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure || req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.baseUrl);
  }
  next();
}