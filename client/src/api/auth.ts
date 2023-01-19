import api from "./index";
import { AuthType } from "../types/auth";
import API_PATH from "../constant/api_path_constant";

export const postLogin = async (params: AuthType) => {
  const { data } = await api.post(API_PATH.LOGIN, params);

  return data;
};

export const postSignUp = async (params: AuthType) => {
  const { data } = await api.post(API_PATH.SIGNUP, params);

  return data;
};
