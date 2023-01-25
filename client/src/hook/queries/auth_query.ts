import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { postLogin, postSignUp } from "../../api/auth";
import { QUERY_KEYS, MUTATION_KEYS } from "../../constant/queries_constant";
import { ACCESS_TOKEN_KEY } from "../../constant/token_constant";
import ROUTES from "../../constant/routes_constant";
import Token from "../../lib/token/token_class";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation(postLogin, {
    retry: 0,
    onSuccess: ({ token }) => {
      Token.setToken(ACCESS_TOKEN_KEY, token);
      navigate(ROUTES.TODOS);
      queryClient.invalidateQueries(QUERY_KEYS.TODOS);
    },
    mutationKey: MUTATION_KEYS.LOGIN,
  });

  return { mutate };
};

export const useSignUp = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation(postSignUp, {
    retry: 0,
    onSuccess: () => {
      navigate(ROUTES.HOME);
    },
    mutationKey: MUTATION_KEYS.SIGNUP,
  });

  return { mutate };
};
