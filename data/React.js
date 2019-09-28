<p>
<strong># 1~10강 내용</strong> <br>
<pre>1. 시작
Component 기반으로 작성
npx create-react-app ~~ -> cd ~~-> npm start
2. 빌드
npm run build</pre>
</p>

<p>
<strong># 10~11강 내용</strong> <br>
<pre>1. Component 생성
ex)
class SampleBut extends Component {
  render(){
  return(
      &lt;input type="button" value="이름" onClick={alert('버튼 눌림')}>
      &lt;/input>
    );
  }
}
-> &lt;SampleBut>&lt;/SampleBut>

참고) 마지막에 Component 코드의 마지막에 export를 해줘야 사용 가능
-> export default SampleBut;</pre>
</p>

<p>
<strong># 12강 내용</strong> <br>
<pre>1. props
동적으로 내용을 변경할 수 있음
ex)
class SampleContext extends Component {
  render() {
  return (
      &ltheader>
        &lt;h1>
          &lt;strong style="color: red;">{this.props.title}</strong>
          &lt;/h1>
        &lt;strong style="color: red;">{this.props.description}</strong>
      &lt;/header>
    );
  }
}
-> &lt;SampleContext title="~" description="~">&lt;/SampleContext></pre>

</p>

<p>
<strong># 15강 내용</strong>
<pre>1. state
props의 내용을 오픈소스로 그대로 보여주기 싫을 때
state는 App.js 에 선언 후 내용 입력
그 내용을 App.js 에서 사용(props 값으로)

참고) state에 의해 HTML 코드가 바뀔 시 key 값을 가져야 오류가 생기지 않음</pre>
</p>

<p>
<strong># 16~17강 내용</strong> <br>
<pre>1. event state props and render function
state 값이 변할 경우 render함수 호출됨
2. event 동작 막는법
debugger; -> 아예 막음 or e.preventDefault(); -> 기본적인 기능 막음
3. event 내에서 state 값 set하기
onClick = {function(e){this.setState({~~~});}.bind(this)}

중요) function_.bind(obj) -> function_ 내의 this에 obj를 넣음
bind의 parameter가 추가될 경우 추가된 변수 또는 값은 function의 parameter에 추가됨
function(e, a){~~}.bind(this, 10); -> a = 10
4. 추가
e.target -> e 가 발생하는 테그
e.target.dataset -> data 접근</pre>
</p>

<p>
<strong># 18강 내용</strong> <br>
<pre>1. props vs state
props -> readOnly
state -> can modify by this.setState({})
2. Component 값 변경하기
(Component1)
(Component2)
(Component3)
상위 Component가 하위 Component의 값을 변경하는 법 -> props 에 값을 전달
하위 Component가 상위 Component의 값을 변경하는 법 -> event(함수) 활용</pre>
</p>

<p>
<strong># 19강 내용</strong> <br>
<pre>1. arr.push vs arr.concat
push -> arr이 수정됨
concat -> arr 수정 안됨, 단지 추가된 상태(변수로 저장해서 사용할 것)
2. shouldComponentUpdate(newProps, newState){
  - return true => render() 호출 O
  - return false => render() 호출 X
  - if(this.props.value === newProps.value){~~}
  => 이전의 props와 새로운 props를 비교 가능
}
- render()이전에 호출할 것
- props 값이 바뀐 경우 호출됨
- 성능 튜닝 할 경우 용이
3. immutable : 원본을 바꾸지 않는다!(concat 함수에 관하여)
ex)
var a = [1, 2];
var b = a;
var c = Object.assign(a);
var d = Object.assign({}, a);

result -> a, b, c 는 주소값까지 동일, but d 는 값만 복제된 상태(immutable)</pre>
</p>

<p>
<strong># 마무리</strong> <br>
<pre>1. 관련 도구들
- immutable.js : immutable 이슈 발생 X (react 단짝)
- react router : react는 하나의 url로 많은 페이지를 담고 있음, 따라서 특정 페이지를 못찾음 -> 해결(기본으로 들어있지 않음)
- npm run eject : 감춰둔 create-react-app 의 기능 수정 가능
- redux : 중앙 데이터 저장소 생성 -> 관련 Component 와 연결 </pre>
<img src="../imgs/redux.jpg" width="30%">
<pre>- react server side rendering : 서버 쪽에서 web page 완성 -> 클라이언트 쪽으로 완성된 HTML 전송</pre>
</p>
