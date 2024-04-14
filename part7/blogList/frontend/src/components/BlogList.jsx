import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import storage from "../services/storage";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Link as MuiLink,
} from "@mui/material";

export default function BlogList() {
  const blogs = useSelector((state) => state.blogs);
  const currentUser = storage.me();
  const sortedBlogs = [...blogs]
    .filter((blog) => blog.user.username === currentUser)
    .sort((a, b) => b.likes - a.likes);

  if (sortedBlogs.length === 0) {
    return (
      <Box mt={2}>
        <Typography variant="body1">Blogs Pending...</Typography>
      </Box>
    );
  }

  return (
    <Box mt={2}>
      {sortedBlogs.map((blog) => (
        <Card key={blog.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              <MuiLink component={Link} to={`/blogs/${blog.id}`}>
                {blog.title}
              </MuiLink>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {blog.author}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
