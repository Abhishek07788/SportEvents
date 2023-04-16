import { Button, Input, Text, useToast } from "@chakra-ui/react";
import style from "./style.module.css";
import React, { useContext } from "react";
import { useState } from "react";
import { registerApiCall } from "../../Api/userApis";
import { AppContext } from "../../context/ContextApi";

const initialState = {
  username: "",
  password: "",
};

const Register = () => {
  const [form, setForm] = useState(initialState);
  const { handleLogin } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const toast = useToast();

  // ---------- ( onChange function ) ---------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // --------- ( onSubmit function ) ----------
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    registerApiCall(form)
      .then((res) => {
        if (res.data.status) {
          localStorage.setItem("token", res.data.token);
          handleLogin(res.data.token);
          setLoading(false);
          // ------------ Alert----------
          toast({
            title: res.data.message,
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        } else {
          localStorage.clear("token");
          // ------------ Alert----------
          toast({
            title: res.data.message,
            status: "info",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  return (
    <div className={style.register}>
      <h1>Log in / Register</h1>
      {/* --------- ( Login Form ) --------- */}
      <form className={style.form} onSubmit={handleSubmit}>
        <Input
          name="username"
          onChange={handleChange}
          value={form.username}
          required
          bg="#ffff"
          placeholder="username"
          maxLength="20"
          minLength={6}
        />
        <Input
          name="password"
          onChange={handleChange}
          value={form.password}
          required
          bg="#ffff"
          placeholder="Password"
          type={hide ? "text" : "password"}
          minLength="8"
        />
        <Text
          onClick={() => setHide(!hide)}
          textAlign="left"
          pl="2"
          color="#ffff"
        >
          <u>{hide ? "Hide" : "Show"}</u>
        </Text>
        <Button
          colorScheme="teal"
          type="submit"
          isLoading={loading ? true : false}
        >
          Log in
        </Button>
      </form>
    </div>
  );
};

export default Register;
