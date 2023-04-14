import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import {
  deleteEventsApi,
  filterByCityApi,
  filterBySportApi,
  getEventsApi,
  postEventsApi,
  searchApi,
} from "../Api/eventsApis";
import { getUserApi } from "../Api/userApis";
import { useToast } from "@chakra-ui/react";

function Token() {
  let ApiToken = localStorage.getItem("token") || "";
  if (ApiToken) {
    return jwt_decode(localStorage.getItem("token")) || "";
  }
}

export const AppContext = createContext();
const ContextApi = ({ children }) => {
  const [username, setUsername] = useState();
  const [userId, setUserID] = useState("");
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    let token = Token();
    if (token) {
      setUsername(token.username);
    }
    getEvents();
  }, []);

  useEffect(() => {
    if (username) getOneUser();
  }, [username]);

  //--------- (log in) ----------
  const handleLogin = (token) => {
    navigate("/");
    setUsername(jwt_decode(token).username);
  };

  //--------- (log out) ----------
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUsername("");
    navigate("/register");
  };

  //--------- (get one user) ----------
  const getOneUser = () => {
    setError(false);
    setLoading(true);
    getUserApi(username)
      .then((res) => {
        setError(false);
        setLoading(false);
        setUserID(res.data._id);
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  };

  //--------- (add new event) ----------
  const addNewEvent = (data) => {
    setError(false);
    setLoading(true);
    postEventsApi(data)
      .then((res) => {
        setError(false);
        setLoading(false);
        getEvents();
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  };

  //--------- (get events) ----------
  const getEvents = () => {
    setError(false);
    setLoading(true);
    getEventsApi()
      .then((res) => {
        setEventData(res.data);
        setError(false);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  };

  //--------- (filter by city) ----------
  const filterByCity = (city) => {
    setError(false);
    setLoading(true);
    filterByCityApi(city)
      .then((res) => {
        setEventData(res.data);
        setError(false);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  };

  //--------- (filter by sports) ----------
  const filterBySport = (sport) => {
    setError(false);
    setLoading(true);
    filterBySportApi(sport)
      .then((res) => {
        setEventData(res.data);
        setError(false);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  };

  //--------- (Search) ----------
  const getSearchedEvents = (query) => {
    if (query) {
      setError(false);
      setLoading(true);
      searchApi(query)
        .then((res) => {
          setEventData(res.data);
          setError(false);
          setLoading(false);
        })
        .catch((e) => {
          setError(true);
          setLoading(false);
        });
    } else {
      getEvents();
    }
  };

  //--------- (delete events) ----------
  const deleteEvents = (id) => {
    setError(false);
    setLoading(true);
    deleteEventsApi(id)
      .then((res) => {
        getEvents();
        setError(false);
        setLoading(false);
        // ------------ Alert----------
        toast({
          title: "Event Deleted",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        error,
        userId,
        username,
        eventData,
        handleLogin,
        handleLogOut,
        getEvents,
        addNewEvent,
        deleteEvents,
        filterBySport,
        filterByCity,
        getSearchedEvents,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextApi;
