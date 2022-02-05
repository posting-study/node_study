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
- models 폴더 안에 index.js가 생성되었는지 확인

