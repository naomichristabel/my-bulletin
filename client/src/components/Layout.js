import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ensures full viewport height
      }}
    >
      <Header />
      <Navbar />
      <Box sx={{ flexGrow: 1, p: 2 }}>{children}</Box> {/* Pushes content */}
      <Footer />
    </Box>
  );
};

export default Layout;
