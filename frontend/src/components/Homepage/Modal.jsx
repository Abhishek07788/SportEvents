import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Button,
  useToast,
  Input,
  Text,
  Box,
  Select,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AppContext } from "../../context/ContextApi";

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
  sport_img: {
    Cricket:
      "https://img.freepik.com/free-vector/cricket-ball-fire_1308-33325.jpg?size=626&ext=jpg",
    Kabaddi:
      "https://images.pexels.com/photos/5217416/pexels-photo-5217416.jpeg?auto=compress&cs=tinysrgb&w=600",
    Hockey:
      "https://images.pexels.com/photos/33286/ice-hockey-puck-players-game.jpg?auto=compress&cs=tinysrgb&w=600",
    Badminton:
      "https://images.pexels.com/photos/2202685/pexels-photo-2202685.jpeg?auto=compress&cs=tinysrgb&w=600",
    Football:
      "https://images.pexels.com/photos/918798/pexels-photo-918798.jpeg?auto=compress&cs=tinysrgb&w=600",
    Wrestling:
      "https://images.pexels.com/photos/2167890/pexels-photo-2167890.jpeg?auto=compress&cs=tinysrgb&w=600",
    Tennis:
      "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=600",
    Basketball:
      "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=600",
    Boxing:
      "https://images.pexels.com/photos/4761671/pexels-photo-4761671.jpeg?auto=compress&cs=tinysrgb&w=600",
    Motorsports:
      "https://images.pexels.com/photos/3789570/pexels-photo-3789570.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
};

const initialState = {
  sport_name: "",
  sport_img: "",
  description: "",
  city: "",
  number_of_player: "",
  date: "",
  time: "",
  publish_date: Date(),
};

const ModalForAdd = ({ isOpen, setIsOpen }) => {
  const { addNewEvent, userId } = useContext(AppContext);
  const [form, setForm] = useState(initialState);
  const [img, setImg] = useState("");
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "sport_name") {
      setImg(list.sport_img[value]);
    }
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ----------------- (Add) -----------
  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: `New Event Added.👍`,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    setIsOpen(false);
    addNewEvent({ ...form, sport_img: img, user: userId, user_id: userId });
    setForm("");
    e.target.reset();
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pb="4" bg="#f3f7fd" mt="40" w="50%" color="black">
          <ModalHeader>Add Sport Event</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Text fontWeight="bold">Sport Name:</Text>
              <Select
                required
                borderColor="black"
                name="sport_name"
                value={form.sport_name}
                onChange={handleChange}
              >
                <option value="">Select</option>
                {list.sport.map((el, i) => (
                  <option key={i} value={el}>
                    {el}
                  </option>
                ))}
              </Select>
              <Text fontWeight="bold" mt="2">
                Description:
              </Text>
              <Textarea
                required
                borderBottom={"2px"}
                bg="#e6defa"
                color="black"
                rows={1}
                fontSize={16}
                name="description"
                value={form.description}
                onChange={handleChange}
              />
              <Box display="flex" gap="5" mt="2">
                <Box fontWeight="bold">
                  City:
                  <Select
                    required
                    borderColor="black"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {list.city.map((el, i) => (
                      <option key={i} value={el}>
                        {el}
                      </option>
                    ))}
                  </Select>
                </Box>
                <Box fontWeight="bold">
                  Number of Player:
                  <Input
                    required
                    type="number"
                    placeholder="Number of Player"
                    name="number_of_player"
                    value={form.number_of_player}
                    onChange={handleChange}
                    borderColor="black"
                    max={50}
                  />
                </Box>
              </Box>
              <Text fontWeight="bold" mt="2">
                Date & Time:
              </Text>
              <Box display="flex">
                <Input
                  required
                  borderColor="black"
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                />
                <Input
                  required
                  borderColor="black"
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                />
              </Box>
              <Button mt="8" w="100%" colorScheme="teal" type="submit">
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalForAdd;
