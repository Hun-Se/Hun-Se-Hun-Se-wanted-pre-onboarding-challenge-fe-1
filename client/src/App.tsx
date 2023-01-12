import { useState } from "react";
import Router from "./utils/router/router";

function App() {
  const [todoModalShown, setTodoModalShown] = useState<boolean>(false);

  const showDtailTodoHandler = () => {
    setTodoModalShown(true);
  };

  const hideDtailTodoHandler = () => {
    setTodoModalShown(false);
  };

  return (
    <>
      <Router />
    </>
  );
}

export default App;
