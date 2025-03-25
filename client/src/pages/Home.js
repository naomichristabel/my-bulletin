import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import AddNewPost from "../components/AddNewPost";
import { Typography, Container, Box, CircularProgress } from "@mui/material";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Track loading state

  const handlePostDeleted = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  // Fetch posts from backend
  const fetchPosts = async () => {
    setLoading(true); // ✅ Show spinner before fetching
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts`);
      if (!response.ok) throw new Error("Failed to fetch posts");

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false); // ✅ Hide spinner after fetching
    }
  };

  // Load posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        My Posts
      </Typography>

      {/* Pass fetchPosts to AddNewPost so it refreshes list after adding */}
      <Box textAlign="center" mb={2}>
        <AddNewPost onPostAdded={fetchPosts} />
      </Box>

      {/* ✅ Show spinner when loading */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : (
        posts.map((post) => <Post key={post.id} post={post} onPostDeleted={handlePostDeleted} />)
      )}
    </Container>
  );
};

export default Home;
