import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getTodos,
  postCreateTodo,
  deleteTodo,
  putUpdateTodo,
} from "../../api/todos";
import { MUTATION_KEYS, QUERY_KEYS } from "../../constant/queries_constant";

export const useGetTodo = () => {
  const { data } = useQuery(QUERY_KEYS.TODOS, getTodos, {});

  return { data };
};

export const useCreateTodo = () => {
  const QueryClient = useQueryClient();
  const { mutate } = useMutation(postCreateTodo, {
    retry: 0,
    onSuccess: () => {
      QueryClient.invalidateQueries(QUERY_KEYS.TODOS);
    },
    mutationKey: MUTATION_KEYS.CREATE_TODO,
  });

  return { mutate };
};

export const useDeleteTodo = () => {
  const QueryClient = useQueryClient();
  const { mutate } = useMutation(deleteTodo, {
    retry: 0,
    onSuccess: () => {
      QueryClient.invalidateQueries(QUERY_KEYS.TODOS);
    },
    mutationKey: MUTATION_KEYS.DELETE_TODO,
  });

  return { mutate };
};
