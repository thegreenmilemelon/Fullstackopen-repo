import React from "react";
import { useSelector } from "react-redux";
import storage from "../services/storage";

export default function UserInfo() {
  const user = useSelector((state) => state.user);
  console.log("User from userinfo:", user);
  const users = useSelector((state) => state.users);

  const loggedUserInfo = users.find((u) => u.username === storage.me());
  console.log("Logged user info:", loggedUserInfo);

  if (!user) {
    return null;
  }

  return (
    <div>
      <div>
        <p>Blogs added by:</p>
        <p>{user.username}</p>

        <ul>
          {loggedUserInfo.blogs.map((blog) => (
            <li key={blog.id}>
              {blog.title} by {blog.author}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
