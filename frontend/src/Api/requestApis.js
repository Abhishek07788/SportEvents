import axios from "axios";

//---------- (post new request) --------
export const postRequestsApi = (cred) => {
  return axios.post(`http://localhost:8080/requests`, cred);
};

//---------- (get all requests) --------
export const getAllRequestsApi = () => {
  return axios.get(`http://localhost:8080/requests`);
};

//---------- (get by eventId) --------
export const getByEventIdApi = (id) => {
  return axios.get(`http://localhost:8080/requests/event${id}`);
};

//---------- (delete request) --------
export const deleteRequestsApi = (id) => {
  return axios.delete(`http://localhost:8080/requests/${id}`);
};

//---------- (update request) --------
export const updateRequestsApi = (id, status) => {
  return axios.patch(`http://localhost:8080/requests/${id}`, {
    status: status,
  });
};
