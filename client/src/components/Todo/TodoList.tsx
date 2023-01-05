import TodoItem from "./TodoItem";
import TodoModel from "../../models/todo";

interface TodoListProps {
  header: HeadersInit;
  getTodo: TodoModel[];
  onRemoveTodo: (todoId: string) => void;
}

const TodoList = (props: TodoListProps) => {
  return (
    <ul>
      {props.getTodo.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          onRemoveTodo={props.onRemoveTodo.bind(null, item.id)}
          header={props.header}
        />
      ))}
    </ul>
  );
};

export default TodoList;
