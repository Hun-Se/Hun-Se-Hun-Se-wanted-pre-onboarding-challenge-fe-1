import React, { useState, useEffect } from "react";
import DtailTodo from "../components/Todo/DtailTodo/DtailTodo";
import NewTodo from "../components/Todo/NewTodo";
import TodoList from "../components/Todo/TodoList";
import TodoModel from "../models/todo";

// interface TodoProps {
//   onModal: boolean;
//   onClose: () => void;
//   onOpen: () => void;
// }

// export interface DtailTodoObject {
//   id: string;
//   title: string;
//   content: string;
// }

const TodoPage = () => {
  const [getTodo, setTodo] = useState<TodoModel[]>([]);
  const [dtailTodo, setDtailTodo] = useState<Object>({
    id: "",
    title: "",
    content: "",
  });

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
  }, [getTodo]);

  const addTodoHanlder = (title: string, content: string, id: string) => {
    const newTodo = new TodoModel(title, content, id);
    setTodo((prevTodos) => {
      return prevTodos.concat(newTodo);
    });
  };

  // 임시
  const onOpen = () => {};

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
          header={requestHeaders}
          onRemoveTodo={removeTodoHandler}
          onOpen={onOpen}
          setDtailTodo={setDtailTodo}
        />
        {/* {props.onModal && (
          <DtailTodo
            dtailTodo={dtailTodo}
            onClose={props.onClose}
            header={requestHeaders}
          />
        )} */}
      </div>
    </>
  );
};

export default TodoPage;
