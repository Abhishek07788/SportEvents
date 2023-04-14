import { Box, Grid, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FcSportsMode } from "react-icons/fc";
import { FaCity } from "react-icons/fa";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { AiTwotoneCalendar, AiOutlineFieldTime } from "react-icons/ai";
import {
  BsPersonCircle,
  BsFillCalendar2DateFill,
  BsPeopleFill,
} from "react-icons/bs";
import { useParams } from "react-router-dom";
import { getByEventIdApi } from "../../Api/eventsApis";

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getByEventIdApi(id).then((res) => {
      setEventDetails(res.data);
    });
  }, [id]);

  return (
    <Grid w="100%" bg="#e6defa" color="black" pb="40">
      <Box w="85%" p="4" m="auto" mt="4rem">
        <Heading w="70%" m="auto">
          Sport Name: {eventDetails?.sport_name}
        </Heading>

        <Image
          mt="3"
          w="100%"
          borderRadius={16}
          h={["280px", "280px", "280px", "290px"]}
          boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
          src={eventDetails?.sport_img}
          alt="banner"
        />

        {/*-------- (Overview)----- */}
        <Box
          textAlign="left"
          display="flex"
          alignItems="center"
          borderRadius={16}
          justifyContent="space-between"
          mt="10"
          bg="#333333"
          p="4"
          pl="10"
          color="#ffff"
          fontSize={20}
        >
          <u>Overview</u>
          <Heading
            fontSize={20}
            display="flex"
            alignItems="center"
            textAlign="left"
            gap="3"
            justifyContent="center"
          >
            <AiTwotoneCalendar /> Published On:{" "}
            {eventDetails?.publish_date?.slice(4, 15)}
          </Heading>
        </Box>

        {/*--------- All Info----*/}
        <SimpleGrid columns={[4, 4, 4, 4]}>
          <Text
            fontWeight={"bold"}
            display="flex"
            alignItems="center"
            fontSize={[15, 16, 17, 20]}
            mt="7"
            justifyContent="left"
            ml="5"
            gap="1"
          >
            <BsFillCalendar2DateFill />
            Game Start on:
            <span style={{ color: "#2377fd", marginLeft: "2px" }}>
              {eventDetails?.date}
            </span>
          </Text>
          <Text
            fontWeight={"bold"}
            justifyContent="left"
            display="flex"
            alignItems="center"
            fontSize={[15, 16, 17, 20]}
            mt="7"
            ml="5"
            gap="1"
          >
            <FaCity />
            City:
            <span style={{ color: "#2377fd", marginLeft: "2px" }}>
              {eventDetails?.city}
            </span>
          </Text>
          <Text
            fontWeight={"bold"}
            justifyContent="left"
            display="flex"
            alignItems="center"
            fontSize={[15, 16, 17, 20]}
            mt="7"
            ml="5"
            gap="1"
          >
            <BsPersonCircle />
            Organizer:
            <span
              style={{
                color: "#2377fd",
                marginLeft: "2px",
                marginRight: "5px",
              }}
            >
              {eventDetails?.user?.username}
            </span>
          </Text>
          <Text
            fontWeight={"bold"}
            justifyContent="left"
            display="flex"
            alignItems="center"
            fontSize={[15, 16, 17, 20]}
            mt="7"
            ml="5"
            gap="1"
          >
            <AiOutlineFieldTime />
            At:
            <span style={{ color: "#2377fd", marginLeft: "2px" }}>
              {eventDetails?.time}
            </span>
          </Text>
          <Text
            fontWeight={"bold"}
            justifyContent="left"
            display="flex"
            alignItems="center"
            fontSize={[15, 16, 17, 20]}
            mt="7"
            ml="5"
            gap="1"
          >
            <MdOutlineSportsGymnastics style={{ fontSize: "30px" }} />
            Sport:
            <span style={{ color: "#2377fd", marginLeft: "2px" }}>
              {eventDetails?.sport_name}
            </span>
          </Text>
          <Text
            fontWeight={"bold"}
            justifyContent="left"
            display="flex"
            alignItems="center"
            fontSize={[15, 16, 17, 20]}
            mt="7"
            ml="5"
            gap="1"
          >
            <FcSportsMode style={{ fontSize: "30px", marginLeft: "-10px" }} />
            Players Limit:
            <span style={{ color: "#2377fd", marginLeft: "2px" }}>
              {eventDetails?.number_of_player}
            </span>
          </Text>
          <Text
            fontWeight={"bold"}
            justifyContent="left"
            display="flex"
            alignItems="center"
            fontSize={[15, 16, 17, 20]}
            mt="7"
            ml="5"
            gap="1"
          >
            <BsPeopleFill style={{ fontSize: "30px" }} />
            Active Players:
            <span style={{ color: "#2377fd", marginLeft: "2px" }}>
              {eventDetails?.number_of_player}
            </span>
          </Text>
        </SimpleGrid>
        <Box w="96%" m="auto" mt="10" textAlign="left">
          <Heading fontSize={24}>
            <u>Description:</u>
          </Heading>
          <Text
            whiteSpace="pre-line"
            pl="4"
            lineHeight="28px"
            fontSize={18}
            fontWeight="400"
            mt={10}
            textAlign="left"
          >
            {eventDetails?.description}
          </Text>
        </Box>
      </Box>
    </Grid>
  );
};

export default EventDetails;