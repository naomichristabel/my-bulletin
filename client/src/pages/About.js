import React from "react";
import { Typography, Container } from "@mui/material";

const About = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1">
      Bulletin App is a simple and interactive platform where users can share their thoughts using text and voice posts.
      Engage with the community by posting, voting, and commenting. Join the conversation today!
      </Typography>
    </Container>
  );
};

export default About;
