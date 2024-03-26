import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useTheme } from "@mui/material/styles";
import { toast, Bounce } from "react-toastify";
import axios from "axios";

export default function SignUp() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (!name || !email || !password) {
      toast.error("Fields can't be empty", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    } else {
      try {
        axios
          .post("http://localhost:5000/user/signUp", { name, email, password })
          .then((response) => {
            // console.log("successfully registered!!!", response.data);
            setName("");
            setEmail("");
            setPassword("");
            navigate("/");
          })
          .catch((err) => {
            console.error("Error registering user:", err);
          });
      } catch (error) {
        console.log("err:", error);
      }
    }
  };

  const handleSignIn = () => {
    navigate("/");
  };

  return (
    <Layout>
      <Box
        sx={{
          flex: 1,
          color: "white",
          marginTop: isSmallScreen ? "60px" : "100px",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Montserrat",
            fontSize: "64px",
            fontWeight: 600,
          }}
        >
          Sign Up
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <TextField
            id="filled-basic"
            label={
              <Typography sx={{ color: "white", fontSize: "14px" }}>
                Enter Your Name
              </Typography>
            }
            sx={{
              backgroundColor: "#224957",
              borderRadius: "5px",
              width: "300px",
              input: {
                color: "white",
              },
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label={
              <Typography sx={{ color: "white", fontSize: "14px" }}>
                Enter Email
              </Typography>
            }
            sx={{
              backgroundColor: "#224957",
              borderRadius: "5px",
              marginTop: "10px",
              width: "300px",
              input: {
                color: "white",
              },
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label={
              <Typography sx={{ color: "white", fontSize: "14px" }}>
                Enter Password
              </Typography>
            }
            type="password"
            sx={{
              backgroundColor: "#224957",
              borderRadius: "5px",
              marginTop: "10px",
              width: "300px",
            }}
            inputProps={{ style: { color: "white" } }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            sx={{
              marginTop: "20px",
              width: "300px",
              backgroundColor: "#2BD17E",
              "&:hover": { backgroundColor: "#2BD17E" },
            }}
            onClick={handleSignUp}
          >
            SignUp
          </Button>
          <Box sx={{ display: "flex", marginTop: "10px" }}>
            <Typography sx={{ fontSize: "12px" }}>
              I already have an account
            </Typography>
            <button
              onClick={handleSignIn}
              style={{
                backgroundColor: "transparent",
                color: "blue",
                fontSize: "14px",
                textDecoration: "underline",
                cursor: "pointer",
                border: "none",
              }}
            >
              SignIn
            </button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
