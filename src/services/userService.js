import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/users";

function userUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function register(user) {
  return http.post(apiEndPoint, {
    name: user.name,
    email: user.username,
    password: user.password,
  });
}

export function saveUser(user) {
  // Update USer
  if (user._id) {
    const body = { ...user };
    delete body._id;
    return http.put(userUrl(user._id), body);
  }
}
