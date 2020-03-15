var express = require('express');
var router = express.Router();
var fs = require('fs');
//DetailPage Routing
router.get('/:pageId', function(request, response, next){
  var title = request.params.pageId;

  fs.readdir('./data', function(err, filelist){
    var context = getContext(filelist);

    fs.readFile('./data/'+ title, 'utf-8', function(err, description){
      if(err)
      {
        next(err);
      }
      else{
        var content = description;

        var template = templateHTML(title, context, content);

        response.send(template);
      }
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

function templateHTML(title, list, description, login = '<pre style="float:right;margin-right:10px;margin-top:10px;">dongdong</pre><a href="/logout_process">Logout</a>'){
  var style = fs.readFileSync('./style.css', 'utf8');

  return '      <!DOCTYPE html>      <html>      <head>        <meta charset="utf-8">        <title>커등병 공부 페이지</title>        <style type="text/css"> ' + style + '</style>      <script src ="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" type="text/javascript">                </script>   </head>      <body>        ' + login + '<br><h1><a id="title_" href="/">커등병 공부 페이지</a></h1>        <div id="grid">          ' + list + '          <div id="article">            <h2>'+ title +'</h2>            '+ description +'          </div>        </div>      <script type="text/javascript">    $(\'body\').css(\'color\', \'yellow\');    $(\'body\').css(\'backgroundColor\', \'black\');  </script></body>      </html>      ';
}

module.exports = router;
