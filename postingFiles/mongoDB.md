# 몽고디비 

MySQL 같은 SQL 데이터베이스와는 다른 유형인 NoSQL 데이터베이스인 mongoDB를 알아보도록 하자. 

몽고디비의 JS 문법을 사용하기에, 노드와 같이 하나의 언어만 사용하면 되기 때문에 생산성이 높다.

몽고디비는 흔히 사용하는 RDBMS가 아니라 특색이 뚜렷한 NoSQL이기에 특징을 알고 잘 사용해야 한다.

**[SQL과 NoSQL 특징 비교]**

|SQL|NoSQL|
|---|-----|
| 규칙에 맞는 데이터 입력 | 자유로운 데이터 입력|
| 테이블 간 JOIN 지원 | 컬렉션 간 JOIN 미지원 |
| 안정성, 일관성 | 확장성, 가용성|
| 용어(테이블,로우,컬럼) | 용어(컬렉션, 다큐먼트, 필드) |

=> NoSQL에는 고정된 테이블이 없고 테이블에 상응하는 `컬렉션`이라는 개념이 있다. 컬럼을 따로 정의하지 않고, 해당 컬렉션에 어떠한 데이터든 들어갈 수 있다.

=> 몽고디비에는 JOIN의 기능이 없고 `aggregate` 로 흉내 가능하다. 하나의 쿼리로 여러 테이블을 합치는 작업이 항상 가능하지는 않아 동시에 쿼리를 수행하는 경우에 쿼리가 섞여 예상치 못한 결과를 낼 수 있다는 것이 단점이다. 이러한 단점에도 몽고디비의 확장성과 가용성 때문에, 데이터를 빠르게 넣고 쉽게 여러 서버에 데이터를 분산할 수 있다.

=> 애플리케이션을 만들때 SQL과 NoSQL을 동시에 사용할 수 있고, 각각의 특징에 맞게 빅데이터, 메시징, 세션 관리와 같은 비정형 데이터에는 몽고디비를 사용하는 것이 좋다.

## 몽고디비 설치하기

homebrew를 통해 몽고디비를 설치하고 실행해보자
```BASH
$ brew tap mongodb/brew

$ brew install mongodb-community

$ brew services start mongodb-community
```

** admin 설정은 생략

** 몽고디비는 관리도구로 compass를 제공한다. compass를 사용하면 GUI를 통해 데이터를 시각적으로 관리할 수 있는 편리함이 있다.

## 데이터베이스 및 컬렉션 생성하기

- 데이터베이스 생성 : `use [데이터베이스명]`
```
> use nodejs
switched to db nodejs
```
- 데이터베이스 목록 확인: `show dbs`
- 사용중인 데이터베이스 확인: `db`
- 다큐먼트를 넣는 순간 컬렉션도 자동으로 생성되지만, 컬렉션을 생성하는 명령어가 있음: `db.createCollection('컬렉션이름')
```
> db.createCollection('users')
{ "ok" : 1 }
> db.createCollection('comments')
{ "ok" : 1 }

> show collections
comments
users
```

## CRUD 작업하기

### 1. Create(생성)

컬렉션에 컬럼을 정의하지 않아도 되기에 컬렉션에는 아무 데이터나 넣을 수 있다. 이런 자유로움이 몽고디비의 장점이면서, 무엇이 들어올지 모르는 단점도 있다. 몽고디비는 js 문법을 사용해서 MySQL과 조금 다른 js 자료형을 따르고, 추가로 몇가지 자료형이 있다.

- 다큐먼트 생성: `db.컬렉션명.save(다큐먼트)` -> 다큐먼트 생성은 js 객체처럼 생성함
```
> db.users.save({ name: 'zero', age: 24, married: false, comment: '안녕하세요. 간단히 몽고디비 사용 방법에 대해 알아봅시다.', createdAt: new Date() });

WriteResult({ "nInserted" : 1 }) -> 다큐먼트 한개가 생성되었다는 응답
```

- 관계 설정: 컬렉션 간 관계를 강요하는 제한이 없기 때문에 직접 `ObjectId`를 넣어서 연결한다.

데이터의 ObjectId를 조회한 후 comments 컬렉션에 commenters에 연결한다.
```
> db.users.find({ name: 'zero' }, { _id: 1 })
{ "_id" : ObjectId("5a1687007af03c3700826f70") } -> 연결

> db.comments.save({ commenter: ObjectId('5a1687007af03c3700826f70'), comment: '안녕하세요. zero의 댓글입니다.', createdAt: new Date() });
WriteResult({ "nInserted" : 1 })
```

### 2. Read(조회)

- 컬렉션 내의 모든 다큐먼트 조회: `find({})`
- 하나만 조회: `findOne({})`
```
> db.users.find({});
// users 컬렉션의 모든 다큐먼트가 나옴

> db.comments.find({})
// comments 컬렉션의 모든 다큐먼트가 나옴
```
- 첫번째 인수로 조회 조건을 입력할 수 있다 

`$gt(초과), $gte(이상), $lt(미만), $lte(이하), $ne(같지 않음), $or(또는), $in(배열 요소 중 하나)` 
```
> db.users.find({ age: { $gt: 30 }, married: true }, { _id: 0, name: 1, age: 1 });
{ "name" : "nero", "age" : 32 }
```

- 두번째 인수로 조회할 특정 필드를 선택할 수 있다.(1은 추가, 0은 제외)

(불필요한 필드의 경우 _id를 0으로 지정해놓은것처럼, 특정 값을 제거할 수 있다)

-> users에서 name과 married 필드를 조회해보자.
```
> db.users.find({}, { _id: 0, name: 1, married: 1 });
{ "name" : "zero", "married" : false }
{ "name" : "nero", "married" : true }
```

- sort(정렬), limit(조회할 다큐먼트 개수 제한), skip(건너뛸 다큐먼트 개수) 메서드를 이용해 조회할 수 있다.

### 3. Update(수정)

- 첫번째 인수로 수정 대상을, 두번째 인수로 수정 내용을 제공한다
- `$set`을 붙이지 않으면 다큐먼트 전체가 대체되므로 주의한다
```
> db.users.update({ name: 'nero' }, { $set: { comment: '이 필드를 바꿔보자!' } });
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```
- 수정에 성공했다면 첫 번째 객체에 해당하는 다큐먼트 수(nMatched)와 수정된 다큐먼트 수(nModified)가 나온다

### 4. Delete(삭제)

- 첫번째 인수로 삭제할 다큐먼트에 관한 객체를 제공한다
- 성공 시 삭제된 개수가 반환된다
```
> db.users.remove({ name: 'nero' })
WriteResult({ 'nRemoved': 1 })
```


