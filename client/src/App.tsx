import { Suspense, useRef } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from "react-query";
import ErrorBoundary from "./components/Error/ErrorBoundary";
import Router from "./router/router";
import { useApiError } from "./hook/useApiError";
import Error from "./components/Error/Error";

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
            {/* <ReactQueryDevtools /> */}
          </Suspense>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
