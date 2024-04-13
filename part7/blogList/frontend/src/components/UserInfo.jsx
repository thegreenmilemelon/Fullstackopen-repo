import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function UserInfo() {
  const { id } = useParams();
  const userInfo = useSelector((state) => state.users.find((u) => u.id === id));

  if (!userInfo) {
    return <div>User not found</div>;
  }
  return (
    <div>
      <div>
        <p>Blogs added by:</p>
        <p>{userInfo.username}</p>

        {userInfo && (
          <ul>
            {userInfo.blogs.map((blog) => (
              <li key={blog.id}>
                {blog.title} by {blog.author}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
