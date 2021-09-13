# 자바스크립트의 비동기 처리

JS 엔진은 동시에 여러가지를 처리할 수 없다. 이에 순서대로 코드를 실행하는 것이 아닌(동기적 실행), 코드의 실행 완료를 기다리지 않고 
다음 코드를 먼저 실행하는(비동기적 실행) 것이 가능하도록 한 JS의 설계들을 살펴보도록 하겠다.

## callback 함수
첫번째로 JS에서 callback 함수로 비동기적 실행이 가능하다. (콜백함수가 꼭 비동기적으로만 쓰이는 것은 아니다)

callback 함수는 다른 함수의 매개변수로 넘겨진 함수를 의미하고, 어떤 이벤트가 발생한 후 이 콜백 함수가 다시 호출되며 실행된다. 함수 안에서 실행되는 함수이기 때문에 보통 익명함수로 작성된다.

```JS
// 간단한 callback 함수 예시

function printNumber(num){ 
    num(); //callback 함수
}

printNumber(()=>console.log("1,2,3")); //익명함수를 넘김
```

이때, callback 함수를 연속해서 사용하면 "callback 지옥"이 탄생한다.

비동기 로직을 모두 callback 처리하면 callback 안에 callback이 연속해서 물리는 현상이 나타나고,
이런 구조는 가독성이 떨어질 뿐만 아니라 에러 발생시 디버깅 대처가 어렵다.

callback 지옥을 해결하기 위해 Promise와 async/await을 이용하는 방법을 알아보자.

-----
## Promise

callback 함수를 이용하던 것과는 다르게 코드를 분리할 수 있는 Promise는 JS 비동기 처리에 이용되는 객체로, 
주로 서버에서 받아온 데이터를 불러올 때 사용한다. 

### Promise 구조
```JS
var Promise: PromiseConstructor
new <any>(executor: (resolve: (value: any) => void, reject: (reason?: any) => void) => void) => Promise<any>
```
new 키워드로 Promise 를 생성하는 순간, 인자로 넘긴 executor 콜백 함수가 실행된다. 이벤트 발생시 작동시켜야 하는 경우에는 사용에 주의해야 한다.

Promise를 작동시킬 때 Producer(정보 제공), Consumer(정보 소비) 역할 구분이 필요하다. Promise에서 실행 성공 반환 값은 then으로 반환하고, 실행 실패 반환 값은 catch로 반환한다. 이에 대한 내용은 Promise의 상태를 이해해야 한다.
### Promise 상태

Promise의 상태는 pending -> fulfilled or rejected 로 진행되는데 각각의 상태를 알아보자.

1) Pending(대기): 비동기 처리 로직이 완료되지 않은 상태

```JS
new Promise(function(resolve, reject) { //resolve, reject : 콜백 함수 인자
  // ...
}); // 프로미스 메서드를 호출하면 대기 상태가 됨
```

2) Fulfilled(이행): 비동기 처리가 완료되어 프로미스가 결과값을 반환해준 상태

-> resolve를 실행하면 이행 상태가 됨. then()을 이용해 처리 결과 값을 받을 수 있다
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

3) Rejected(실패): 비동기 처리가 실패하거나 오류가 발생한 상태

-> reject를 실행하면 실패 상태가 되고, 실패한 이유를 catch()로 받을 수 있다 
    - 실행 중 하나라도 실패하면 catch로 연결
    - error는 then()으로도 처리할 수 있지만, catch()로 처리하는게 더 효율적임

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

4) finally : 실행 성공, 실패에 상관없이 무조건 실행되는 부분이다.

### Promise chain

then과 catch를 연속해서 쓰면서 promise chain을 만들 수 있다! 

다음 코드를 보자

```JS
const getOne = () => 
    new Promise((resolve,reject)=>{ 
        setTimeout(()=> resolve("1"),1000);
});
const getTwo = (num) => 
    new Promise((resolve,reject)=>{ 
        setTimeout(()=> resolve(`${num} => 2`),1000);
        //실패시
        //setTimeout(()=> reject(` error! ${num} => 2`),1000);
});
const getThree = (num) => 
    new Promise((resolve,reject)=>{ 
        setTimeout(()=> resolve(`${num} => 3`),1000);
})

getOne() //실행 성공시 1
    .then(one => getTwo(one)) // 1 => 2
    .catch(console.log) //getTwo error를 잡음: error를 잡고 싶은 지점 주의
    .then(two => getThree(two)) // 1 => 2 => 3
    .then(numbers => console.log(numbers));
/*
넘기는 값과 반환값이 동일할 땐 생략가능함
getOne() //실행 성공시 1
    .then(getTwo) // 1 => 2
    .then(getThree) // 1 => 2 => 3
    .then(console.log);
*/

```
-----

callback 함수와 Promise의 단점을 보완하고, es6로 오면서 추가된 async/await에 대한 이야기는 다음 포스팅에서 진행하도록 하겠다.


** 글을 쓰면서 참고한 글과 영상입니다 **

[인프런 - 노드 교과서 강의](https://www.inflearn.com/course/%EB%85%B8%EB%93%9C-%EA%B5%90%EA%B3%BC%EC%84%9C/dashboard)

[드림코딩- JS 강의](https://www.youtube.com/watch?v=JB_yU6Oe2eE)


