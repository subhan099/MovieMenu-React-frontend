import React from "react";
import Footer from "./Footer";
import { Box } from "@mui/material";
import Header from "./Header";

export default function InnerLayout({ children }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", }}>
      <Header />
      <Box sx={{ flex: 1, paddingBottom: "100px"}}>{children}</Box>
      <Footer />
    </Box>
  );
}
