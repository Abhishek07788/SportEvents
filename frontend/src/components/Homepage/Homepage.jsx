import { Box, Button, Heading, Input, Select, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import ModalForAdd from "./Modal";
import { AppContext } from "../../context/ContextApi";
import { Link } from "react-router-dom";

const Homepage = () => {
  const {
    userId,
    eventData,
    deleteEvents,
    filterBySport,
    filterByCity,
    getSearchedEvents,
    error,
  } = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  let list = {
    city: [
      "Agra",
      "Ahmadabad",
      "Bangalore",
      "Chennai",
      "Delhi",
      "Hyderabad",
      "Mumbai",
      "Noida",
      "Pune",
    ],
    sport: [
      "Cricket",
      "Kabaddi",
      "Hockey",
      "Badminton",
      "Football",
      "Wrestling",
      "Tennis",
      "Basketball",
      "Boxing",
      "Motorsports",
    ],
  };

  return (
    <div>
      {/* ---------Create Event ----- */}
      <Box
        display="flex"
        m="auto"
        mt="20"
        alignItems="center"
        w={["85%", "85%", "65%", "65%"]}
        justifyContent="space-between"
        bg="#121212"
        borderRadius={10}
        p="4"
      >
        <Heading fontSize={32} color="#ffffff">
          Create a Sport Event
        </Heading>
        <Button
          onClick={() => setIsModalVisible(!isModalVisible)}
          colorScheme={"teal"}
        >
          Create
        </Button>
      </Box>

      {/*---------- Search and filter --------- */}
      <Box
        display="flex"
        m="auto"
        w={["85%", "85%", "65%", "65%"]}
        justifyContent="space-between"
        alignItems="center"
        gap={20}
      >
        <Select
          bg="#121212"
          h="8"
          onChange={(e) => filterBySport(e.target.value)}
        >
          <option style={{ color: "red" }} value="search">
            Filter by Sport
          </option>
          {list.sport.map((el, i) => (
            <option style={{ color: "black" }} key={i} value={el}>
              {el}
            </option>
          ))}
        </Select>
        <Select
          bg="#121212"
          h="8"
          onChange={(e) => filterByCity(e.target.value)}
        >
          <option style={{ color: "red" }} value="search">
            Filter by City
          </option>
          {list.city.map((el, i) => (
            <option style={{ color: "black" }} key={i} value={el}>
              {el}
            </option>
          ))}
        </Select>
        <Input
          onInput={(e) => getSearchedEvents(e.target.value)}
          bg="#121212"
          h="8"
          type="Search"
          placeholder="Search.."
        />
      </Box>

      {/* ----------- (Error message) ------- */}
      {error ? (
        <Button mt="1" color="red" onClick={() => window.location.reload()}>
          Server Error please refresh the page..
        </Button>
      ) : (
        ""
      )}

      {/* ---------- Events -------- */}
      {eventData.length == 0 ? (
        <Heading
          fontSize={[20, 20, 40, 40]}
          textAlign="center"
          color="#989898"
          mt="10"
        >
          No Event Found!!
        </Heading>
      ) : (
        ""
      )}
      {eventData &&
        eventData.map((el) => (
          <Box
            key={el._id}
            display="flex"
            m="auto"
            mt="5"
            alignItems="center"
            w={["80%", "80%", "60%", "60%"]}
            justifyContent="space-between"
            bg="#181c47"
            borderRadius={10}
            p="5"
          >
            <Box textAlign="left">
              <Heading fontSize={18} color="#ffffff">
                {el.sport_name}
              </Heading>

              <Text color="#ffffff" fontSize={14} mt="2">
                {el.description}
              </Text>
            </Box>
            <Box textAlign="right">
              <Text fontSize={15} textAlign="right" mb="1">
                Publish on: <u>{el.publish_date.slice(4, 21)}</u>
              </Text>
              <Link to={`/event_details/${el._id}`}>
                <Button fontSize={13} ml="2" colorScheme={"teal"}>
                  View Sport
                </Button>
              </Link>
              {el.user_id == userId ? (
                <Button
                  fontSize={13}
                  ml="2"
                  onClick={() => deleteEvents(el._id)}
                  colorScheme={"#dc143c"}
                  bg={"#dc143c"}
                >
                  Delete Sport
                </Button>
              ) : (
                ""
              )}
            </Box>
          </Box>
        ))}

      {/* ----------------- (Modal) ---------- */}
      <ModalForAdd isOpen={isModalVisible} setIsOpen={setIsModalVisible} />
    </div>
  );
};

export default Homepage;
