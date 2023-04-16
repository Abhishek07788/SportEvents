import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Table,
  Th,
  Tr,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { AppContext } from "../../context/ContextApi";

const Lists = ({ myRequest, eventDetails, handleSendRequest }) => {
  const { userId, requestData, updateRequests, deleteRequests } =
    useContext(AppContext);

  return (
    <Box>
      {/* ----------- Lists ---------- */}
      {eventDetails.user_id === userId || myRequest[0]?.status === "Accept" ? (
        <SimpleGrid
          w="90%"
          display={["grid", "grid", "grid", "flex"]}
          gap="10"
          mt="10"
        >
          {/* ----------- Active List ----- */}
          <Box w="60%">
            <Heading
              fontSize={20}
              p="2"
              bg="teal"
              color="#ffff"
              borderTopRadius={8}
            >
              Active Players List
            </Heading>
            <Box h="300px" border="1px" borderBottomRadius={8}>
              {requestData &&
                requestData.map((el) => (
                  <Box key={el._id}>
                    {el.event_id === eventDetails?._id &&
                    el.status === "Accept" ? (
                      <Heading fontSize={20} p="2" color="red" textAlign="left">
                        <span style={{ color: "black" }}>Username: </span>
                        {el.username}{" "}
                        <span style={{ color: "black", marginLeft: "10px" }}>
                          Joining Date:{" "}
                        </span>
                        {el.joining_date.slice(0, 19)}
                      </Heading>
                    ) : (
                      ""
                    )}
                    <hr />
                  </Box>
                ))}
            </Box>
          </Box>

          {/* ----------- Requests List ----- */}
          {myRequest[0]?.status !== "Accept" ? (
            <Box w="35%" border="1px" borderTopRadius={8}>
              <Heading fontSize={20} p="2" bg="teal" color="#ffff">
                Invites and Requests
              </Heading>

              <Table border="1px" borderRadius={8}>
                <thead>
                  <Tr bg="#4587d0">
                    <Th color="#ffff" fontSize={16}>
                      Username
                    </Th>
                    <Th color="#ffff" fontSize={16}>
                      Accept
                    </Th>
                    <Th color="#ffff" fontSize={16}>
                      Reject
                    </Th>
                  </Tr>
                </thead>
                {requestData &&
                  requestData.map((el) => (
                    <tbody key={el._id}>
                      {el.event_id === eventDetails?._id &&
                      el.status === "Pending" ? (
                        <Tr border="1px">
                          <td style={{ textAlign: "left" }}>
                            <b>{el.username}</b>
                          </td>
                          <td>
                            <Heading
                              fontSize={16}
                              bg="green"
                              color="#ffff"
                              borderRadius={8}
                              cursor="pointer"
                              title="Accept the request"
                              p="1"
                              onClick={() => updateRequests(el?._id, "Accept")}
                            >
                              Accept
                            </Heading>
                          </td>
                          <td>
                            <Heading
                              fontSize={16}
                              bg="red"
                              color="#ffff"
                              borderRadius={8}
                              cursor="pointer"
                              title="Reject the request"
                              p="1"
                              onClick={() => updateRequests(el?._id, "Reject")}
                            >
                              Reject
                            </Heading>
                          </td>
                        </Tr>
                      ) : el.event_id === eventDetails?._id &&
                        el.status === "Reject" ? (
                        <Tr border="1px">
                          <td style={{ textAlign: "left" }}>
                            <del>
                              <b> {el.username}</b>
                            </del>
                          </td>
                          <td></td>
                          <td>
                            <Heading
                              fontSize={16}
                              bg="#dc143c"
                              color="#ffff"
                              borderRadius={8}
                              cursor="not-allowed"
                              p="1"
                              title="Rejected"
                            >
                              Rejected
                            </Heading>
                          </td>
                        </Tr>
                      ) : (
                        <tr></tr>
                      )}
                    </tbody>
                  ))}
              </Table>
            </Box>
          ) : (
            ""
          )}
        </SimpleGrid>
      ) : (
        // {/* ---------Send Request ------- */}
        <Box>
          {myRequest[0]?.status == "Pending" ? (
            <Button
              onClick={() => deleteRequests(myRequest[0]?._id)}
              ml="4"
              float="right"
              mt="10"
              colorScheme="red"
            >
              Cancel Request
            </Button>
          ) : (
            ""
          )}

          <Button
            float="right"
            mt="10"
            onClick={() =>
              handleSendRequest(
                eventDetails?._id,
                eventDetails?.number_of_player
              )
            }
            colorScheme={
              myRequest[0]?.status == "Pending"
                ? "green"
                : myRequest[0]?.status == "Reject"
                ? "red"
                : "linkedin"
            }
          >
            {myRequest[0]?.status === "Pending"
              ? "Request is Pending"
              : myRequest[0]?.status === "Reject"
              ? "Request Rejected By Organizer"
              : "Send Request to Organizer"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Lists;
