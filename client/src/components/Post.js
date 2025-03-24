import React from "react";
import { Card, CardContent, Typography, IconButton, Stack } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const Post = ({ post }) => {
  console.log(post);
  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto", padding: 2, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {post.title}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton size="small" color="primary">
            <ArrowUpwardIcon />
          </IconButton>
          <Typography>{post.upVotesCount}</Typography>
          <IconButton size="small" color="secondary">
            <ArrowDownwardIcon />
          </IconButton>
          <Typography>{post.downVotesCount}</Typography>
          <IconButton size="small">
            <ChatBubbleOutlineIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Post;