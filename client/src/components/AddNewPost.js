import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import db from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CLOUDINARY_UPLOAD_URL = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;
const CLOUDINARY_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

const AddNewPost = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setAudioBlob(null);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted:", stream);
  
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      let chunks = [];
  
      mediaRecorder.ondataavailable = (event) => {
        console.log("Data available:", event.data);
        chunks.push(event.data);
      };
  
      mediaRecorder.onstop = () => {
        console.log("Recording stopped, processing blob...");
        const audioFile = new Blob(chunks, { type: "audio/webm" });
        console.log("Audio Blob created:", audioFile);
        setAudioBlob(audioFile);
      };
  
      mediaRecorder.start();
      console.log("Recording started...");
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };  

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      console.log("Stopping recording...");
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      console.log("No active recorder found.");
    }
  };

  const uploadAudioToCloudinary = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("upload_preset", CLOUDINARY_PRESET);
    formData.append("resource_type", "raw"); // Ensure Cloudinary treats it as audio
  
    try {
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) throw new Error("Cloudinary upload failed");
  
      const data = await response.json();
      console.log("Cloudinary upload success:", data.secure_url);
      return data.secure_url; // Return Cloudinary URL
    } catch (error) {
      console.error("Error uploading audio to Cloudinary:", error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;
    console.log("Checking audioBlob before upload:", audioBlob);

  if (!audioBlob) {
    console.error("audioBlob is still null! Preventing upload.");
    return;
  }

  setIsSaving(true);
  let audioUrl = await uploadAudioToCloudinary(audioBlob);
  console.log("Cloudinary upload success:", audioUrl);

    try {
      await addDoc(collection(db, "posts"), {
        title,
        upVotesCount: 0,
        downVotesCount: 0,
        audioUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      console.log("Post added successfully to Firestore.");
      handleClose();
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    console.log("Updated state: audioBlob =", audioBlob);
    if (audioBlob) {
      console.log("audioBlob updated:", audioBlob);
    }
  }, [audioBlob]);

  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Add New Post
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Post Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div style={{ marginTop: "10px" }}>
            {isRecording ? (
              <Button onClick={stopRecording} color="secondary">
                Stop Recording
              </Button>
            ) : (
              <Button onClick={startRecording} color="primary">
                Record Audio
              </Button>
            )}
            {audioBlob && <p>Audio recorded. Ready to upload.</p>}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isSaving}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary" 
            disabled={!title.trim() || isSaving || (audioBlob === null)}
            >
            {isSaving ? "Saving..." : "Save"}
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNewPost;
