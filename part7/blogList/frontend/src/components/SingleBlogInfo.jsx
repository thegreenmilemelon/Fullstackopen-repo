import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { likeBlog, initializeBlogs } from "../reducers/blogReducer";
import AddComment from "./AddComment";
import { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function SingleBlogInfo() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const changeLike = (blog) => {
    dispatch(likeBlog(blog));
  };

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <Box mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {blog.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            By {blog.author}
          </Typography>
          <Typography variant="body1">{blog.url}</Typography>
          <Box display="flex" alignItems="center" my={2}>
            <Typography variant="body1" mr={1}>
              Likes: {blog.likes}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => changeLike(blog)}
            >
              Like
            </Button>
          </Box>
          <Typography variant="body1">
            Added by: {blog.user.username}
          </Typography>
        </CardContent>
      </Card>
      <Box mt={4}>
        <AddComment />
        <Typography variant="h6" mt={2}>
          Comments
        </Typography>
        <List>
          {blog.comment.map((comment, i) => (
            <ListItem key={i}>
              <ListItemText primary={comment.content} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
