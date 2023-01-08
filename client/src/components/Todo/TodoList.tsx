import TodoItem from "./TodoItem";
import TodoModel from "../../models/todo";
import classes from "./TodoList.module.css";

interface TodoListProps {
  header: HeadersInit;
  getTodo: TodoModel[];
  onRemoveTodo: (todoId: string) => void;
  onOpen: () => void;
}

const TodoList = (props: TodoListProps) => {
  return (
    <ul className={classes["container-todoitem"]}>
      {props.getTodo.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          onRemoveTodo={props.onRemoveTodo.bind(null, item.id)}
          onOpen={props.onOpen}
          header={props.header}
        />
      ))}
    </ul>
  );
};

export default TodoList;
