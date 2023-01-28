import { useState } from "react";

const useNewTodoChangeHandler = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const contentChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  return { title, content, titleChangeHandler, contentChangeHandler };
};

export default useNewTodoChangeHandler;
