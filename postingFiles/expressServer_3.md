### 7.라우터 분리하기
요청 메서드와 주소별로 분기 처리하는 부분을 조건문으로 분기하게 되면 코드도 복잡하고 확장하기도 어렵다. Express를 사용하는 이유 중 하나는 바로 라우팅을 깔끔하게 관리할 수 있다는 점이다. 라우터를 많이 연결하면 app.js 코드가 매우 길어지므로 익스프레스에서는 라우터를 분리할 수 있는 방법을 제공한다.

=> app.js에서 app.get 같은 메서드가 라우터 부분이다. 이 부분을 분리해보자.

1. routes 폴더를 만들고 그 안에 index.js와 user.js를 작성한다.

2. 만든 index.js와 user.js를 app.use로 app.js에 연결한다.

3. 에러 처리 미들웨어 위에 404 상태 코드 응답 미들웨어를 하나 추가하자.(요청과 일치하는 라우터가 없는 경우 대비)

=> 없으면 단순히 "Cannot GET 주소" 라는 문자열이 표시됨

- 동적으로 변하는 부분을 라우트 매개변수로 만들 수 있다
    - `:id`를 넣으면 `req.params.id`로 받을 수 있다.
    - 일반 라우터보다 뒤에 위치해야 한다
```JS
router.get('/user/:id', (req,res) => {
    console.log(req.params, req.query);
}); // :id를 넣으면 req.params.id 로 받을 수 있음

router.get('/user/:id', (req,res) => {
    console.log("hi"); //실행됨
});
router.get('/user/smt', (req,res) => {
    console.log("hi"); //실행되지 않음 => 고로 라우트 매개변수를 쓰려면 일반 라우터보다 뒤에 위치해둬야 함
});
```

- 라우터를 그룹화 할 수 있다. 

주소는 같지만 메서드가 다른 코드가 있을 때 `router.route`로 묶을 수 있음.

```JS
router.get('/user', (req,res) => {
    res.send('GET /user');
}); 
router.post('/user', (req,res) => {
    res.send('POST /user');
}); 

//다음과 같이 묶을 수 있음

router.route('/user')
.get((req,res) => {
    res.send('GET /user');
})
.post((req,res) => {
    res.send('POST /user');
});
```
### 8. req,res 객체 살펴보기
1. req 객체
- `req.app`: req 객체를 통해 app 객체에 접근할 수 있다. req.app.get('port')와 같은 식으로 사용할 수 있음
- `req.body`: body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체
- `req.cookies`: cookie-parser 미들웨어가 만드는 요청의 쿠키를 해석한 객체
- `req.ip`: 요청의 ip 주소가 담겨 있음
- `req.params`: 라우트 매개변수에 대한 정보가 담긴 객체
- `req.query`: 쿼리스트링에 대한 정보가 담긴 객체
- `req.signedCookies`: 서명된 쿠키들은 req.cookies 대신 여기에 담겨 있음
- `req.get`(헤더 이름): 헤더의 값을 가져오고 싶을 때 사용하는 메서드

2. res 객체
- `res.app`: req.app처럼 res 객체를 통해 app 객체에 접근할 수 있다
- `res.cookie(키, 값, 옵션)`: 쿠키를 설정하는 메서드
- `res.clearCookie(키, 값, 옵션)`: 쿠키를 제거하는 메서드
- `res.end()`: 데이터 없이 응답을 보냄
- `res.json(JSON)`: JSON 형식의 응답을 보냄
- `res.redirect(주소)`: 리다이렉트할 주소와 함께 응답을 보냄
- `res.render(뷰, 데이터)`: 다음 절에서 다룰 템플릿 엔진을 렌더링해서 응답할 때 사용하는 메서드
- `res.send(데이터)`: 데이터와 함께 응답을 보냄. 데이터는 문자열일 수도 있고 HTML일 수도 있으며, 버퍼일 수도 있고 객체나 배열일 수도 있음.
- `res.sendFile(경로)`: 경로에 위치한 파일을 응답
- `res.set(헤더, 값)`: 응답의 헤더를 설정
- `res.status(코드)`: 응답 시의 HTTP 상태 코드를 지정
### 9. 템플릿 엔진 사용하기

- `Pug`

- `넌적스`

