import TodoItem from "./TodoItem";
import TodoModel from "../../models/todo";

interface TodoListProps {
  items: TodoModel[];
  onRemoveTodo: (todoId: string) => void;
}

const TodoList = (props: TodoListProps) => {
  return (
    <ul>
      {props.items.map((item) => (
        <TodoItem
          key={item.id}
          title={item.title}
          text={item.text}
          onRemoveTodo={props.onRemoveTodo.bind(null, item.id)}
        />
      ))}
    </ul>
  );
};

export default TodoList;
