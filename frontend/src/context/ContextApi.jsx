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
import {
  deleteRequestsApi,
  getAllRequestsApi,
  postRequestsApi,
  updateRequestsApi,
} from "../Api/requestApis";

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
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    let token = Token();
    if (token) {
      setUsername(token.username);
      setUserID(token?.id);
    }
    getEvents();
    getAllRequests();
  }, []);

  useEffect(() => {
    if (username) getOneUser();
  }, [username]);

  //--------- (log in) ----------
  const handleLogin = (token) => {
    navigate("/");
    setUsername(jwt_decode(token).username);
    setUserID(jwt_decode(token)?.id);
    getOneUser();
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

  //-------------- (Invite and requests)-----------
  const sendNewRequests = (eventId) => {
    setError(false);
    setLoading(true);
    postRequestsApi({
      user_id: userId,
      event_id: eventId,
      event: eventId,
      username: username,
      status: "Pending",
    })
      .then((res) => {
        setError(false);
        setLoading(false);
        getAllRequests();
        // ------------ Alert----------
        toast({
          title: res.data.message,
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

  //-------------- (get all requests)-----------
  const getAllRequests = () => {
    setError(false);
    setLoading(true);
    getAllRequestsApi()
      .then((res) => {
        setError(false);
        setLoading(false);
        setRequestData(res.data);
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  };

  //-------------- (Accept or Reject requests)-----------
  const updateRequests = (id, status) => {
    setError(false);
    setLoading(true);
    updateRequestsApi(id, status)
      .then((res) => {
        setError(false);
        setLoading(false);
        getAllRequests();
        getOneUser();
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  };

  //-------------- (Accept or Reject requests)-----------
  const deleteRequests = (id) => {
    setError(false);
    setLoading(true);
    deleteRequestsApi(id)
      .then((res) => {
        setError(false);
        setLoading(false);
        getAllRequests();
        // ------------ Alert----------
        toast({
          title: res.data.message,
          status: "error",
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
        //----- Event ------
        getEvents,
        addNewEvent,
        filterBySport,
        filterByCity,
        getSearchedEvents,
        //---- Invites -----
        requestData,
        sendNewRequests,
        updateRequests,
        deleteRequests,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextApi;
