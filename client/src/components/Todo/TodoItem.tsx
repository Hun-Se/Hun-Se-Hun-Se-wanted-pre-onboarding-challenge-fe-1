import React from "react";

interface propsType {
  title: string;
  text: string;
  onRemoveTodo: () => void;
}
const TodoItem = (props: propsType) => {
  const removeHanler = () => {
    props.onRemoveTodo();
  };

  return (
    <>
      <li>{props.title}</li>
      <li>{props.text}</li>
      <button>수정</button>
      <button onClick={removeHanler}>삭제</button>
    </>
  );
};

export default TodoItem;
