import { BrowserRouter, Routes, Route } from "react-router-dom";
import withAuthValidation from "../hoc/withAuthValidation";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import TodoPage from "../pages/TodoPage";
import DtailTodo from "../components/Todo/DtailTodo/DtailTodo";

const Router = () => {
  const AuthHomePage = withAuthValidation(HomePage);
  const AuthTodoPage = withAuthValidation(TodoPage);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthHomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/todo" element={<AuthTodoPage />} />
        <Route path="/todo/:id" element={<AuthTodoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
