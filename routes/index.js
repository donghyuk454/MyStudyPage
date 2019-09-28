var express = require('express');
var router = express.Router();
var fs = require('fs');

//HomePage Routing
router.get('', function(request, response){
  fs.readdir('./data', function(error, filelist){
    var context = getContext(filelist);

    var description = '';

    fs.readFile('./formscript.js', 'utf8', function(err, script){
      description += script;
      var template = templateHTML('HOME', context, description);

      response.send(template);
    });
  })
});


//Functions
function getContext(filelist){
  var context = '<ol>';

  for (var i = 0; i < filelist.length; i++) {
    context += '<li><a href="/page/'+ filelist[i] +'">'+ filelist[i] +'</a></li>';
  }
  context = context + '</ol>';

  return context;
}


function templateHTML(title, list, description){
  var style = fs.readFileSync('./style.css', 'utf8');

  return '      <!DOCTYPE html>      <html>      <head>        <meta charset="utf-8">        <title>커등병 공부 페이지</title>        <style type="text/css"> ' + style + '</style>      <script src ="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" type="text/javascript">                </script>   </head>      <body>        <h1><a id="title_" href="/">커등병 공부 페이지</a></h1>        <div id="grid">          ' + list + '          <div id="article">            <h2>'+ title +'</h2>            '+ description +'          </div>        </div>      <script type="text/javascript">    $(\'body\').css(\'color\', \'yellow\');    $(\'body\').css(\'backgroundColor\', \'black\');  </script></body>      </html>      ';
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
