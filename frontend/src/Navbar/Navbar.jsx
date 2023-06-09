import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./navbar.module.css";
import logo from "../Images/logo.png";
import {
  Box,
  Button,
  Image,
  Progress,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AppContext } from "../context/ContextApi";

const Navbar = () => {
  const { username, handleLogOut, loading } = useContext(AppContext);
  const toast = useToast();

  const handleLogout = () => {
    handleLogOut();
    // ------------ Alert----------
    toast({
      title: "Log out successfully!!",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <>
      <Box
        className={style.maindiv}
        pl={["2", "2", "10", "10"]}
        pr={["2", "2", "10", "10"]}
      >
        <Link to="/">
          <Image
            w={["60px", "60px", "90px", "100px"]}
            h={["30px", "30px", "50px", "50px"]}
            src={logo}
            alt="SportEvents"
          />
        </Link>
        <SimpleGrid
          className={style.options}
          columns={4}
          gap={10}
          display={["none", "none", "flex", "flex"]}
        >
          <Link to="/">
            <Button>Events</Button>
          </Link>

          {/* ---------- (Conditional rendering) ------------*/}
          {username ? (
            <>
              <Button>Hi: {username}</Button>
              <Button onClick={handleLogout}>Log out</Button>
            </>
          ) : (
            <>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </SimpleGrid>

        <Box gap={3} display={["flex", "flex", "none", "none"]}>
          {/* ---------- (Conditional rendering) ------------*/}
          {username ? (
            <>
              <Link to="/">
                <Text color="blue" fontWeight={700}>
                  <u>Events</u>
                </Text>
              </Link>
              <Text fontWeight={700}>
                Hi: <span style={{ color: "red" }}>{username}</span>
              </Text>
              <Text
                fontWeight={700}
                onClick={handleLogout}
                cursor="pointer"
                bg="#dc3544"
                borderRadius={20}
                color="#ffff"
                pl="1"
                pr="1"
              >
                Log out
              </Text>
            </>
          ) : (
            <>
              <Link to="/register">
                <Text
                  bg="#dc3544"
                  borderRadius={20}
                  color="#ffff"
                  pl="1"
                  pr="1"
                >
                  Register
                </Text>
              </Link>
            </>
          )}
        </Box>
      </Box>
      {/* ---------- Loading Indicator --------- */}
      <Progress
        visibility={loading ? "visible" : "hidden"}
        w="100%"
        position="fixed"
        mt={-5}
        size="xs"
        h="2"
        isIndeterminate
      />
    </>
  );
};

export default Navbar;
