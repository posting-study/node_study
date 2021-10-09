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
- `app.listen` 에서 포트 번호를 app.get으로 가져와 서버를 실행함
- GET 요청 외에도 POST, PUT, PATCH, DELETE, OPTIONS에 대한 라우터를 위한 `app.post, app.put, app.patch. app.delete, app.options` 메서드가 존재

## 미들웨어
: 요청과 응답의 중간과정에 있기 때문에 미들웨어라 불림
-> 미들웨어는 Express의 핵심임. 라우터와 에러 핸들러 또한 미들웨어의 일종. 

### 1. Express 서버에 미들웨어 연결
미들웨어는 `app.use(미들웨어)` 꼴로 사용됨

```JS
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});
```
- 미들웨어는 코드 순서대로 실행됨
- `next` 매개변수를 이용해 다음 미들웨어로 넘어가는 함수를 넘길 수 있음
(next를 실행하지 않으면 다음 미들웨어가 실행되지 않음)
- 주소를 첫 번째 인수로 넣어주지 않으면 미들웨어는 모든 요청에서 실행되고, 주소를 넣는다면 해당하는 요청에서만 실행
```JS
app.use(미들웨어) : 모든 요청에서 미들웨어 실행
app.use('/abc', 미들웨어) : abc로 시작하는 요청에서 미들웨어 실행
app.post('/abc', 미들웨어) : abc로 시작하는 POST 요청에서 미들웨어 실행
```
-  


### 2. 










