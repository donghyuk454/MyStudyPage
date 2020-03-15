var express = require('express');
var router = express.Router();
var fs = require('fs');
var qs = require('querystring');

//HomePage Routing
router.get('', function(request, response){
  response.send(`
    <p><h1>Login</h1></p>
    <form action="./login_process" method="post">
      <p><input type="text" name="email" placeholder="email"></input></p>
      <p><input type="password" name="password" placeholder="password"></input></p>
      <p><input type="submit"></input></p>
    </form>
    `);
});

module.exports = router;
