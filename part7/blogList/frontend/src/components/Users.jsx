import React from "react";
import { useSelector } from "react-redux";

export default function Users() {
  const users = useSelector((state) => state.users);

  if (users.length === 0) {
    return <div>No users found</div>;
  }
  return (
    <>
      <div>
        <h2>Users</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
