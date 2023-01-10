import React, { useState } from "react";
import TodoModel from "../../models/todo";
import { DtailTodoObject } from "../../pages/Todo";

import classes from "./TodoItem.module.css";

interface propsType {
  id: string;
  header: HeadersInit;
  title: string;
  content: string;
  onRemoveTodo: () => void;
  onOpen: () => void;
  setDtailTodo: React.Dispatch<React.SetStateAction<DtailTodoObject>>;
}
const TodoItem = (props: propsType) => {
  const removeHanler = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      fetch(`http://localhost:8080/todos/${props.id}`, {
        method: "DELETE",
        headers: props.header,
        body: JSON.stringify({ data: null }),
      }).then((res) => res.json());
    } catch (e) {
      console.error(e);
    }
    props.onRemoveTodo();
  };

  const getDtailTodohandler = (event: React.MouseEvent) => {
    event.preventDefault();

    fetch(`http://localhost:8080/todos/${props.id}`, {
      method: "Get",
      headers: props.header,
    })
      .then((res) => res.json())
      .then((res) => {
        props.setDtailTodo(res.data);
      });
    props.onOpen();
  };

  return (
    <>
      <li className={classes["container-list"]}>
        <div>{props.title}</div>
        <div>{props.content}</div>
        <div className={classes["container-todo-button"]}>
          <button
            className={classes["button-dtail"]}
            onClick={getDtailTodohandler}
          ></button>
          <button
            className={classes["button-remove"]}
            onClick={removeHanler}
          ></button>
        </div>
      </li>
    </>
  );
};

export default TodoItem;
