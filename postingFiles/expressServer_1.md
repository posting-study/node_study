# Express 웹 서버 만들기

이전 포스팅에서 웹 서버와 미들웨어에 대한 간략한 내용을 다뤘었는데, 이번에 보다 구체적으로 정리해보려 한다.

REST api를 사용해 만들었던 http server 만들기 포스팅에서 보았던 코드는 확장성과 보안 면에서 좋지 않을 뿐 아니라, 서버를 제작하는데에 큰 불편함이 있다.

이러한 불편함을 해결하고 추가 기능을 사용하기 쉽도록 `웹 서버 프레임워크`가 있는데 npm에서 대표적인 것이 `Express`이다.

Express 이외에도 node에 다른 웹 서버 프레임워크가 존재하지만, (압도적으로) 많은 사람들이 사용하기에 버그가 적고, 기능 추가나 유지 보수가 활발해 다수가 추천하는 프레임워크이다.


## Express project 시작하기

### 1. package.json 생성 
`npm init` 실행 or `json 파일` 만들기

### 2. express 설치
```BASH
$ npm i express
$ npm i -D nodemon
```
-> `nodemon` 역할 (-D, 개발용으로만 사용함)
- app.js를 nodemon으로 실행한다
- 서버 코드를 수정하면 nodemon이 서버를 자동으로 재시작

### 3. 서버 역할 app.js 만들기
- Express 모듈을 실행해 app 변수에 할당함
```JS
const express = require('express');
const app = express();
```
- Express 모듈 안에 http 모듈이 내장되어 있어 서버의 역할을 할 수 있음
- `app.set('port', 포트)` : 서버가 실행될 포트 지정
    -> process.env 객체에 PORT 속성이 있다면 그 값을 사용하고, 없다면 기본값으로 3000번 포트를 이용
- `app.set(키, 값)` : 데이터를 저장
- `app.get(키)`: 데이터를 가져옴
- `app.get(주소, 라우터)` :  주소에 대한 GET 요청이 올 때 동작 지정
- express에서는 res.write나 res.end 대신 `res.send`를 사용 
    파일(HTML)로 응답하고 싶다면 `res.sendFile` 메서드를 사용함. 단, 파일의 경로를 path 모듈을 사용해서 지정
- `app.listen` 에서 포트 번호를 app.get으로 가져와 서버를 실행함. 코드 가장 마지막 단에 작성
- GET 요청 외에도 POST, PUT, PATCH, DELETE, OPTIONS에 대한 라우터를 위한 `app.post, app.put, app.patch. app.delete, app.options` 메서드가 존재

## 미들웨어(Middleware)
: 요청과 응답의 중간과정에 있기 때문에 미들웨어라 불림
-> 미들웨어는 Express의 핵심임. 라우터와 에러 핸들러 또한 미들웨어의 일종. 
-> 코드의 중복을 해결하기도 함 (ex. 각 라우터마다 해당하는 요청/응답 작업을 할 때, 동일하게 실행해야하는 부분이 있다면 -> 이 부분을 미들웨어 코드로 따로 빼준다)

### 라우터(Router) / 라우팅

- 라우팅: 클라이언트에서 보내는 주소(요청 경로)에 따라 이를 처리를 하는 것
-> 애플리케이션 엔드 포인트(URI)의 정의, 이 URI가 클라이언트 요청에 응답하는 방식

- 라우터: 라우팅의 역할을 하는 것
  - 요청마다 `app.get()` 메소드를 호출하여 라우터로 사용할 수 있음
  - `express.Router()` , Express에서 제공하는 라우터 미들웨어 사용 가능


### 1. Express 서버에 미들웨어 연결
미들웨어는 `app.use(미들웨어)` 꼴로 사용됨

```JS
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});
```
- 미들웨어는 코드 순서대로 실행됨(노드 또한 코드 순서대로  실행)
- 그렇기에, 범위가 넓은 라우터들은 가장 아래에 작성해야 함(요청을 매개변수로 넘긴다던지, 모든 GET 요청 등등...)
- `next` 매개변수를 이용해 다음 미들웨어로 넘어가는 함수를 넘길 수 있음
(**next를 실행하지 않으면 다음 미들웨어가 실행되지 않음**)
- 주소를 첫 번째 인수로 넣어주지 않으면 미들웨어는 모든 요청에서 실행되고, 주소를 넣는다면 해당하는 요청에서만 실행
```JS
app.use(미들웨어) : 모든 요청에서 미들웨어 실행
app.use('/abc', 미들웨어) : abc로 시작하는 요청에서 미들웨어 실행
app.post('/abc', 미들웨어) : abc로 시작하는 POST 요청에서 미들웨어 실행
```
- 같은 라우터에 미들웨어를 여러 개 장착할 수 있음 
- api 서버를 만들면 `res.json`을, 웹 서버를 만들면 `res.sendFile` 보통 많이 씀.
- 한 라우터 안에서 (혹은 같은 주소에), 응답 코드나 파일을 두번 이상 보내면 안됨.
  -> `res.send`,`res.sendFile`,`res.json` 두번 이상 쓰지 않기
```JS
//에러가 발생하는 예시
//ERROR : Cannot set headers after they are sent to the client

app.get('/', (req, res) => { // 한 라우터 안에서 x
  res.send("code");
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/', (req, res) => { // 같은 주소로 response x
  res.send("hello");
});
```


### 2. next 메서드 활용
- error 처리시 catch에서 `next(error)`로 넘김. next 안에 인수가 존재하면, 다음 미들웨어를 실행시키는 것이 아니라 에러 핸들러로 바로 연결됨
```JS
app.use((req,res,next) => {
  try{
    console.log("성공");
  }catch(error){
    next(error);
  }
})
```
- `route`인 경우 다음 라우터로 넘어감

### 3. 에러처리 미들웨어
-> 에러가 발생하면 에러 처리 미들웨어로 연결됨

- 매개변수가 err, req, res, next로, 모든 매개변수를 사용하지 않더라도 매개변수가 반드시 네 개여야 함
- 첫번째 `err`에는 에러에 관한 정보가 담김
- `res.status` 메서드로 HTTP 상태 코드 지정가능(기본값은 200)
- Expressrk 에러를 자동으로 처리해주긴 하지만, 실무에서는 직접 에러 처리 미들웨어를 연결해주는 것이 좋음
- 에러 처리 미들웨어는 특별한 경우가 아니면 가장 아래에 위치하도록 함















