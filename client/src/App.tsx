import { Suspense } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import Router from "./router/router";

function App() {
  const { reset } = useQueryErrorResetBoundary();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        suspense: true,
      },
    },
  });

  return (
    <>
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <div>
            에러입니다.
            <button onClick={() => resetErrorBoundary()}>다시시도하기</button>
          </div>
        )}
      >
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<p>로딩중...</p>}>
            <Router />
            {/* <ReactQueryDevtools /> */}
          </Suspense>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
