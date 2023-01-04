import { useState, useEffect } from "react";
import NewTodo from "../components/Todo/NewTodo";
import TodoList from "../components/Todo/TodoList";
import TodoModel from "../models/todo";

const Todo = () => {
  const [todos, setTodos] = useState<TodoModel[]>([]);

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  requestHeaders.set(
    "Authorization",
    localStorage
      ?.getItem("access-token")
      ?.slice(1, localStorage.getItem("access-token")!.length - 1) || "no token"
  );

  const data = {
    title: todos,
    content: todos,
  };

  useEffect(() => {
    fetch("http://localhost:8080/todos/todos", {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(data),
    });

    return () => {};
  }, []);

  const addTodoHanlder = (todotitle: string, todoText: string) => {
    const newTodo = new TodoModel(todotitle, todoText);

    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };

  const removeTodoHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };
  return (
    <>
      <div>
        <NewTodo onAddTodo={addTodoHanlder} header={requestHeaders}></NewTodo>
        <TodoList items={todos} onRemoveTodo={removeTodoHandler}></TodoList>
      </div>
    </>
  );
};

export default Todo;
