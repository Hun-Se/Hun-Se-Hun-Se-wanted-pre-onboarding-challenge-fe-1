## 원티드 프리온보딩 챌린지 프론트엔드 코스 사전과제 Todolist 만들기

<img width="80%" src="https://user-images.githubusercontent.com/70246174/211444993-663c49b2-22cb-4a1e-ba72-a432f1ecee5d.mov"/>

## Stack

Frontend: React, TypeScript

Backend: API 제공받음

## 프로젝트 주요 기능

- 임시로 localStorage에 token을 저장 하는 방식으로 회원가입과 로그인 기능을 사용 할 수 있습니다.

- Portal를 사용하여 투드리스트의 상세내용을 볼 수 있도록 modal 기능을 추가하였습니다.

- API 통신을 통하여 투드리스트의 CRUD 기능을 구현했습니다.

- 정규표현식을 사용하여 이메일과 패스워드의 유효성 검증 기능을 만들었습니다. 패스워드는 추가로 영문,숫자, 특수문자를 꼭 포함하도록 만들었습니다.

- axios interceptor를 사용하여 api통신에 필요한 header값의 처리를 반복하지 않고 효율적으로 처리했습니다.

- 고차함수를 사용하여 token을 보유하고 있는 사용자만 사용할수있는 컴포넌트를 사용할 수 있도록 token 검사를 수행하는 고차함수 컴포넌트를 만들었습니다.

```JavaScript
// hoc/withAuthValidation
import { ComponentType } from "react";
import useTokenValidation from "../hook/auth/useTokenValidation";

const withAuthValidation = (AuthComponent: ComponentType) => {
  const AuthCheckHandler = () => {
    const { isAuthority } = useTokenValidation();

    if (!isAuthority) {
      window.alert("토큰이 존재하지 않습니다.");
      window.location.href = "/auth/login";
      return <></>;
    }

    return <AuthComponent />;
  };

  return AuthCheckHandler;
};

export default withAuthValidation;

```

- Suspense와 ErrorBoundary를 사용하여 로딩화면/에러피에지 기능을 만들었습니다.

- 관심사에 분리에 따라 View와 Logic을 구분하였습니다.

- constants폴더를 생성하여 반복되어 사용되는 고정값들을 상수화하여 타이핑 하지 않고 불러올 수 있도록 만들었습니다.
  예시)

```JavaScript
// constant/api_path_constant.ts
const API_PATH = {
  LOGIN: "/users/login",
  SIGNUP: "/users/create",
  TODOS: "/todos",
  TODO_BY_ID: (id: string) => `/todos/${id}`,
  CREATE_TODO: "/todos",
  UPDATE_TODO: (id: string) => `/todos/${id}`,
  DELETE_TODO: (id: string) => `/todos/${id}`,
};

export default API_PATH;


```

## Login / SignUp 요구사항 체크리스트

- /auth 경로에 로그인 / 회원가입 기능
- 이메일과 비밀번호의 유효성을 확인 기능
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동

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

2023-02-03

### react-query 사용

- suspense: true 옵션처럼, useErrorBoundary: true 을 사용하면 에러 발생 시 상위 스코프의 에러 바운더리로 에러를 전파할 수 있다.

```JavaScript
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

2. api 비동기통신에 사용

- redux와 달리 thunk, sega같은 미들웨어 라이브러리가 필요없다.
- 짧은코드로 비동기 호출의 로딩, 에러상태를 컨트롤 할 수 있다.
- 클라이언트는 마치 브라우저 캐시처럼 앱 내에 API 호출에 대한 별도의 저장소를 가지고, 해당 데이터들의 호출 정보와 Fetching, Fresh, Stale, Inactive, Deleted 다섯 가지 상태 여부를 체크하는 방식으로 비동기 호출을 관리할 수 있게 된다.
  - `Fetching`: 서버에서 데이터를 가져오는 동안 갖게 되는 상태
  - `Fresh`: 서버/클라이언트 정보가 동일하다는 것이 보장되는 상태, 하지만 서버로부터 가져온 데이터가 최신인지는 대부분의 경우 보장하기 어렵다. 리엑트쿼리에서 active에서 stale 상태로 넘기는 옵션인 staleTiem의 기본값을 0으로 설정하고 있다.
  - `Stale`: 서버/클라이언트 정보가 동일함을 보장 할 수 없는 신선하지 않은 상태, 리엑트쿼리에서는 값을 업데이트 하기 위해 새요청을 보낸다.
  - `Inactive`: 해당 쿼리가 React Quary 가바지 컬렉터에 의해 제거될 예정임을 알린다. 사용되지 않는 쿼리는 inactive된다.
  - `Deleted`: 삭제된 쿼리
- 따라서 React Query는 서버 상태를 관리하는 레이어 전체를 추상화 시켜 개발자가 관리하는 앱 내의 상태에서 서버 상태를 제외한 UI 상태 에만 집중하여 개발할 수 있다.

### Fetch -> Axios로 변경

- Fetch와 axios는 모두 promise 기반의 HTTP 클라이언트이다. 즉 이 클라이언트를 이용해 네트워크 요청을 하면 이행(resolve) 혹은 거부(reject)할 수 있는 promise가 반환된다.

- axios로 바꾸는 이유:

  - then으로 길어지는 코드가 양을 줄일 수 있고 가독성이 높아진다.
  - `axios intercepter` 라이브러리를 사용하여 동일한 content-type , token와 같은 헤더값 처리를 효율적으로 하기 위하여

- 또한 통신을 공통적으로 요청하는 부분과 경로를 컴포넌트화하여 재사용성과 가독성을 높였다.

- 기존 Fetch 사용

```JavaScript
const signUpHandler = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    try {
      const data = {
        email: enteredEmail,
        password: enteredPassword,
      };

      const res = await fetch("http://localhost:8080/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) alert(res.message);
          if (res.details) alert(res.details);
          backLoginHandler(event);
        });
    } catch (e) {
      console.error(e);
    }
  };
```

- Axios 사용

```JavaScript
// api/index.ts
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (!Token.getToken(ACCESS_TOKEN_KEY)) return config;

  config.headers = {
    "Content-type": "application/json",
    Authorization: Token.getToken(ACCESS_TOKEN_KEY),
  };

  return config;
});

// api/postSignUp.ts
export const postSignUp = async (params: AuthType) => {
  const { data } = await api.post(API_PATH.SIGNUP, params);

  return data;
};

```

- axios interceptor의 장점:

  - 배포된 서버에 api를 요청할 때 header에 필수적으로 들어가야하는 부분이 있을 경우, 매번 요청 때마다 header에 값을 입력해줘야 한다. interceptors를 사용해서 api 요청 시 자동으로 해당 값이 들어가서 매 요청 때마다 header에 값을 넣지 않아도 되고, 코드도 간결해지고 복잡성도 줄어든다는 장점이 있었다.

  - api를 호출할 때 access token이 만료돼서 데이터를 받아오지 못하는 에러가 있을 때 이를 대비해아여 미리 새로운 access token을 발급받도록 미리 정의하여 실행되지 못했던 api가 호출될 수 있도록 할 수 있다.

aixos interceptor docs: https://axios-http.com/kr/docs/interceptors

### 관심사의 분리

- 코드의 유지보수성과 가독성을 높이기 위해선 복잡하게 얽혀있는 로직들을 구분하여 분리하는 게 중요하다. 이를 위해 코드를 주제별로 즉 관심사 별로 나누는 것을 관심사의 분리라고 한다.

- 인증 / 인가나 loading 같은 앱 곳곳에서 쓰이게 되는 특징을 가지는것과 같이 단일한 기능이 여러 지점에 걸쳐 나타날 때 이를 횡단 관심사(Cross Cutting Concern) 라고 부른다.

  - 인증(Authentication) : "user가" 맞아? 확인하는 것", 회원가입과 로그인과 같이 사용자가 맞는지를 확인하는 절차
  - 인가(Authorization) : "이걸 사용할 수 있는 권한이 있는거 맞아?를 확인하는 것 ", 유저가 요청하는 reuqest를 실행할 수 있는 권한이 있는 유저인가를 확인하는 절차이다. 예를 들면 해당 유저는 고객 정보를 볼 수 있지만 수정할 수는 없는 경우가 있다.

- 로직과 뷰를 분리하여 커스텀훅으로 컴포넌트를 구성하는 방식을 채택하였고 인증/인가의 횡단관심사를 묶어서 구성하였다.

- 페이지 접속시 토큰인증

```JavaScript
// hoc/withAuthValidation
import { ComponentType } from "react";
import useTokenValidation from "../hook/auth/useTokenValidation";

const withAuthValidation = (AuthComponent: ComponentType) => {
  const AuthCheckHandler = () => {
    const { isAuthority } = useTokenValidation();

    if (!isAuthority) {
      window.alert("토큰이 존재하지 않습니다.");
      window.location.href = "/auth/login";
      return <></>;
    }

    return <AuthComponent />;
  };

  return AuthCheckHandler;
};

export default withAuthValidation;

// router

const Router = () => {
  const AuthHomePage = withAuthValidation(HomePage);
  const AuthTodoPage = withAuthValidation(TodoPage);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthHomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/todos" element={<AuthTodoPage />} />
        <Route path="/todos/:id" element={<AuthTodoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;



```

- 고차함수를 사용하여 토큰이 인증되어야 인수로 받은 인증된 컴포넌트를 출력하고 해당 경로로 이동하도록 하였다.

- customHook을 사용하여 View와 Logic 분리

2023-02-10

### ErrorBoundary와 Suspense

- 에러페이지 이미지
  <img width="428" alt="스크린샷 2023-02-10 오후 9 04 37" src="https://user-images.githubusercontent.com/70246174/218106375-952599d0-a9eb-40e9-a2df-2bfe50063555.png">

- 로딩 중 구현화면
  ![ezgif com-video-to-gif](https://user-images.githubusercontent.com/70246174/218108239-c304a4ba-7b4b-475d-9a33-4d441a5eff43.gif)

- ErrorBoundary를 사용하여 에러페이지 렌더링, Suspense를 사용하여 데이터를 받아올때 대기시간에 로딩 중 페이지 렌더링

```JavaScript
function App() {
  const { reset } = useQueryErrorResetBoundary();
  const { handleError } = useApiError();
  const queryClientRef = useRef<QueryClient>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
          suspense: true,
          onError: handleError,
          useErrorBoundary: true,
        },
      },
    });
  }

  return (
    <>
      <ErrorBoundary onReset={reset} fallback={Error} message="로드 실패">
        <QueryClientProvider client={queryClientRef.current}>
          <Suspense fallback={<p>로딩중...</p>}>
            <Router />
            <ReactQueryDevtools />
          </Suspense>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

```

- ErrorBoundary는 여러 에러 상황에서 동적으로 사용 가능하게 하기위하여 prop을 전달받아 재사용 가능한 컴포넌트로 만들었다.

```JavaScript
import React, { ReactNode } from "react";

export interface Props {
  fallback: React.ElementType;
  message?: string;
  onReset?: () => void;
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  info: Error | null;
}

const initialState: State = {
  hasError: false,
  info: null,
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, info: error };
  }

  onResetErrorBoundary = () => {
    const { onReset } = this.props;
    onReset == null ? void 0 : onReset();
    this.reset();
  };

  reset() {
    this.setState(initialState);
  }

  render() {
    const { hasError, info } = this.state;
    const { children, message} = this.props;

    if (hasError) {
      const props = {
        error: info,
        onResetErrorBoundary: this.onResetErrorBoundary,
      };
      return (
        <this.props.fallback
          isRefresh={isRefresh}
          onRefresh={this.reset}
          onReset={props.onResetErrorBoundary}
          message={message}
        />
      );
    }
    return children;
  }
}

export default ErrorBoundary;

```
