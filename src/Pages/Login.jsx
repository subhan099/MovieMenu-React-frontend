import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

export default function Login() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
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
      axios
        .post("http://localhost:5000/auth/login", { email, password })
        .then((data) => {
          // console.log("data=======", data.data.token)
          if (data.data.token) {
            // console.log("login ", data.data.data)
            localStorage.setItem("login", data.data.token);
            navigate("/home");
          } else if (data.data.status === "failure") {
            toast.error("Invalid Credentials", {
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
          }
        })
        .catch((error) => {
          console.log("err: ", error);
          toast.error("Invalid Credentials", {
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

        });
    }
  };

  const handleCreateAccount = () => {
    navigate("/signup");
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
          Sign in
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
                Enter Email
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
              marginTop: "20px",
              width: "300px",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{ style: { color: "white" } }}
          />
          <FormControlLabel
            control={<Checkbox sx={{ color: "white" }} />}
            label={
              <Typography sx={{ fontSize: "14px" }}>Remember me</Typography>
            }
            sx={{ marginTop: "20px" }}
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
            onClick={handleLogin}
          >
            Login
          </Button>
          <Box sx={{ display: "flex", marginTop: "10px" }}>
            <Typography sx={{ fontSize: "12px" }}>
              I don't have an account
            </Typography>
            <button
              onClick={handleCreateAccount}
              style={{
                backgroundColor: "transparent",
                color: "blue",
                fontSize: "14px",
                textDecoration: "underline",
                cursor: "pointer",
                border: "none",
              }}
            >
              Create an account
            </button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
