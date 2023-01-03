import TodoItem from "./TodoItem";

const TodoList = () => {
  return (
    <>
      <label htmlFor="todoinput">할일</label>
      <input id="todoinput" type="text" />
      <button>추가</button>
      <TodoItem></TodoItem>
    </>
  );
};

export default TodoList;
