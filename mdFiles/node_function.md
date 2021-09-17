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


# process

# os와 path

# url & querystring

# crypto & util

# worker_threads

# child_process


# 버퍼와 스트림   



