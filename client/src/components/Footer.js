import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#3E3E3E", // Slightly lighter background
        color: "#B0B0B0", // Dark Grey Text
        textAlign: "center",
        py: 2,
        position: "relative",
        width: "100%",
        mt: "auto", // Pushes footer to bottom when wrapped in a flex container
      }}
    >
      <Typography variant="body2">&copy; {new Date().getFullYear()} Bulletin Board</Typography>
    </Box>
  );
};

export default Footer;
