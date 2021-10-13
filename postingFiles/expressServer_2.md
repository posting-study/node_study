## 자주 쓰는 미들웨어
미들웨어의 유용한 기능들을 패키지로 만들어두었는데, 실무에 자주 사용하는 것들을 중점적으로 살펴보려 한다.
- 쿠키, 세션
- 요청의 바디를 stream으로 형식으로 받고, 다시 모아주는 것 -> 이런것들이 귀찮음

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

### `morgan`

### `bodyParser` -> 요즘 잘 안씀
### `cookieParser`