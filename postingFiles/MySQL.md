# MySQL

지금까지는 데이터를 서버 메모리에 저장했다. 서버를 재시작하면 데이터도 사라지기에 별도의 저장 공간이 필요하게 되었다.
## 데이터베이스란?
- 데이터베이스: 관련성을 가지며 중복이 없는 데이터들의 집합
- `DBMS`: 데이터베이스 관리 시스템
- `RDBMS`: 관계형 DBMS (대표적으로 Oracle, MySQL, MSSQL 등등), SQL 로 관리

## 데이터베이스 생성하기 테이블 만들기
- SQL 구문을 작성할 때 세미콜론(;)을 꼭 붙여야 한다
- 예약어는 대문자로 작성하는 것이 좋음 (사용자가 만든 이름과 구분하기 위해서)


- 데이터베이스(스키마) 생성: `CREATE SCHEMA `데이터베이스명`  DEFAULT CHARACTER SET utf8;` (DEFAULT CHARACTER SET utf8을 붙여 한글을 사용)
- 데이터베이스 사용: `use 데이터베이스명;`
- 데이터베이스 안의 테이블 생성: `CREATE TABLE 데이터베이스명.테이블명;` (데이터베이스를 사용하는 상태라면 데이터베이스명 생략 가능)

## CRUD 작업
- `Create` 데이터 생성: `INSERT INTO 테이블(컬럼명들) VALUES (값들)`
- `Read` 데이터 조회
    - 특정 컬럼 추리기: `SELECT 컬럼 FROM 테이블명`
    - `*`: 전체를 의미함
    - `WHERE`문으로 조건식을 써서 특정 조건에 맞는 컬럼을 추리는 것도 가능
- `Update` 데이터 수정: `UPDATE 테이블명 SET 컬럼 = 새값 WHERE 조건`
- `Delete` 데이터 삭제: `DELETE FROM 테이블명 WHERE 조건`
