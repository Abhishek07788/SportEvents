import axios from "axios";

//---------- (post new event) --------
export const postEventsApi = (form) => {
  return axios.post(`http://localhost:8080/events`, form);
};

//---------- (get all event) --------
export const getEventsApi = () => {
  return axios.get(`http://localhost:8080/events`);
};

//---------- (get by eventId) --------
export const getByEventIdApi = (id) => {
  return axios.get(`http://localhost:8080/events/${id}`);
};

//---------- (filter by sport) --------
export const filterBySportApi = (sport_name) => {
  return axios.get(`http://localhost:8080/events/filter_sport/${sport_name}`);
};

//---------- (filter by city) --------
export const filterByCityApi = (city_name) => {
  return axios.get(`http://localhost:8080/events/filter_city/${city_name}`);
};

//---------- ( Search ) --------
export const searchApi = (query) => {
  return axios.get(`http://localhost:8080/events/search/${query}`);
};

