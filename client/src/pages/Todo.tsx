import { useState, useEffect } from "react";
import NewTodo from "../components/Todo/NewTodo";
import TodoList from "../components/Todo/TodoList";
import TodoModel from "../models/todo";

const Todo = () => {
  const [getTodo, setTodo] = useState<TodoModel[]>([]);

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  requestHeaders.set(
    "Authorization",
    localStorage
      ?.getItem("access-token")
      ?.slice(1, localStorage.getItem("access-token")!.length - 1) || "no token"
  );

  useEffect(() => {
    fetch("http://localhost:8080/todos", {
      method: "Get",
      headers: requestHeaders,
    })
      .then((res) => res.json())
      .then((res) => {
        setTodo(res.data);
      });
  }, []);

  const addTodoHanlder = (title: string, content: string, id: string) => {
    const newTodo = new TodoModel(title, content, id);
    setTodo((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };

  const removeTodoHandler = (todoId: string) => {
    setTodo((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };
  return (
    <>
      <div>
        <NewTodo onAddTodo={addTodoHanlder} header={requestHeaders}></NewTodo>
        <TodoList
          getTodo={getTodo}
          onRemoveTodo={removeTodoHandler}
          header={requestHeaders}
        ></TodoList>
      </div>
    </>
  );
};

export default Todo;
