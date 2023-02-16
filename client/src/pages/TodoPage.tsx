import Button from "../components/Button/Button";
import NewTodo from "../components/Todo/NewTodo";
import TodoList from "../components/Todo/TodoList";
import ROUTES from "../constant/routes_constant";

const TodoPage = () => {
  const logoutHandler = () => {
    console.log("click");
    if (
      window.confirm(
        "로그아웃 하시면 기존페이지를 떠나 로그인 페이지로 돌아갑니다. 로그인 페이지로 돌아가시겠습니까?"
      )
    ) {
      localStorage.removeItem("access-token");
      window.location.href = ROUTES.LOGIN;
    }
  };

  return (
    <>
      <div>
        <Button name="logout-button" text="로그아웃" onLogOut={logoutHandler} />
        <NewTodo />
        <TodoList />
      </div>
    </>
  );
};

export default TodoPage;
