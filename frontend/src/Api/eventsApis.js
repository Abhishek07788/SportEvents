import axios from "axios";

//---------- (post new event) --------
export const postEventsApi = (form) => {
  return axios.post(`https://weak-pink-crocodile-hem.cyclic.app/events`, form);
};

//---------- (get all event) --------
export const getEventsApi = () => {
  return axios.get(`https://weak-pink-crocodile-hem.cyclic.app/events`);
};

//---------- (get by eventId) --------
export const getByEventIdApi = (id) => {
  return axios.get(`https://weak-pink-crocodile-hem.cyclic.app/events/${id}`);
};

//---------- (filter by sport) --------
export const filterBySportApi = (sport_name) => {
  return axios.get(
    `https://weak-pink-crocodile-hem.cyclic.app/events/filter_sport/${sport_name}`
  );
};

//---------- (filter by city) --------
export const filterByCityApi = (city_name) => {
  return axios.get(
    `https://weak-pink-crocodile-hem.cyclic.app/events/filter_city/${city_name}`
  );
};

//---------- ( Search ) --------
export const searchApi = (query) => {
  return axios.get(
    `https://weak-pink-crocodile-hem.cyclic.app/events/search/${query}`
  );
};
