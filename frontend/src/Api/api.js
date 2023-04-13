import axios from "axios";

export const registerApiCall = (form) => {
  return axios.post(`http://localhost:8080/users/register`, form);
};
