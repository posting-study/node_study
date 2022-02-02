# REPL(Read Evaluation Print Loop)
: 읽고, 해석하고, 반환하고, 종료때까지 반복 -> 코드 실행
사용자가 코드를 입력하면 그 코드를 평가하고 코드의 실행결과를 출력해주는 것을 반복해주는 환경을 말한다.
node.js 에서 REPL 환경을 지원하기 때문에 자바스크립트 코드를 바로 실행해 결과를 확인해 볼 수 있다.

# 노드 내장 객체
- 노드에는 DOM이 존재하지 않음 -> window와 document 객체를 사용할 수 없음
- global 객체: 전역객체
- 객체를 로깅할때는 console.log 보다 console.dir
- console.time / console.timeEnd를 사용해 사이의 시간을 알 수 있음

## 노드의 전역 객체

브라우저에서는 `window`라면, 노드의 전역 객체는 `global`이 있다. 두 곳에서 공통으로 `globalThis`로 접근 가능하다.

```JS
console.log(this); //전역 scope의 this 는 빈 객체이다 -> {} 출력
//this === module.exports === {} === exports
function a(){
    console.log(this===global); //함수안의 this는 global을 가리킨다
}
a(); //true
```

## require

모듈을 실행만 하고, 안의 코드를 사용하지 않는 경우 쓰는 키워드

`require('파일경로')` 를 선언하면 바로 사용

- require이 제일 위에 올 필요 없음
- `require.cache` 에 한번 require한 모듈에 대한 caching 정보가 들어있음
- `require.main`은 노드 실행 시 첫 모듈임
- 두개의 모듈이 서로 require하는 상황인 `순환참조`를 만들지 않도록 조심해야함

## process

노드는 파일시스템 뿐만 아니라 운영체제에도 접근할 수 있다

- `node > process` 에 들어가면 실행중인 노드 프로세스에 대한 정보를 확인할 수 있다
- `process.env` : 시스템 환경 변수들이 들어있는 객체
- `process.nextTick(콜백)`: 이벤트 루프가 다른 콜백 함수들보다 nextTick의 콜백함수를 우선적으로 처리한다
    -> `setImmediate`,`setTimeout`보다 `promise`와 `nextTick`이 먼저 실행된다
- `process.exit()` : 현재의 프로세스를 멈춤
    -> 코드가 없거나 0이면 정상종료, 이외의 코드는 비정상 종료

-------
# 노드 내장 모듈
## os

`node os` : 운영체제의 정보를 담고 있음 -> 운영체제별로 다른 서비스를 제공하고 싶을 때 os 모듈이 유용함

모듈은 `require('os')` 로 가져온다 (내장모듈이라 경로 대신 이름만 적어줘도 됨)

((OS 스레드와 NODE 스레드는 다르다는 것을 헷갈리지 말고 인지하고 있을 것))

## path

`폴더와 파일의 경로를 쉽게 조작`할 수 있도록 도와주는 모듈 -> 운영체제 별로 경로 구분자가 다르다!

- Window : C:\Users\user1 -> \로 구분
- POSIX(맥, 리눅스 등등): C:/Users/user1 -> /로 구분

### path 유의사항
- path.resolve는 절대경로로 인식, path.join은 상대경로로 처리 (절대경로는 루트폴더나 노드 프로세스가 실행되는 위치 기준, 상대경로는 현재 파일 위치가 기준)
- 기본적으로 경로는  \ 하나를 사용해서 표시, 하지만 JS 문자열은 \\로 처리해야함 -> path 모듈은 위와 같은 경우에 발생하는 문제를 알아서 처리

## url
: `인터넷 주소를 쉽게 조작`하도록 도와주는 모듈

url 처리에는 크게 두가지 방식이 있는데, 

1)노드 버전 7에서 추가된 WHATWG 방식의 url과, 2) 기존 방식의 url 이 존재한다.

1) WHATWG 방식 url

- WHATWG에만 있는 username, password, origin, searchParams 속성이 존재함
- WHATWG 방식은 search 부분을 searchParams라는 특수한 객체로 반환하므로 유용합니다. search 부분은 보통 주소를 통해 데이터를 전달할 때 사용됩니다. search는 물음표(?)로 시작하고, 그 뒤에 키=값 형식으로 데이터를 전달합니다. 여러 키가 있을 경우에는 &로 구분합니다.
- `searchParams` :  WHATWG 방식에서 queryString(search) 부분 처리를 도와주는 객체


2) 기존 방식 url

- url.parse(주소): 주소를 분해함. WHATWG 방식과 비교하면 username과 password 대신 `auth 속성`이 있고, searchParams 대신 `query`가 있음.
- url.format(객체): `WHATWG 방식 url과 기존 노드의 url을 모두 사용`할 수 있습니다. `분해되었던 url 객체를 다시 원래 상태로 조립`합니다.


-> query 같은 문자열보다 searchParams가 유용함

## querystring
: WHATWG 방식의 url 대신 `기존 노드의 url`을 사용할 때, `search 부분을 사용하기 쉽게 객체로 만드는` 모듈

- querystring.parse(쿼리): url의 query 부분을 자바스크립트 객체로 분해
- querystring.stringify(객체): 분해된 query 객체를 문자열로 다시 조립

## crypto

: 다양한 방식의 암호화를 도와주는 모듈

1) 단방향 암호화: `Hash 기법`
- createHash(알고리즘): 사용할 해시 알고리즘 넣음
- update(문자열): 변환할 문자열 넣음
- digest(인코딩): 인코딩할 알고리즘 넣음

2) 양방향 암호화
- 대칭형 암호화(같은키로 암호화, 복호화) 추천: AES 암호화
- 비대칭형 암호화 추천: RSA 암호화

### 추천 
- 기본 노드에 있는 crypto 모듈은 사용하기 매우 어려움(암호학 지식이 있어야 함) -> 그부분을 조금이나마 도와주는 `crypto-js` 사용
- `AWS KMS(Key Management Service` 를 이용해 암호화 API 구축하기


## util
: 각종 편의 기능을 모아둔 모듈 (API가 많이 생성되기도 하지만, 그만큼 많이 사라지기도 함)

- util.deprecate: 함수가 deprecated 처리되었음을 알림. 첫 번째 인수로 넣은 함수를 사용했을 때 경고 메시지가 출력, 두 번째 인수로 경고 메시지 내용를 넣음. 
- util.promisify: 콜백 패턴을 프로미스 패턴으로 바꿈. 바꿀 함수를 인수로 제공. 이렇게 바꿔두면 async/await 패턴까지 사용할 수 있음.

## worker_threads

: worker_threads 모듈을 이용하면 멀티 스레드 방식으로 작업할 수 있음

```JS
const { 
  Worker, isMainThread, parentPort,
} = require('worker_threads'); 

if (isMainThread) { // 부모스레드일 때
  const 
  worker = new Worker(__filename); 
  //부모 스레드에서 할일
} else { // 새로 생성한 워커스레드일때
  //워커 스레드에서 할일
}
```
## child_process

: 노드에서 다른 프로그램을 실행하고 싶거나 명령어를 수행하고 싶을 때 사용하는 모듈

-> 다른 언어의 코드(예를 들면, 파이썬)를 실행하고 결괏값을 받을 수 있음.
 이름이 child_process(자식 프로세스)인 이유는 현재 노드 프로세스 외에 새로운 프로세스를 띄워서 명령을 수행하고, 노드 프로세스에 결과를 알려주기 때문.





