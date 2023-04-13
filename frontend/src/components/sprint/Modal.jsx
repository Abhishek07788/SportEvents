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
} from "@chakra-ui/react";
import { useState } from "react";


const ModalForAdd = ({ isOpen, setIsOpen }) => {
  const toast = useToast();
  const [form, setForm] = useState({ name: "", description: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ----------------- (Add) -----------
  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: `New Sprint Added.👍`,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    setIsOpen(false);
    console.log(form);
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
          <ModalHeader>Add Sprint</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Text fontWeight="bold">Name:</Text>
              <Input
                type="text"
                placeholder="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                borderColor="black"
              />
              <Text fontWeight="bold" mt="10">
                Description:
              </Text>
              <Textarea
                borderBottom={"2px"}
                bg="#e6defa"
                color="black"
                fontSize={20}
                name="description"
                value={form.description}
                onChange={handleChange}
              />
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
