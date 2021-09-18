# REPL(Read Eval Print Loop)
: 읽고, 해석하고, 반환하고, 종료때까지 반복 -> 코드 실행

# 노드 내장 객체
- 노드에는 DOM이 존재하지 않음 -> window와 document 객체를 사용할 수 없음
- global 객체: 전역객체
- 객체를 로깅할때는 console.log 보다 console.dir
- console.time / console.timeEnd를 사용해 사이의 시간을 알 수 있음

# 노드의 전역 객체

브라우저에서는 `window`라면, 노드의 전역 객체는 `global`이 있다. 두 곳에서 공통으로 `globalThis`로 접근 가능하다.

```JS
console.log(this); //전역 scope의 this 는 빈 객체이다 -> {} 출력
//this === module.exports === {} === exports
function a(){
    console.log(this===global); //함수안의 this는 global을 가리킨다
}
a(); //true
```

# require

모듈을 실행만 하고, 안의 코드를 사용하지 않는 경우 쓰는 키워드

`require('파일경로')` 를 선언하면 바로 사용

- require이 제일 위에 올 필요 없음
- `require.cache` 에 한번 require한 모듈에 대한 caching 정보가 들어있음
- `require.main`은 노드 실행 시 첫 모듈임
- 두개의 모듈이 서로 require하는 상황인 `순환참조`를 만들지 않도록 조심해야함

# process

노드는 파일시스템 뿐만 아니라 운영체제에도 접근할 수 있다

- `node > process` 에 들어가면 실행중인 노드 프로세스에 대한 정보를 확인할 수 있다
- `process.env` : 시스템 환경 변수들이 들어있는 객체
- `process.nextTick(콜백)`: 이벤트 루프가 다른 콜백 함수들보다 nextTick의 콜백함수를 우선적으로 처리한다
    -> `setImmediate`,`setTimeout`보다 `promise`와 `nextTick`이 먼저 실행된다
- `process.exit()` : 현재의 프로세스를 멈춤
    -> 코드가 없거나 0이면 정상종료, 이외의 코드는 비정상 종료
# os와 path

# url & querystring

# crypto & util

# worker_threads

# child_process


# 버퍼와 스트림   



