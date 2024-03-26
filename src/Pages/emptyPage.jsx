import React from "react";
import Layout from "../components/Layout";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function EmptyPage() {
  const navigate = useNavigate();
  const handleAddMovie = () => {
    navigate("/add-movie")
  }
  return (
    <Layout>
      <Typography
        variant="h2"
        sx={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          marginTop: "200px",
        }}
      >
        Your movie list is empty
      </Typography>
      <Box
        sx={{ marginTop: "50px", display: "flex", justifyContent: "center" }}
      >
        <Button
          sx={{
            width: "202px",
            height: "56px",
            backgroundColor: "#2BD17E",
            color: "white",
            "&:hover": { backgroundColor: "#2BD17E" },
          }}
          onClick={handleAddMovie}
        >
          Add a new movie
        </Button>
      </Box>
    </Layout>
  );
}
