import React, { useEffect, useState } from "react";
import Post from "./components/Post";
import db from "./lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Container, Typography } from "@mui/material";

const App = () => {
  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {

      await getDocs(collection(db, "posts"))
          .then((querySnapshot)=>{               
              const newData = querySnapshot.docs
                  .map((doc) => ({...doc.data(), id:doc.id }));
                  setPosts(newData);                
          })

  }

  useEffect(()=>{
      fetchPost();
  }, []);

  return (
    <Container>
    <Typography variant="h4" align="center" gutterBottom>
      Bulletin Posts
    </Typography>
    {posts.map((post) => (
      <Post post={post} key={post.id} />
    ))}
  </Container>
  );
};

export default App;