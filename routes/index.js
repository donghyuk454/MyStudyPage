var express = require('express');
var router = express.Router();
var fs = require('fs');
var cookie = require('cookie');

//HomePage Routing
router.use('', function(request, response){
  fs.readdir('./data', function(error, filelist){
    var context = getContext(filelist, CheckAuth(request));

    var description = '';

    fs.readFile('./formscript.js', 'utf8', function(err, script){
      description += script;
      var login = `
      <pre style="float:right;margin-right:10px;margin-top:10px;">dongdong
      </pre>
      <a href="/logout_process">Logout</a>
      `;

      if(CheckAuth(request))
      {
        var template = templateHTML('HOME', context, description, login);
      }
      else {
        var template = templateHTML('HOME', context, description);
      }


      response.send(template);
    });
  })
});

function CheckAuth(request)
{
  var cookies = {};
  if(request.headers.cookie){
    cookies = cookie.parse(request.headers.cookie);
  }
  if(cookies.email === 'donghyuk454@gmail.com' && cookies.password === 'ehdgur12')
  {
    return true;
  }
  return false;
}

//Functions
function getContext(filelist, auth){
  var context = '';

  context += `
  <script>
    function loginFirst()
    {
      alert("로그인을 먼저 해주세요.");
    }
  </script>
  `;
  context += '<ol>';

  for (var i = 0; i < filelist.length; i++) {
    if(auth)
      context += '<li><a href="/page/'+ filelist[i] +'">'+ filelist[i] +'</a></li>';
    else
      context += '<li><a href="#" onclick="loginFirst();">'+ filelist[i] +'</a></li>';
  }
  context = context + '</ol>';

  return context;
}


function templateHTML(title, list, description, login = '<a href="/login" style="float:right;margin-right:10px;margin-top:10px;">Login</a>'){
  var style = fs.readFileSync('./style.css', 'utf8');

  return '      <!DOCTYPE html>      <html>      <head>        <meta charset="utf-8">        <title>커등병 공부 페이지</title>        <style type="text/css"> ' + style + '</style>      <script src ="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" type="text/javascript">                </script>   </head>      <body>        ' + login + '<br><h1><a id="title_" href="/">커등병 공부 페이지</a></h1>        <div id="grid">          ' + list + '          <div id="article">            <h2>'+ title +'</h2>            '+ description +'          </div>        </div>      <script type="text/javascript">    $(\'body\').css(\'color\', \'yellow\');    $(\'body\').css(\'backgroundColor\', \'black\');  </script></body>      </html>      ';
}

/*
//ImagePage Routing
app.get('/coding.jpg', function(req, res){
  fs.readFile('coding.jpg', function(err, data){
    res.writeHead(200, {'Context-Type': 'text/html'});
    res.end(data);
  });
});

app.get('/redux.jpg', function(req, res){
  fs.readFile('redux.jpg', function(err, data){
    res.writeHead(200, {'Context-Type': 'text/html'});
    res.end(data);
  });
});

app.get('/cache.jpg', function(req, res){
  fs.readFile('cache.jpg', function(err, data){
    res.writeHead(200, {'Context-Type': 'text/html'});
    res.end(data);
  });
});*/

module.exports = router;
