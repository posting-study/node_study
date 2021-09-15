# async & await

가장 최근에 나온 비동기 처리 패턴 문법으로, callback 함수와 Promise의 단점을 보완해주는 것이 특징인 async / await 문법을 살펴보도록 하겠다.

## async & await 사용
### 기본 문법
```JS
async function 함수명() {
  await 비동기();
}
```

1. 비동기로 실행할 함수 앞에 `async` 예약어를 붙인다.
2. 함수 내부 로직 중 비동기 처리 코드 앞에 `await` 을 붙인다. 
    이때, 이 비동기 처리 로직은 `Promise 객체` 를 반환한다. (일반적으로 axios와 같은 api 호출 함수이다)

### 예외 처리

Promise 에서 `.catch`를 사용했던 것처럼 `try catch`문을 사용한다.

`catch`로 코드를 실행하다가 발생한 네트워크 오류, 타입 오류 등등과 같은 에러들을 잡아낼 수 있다.

```JS
async function checkId() {
  try {
    var user = await fetchUser();
    if (user.id === "test") {  //id가 test라면 실행 
      var userInfo = await fetchUserInfo();
      console.log(userInfo.name);
    }
  } catch (error) {  // 아닐 경우에 에러 출력
    console.log(error);
  }
}
```



## async & await 특징

새로운 개념이 아닌, 기존의 Promise 코드를 더 쉽게 이용할 수 있게 한다.

여러개의 비동기 처리 코드를 실행한다고 했을 때 Promise chain 코드와 비교해보면, 작성하고 이해하는데 편리한 코드를 짤 수 있도록 도와주는 것을 알 수 있다.

```JS
// 코드 비교

```



