# 시퀄라이즈 사용하기

## 시퀄라이즈란?
: MySQL 작업을 쉽게 할 수 있도록 도와주는 라이브러리
- 시퀄라이즈는 ORM으로 분류된다. 
- ORM(Object Relational Mapping): 객체와 데이터를 1대1 매핑
- JS 문법으로 데이터베이스 조작 가능(JS 구문을 알아서 SQL로 바꿔줌) 하지만 복잡한 쿼리를 다루기에는 한계가 있다.

## 시퀄라이즈 실행
 
시퀄라이즈를 통해 익스프레스 앱과 MySQL을 연결해보자.

1. 시퀄라이즈에 필요한 sequelize와 sequelize-cli, mysql2 패키지를 설치
```BASH
npm i sequelize sequelize-cli mysql2
```
- sequelize-cli: 시퀄라이즈 명령어를 사용할 수 있게 해주는 패키지
- mysql2: 노드와 mysql을 연결해주는 드라이버

2. sequelize init 명령어를 호출
```BASH
npx sequelize init
```
- config, models, migrations, seeders 폴더가 생성됨
- models 폴더 안에 index.js가 생성되었는지 확인 (안의 코드 수정함)
- index.js에서 mysql, sequelize, node가 연결됨

3. public, routes, views 폴더를 만들고 app.js 파일을 생성한다.

## 시퀄라이즈 모델 생성하기
MySQL에서 정의한 테이블을 시퀄라이즈에서도 정의해야 한다. `MySQL의 테이블`은 `시퀄라이즈 모델`과 대응되는데, 시퀄라이즈는 모델과 MySQL의 테이블을 연결해주는 역할을 한다. 

시퀄라이즈는 기본적으로 모델 이름은 단수형, 테이블 이름은 복수형으로 사용한다.

```JS
module.exports = class 모델이름 extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            //컬럼들을 정의함
        })
    }
}
```
- 시퀄라이즈에서 ID 는 자동적으로 생성됨
- INT 라고 축약해서 적지 못하고, INTEGER라고 적어야 함
- VARCHAR 대신 STRING으로 표현 

> 모델을 생성했다면 각 모델들을 models/index.js와 연결하자.
db라는 객체에 User와 Comment 모델을 담아둔다. 앞으로 db 객체를 require하여 User와 Comment 모델에 접근할 수 있다. User.init과 Comment.init은 각각의 모델의 static.init 메서드를 호출하고, init이 실행되어야 테이블이 모델로 연결된다. 다른 테이블과의 관계를 연결하는 associate 메서드도 미리 실행해둔다.
## 테이블 관계 정의하기

각 테이블 간의 관계를 정의해보자. 
MySQL에서는 JOIN이라는 기능으로 여러 테이블 간의 관계를 파악해 결과를 도출합니다. 시퀄라이즈는 JOIN 기능도 알아서 구현합니다. 대신 테이블 간에 어떠한 관계가 있는지 시퀄라이즈에 알려야 합니다.

## 시퀄라이즈/관계 쿼리 알아보기

## 시퀄라이즈 실습하기
