import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const DeleteDialog = ({ open, onClose, onConfirm, isDeleting }) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Post</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this post? This action cannot be undone.
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: theme.palette.text.secondary,
            borderColor: theme.palette.text.secondary,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
              color: theme.palette.text.primary,
            },
          }}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
