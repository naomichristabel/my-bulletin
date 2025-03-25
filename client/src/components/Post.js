import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const API_URL =  process.env.REACT_APP_API_URL; // Backend API

const Post = ({  post, onPostDeleted }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePost = async () => {
    setIsDeleting(true); // ✅ Show "Deleting..."
    try {
      const response = await fetch(`${API_URL}/api/posts/${post.id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) throw new Error("Failed to delete post");
  
      onPostDeleted(post.id); // ✅ Remove post from UI
      setOpenDialog(false);   // ✅ Close dialog after successful delete
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false); // ✅ Always reset loading state
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 600, margin: "20px auto", padding: 2, borderRadius: 2 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textDecoration: "none", color: "inherit", "&:hover": { color: "blue" } }}
            >
              {post.title}
            </Typography>

            {/* Delete Button */}
            <IconButton onClick={() => setOpenDialog(true)} color="error">
              <DeleteIcon />
            </IconButton>
          </Stack>

          {/* Display Audio Player if audioUrl exists */}
          {post.audioUrl && post.audioUrl.startsWith("http") && (
            <audio controls style={{ width: "100%", marginTop: 10 }}>
              <source src={post.audioUrl} type="audio/webm" />
              Your browser does not support the audio element.
            </audio>
          )}

          {/* Vote & Comment Buttons */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ marginTop: 1 }}>
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this post? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} disabled={isDeleting}>Cancel</Button>
          <Button onClick={handleDeletePost} color="error" variant="contained" disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Post;
