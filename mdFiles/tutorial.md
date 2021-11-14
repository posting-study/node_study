# 노드의 정의
- 크롬 V8 자바스크립트 엔진으로 빌드된 **js 런타임**
- 서버의 역할도 수행할 수 있음


# 노드의 특성
1. 이벤트 기반
    - 이벤트가 발생할 때 미리 지정해둔 작업 수행
2. 논블로킹 I/O
    - 논블로킹( 오래 걸리는 함수를 백그라운드로 보내서 다음 코드가 먼저 실행되게 하고, 나중에 오래 걸리는 함수를 실행)
    - (동기: 코드가 순서대로 - 블로킹), (비동기: 코드 순서대로 x - 논블로킹) ----> 동시성에 대한 것은 나중에 자세히 살펴보자
3. 프로세스 & 스레드
    - 프로세스: 운영체제에서 할당되는 작업 단위 / 스레드: 프로세스 내에서 실행되는 작업 단위
    - 노드 프로세스에서 직접 다룰 수 있는 스레드는 하나라 싱글 스레드라 표현, 멀티 스레드로 존재하기는 함 (v14 부터 멀티 스레드 사용 가능)
    - 노드는 주로 멀티 스레드 대신 멀티 프로세스 활용
4. 싱글 스레드를 효율적으로 다루기
    - 논블로킹 모델을 채택해 일부 코드(I/O)를 다른 프로세스(백그라운드)에서 실행 가능
    -> 요청을 먼저 모두 받고, 완료될 때 응답함
    - 멀티 스레드, 블로킹 모델은 이상적이지만 구현되기에 한계가 존재



# 서버로서의 노드
: 노드는 서버를 구성할 수 있게 하는 모듈

(장점)
- I/O 작업이 많은 서버로 적합
- 웹 서버가 내장되어 있음
- js 사용
- JSON 형식과 호환 쉬움

-----

# 알아두어야 할 JS

## 1. setTimeOut
ex) 대기시간이 0인 setTimeout -> 바로 실행 되는 것 아님

: 호출 스택에서 백그라운드로 이동함


## 2. Promise

: promise 란 js 비동기 처리에 사용되는 객체(=내용이 실행되었지만, 결과를 아직 반환하지 않은 객체), 타이머보다 우선순위가 높음

: 콜백과 다르게 코드를 분리할 수 있다는 것이 장점, 콜백 헬에서 나올 수 있음

- then을 붙이면 결과를 반환함
- 실행이 완료되지 않았으면 완료된 후에 then 내부 함수가 실행됨

<프로미스 상태>
- Pending(대기): 비동기 처리 로직이 완료되지 않은 상태
- Fulfilled(이행): 비동기 처리가 완료되어 프로미스가 결과값을 반환해준 상태
    - resolve(성공리턴값) -> then 으로 연결
- Rejected(실패): 비동기 처리가 실패하거나 오류가 발생한 상태
    - reject(실패리턴값) -> catch로 연결(하나라도 실패하면)
    - Promise.allSettled로 실패한 것만 배열로 추려낼 수 있음
- Finally 부분은 무조건 실행됨

### Pending
```JS
new Promise(function(resolve, reject) { //resolve, reject : 콜백 함수 인자
  // ...
}); // 프로미스 메서드를 호출하면 대기 상태가 됨

```

### Fulfilled

: resolve를 실행하면 이행 상태가 됨. then()을 이용해 처리 결과 값을 받을 수 있음
```JS
function getData() {
  return new Promise(function(resolve, reject) {
    var data = 100;
    resolve(data);
  });
}

// resolve()의 결과 값 data를 resolvedData로 받음
getData().then(function(resolvedData) {
  console.log(resolvedData); // 100
});
```
### Rejected

: reject를 실행하면 실패 상태가 되고, 실패한 이유를 catch()로 받을 수 있음

-> error는 then()으로도 처리할 수 있지만, catch()로 처리하는게 더 효율적임
```JS
function getData() {
  return new Promise(function(resolve, reject) {
    reject(new Error("Request is failed"));
  });
}

// reject()의 결과 값 Error를 err에 받음
getData().then().catch(function(err) {
  console.log(err); // Error: Request is failed
});
```

## 3. async, await

: async, await을 사용하면 프로미스 코드를 더 줄일 수 있음

- 변수 = await Promise; : Promise가 resolve 된 값이 변수에 저장
- 변수 await 값; : 그 값이 변수에 저장

## 4. 화살표 함수
1) 객체를 리턴할 때 유의할 것 

```JS
const obj = function(x,y){
    return {x:x,y:y};
}

const obj = function(x,y){ //위와 동일
    return {x,y};
}

const obj = (x,y) => ({x,y}); //위와 동일
// 중괄호를 그냥 작성하게 되면, 객체 리터럴인지 함수 body를 의미하는 것인지 알수 없어서, 객체를 반환할때 소괄호를 함께 씀
```

2) function을 완벽하게 대체하긴 어려움
    - function에서는 각 본인의 this를 갖지만, 화살표 함수에서는 부모에서 this를 물려받음
    - 대표적인 예제 : 태그 클릭 (function&this or 화살표 함수&인자)
```JS
button.addEventListener("click", function(){
    console.log(this.textContent);
});

button.addEventListener("click", (e) => {
    console.log(e.target.textContent);
});

```

## 5. 업데이트된 객체 문법
```JS

const newObject = {
    let es = 1;

    sayJs(){
        console.log("js"); //function 필요x
    },
    sayNode, //sayNode: sayNode -> key와 value가 동일하면 하나만 작성 가능
    [es+6]: "hi" //[변수+값]과 같은 동적 속성명을 객체 속성명으로 사용가능
};
```

## 6. 구조분해(비구조화) 할당
 : this 사용시는 구조분해 할당x
```JS
const example = {a: 123, b:{c:135, d: 12}};

const {a,b:{d}} = example; // 구조분해 할당
console.log(a); //123
console.log(d); //12
```

## 7. ES 모듈 import/export

1. `Named Exports` -> 원하는 만큼의 많은 수의 코드를 import/export 시킬 수 있음

주의) export 한 함수의 이름과 import한 함수의 이름이 반드시 같아야 함. as 키워드를 이용해 변경 가능

```JS
//export file
export const plus = (a,b) => a+b;
export const minus = (a,b) => a-b;

///import file
import {plus} from "파일 경로"; //함수의 이름이 반드시 같아야 함
//import {plus as add}from "파일 경로"; -> as 키워드를 이용해 변경 가능
```

2. `Default Exports` -> 각 파일마다 단 한개의 defualt export 만 존재 가능.

모듈의 모든 함수(코드)를 export 하고, 모든 함수(코드)를 import함. (원하는 이름으로 import 가능)

```JS
//export file
const plus = (a,b) => a+b;
const minus = (a,b) => a-b;
export default {plus, minus}; // 갯수는 원하는 대로

//import file
import math from "파일 경로";  //default로 위의 모든 함수를 import 함
```

위의 Named Exports, Default Exports를 섞을 수도 있음
```JS
//export file
const plus = (a,b) => a+b;
const minus = (a,b) => a-b;
export const multiple = (a,b) => a*b;
export default {plus,minus}; // 갯수는 원하는 대로

//import file
import math,{multiple} from "파일 경로"; 
// math: default, {multiple}: named
```
3. `*`(all) 이용 import

default export가 없는 파일에서, 모든 exported 된 내용을 import 하고 싶을 때 사용
```JS
//export file
const plus = (a,b) => a+b;
const minus = (a,b) => a-b;
const multiple = (a,b) => a*b;

//import file
import * from "파일 경로";
```

### 결론
- 필요한 것만 import함
- Named Export로 함수를 정의하는 연습을 하는 것이 도움됨
- `Dynamic import`를 사용하면, 실제로 유저가 사용할 모듈만 import함. (모두 설치하고 실행하는 것이 아니라 로딩 속도 줄어들음) -> 이벤트 작동시 실행할 함수 안에 `import` 함수 실행
