import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Router from "./router/router";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
