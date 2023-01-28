import { useLogin, useSignUp } from "./queries/auth_query";
import { useCreateTodo } from "./queries/todo_query";
import { AuthType } from "../types/auth";
import { TodoFormType } from "../types/todos";

const useSubmitHandler = () => {
  const { mutate: LoginMutate } = useLogin();
  const { mutate: SignUpMutate } = useSignUp();
  const { mutate: CreateTodoMutate } = useCreateTodo();
  // const { mutate: UpdateTodoMutate } = useUpdateTodo();

  const onLoginSubmit = ({ email, password }: AuthType) => {
    LoginMutate({ email, password });
  };

  const onSignUpSubmit = ({ email, password }: AuthType) => {
    SignUpMutate({ email, password });
  };

  const onCreateTodoSubmit = ({ title, content }: TodoFormType) => {
    CreateTodoMutate({ title, content });
  };

  return { onLoginSubmit, onSignUpSubmit, onCreateTodoSubmit };
};

export default useSubmitHandler;
