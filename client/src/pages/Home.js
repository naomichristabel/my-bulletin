import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../lib/firebase";
import Post from "../components/Post";
import AddNewPost from "../components/AddNewPost"; // Import the AddNewPost component
import { Typography, Container, Box } from "@mui/material";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(postData);
    });

    return () => unsubscribe(); // Cleanup listener when component unmounts
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Bulletin Posts
      </Typography>

      {/* Add New Post Button */}
      <Box textAlign="center" mb={2}>
        <AddNewPost />
      </Box>

      {/* List of Posts */}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Container>
  );
};

export default Home;
