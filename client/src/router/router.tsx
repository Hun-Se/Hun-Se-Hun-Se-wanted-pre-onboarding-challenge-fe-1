import { BrowserRouter, Routes, Route } from "react-router-dom";
import withAuthValidation from "../hoc/withAuthValidation";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import TodoPage from "../pages/TodoPage";

const Router = () => {
  const AuthHomePage = withAuthValidation(HomePage);
  const AuthTodoPage = withAuthValidation(TodoPage);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthHomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/todo" element={<AuthTodoPage />} />
        <Route path="/todo/:id" element={<AuthTodoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
