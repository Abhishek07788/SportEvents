import { Box, Button, Heading, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalForAdd from "./Modal";

const Sprint = () => {
  const [sprintData, setSprintData] = useState([]);
  const [useData, setUserData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <div>
      {/* ---------Main Heading------ */}
      <Box
        display="flex"
        m="auto"
        mt="24"
        alignItems="center"
        w={["85%", "85%", "55%", "55%"]}
        justifyContent="space-between"
        bg="#121212"
        borderRadius={10}
        p="5"
      >
        <Heading color="#ffffff">Create a Sprint</Heading>
        <Button
          onClick={() => setIsModalVisible(!isModalVisible)}
          colorScheme={"teal"}
        >
          Create
        </Button>
      </Box>

     

      {/* ---------- Sprints -------- */}
      {sprintData.length == 0 ? (
        <Heading
          fontSize={[20, 20, 40, 40]}
          textAlign="center"
          color="#989898"
          mt="10"
        >
          No Sprint Found!!
        </Heading>
      ) : (
        ""
      )}
      {sprintData &&
        sprintData.map((el) => (
          <Box
            key={el._id}
            display="flex"
            m="auto"
            mt="10"
            alignItems="center"
            w={["80%", "80%", "50%", "50%"]}
            justifyContent="space-between"
            bg="#181c47"
            borderRadius={10}
            p="5"
          >
            <Box textAlign="left">
              <Heading fontSize={18} color="#ffffff">
                {el.name}
              </Heading>

              <Text color="#ffffff" fontSize={14} mt="2">
                {el.description}
              </Text>
            </Box>
            <Box>
              <Button
                fontSize={13}
                ml="2"
                // onClick={() => handleView(el._id)}
                colorScheme={"teal"}
              >
                View Task
              </Button>
              <Button
                fontSize={13}
                ml="2"
                // onClick={() => handleDelete(el._id)}
                colorScheme={"#dc143c"}
                bg={"#dc143c"}
              >
                Delete Sprint
              </Button>
            </Box>
          </Box>
        ))}

      {/* ----------------- (Modal) ---------- */}
      <ModalForAdd isOpen={isModalVisible} setIsOpen={setIsModalVisible} />
    </div>
  );
};

export default Sprint;
