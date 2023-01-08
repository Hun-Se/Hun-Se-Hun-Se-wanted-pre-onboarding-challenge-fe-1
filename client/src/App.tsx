import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Todo from "./pages/Todo";
import DtailTodo from "./components/Todo/DtailTodo/DtailTodo";

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/todo"
            element={
              <Todo
                onModal={todoModalShown}
                onClose={hideDtailTodoHandler}
                onOpen={showDtailTodoHandler}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
