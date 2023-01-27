import { AuthType } from "../../types/auth";
import { useLogin } from "../queries/auth_query";

const useLoginSubmitHandler = () => {
  const { mutate } = useLogin();

  const onLoginSubmit = ({ email, password }: AuthType) => {
    mutate({ email, password });
  };

  return { onLoginSubmit };
};

export default useLoginSubmitHandler;
