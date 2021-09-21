# npm(Node Package Manager)
: 노드의 패키지(노드 모듈 ) 매니저, 개발자들이 여러 기능들을 구현한 오픈소스 코드들을 모아둔 저장소

# package.json
: 현재 프로젝트에 대한 정보와, 사용 중인 패키지에 대한 정보를 담은 파일 -> 각 패키지의 버전을 꼭 작성해두어야 한다
 
- 주의사항) 프로젝트 폴더 이름과 프로젝트 이름이 같으면 안됨
- 노드 프로젝트를 시작할 때 `npm init` 으로 package.json 파일을 만듬 (그냥 파일을 생성해도 됨)
    -> package name, version, description, entry point, author, license(오픈소스면 보통 MIT) 등등 작성
- 스크립트 실행 명령어 `run` (단 start 명령어는 run 생략 가능 -> npm (run) start)

# package-lock.json
: node_modules 에 들어 있는 패키지들의 정확한 버전과 의존 관계가 담김 
-> npm 으로 패키지를 설치/수정/삭제 할 때마다 패키지들 간의 내부 의존 관계를 파일에 저장함