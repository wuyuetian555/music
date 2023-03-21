import { request } from "@/utils/request";

export const register = ({ user, password }) => {
  return request("/users/register", "post", { user, password });
};
export const checkUser = ({ user }) => {
  return request("/users/checkUser", "get", { user });
};
export const checkEmail = ({ email }) => {
  return request("/users/checkEmail", "get", { email });
};
export const sendEmail = ({ email }) => {
  return request("/users/sendEmail", "get", { email });
};
