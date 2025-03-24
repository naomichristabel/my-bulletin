import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Container } from "@mui/material";
import { updateSchema } from './scripts/updateFirestoreSchema';

const App = () => {
  // updateSchema();
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
