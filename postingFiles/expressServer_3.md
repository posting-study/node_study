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

### 9. 템플릿 엔진 사용하기

- `Pug`

- `넌적스`

