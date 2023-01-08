import classes from "./DtailTodoItems.module.css";

interface DtailTodoItemsProps {
  title: string;
  content: string;
  onClose: () => void;
}

const DtailTodoItems = (props: DtailTodoItemsProps) => {
  return (
    <>
      <div className={classes["title-dtailTodo"]}>{props.title}</div>
      <div className={classes["content-dtailTodo"]}>{props.content}</div>
      <div className={classes["container-button"]}>
        <button>수정</button>
        <button onClick={props.onClose}>닫기</button>
      </div>
    </>
  );
};

export default DtailTodoItems;
