import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#62054A", // Dark Magenta
    },
    secondary: {
      main: "#93056E", // Vivid Dark Pink
    },
    error: {
      main: "#93056E", // Match delete button color to theme
    },
    background: {
      default: "#2E2E2E", 
      paper: "#3E3E3E", 
    },
    text: {
      primary: "#FFFFFF", 
      secondary: "#FDBCEC", 
    },
    action: {
      hover: "#7A0459", // Defined hover color
    },
  },
});

export default theme;
