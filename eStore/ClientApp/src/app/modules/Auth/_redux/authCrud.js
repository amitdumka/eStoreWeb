import axios from "axios";
import userTableMock from "../__mocks__/userTableMock";

export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "api/me";

export function login(email, password) {
   return axios.post(LOGIN_URL, { email, password });
  //console.log("fake login seaked");
  //return fakeLogin(email, password);
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}

//Fake Login method

export function fakeLogin(email, password) {
  // const { email, password } = JSON.parse(data);
  const user = userTableMock.find(
    (x) =>
      x.email.toLowerCase() === email.toLowerCase() && x.password === password
  );
  if (user) {
    return [200, { ...user, password: undefined }];
  }
  return [400];
}
