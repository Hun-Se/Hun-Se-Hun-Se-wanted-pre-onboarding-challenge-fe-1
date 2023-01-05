import React from "react";

interface propsType {
  id: string;
  header: HeadersInit;
  title: string;
  content: string;
  onRemoveTodo: () => void;
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

  return (
    <>
      <li>{props.title}</li>
      <li>{props.content}</li>
      <button>수정</button>
      <button onClick={removeHanler}>삭제</button>
    </>
  );
};

export default TodoItem;
