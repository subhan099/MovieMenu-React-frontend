import React from "react";
import Layout from "../components/Layout";
import { Box, Typography } from "@mui/material";
import MovieCard from "../components/MovieCard";
import InnerLayout from "../components/InnerLayout";

export default function CreateMoviePage() {
  return (
    <InnerLayout>
      <Box
        sx={{
          color: "white",
          padding: "0px 120px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{ display: "flex", marginTop: "120px", alignItems: "center" }}
          >
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Montserrat",
                fontSize: "48px",
                fontWeight: 600,
              }}
            >
              Create a new movie
            </Typography>
          </Box>
        </Box>
        <MovieCard isCreate={true} />
      </Box>
    </InnerLayout>
  );
}
