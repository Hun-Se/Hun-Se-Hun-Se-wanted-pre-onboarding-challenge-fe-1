import { AuthType } from "../../types/auth";
import { useSignUp } from "../queries/auth_query";

const useSignUpSubmitHandler = () => {
  const { mutate } = useSignUp();

  const onSignUpSubmit = ({ email, password }: AuthType) => {
    mutate({ email, password });
  };
  return { onSignUpSubmit };
};

export default useSignUpSubmitHandler;
