import { AuthType } from "../../types/auth";
import { useSignUp } from "../queries/auth_query";

const useSubmitHandler = () => {
  const { mutate } = useSignUp();

  const onSignUpSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    { email, password }: AuthType
  ) => {
    event.preventDefault();
    mutate({ email, password });
  };
  return { onSignUpSubmit };
};

export default useSubmitHandler;
