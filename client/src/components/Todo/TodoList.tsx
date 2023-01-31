import TodoItem from "./TodoItem";
import { useGetTodo } from "../../hook/queries/todo_query";
import classes from "./TodoList.module.css";
import { TodoType } from "../../types/todos";

const TodoList = () => {
  const { data: todos } = useGetTodo();
  return (
    <ul className={classes["container-todoitem"]}>
      {todos?.data.map((todo: TodoType) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          content={todo.content}
        />
      ))}
    </ul>
  );
};

export default TodoList;
