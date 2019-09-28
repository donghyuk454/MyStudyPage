<p>
<strong>#9~11강 내용</strong> <br>
<pre>1. Url에 대한 이해
http://opentutorial.org:3000/main?id=HTML&page=12
(protocol)(host(domain))(port)(path)(query string)

2. Query string
var queryData = url.parse(request.url, true).query;
이를 통해 여러가지 웹사이트를 제작 가능!

코드 내에서 사용 방법 -> ${queryData.id}</pre>
</p>

<p>
<strong>#12~13강 내용</strong> <br>
<pre>1. fileRead in javascript
var fs = require('fs');

fs.readFile('sample.txt' 'utf8', function(err, data){
console.log(data);
});</pre>
</p>

<p>
<strong>#18~19강 내용</strong> <br>
<pre>1. console 에서 입력값
var args = process.argv
3번째부터 입력 정보

2. 웹페이지 정상 작동 -> 200, 오류 404</pre>
</p>

<p>
<strong>#28강 내용</strong> <br>
<pre>1. 동기 vs 비동기(node.js)
순서대로 vs 병렬
ex)
fs.readFile(path [,option], callback)
fs.readFileSync(path [,option]) -> return 값이 있음</pre>
</p>

<p>
<strong>#30~32강 내용</strong> <br>
<pre>1. 발신 by form(html)
- input type="text" name="~~"
- textarea name="~~"
- input type="submit"   => 모든걸 form Tag에 저장!
->> form action="url주소" method="post~~"
2. 수신
- request.on('data', callback{})
- request.on('end', callback{})
+ parse 시 qs 사용! (var qs = require('queryString');)</pre>
</p>

<p>
<strong>#33~38강 내용</strong> <br>
<pre>1. 리다이렉션
response.writeHead(302, {Location: '주소'})
response.end();
2. 추가 내용들
input type="hidden" => 보이진 않지만 값을 가질 수 있음
fs.unlink -> 파일 삭제</pre>
</p>
