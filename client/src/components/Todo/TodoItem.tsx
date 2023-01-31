import React from "react";
import { useNavigate } from "react-router-dom";
import DtailTodo from "./DtailTodo/DtailTodo";
import API_PATH from "../../constant/api_path_constant";
import { useDeleteTodo } from "../../hook/queries/todo_query";
import useModalHandler from "../../hook/todos/useModalHandler";
import classes from "./TodoItem.module.css";

interface TodoItemProps {
  title: string;
  id: string;
  content: string;
}

const TodoItem = (props: TodoItemProps) => {
  const navigate = useNavigate();
  const { todoModalShown, showDtailTodoHandler, hideDtailTodoHandler } =
    useModalHandler();
  const { mutate: DeleteMutate } = useDeleteTodo();

  const removeHanler = (event: React.FormEvent) => {
    event.preventDefault();
    DeleteMutate(props.id);
  };

  const getDtailTodohandler = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(API_PATH.TODO_BY_ID(props.id));
    showDtailTodoHandler();
  };

  return (
    <>
      {todoModalShown && (
        <DtailTodo
          id={props.id}
          title={props.title}
          content={props.content}
          onHiden={hideDtailTodoHandler}
        />
      )}
      <li className={classes["container-list"]}>
        <div className={classes["list-title"]}>{props.title}</div>
        <div className={classes["list-content"]}>{props.content}</div>
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
