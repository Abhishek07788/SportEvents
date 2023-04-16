import axios from "axios";

//-------- register -----------
export const registerApiCall = (form) => {
  return axios.post(
    `https://weak-pink-crocodile-hem.cyclic.app/users/register`,
    form
  );
};

//--------- get one user ------
export const getUserApi = (username) => {
  return axios.get(
    `https://weak-pink-crocodile-hem.cyclic.app/users/${username}`
  );
};
