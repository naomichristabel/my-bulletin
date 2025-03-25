import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#4A013A" }}> {/* Darker Magenta */}
      <Toolbar>
        <Typography variant="h6">Bulletin App</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;