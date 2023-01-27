import { useNavigate } from "react-router-dom";
import ROUTES from "../constant/routes_constant";

const useNavigatePageHanlder = () => {
  const navigate = useNavigate();

  const navigateLoginHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate(ROUTES.LOGIN);
  };

  const navigateSignUpHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate(ROUTES.SIGNUP);
  };

  return { navigateLoginHandler, navigateSignUpHandler };
};

export default useNavigatePageHanlder;
