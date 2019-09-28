var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');

var app = express();
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));//미들웨어를 표현하는 표현식
app.use(compression());//미들웨

app.use('/', indexRouter);
//PostPage Routing
app.post('/post', function(request, response){
  if (request.method === 'POST') {
    console.log("information received");
    collectRequestData(request, result => {
        response.send(`
          <!doctype html>
          <html>
          <head>
          <title>커등병 공부 페이지</title>
          <meta charset="utf-8">
          </head>
          <body>
          정상적으로 입력되었습니다!<br />
          <input type="button" value="확인" onclick="location.href='./'"></input>
          `);
    });
  }
  else {
      response.send(`
          <!doctype html>
          <html>
          <head>
          <title>커등병 공부 페이지</title>
          <meta charset="utf-8">
          <body>
          전달이 되지 않았습니다. 다시 입력해주세요!!<br />
          <form id="form" action='./post' method='post'>
            <p>
              <strong>Page</strong><br>
              <input type="text" name="page" id="page_" style="width:60%;"></input>
            </p>
            <p>
              <strong>Title</strong><br>
              <input type="text" name="title" style="width:60%;"></input>
            </p>
            <strong>Description</strong><br>
            <textarea name="descricption" style="width:60%;height: 300px;"></textarea>
            <input type="submit"></input>
          </form>
          </body>
          </html>
      `);
  }
});

app.get('/ajaxtest', function(req, res){
  res.send(`
    <!doctype html>
    <html>
      <body>
        <article>
        </article>
        <input type="button" value='fetch' onclick="
          fetch('../page/HTML').then(function(res){
            res.text().then(function(text){
              document.querySelector('article').innerHTML = text;
            })
          })
        "></input>
      </body>
    </html>
    `)
})

app.use('/page', topicRouter);

app.use(function(req, res, next){
	res.status(404).send('404 없는 페이지 입니다!');
})

app.use(function(err, req, res, next){
	res.status(404).send('404 없는 주제입니다!');
})

function collectRequestData(request, callback) {
  //body-parser 이용하여 구현
  var post = request.body;
  registContextToFile(post);
  callback(post);

  /* body-parser 없이 구현
  const FORM_URLENCODED = 'application/x-www-form-urlencoded';
  if(request.headers['content-type'] === FORM_URLENCODED) {
    let body = '';
      request.on('data', chunk => {
          body += chunk.toString();
      });
      request.on('end', () => {
          body = qs.parse(body);
          registContextToFile(body);
          callback(body);
      });
  }*/
}

function registContextToFile(post) {
  console.log(post);
  fs.readFile('./data/'+ post.page, 'utf-8', function(err, description){
    var content;

    if(description === undefined){
      content = '';
    }
    else {
      content = description;
    }

    content = content + '\n<p>\n';
    content += '<strong># ' + post.title + '</strong> <br>\n';
    content += '<pre>';
    content += post.descricption;
    content += '</pre>';
    content += '\n</p>';


    fs.writeFile('./data/' + post.page, content, function(err, description){
      console.log('done');
    });
  });
}



app.listen(3000, () => console.log('커등병 페이지 시작!'))


/* Node.js 로만 구현
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    var title = queryData.id;

    if(pathname === '/'){

      if(title === 'HTML')
      {
        var img = fs.readFileSync('./coding.jpg');
      }
      else if(title === 'React.js')
      {
        var img = fs.readFileSync('./redux.jpg');
      }
      else if(title === 'HTTP')
      {
        var img = fs.readFileSync('./cache.jpg');
      }

      var context = '<ol>';
      var canOpen = false;
      fs.readdir('./data', function(error, filelist){
        for (var i = 0; i < filelist.length; i++) {
          context += '<li><a href="/?id='+ filelist[i] +'">'+ filelist[i] +'</a></li>';

          if(filelist[i] == title){
            canOpen = true;
          }
        }

        context = context + '</ol>';

        if(canOpen)
        {
          fs.readFile('./data/'+ title, 'utf-8', function(err, description){
            var content = description;

            var template = templateHTML(title, context, content);

            response.writeHead(200);
            response.end(template);
          });
        }
        else
        {
          title = 'HOME';
          var description = '';

          fs.readFile('./formscript.js', 'utf8', function(err, script){
            description += script;
            var template = templateHTML(title, context, description);

            response.writeHead(200);
            response.end(template);
          });

        }

      })
    }
    else if(pathname === '/coding.jpg')
    {
      fs.readFile('./coding.jpg', function(error, data) {
        if(error){
          response.writeHead(500, {'Content-Type':'text/html'});
          response.end('500 Internal Server '+error);
        } else{
          response.writeHead(200, {'Content-Type':'image/jpeg'});
          response.end(data);
        }
      });
    }
    else if(pathname === '/redux.jpg')
    {
      fs.readFile('./redux.jpg', function(error, data) {
        if(error){
          response.writeHead(500, {'Content-Type':'text/html'});
          response.end('500 Internal Server '+error);
        } else{
          response.writeHead(200, {'Content-Type':'image/jpeg'});
          response.end(data);
        }
      });
    }
    else if(pathname === '/cache.jpg')
    {
      fs.readFile('./cache.jpg', function(error, data) {
        if(error){
          response.writeHead(500, {'Content-Type':'text/html'});
          response.end('500 Internal Server '+error);
        } else{
          response.writeHead(200, {'Content-Type':'image/jpeg'});
          response.end(data);
        }
      });
    }
    else if(pathname === '/posttest'){

      if (request.method === 'POST') {
        console.log("wow");
        collectRequestData(request, result => {
            console.log(result);
            response.end(`Parsed data belonging to ${result.fname}`);
        });
      }
      else {
          response.end(`
              <!doctype html>
              <html>
              <head>
              <title>커등병 공부 페이지</title>
              <meta charset="utf-8">
              </head>
              <body>
                  <form action="./posttest" method="post">
                      <input type="text" name="fname" /><br />
                      <input type="number" name="age" /><br />
                      <input type="file" name="photo" /><br />
                      <input type="submit"/><br />
                      <button>Save</button>
                  </form>
              </body>
              </html>
          `);
      }
    }
    else if(pathname === '/post'){
      if (request.method === 'POST') {
        console.log("information received");
        collectRequestData(request, result => {
            response.end(`
              <!doctype html>
              <html>
              <head>
              <title>커등병 공부 페이지</title>
              <meta charset="utf-8">
              </head>
              <body>
              정상적으로 입력되었습니다!<br />
              <input type="button" value="확인" onclick="location.href='./'"></input>
              `);
        });
      }
      else {
          response.end(`
              <!doctype html>
              <html>
              <head>
              <title>커등병 공부 페이지</title>
              <meta charset="utf-8">
              <body>
              전달이 되지 않았습니다. 다시 입력해주세요!!<br />
              <form id="form" action='./post' method='post'>
                <p>
                  <strong>Page</strong><br>
                  <input type="text" name="page" id="page_" style="width:60%;"></input>
                </p>
                <p>
                  <strong>Title</strong><br>
                  <input type="text" name="title" style="width:60%;"></input>
                </p>
                <strong>Description</strong><br>
                <textarea name="descricption" style="width:60%;height: 300px;"></textarea>
                <input type="submit"></input>
              </form>
              </body>
              </html>
          `);
      }
    }
    else {
      response.writeHead(404);
      console.log(pathname);
      response.end('Not found!');
    }
});

*/
//app.listen(3000);
