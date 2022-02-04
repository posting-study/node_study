## 자주 쓰는 미들웨어
미들웨어의 유용한 기능들을 패키지로 만들어두었는데, 실무에 자주 사용하는 것들을 중점적으로 살펴보려 한다.
- 쿠키, 세션 처리
- 요청의 바디를 stream으로 형식으로 받고, 다시 모아주는 것 -> 이런것들이 귀찮음
- http 모듈로만 구성했을 때와 비교하면서 개선된 점을 알아보자

### 1. 패키지 설치하기
```BASH
npm i morgan cookie-parser express-session dotenv
```
-> 미들웨어 패키지 (morgan, cookie-parser, express-session)와 process.env를 관리하기 위해 dotenv를 설치한다

### .env 파일  & dotenv 패키지
`dotenv` 패키지는 .env 파일을 읽어서 `process.env`로 만든다

-> `.env 파일`을 생성한다
```
COOKIE_SECRET=cookiesecret
```
-> process.env.COOKIE_SECRET에 cookiesecret 값을 할당한다

- 보안과 설정의 편의성 이유로 `process.env`를 별도의 파일로 관리함. 비밀 키들을 소스 코드에 그대로 적어두면 소스 코드가 유출되었을 때 키도 같이 유출됨
-  .env 같은 별도의 파일에 비밀 키를 적어두고 `dotenv 패키지로 비밀 키를 로딩`하는 방식으로 관리함. 소스 코드가 유출되더라도 .env 파일만 잘 관리하면 비밀 키는 지킬 수 있음.

### 0. `bodyParser` -> 요즘 잘 안씀
: 요청의 본문에 있는 데이터를 해석해서 req.body 객체로 만들어주는 미들웨어
bodyParser의 기능이 Express 안에 다시 들어감. 다음 코드로 대체
```JS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```
- express.json(): 클라이언트에서 받은 json 파일을 파싱해서 req.body에 넣어줌
- express.urlencoded({ extended: true })) : form을 파싱해줌. extended가 `true면 qs모듈`, false면 querystring 모듈을 사용 (true를 권장)
- form에서 이미지나 파일(멀티파트 데이터)을 보내는 경우, urlencoded에서 처리를 하지 못하기에, multer 모듈을 따로 써줘야 함

### 1.`morgan`
: morgan을 연결하면 기존 로그 외에 추가적인 로그를 볼 수 있음
```JS
app.use(morgan('dev'));
```
-> dev 모드에서 로그가 `[HTTP 메서드] [주소] [HTTP 상태 코드] [응답 속도] - [응답 바이트]` 형식으로 찍힘

- 인수로 dev 외에 combined, common, short, tiny 등을 넣을 수 있음 
- 개발 환경에서는 dev를, 배포 환경에서는 combined를 주로 사용 (combined가 좀 더 자세함)

### 2. `static`
: 정적인 파일들을 제공하는 라우터 역할
```JS
app.use('요청 경로', express.static('실제 경로'));
app.use('/', express.static(path.join(__dirname, 'public'))); //예시
```
- 따로 설치할 필요 없이 express 객체 안에서 꺼내 사용 가능
- 함수의 인수로 정적 파일들이 담겨 있는 폴더를 지정
- 실제 서버의 폴더 경로에는 public이 들어있지만, 요청 주소에는 public이 들어있지 않음 -> 서버의 폴더 경로와 요청 경로가 달라 외부인이 서버의 구조를 파악할 수 없어 보안에 도움이 됨
- 파일을 직접 읽어서 전송할 필요가 없음
**주의사항**
- 요청 경로에 해당하는 파일이 있으면 응답으로 파일을 보내고 다음 미들웨어를 실행하지 않음(next를 호출하지 않음), 파일이 없으면 내부적으로 next를 호출함

-> 쓰지 않을 미들웨어를 거쳐서 실행하는 것은 비효율적. 그래서 `미들웨어 간의 순서가 중요`하다. 대부분의 미들웨어는 내부에서 자체적으로 next를 실행한다

-> 보통 morgan 뒤에 사용하거나, 허용된 특정 유저에게만 제공하는 상황이면 cookieParser, session 뒤에 사용할 수도 있다
### 3. `cookieParser`
: 요청에 있는 쿠키를 해석해 `req.cookies` 객체로 만듬
```JS
app.use(cookieParser(비밀키));
```
- 첫번째 인수로 비밀키를 넣어줌. 서명된 쿠키가 있는 경우, 제공한 비밀 키를 통해 해당 쿠키가 내 서버가 만든 쿠키임을 검증할 수 있음
- 쿠키는 클라이언트에서 위조하기 쉬우므로 비밀키를 통해 만들어낸 서명을 쿠키 값 뒤에 붙임
- 쿠키의 옵션 중 signed 라는 옵션을 true로 설정하면 쿠키 뒤에 서명이 붙음. (대부분 서명 옵션을 켜두는 것이 좋음)
- 서명된 쿠키는 `req.signedCookies` 객체에 들어있음

ex) name = cookie 라는 쿠키를 보냈다면, req.cookies는 {name: 'cookie'}이 됨. (유효기간 지난 쿠키는 알아서 걸러짐)
서명된 쿠키는 name = cookie.sign 과 같은 모양이 됨

- 쿠키를 생성 / 제거 하기 위해서는 `res.cookie`, `res.clearCookie` 메서드를 사용
- 쿠키를 지우려면 키와 값, 옵션이 정확히 일치해야 지워짐.(단, expires나 maxAge 옵션은 불일치해도 됨)

### 4.`express-session`
: 세션 관리용 미들웨어. 세션을 구현하거나 특정 사용자를 위한 데이터를 임시적으로 저장해둘 때 유용함
- 세션은 사용자별로 req.session 객체 안에 유지됨
- 1.5 버전 이후 순서는 중요하지 않게 되었지만, 어떤 버전을 사용하고 있는지 모른다면 cookie-parser 미들웨어 뒤에 놓는 것이 안전함
- 인수로 세션에 대한 설정 
    - `resave`: 요청이 올 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지 설정
    - `saveUninitialized`: 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
- express-session은 세션 관리 시 클라이언트에 쿠키를 보냄(`세션 쿠키`). 안전하게 쿠키를 전송하려면 **쿠키에 서명을 추가**해야 하고, 쿠키를 서명하는 데 secret의 값이 필요함. 이때 cookie-parser의 secret과 같게 설정하는 것이 좋음
    - 세션 쿠키의 이름은 name 옵션으로 설정합니다. 기본 이름 (connect.sid)
    - `cookie` 옵션: 세션 쿠키에 대한 설정
- express-session으로 만들어진 `req.session 객체`에 값을 대입하거나 삭제해서 세션을 변경
    - req.session.destroy: 세션 한번에 삭제
    - req.sessionID: 현재 세션의 id
    - req.session.save: 세션 강제 저장 (일반적으로 요청이 끝날 때 자동으로 호출되므로 직접 save 메서드를 호출할 일은 거의 없음)
- 세션 쿠키의 모양
    - express-session에서 서명한 쿠키 앞에는 s:이 붙음
    - 실제로는 encodeURIComponent 함수가 실행되어 s%3A가 됨. s%3A의 뒷부분이 실제 암호화된 쿠키 내용이고, 이 모양을 보고 이 쿠키가 express-session 미들웨어에 의해 암호화된 것이라 알 수 있다.


### 미들웨어 특성 총정리
```JS
app.use(
  morgan('dev'),
  express.static('/', path.join(__dirname, 'public')),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(process.env.COOKIE_SECRET),
);
```
- 미들웨어는 req, res, next를 매개변수로 가지는 함수(에러 처리 미들웨어만 예외적으로 err, req, res, next를 가짐)로서 app.use나 app.get, app.post 등으로 장착한다.
- 특정한 주소의 요청에만 미들웨어가 실행되게 하려면 첫 번째 인수로 주소를 넣으면 된다.
- 동시에 여러 개의 미들웨어를 장착할 수도 있으며, 다음 미들웨어로 넘어가려면 next 함수를 호출해야 한다. 위 코드의 미들웨어들은 내부적으로 next를 호출하고 있으므로 연달아 쓸 수 있다. next를 호출하지 않는 미들웨어는 res.send나 res.sendFile 등의 메서드로 응답을 보내야 한다.
- express.static과 같은 미들웨어는 정적 파일을 제공할 때 next 대신 res.sendFile 메서드로 응답을 보낸다. 따라서 정적 파일을 제공하는 경우에 express.json, express.urlencoded, cookieParser 미들웨어는 실행되지 않는다. 

=>미들웨어 장착 순서에 따라 어떤 미들웨어는 실행되지 않을 수도 있다!
- 만약 next도 호출하지 않고 응답도 보내지 않으면 클라이언트는 응답을 받지 못해 기다리게 된다.
- next에 인수를 넣을 수 있는데, 인수를 넣으면 특수한 동작을 한다.
    -  `route` 라는 문자열을 넣으면 다음 라우터의 미들웨어로 바로 이동
    - 그 외의 인수를 넣는다면 바로 에러 처리 미들웨어로 이동. 이때의 인수는 에러 처리 미들웨어의 err 매개변수가 된다. 라우터에서 에러가 발생할 때 에러를 next(err)을 통해 에러 처리 미들웨어로 넘긴다.
- 미들웨어 간에 데이터를 전달하는 방법도 있다. 세션을 사용한다면 req.session 객체에 데이터를 넣어도 되지만, 세션이 유지되는 동안에 데이터도 계속 유지된다는 단점이 있기에 요청이 끝날 때까지만 데이터를 유지하고 싶다면 req 객체에 데이터를 넣어둔다.
```JS
app.use((req, res, next) => {
  req.data = '데이터 넣기';
  next();
}, (req, res, next) => {
  console.log(req.data); // 데이터 받기
  next();
});
```
- 현재 요청이 처리되는 동안 req.data를 통해 미들웨어 간에 데이터를 공유할 수 있다. 새로운 요청이 오면 req.data는 초기화된다. (속성명이 꼭 data일 필요는 없지만 다른 미들웨어와 겹치지 않게 조심해야 한다 -> 예를 들어 속성명을 body로 한다면(req.body) body-parser 미들웨어와 기능이 겹치게 된다)
- 미들웨어 안에 미들웨어를 넣는 유용한 패턴 한가지
```JS
app.use(morgan('dev'));
// 또는
app.use((req, res, next) => {
  morgan('dev')(req, res, next);
});

// => 두 방식은 같은 기능을 한다.
```
=> 이 패턴이 유용한 이유는 기존 미들웨어의 기능을 확장할 수 있기 때문이다. 다음과 같이 분기 처리를 할 수도 있다.
```JS
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    morgan('combined')(req, res, next);
  } else {
    morgan('dev')(req, res, next);
  }
});
```
### 5.multer 
: 이미지, 동영상 등을 비롯한 여러가지 파일들을 멀티파트 형식으로 업로드할 때 사용하는 미들웨어. 

-> 멀티파트 형식이란 enctype이 multipart/form-data인 폼을 통해 업로드하는 데이터의 형식을 의미함

다음과 같은 multipart.html이 있으면 멀티파트 형식으로 데이터를 업로드할 수 있음
```HTML
<form action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="image" />
  <input type="text" name="title" />
  <button type="submit">업로드</button>
</form>
```
-> 이러한 폼을 업로드하는 파일은 body-parser로 처리할 수 없고 직접 파싱하기도 어렵기에 `multer`라는 미들웨어를 사용하는 것이 편리하다

- multer를 설치하자
```BASH
npm i multer
```
- multer 패키지 안에 여러 종류의 미들웨어가 들어있음
```JS
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext); //파일명에 현재시간을 넣어주는 이유: 업로드하는 파일명 겹치는것을 막기위해
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, 
});
```

- multer 함수의 인수로 설정을 넣음
- storage 속성에는 destination에 어떤 이름으로(filename) 저장할지를 넣음
- destination과 filename 함수의 req 매개변수에는 요청에 대한 정보가, file 객체에는 업로드한 파일에 대한 정보가 있음
- done 매개변수는 함수임
    - 첫번째 인수에는 에러(에러가 있다면)
    - 두번째 인수에는 실제 경로나 파일이름
    - req, file의 데이터를 가공해서 done으로 넘기는 형식임
- limits 속성에는 업로드에 대한 제한 사항을 설정할 수 있음

