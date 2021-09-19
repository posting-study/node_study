# 파일 시스템 접근하기

노드에서 `fs모듈`을 사용하면 파일 시스템에 접근할 수 있다.

즉, 메서드들을 이용해 파일과 폴더의 생성, 삭제, 읽고 쓰는 것을 가능하게 하는 것이다.

fs 모듈을 사용하는 순서는 다음과 같다.

- fs 모듈을 불러온다
- 파일 경로를 지정한다(node를 실행하는 콘솔 기준으로)
- `readFile` 메서드의 결과물은 `버퍼`이므로 텍스트로 읽어오고 싶으면 toString()을 이용해야 한다.

코드로 확인해보도록 하자!

```JS
const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => { //노드 모듈에서 콜백 함수 인자가 대부분 에러, 데이터 순이다
  if (err) {
    throw err;
  }
  console.log(data); //<Buffer ec a0 80 eb a5 bc 20 ec 9d bd ec 96 b4 ec a3 bc ec 84 b8 ec 9a 94 2e>
  console.log(data.toString()); //readme.txt에 있는 텍스트가 출력
});
```
data를 그대로 출력하면, 사람이 읽을 수 없는 버퍼 형식으로 출력이 된다. 버퍼에 관한 내용은 이어서 자세하게 살펴보도록 하겠다.

fs 모듈은 기본적으로 콜백 형식의 모듈이어서, 대부분 위와 같이 사용하는 것이 아니라, `promise` 속성을 불러와 promise 기반 fs 모듈을 주로 사용한다.

위의 동일한 코드를 다음과 같이 promise를 이용해서 작성해보았다.

```JS
const fs = require('fs').promises; //promises 속성을 불러옴

fs.readFile('./readme.txt', (err, data) => { 
  .then((data)=>{
      console.log(data);
    console.log(data.toString());
  })
  .catch((err)=>{
      throw err
  })
});
```

### 동기/비동기, 블로킹/논블로킹 개념

fs 모듈 메서드 작동 방식을 더 잘 이해하기 위해, 해당 개념을 알아야 하기에, 간단하게 정리해보았다.

노드에서는 동기-블로킹 방식과 비동기-논블로킹 방식이 대부분이다.

- 동기/비동기 : 백그라운드 작업 완료 확인 여부
- 블로킹/논블로킹 : 함수가 바로 return 되는지의 여부

-> 동기-블로킹 : 백그라운드 작업 완료 여부를 계속 확인하며, 호출한 함수가 바로 return되지 않고 백그라운드 작업이 끝나야 return됨
-> 비동기-논블로킹 : 호출한 함수가 바로 return되어 다음 작업으로 넘어가며, 백그라운드 작업 완료 여부는 신경 쓰지 않고 나중에 백그라운드가 알림을 줄 때 비로소 처리

## fs 모듈 동기/비동기 메서드

앞에서 살펴본 파일을 읽는 `readFile` 메서드는 비동기 메서드이다. 즉, 여러개의 파일을 읽는 작업을 할때 어떤 순서대로 작업이 끝날지 모르는 것이다. 

```JS
const fs = require('fs');
//readme.text 내용: "안녕하세요"
console.log('시작');
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('1번', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('2번', data.toString());
});
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('3번', data.toString());
});
console.log('끝');

/*
시작
끝  --> 이후 몇번이 먼저 나올지 예상 x 실행마다 바뀐다.
2번 "안녕하세요"
1번 "안녕하세요"
3번 "안녕하세요"
*/
```
파일 읽기 비동기 처리는 간단하게 다음과 같이 처리된다.

1. 비동기 메서드가 백그라운드에 해당 파일을 읽으라고 요청한 후 다음 코드로 넘어간다
2. 읽기가 완료되면 백그라운드가 메인 스레드에 작업이 완료되었다고 알린다
3. 메인 스레드는 등록된 해당 콜백 함수를 실행한다

이러한 방식으로 처리되기 때문에, 여러개의 I/O 요청이 들어와도 백그라운드는 그 요청들을 거의 동시에 처리하는 모습을 보인다. 
(백그라운드에서의 작업은 스레드풀을 다루며 더 자세하게 알아보도록 하겠다)

fs 모듈의 메서드는 대부분 비동기지만, 동기적으로 처리할 수 없는 것은 아니다. 
동기 메서드는 이름 뒤에 `Sync`가 붙어 있는데,
앞서 살펴본 메서드에 Sync가 붙은 `readFileSync` 메서드를 사용하면 동기적인(순서대로) 작업 처리가 가능하지만, 백그라운드가 작업하는 동안 메인 스레드가 대기만 하고 있기 때문에 비효율적이다.

그렇기에 동기 메서드를 사용해야하는 경우는 드물고, 프로그램을 처음 실행 할때 초기화 하는 용도로만 사용하는 것을 권장한다.

비동기 방식이지만 동기적 처리처럼 실행 순서를 유지하고 싶다면, 연속적으로 콜백을 이용하면 된다.

콜백 지옥은 Promise나 async/await으로 해결할 수 있다.

```JS
const fs = require('fs').promises;
//readme.text 내용: "안녕하세요"

//async,await으로 콜백 지옥 정리
async function main(){
    console.log('시작');
    let data = await fs.readFile('./readme.txt')
    console.log('1번', data.toString());
    data = await fs.readFile('./readme.txt')
    console.log('2번', data.toString());
    data = await fs.readFile('./readme.txt')
    console.log('3번', data.toString());
    console.log('끝');
}
main();
/*
시작
1번 "안녕하세요"
2번 "안녕하세요"
3번 "안녕하세요"
끝
*/
```

----

## 버퍼와 스트림

앞서 말했듯이, 데이터를 읽을 때 data가 아닌 `data.toString()` 을 콘솔에 찍어야 확인할 수 있다.

`버퍼`는 일정한 크기로 모아두는 데이터고, `스트림`은 버퍼의 크기를 작게 만들어 데이터를 전달하는 흐름을 의미한다.

이때 버퍼를 스트림의 일부로 인지하는 것보다, 데이터를 주고받는 방식을 버퍼 방식 / 스트림 방식으로 비교해보려 한다.

`버퍼 방식`이라 하면, 파일 전체가 곧 버퍼 한 조각으로 전체를 주고 받는 것이고, `스트림 방식`은 파일 전체를 여러 버퍼 조각으로 나누어 데이터를 우리가 흔히 이해하는 스트리밍 방식으로 주고 받는 것이다.

보통의 요청/응답 작업에 대부분 스트림 방식을 사용하고 있는데, 스트림 방식이 서버의 메모리를 적게 차지하기에 효율적으로 작업할 수 있기 때문이다.

스트림끼리 연결시키는 `piping` 작업을 할 수 있는데, 다음 코드와 같이 `createReadStream`으로 읽은 파일을 전달해 `createWriteStream`으로 파일을 쓸 수 있다.

```JS
const fs = require('fs');

const readStream = fs.createReadStream('readme.txt');
const writeStream = fs.createWriteStream('writeme.txt');
readStream.pipe(writeStream);
```

----

## 스레드풀

앞에서 비동기 처리 작업을 알아볼 때, fs 메서드를 여러번 실행해도 백그라운드는 그 요청들을 거의 동시에 처리하는 모습을 보였다.

이것이 가능하게 하는 백그라운드에서의 동작을 스레드풀을 통해 이해하려 한다.

백그라운드에 요청해야하는 작업들이 들어온다면, 스레드풀이 그 작업들을 나눠서 동시에 처리한다. 

실행이 처리되는 순서는 알 수 없지만, **존재하는 스레드풀의 개수만큼 작업을 동시에 처리**한다는 점은 알 수 있다.

이때, 스레드풀을 직접적으로 컨트롤 할 수는 없지만, 스레드풀의 개수는 조절할 수 있다.

윈도우라면 `SET UV_THREADPOOL_SIZE = 숫자`, 맥과 리눅스라면 `UV_THREADPOOL_SIZE = 숫자`를 입력하면 작성한 개수만큼의 스레드풀로 작업을 진행한다.





** 해당 포스팅은 Node.js 교과서 책과 강의를 공부하고 참고해서 작성한 글입니다
