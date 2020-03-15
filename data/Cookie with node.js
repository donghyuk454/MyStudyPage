
<p>
<strong># 쿠키 생성</strong> <br>
<pre># 쿠키 용도
1. 인증 
2. 개인화 
3. 방문자의 상태 등을 체크

# 쿠키 생성 코드
var http = require('http');
http.createServer(function(request, response){
     response.writeHead(200, {
         'Set-Cookie':['yummy_cookie=choco', 'tasty_cookie=strawberry']
     });
    response.end('Cookie!!');
}).listen(3000);

=> 이후에 요청 쿠키값에 입력되어 서버로 전달됨</pre>
</p>
<p>
<strong># 쿠키 읽기</strong> <br>
<pre># 쿠키 읽기 코드
npm install -s cookie

var http = require('http');
var cookie = require('cookie');

http.createServer(function(request, response){
    console.log(request.headers.cookie);
    var cookies = {};
    if(request.headers.cookie !== undefined){
        cookies = cookie.parse(request.headers.cookie);
    }
    console.log(cookies.yummy_cookie);
    response.writeHead(200, {
        'Set-Cookie':['yummy_cookie=choco', 'tasty_cookie=strawberry']
    });
    response.end('Cookie!!');
}).listen(3000);</pre>
</p>
<p>
<strong># Session 쿠키 vs Permanent 쿠키</strong> <br>
<pre># 비교
Session 쿠키 -> 껐다 키면 사라져있음
Permanent 쿠키 -> 계속 살아있음

# Permanent 생성 코드
var http = require('http');
var cookie = require('cookie');
http.createServer(function(request, response){
    console.log(request.headers.cookie);
    var cookies = {};
    if(request.headers.cookie !== undefined){
        cookies = cookie.parse(request.headers.cookie);
    }
    console.log(cookies.yummy_cookie);
    response.writeHead(200, {
        'Set-Cookie':[
            'yummy_cookie=choco', 
            'tasty_cookie=strawberry',
            `Permanent=cookies; Max-Age=${60*60*24*30}`
        ]
    });
    response.end('Cookie!!');
}).listen(3000);</pre>
</p>
<p>
<strong># Secure & HttpOnly</strong> <br>
<pre># 소스 코드
var http = require('http');
var cookie = require('cookie');
http.createServer(function(request, response){
    console.log(request.headers.cookie);
    var cookies = {};
    if(request.headers.cookie !== undefined){
        cookies = cookie.parse(request.headers.cookie);
    }
    console.log(cookies.yummy_cookie);
    response.writeHead(200, {
        'Set-Cookie':[
            'yummy_cookie=choco', 
            'tasty_cookie=strawberry',
            `Permanent=cookies; Max-Age=${60*60*24*30}`,
            'Secure=Secure; Secure',// https 로만 가능
            'HttpOnly=HttpOnly; HttpOnly'// http통신으로만 볼 수 있음(자바스크립트론 X)
        ]
    });
    response.end('Cookie!!');
}).listen(3000);</pre>
</p>
<p>
<strong># Path & Domain</strong> <br>
<pre># 소스 코드
var http = require('http');
var cookie = require('cookie');
http.createServer(function(request, response){
    console.log(request.headers.cookie);
    var cookies = {};
    if(request.headers.cookie !== undefined){
        cookies = cookie.parse(request.headers.cookie);
    }
    console.log(cookies.yummy_cookie);
    response.writeHead(200, {
        'Set-Cookie':[
            'yummy_cookie=choco', 
            'tasty_cookie=strawberry',
            `Permanent=cookies; Max-Age=${60*60*24*30}`,
            'Secure=Secure; Secure',
            'HttpOnly=HttpOnly; HttpOnly',
            'Path=Path; Path=/cookie', // 특정 디렉토리 이하에서만 쿠키정보를 서버로 전송(경로 제한)
            'Doamin=Domain; Domain=test.o2.org' // 어떠한 서브 도메인에서든 사용 가능(도메인 제한)
        ]
    });
    response.end('Cookie!!');
}).listen(3000);</pre>
</p>