import axios from "axios";

//---------- (post new request) --------
export const postRequestsApi = (cred) => {
  return axios.post(
    `https://weak-pink-crocodile-hem.cyclic.app/requests`,
    cred
  );
};

//---------- (get all requests) --------
export const getAllRequestsApi = () => {
  return axios.get(`https://weak-pink-crocodile-hem.cyclic.app/requests`);
};

//---------- (get by eventId) --------
export const getByEventIdApi = (id) => {
  return axios.get(
    `https://weak-pink-crocodile-hem.cyclic.app/requests/event${id}`
  );
};

//---------- (delete request) --------
export const deleteRequestsApi = (id) => {
  return axios.delete(
    `https://weak-pink-crocodile-hem.cyclic.app/requests/${id}`
  );
};

//---------- (update request) --------
export const updateRequestsApi = (id, status) => {
  return axios.patch(
    `https://weak-pink-crocodile-hem.cyclic.app/requests/${id}`,
    {
      status: status,
    }
  );
};

//---------- (reject all pending request) --------
export const updateAllRequestsApi = (id) => {
  return axios.patch(
    `https://weak-pink-crocodile-hem.cyclic.app/requests/event_id/${id}`
  );
};
