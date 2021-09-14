# async & await

가장 최근에 나온 비동기 처리 패턴 문법으로, callback 함수와 Promise의 단점을 보완해주는 것이 특징인 async / await 문법을 살펴보도록 하겠다.

## async & await 사용

```JS
async function 함수명() {
  await 비동기();
}
```

1. 비동기로 실행할 함수 앞에 `async` 예약어를 붙인다.
2. 함수 내부 로직 중 비동기 처리 코드 앞에 `await` 을 붙인다. 
    이때, 이 비동기 처리 로직은 `Promise 객체` 를 반환한다. (일반적으로 axios와 같은 api 호출 함수이다)



