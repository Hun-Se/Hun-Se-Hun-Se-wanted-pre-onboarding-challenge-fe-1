import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Router from "./router/router";

function App() {
  const client = new QueryClient();

  const [todoModalShown, setTodoModalShown] = useState<boolean>(false);

  const showDtailTodoHandler = () => {
    setTodoModalShown(true);
  };

  const hideDtailTodoHandler = () => {
    setTodoModalShown(false);
  };

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
