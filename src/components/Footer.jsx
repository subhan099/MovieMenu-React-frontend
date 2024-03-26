import React from "react";
import { Box } from "@mui/material";
import footer from "../assets/Vector.svg";
import footer1 from "../assets/Vector1.svg";

export default function Footer() {
  return (
    <Box>
      <Box
        component="img"
        sx={{
          width: "98vw",
          maxWidth: "98vw",
          position: "absolute",
        }}
        alt="footer"
        src={footer}
      />
      <Box
        component="img"
        sx={{
          width: "98vw",
          maxWidth: "98vw",
        }}
        alt="footer1"
        src={footer1}
      />
    </Box>
  );
}
