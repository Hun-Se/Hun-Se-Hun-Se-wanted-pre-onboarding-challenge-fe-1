import React from "react";
import TodoItem from "./TodoItem";
// import { DtailTodoObject } from "../../pages/TodoPage";
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
          // onRemoveTodo={props.onRemoveTodo.bind(null, item.id)}
          // onOpen={props.onOpen}
          // header={props.header}
          // setDtailTodo={props.setDtailTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
