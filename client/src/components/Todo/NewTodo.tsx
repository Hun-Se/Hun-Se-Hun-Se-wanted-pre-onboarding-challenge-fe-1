import useNewTodoChangeHandler from "../../hook/todos/useNewTodoChangeHandler";
import useSubmitHandler from "../../hook/useSubmitHandler";
import classes from "./NewTodo.module.css";

const NewTodo = () => {
  const { title, content, titleChangeHandler, contentChangeHandler } =
    useNewTodoChangeHandler();

  const { onCreateTodoSubmit } = useSubmitHandler();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onCreateTodoSubmit({ title, content });
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
