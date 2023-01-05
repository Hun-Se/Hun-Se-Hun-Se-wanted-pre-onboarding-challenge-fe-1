import { useState } from "react";
import classes from "./NewTodo.module.css";

interface NewTodoProps {
  onAddTodo: (title: string, content: string, id: string) => void;
  header: HeadersInit;
}

const NewTodo = (props: NewTodoProps) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [id, setId] = useState<string>("");

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const contentChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setContent(event.target.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = {
        title: title,
        content: content,
      };

      fetch("http://localhost:8080/todos", {
        method: "POST",
        headers: props.header,
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          setId(res.data.id);
          props.onAddTodo(title, content, id);
        });
    } catch (e) {
      console.error(e);
    }

    if (title.trim().length === 0 || title.trim().length === 0) {
      // throw an error
      return;
    }
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor="title">제목</label>
      <input type="text" id="title" onChange={titleChangeHandler}></input>
      <label htmlFor="text">내용</label>
      <input type="text" id="text" onChange={contentChangeHandler}></input>
      <button>추가하기</button>
    </form>
  );
};

export default NewTodo;
