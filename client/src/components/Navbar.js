import React from "react";
import { AppBar, Box, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = ({ children }) => {
  return (
    <>
       <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/about">About</Button>
            <Button color="inherit" component={Link} to="/contact">Contact</Button>
          </Box>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default Navbar;
