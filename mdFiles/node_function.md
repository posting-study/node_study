# REPL(Read Eval Print Loop)
: 읽고, 해석하고, 반환하고, 종료때까지 반복 -> 코드 실행

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

폴더와 파일의 경로를 쉽게 조작할 수 있도록 도와주는 모듈 -> 운영체제 별로 경로 구분자가 다르다!

- Window : C:\Users\user1 -> \로 구분
- POSIX(맥, 리눅스 등등): C:/Users/user1 -> /로 구분

### path 유의사항
- path.resolve는 절대경로로 인식, path.join은 상대경로로 처리 (절대경로는 루트폴더나 노드 프로세스가 실행되는 위치 기준, 상대경로는 현재 파일 위치가 기준)
- 기본적으로 경로는  \ 하나를 사용해서 표시, 하지만 JS 문자열은 \\로 처리해야함 -> path 모듈은 위와 같은 경우에 발생하는 문제를 알아서 처리

## url & querystring

# crypto & util

# worker_threads

# child_process


# 버퍼와 스트림   



