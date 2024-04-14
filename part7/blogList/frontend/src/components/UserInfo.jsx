import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

export default function UserInfo() {
  const { id } = useParams();
  const userInfo = useSelector((state) => state.users.find((u) => u.id === id));

  if (!userInfo) {
    return <div>User not found</div>;
  }

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Blogs added by: {userInfo.username}
      </Typography>
      <Divider />
      <List>
        {userInfo.blogs.map((blog) => (
          <ListItem key={blog.id}>
            <ListItemText
              primary={blog.title}
              secondary={`by ${blog.author}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
