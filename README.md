## 원티드 프리온보딩 챌린지 프론트엔드 코스 사전과제 Todolist 만들기

<img width="80%" src="https://user-images.githubusercontent.com/70246174/211444993-663c49b2-22cb-4a1e-ba72-a432f1ecee5d.mov"/>

## Stack

Frontend: React, TypeScript

Backend: API 제공받음

## 프로젝트 주요 기능

- 임시로 localStorage에 token을 저장 하는 방식으로 회원가입과 로그인 기능을 사용 할 수 있습니다.(localStorage에 저장하는 것은 보안의 문제가 있음으로 추후에 다른 방법을 시도할 예정입니다.)

- 자주 사용하는 Todo의 타입들을 클래스화하여 model 파일로 컴포넌트화

- Portal를 사용하여 투드리스트의 상세내용을 볼 수 있도록 modal 기능을 추가하였습니다.

- API 비동기 통신 방법으로는 간단한 애플리케이션을 만드는 것이 목표임으로 추가로 라이브러리를 다운 받지 않고 사용 할 수 있는 fetch를 사용했습니다.

- 정규표현식을 사용하여 이메일과 패스워드의 유효성 검증 기능을 만들었습니다. 패스워드는 추가로 영문,숫자, 특수문자를 꼭 포함하도록 만들었습니다.

## Login / SignUp 요구사항 체크리스트

- /auth 경로에 로그인 / 회원가입 기능을 개발합니다
  - 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다
  - [✔️] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
- 이메일과 비밀번호의 유효성을 확인합니다
  - [✔️] 이메일 조건 : 최소 `@`, `.` 포함
  - [✔️] 비밀번호 조건 : 8자 이상 입력
  - [✔️] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
  - [✔️] 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
  - [✔️] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
  - [✔️] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요

## Todo List 요구사항 체크리스트

- Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요
  - [✔️] 목록 / 상세 영역으로 나누어 구현해주세요
  - [✔️] Todo 목록을 볼 수 있습니다.
  - [✔️] Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
  - [ ] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
  - [✔️] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.
  - [✔️] 새로고침을 했을 때 현재 상태가 유지되어야 합니다.
  - [] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.
- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요

  - [ ] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다

## 과제 참고 사항

1. 로컬 서버를 실행했을 때 생성되는 `db/db.json`이 DB 역할을 하게 됩니다. 해당 파일을 삭제하면 DB는 초기화 됩니다.

2. 로그인 / 회원 가입 기능은 유저를 DB에 추가하고 JWT 토큰을 응답으로 돌려줄 뿐, 실제 유저별로 Todo 목록을 관계 지어 관리하지는 않습니다. (모든 유저가 하나의 Todo를 가짐)

3. 로그아웃은 클라이언트 단에서 localStorage에 저장된 token을 삭제하는 방식으로 간단히 구현해주세요.

# 실행방법

Frontend

```bash
> cd client

> npm install

> npm start # http://localhost:3000
```

Backend

```bash
> cd server

> yarn

> yarn start # http://localhost:8080
```

## 리펙토링

1. React Query 사용

- suspense 적용

``` JavaScript
function App() {
const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
    },
  },
});

return (
  <>
    <QueryClientProvider client={client}>
      <Router />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </>
);
}

export default App;
```
