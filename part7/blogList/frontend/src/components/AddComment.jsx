import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../reducers/commentReducer";
import { addComment } from "../reducers/blogReducer";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function AddComment() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    // dispatch(createComment({ content: comment, id }));
    dispatch(addComment({ content: comment, id }));
    event.target.reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={2}>
      <Typography variant="h6" gutterBottom>
        Add Comment
      </Typography>
      <TextField
        id="comment"
        name="comment"
        label="Comment"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add Comment
      </Button>
    </Box>
  );
}
