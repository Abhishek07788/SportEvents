import axios from "axios";

//-------- register -----------
export const registerApiCall = (form) => {
  return axios.post(`http://localhost:8080/users/register`, form);
};

//--------- get one user ------
export const getUserApi = (username) => {
  return axios.get(`http://localhost:8080/users/${username}`);
};
