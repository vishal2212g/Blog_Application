import { useState, useContext } from "react";

import { Box, TextField, Button, styled, Typography } from "@mui/material";

import { API } from "../../service/api";

import { DataContext } from "../../context/DataProvider";

import { useNavigate } from "react-router-dom";
import axios from "axios";

//css
const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const Wrapper = styled("Box")`
  padding: 25px 30px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButtton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #ffffff;
  height: 40px;
  border-radius: 2px;
`;

const SignupButtton = styled(Button)`
  text-transform: none;
  background: #ffffff;
  color: #2874f0;
  height: 40px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;
const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 16px;
`;

//Initial value for the database

const loginInitialValues = {
  username: "",
  password: "",
};
const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const Login = ({ isUserAuthenticate }) => {
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const [account, toggleAccount] = useState("login");

  //signup
  const [signup, setSignup] = useState(signupInitialValues);

  //logi n
  const [login, setLogin] = useState(loginInitialValues);

  const [error, setError] = useState("");

  //contex
  const { setAccount } = useContext(DataContext);

  const navigate = useNavigate();

  //signup ! login
  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  //input change event

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  //signup api call

  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      setError("");
      setSignup(signupInitialValues);
      toggleAccount("login");
    } else {
      setError("something went  wrong please try again later");
    }
  };

  // login page

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  //login api call

  const loginUser = async () => {
    const response = await API.userLogin(login);
    // console.log('rrrr', response)
    if (response?.isSuccess) {
      setError("");

      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        name: response.data.name,
        username: response.data.username,
      });

      isUserAuthenticate(true);
      setLogin(loginInitialValues);
      navigate("/");
    } else {
      setError("Something went wrong! please try again later");
    }
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="login" />{" "}
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              value={login.username}
              onChange={(e) => onValueChange(e)}
              name="username"
              label="Enter username"
            />
            <TextField
              variant="standard"
              value={login.password}
              onChange={(e) => onValueChange(e)}
              name="password"
              label="Enter password"
            />
            {error && <Error> {error} </Error>}
            <LoginButtton variant="contained" onClick={() => loginUser()}>
              Login{" "}
            </LoginButtton>
            <Text
              style={{
                textAlign: "center",
              }}
            >
              OR
            </Text>
            <SignupButtton onClick={() => toggleSignup()}>
              Create an account
            </SignupButtton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="name"
              label="Enter Name"
            />
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="username"
              label="Enter username"
            />
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="password"
              label="Enter password"
            />
            {error && <Error> {error}</Error>}
            <SignupButtton variant="contained" onClick={() => signupUser()}>
              Signup
            </SignupButtton>
            <Text
              style={{
                textAlign: "center",
              }}
            >
              OR
            </Text>
            <LoginButtton varient="contained" onClick={() => toggleSignup()}>
              Already have an account
            </LoginButtton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
