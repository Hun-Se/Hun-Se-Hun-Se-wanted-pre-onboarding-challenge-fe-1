import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API_PATH from "../../constant/api_path_constant";

const useModalHandler = () => {
  const navigate = useNavigate();
  const [todoModalShown, setTodoModalShown] = useState<boolean>(false);

  const showDtailTodoHandler = () => {
    setTodoModalShown(true);
  };

  const hideDtailTodoHandler = () => {
    setTodoModalShown(false);
    navigate(API_PATH.TODOS);
  };

  return { todoModalShown, showDtailTodoHandler, hideDtailTodoHandler };
};

export default useModalHandler;
