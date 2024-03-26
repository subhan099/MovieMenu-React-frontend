import React from "react";
import Layout from "../components/Layout";
import { Box, Typography } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { useLocation } from "react-router-dom";
import InnerLayout from "../components/InnerLayout";


export default function UpdateMoviePage() {

  const location = useLocation();
  const { id, img, title, year } = location.state;
  console.log("id is as: ",id, img, title, year);
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
              Edit
            </Typography>
          </Box>
        </Box>
        <MovieCard isCreate={false} id={id} img={img} title={title} year={year}/>
      </Box>
    </InnerLayout>
  )
}
