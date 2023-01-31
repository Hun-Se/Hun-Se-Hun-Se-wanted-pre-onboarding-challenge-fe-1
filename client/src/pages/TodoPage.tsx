import NewTodo from "../components/Todo/NewTodo";
import TodoList from "../components/Todo/TodoList";

const TodoPage = () => {
  // const requestHeaders: HeadersInit = new Headers();
  // requestHeaders.set("Content-Type", "application/json");
  // requestHeaders.set(
  //   "Authorization",
  //   localStorage
  //     ?.getItem("access-token")
  //     ?.slice(1, localStorage.getItem("access-token")!.length - 1) || "no token"
  // );

  return (
    <>
      <div>
        <NewTodo />
        <TodoList />
      </div>
    </>
  );
};

export default TodoPage;
