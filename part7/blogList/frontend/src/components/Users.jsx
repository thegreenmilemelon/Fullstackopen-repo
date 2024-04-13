import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { initializeAllUsers } from "../reducers/allUsersReducer";

export default function Users() {
  const dispatch = useDispatch();

  //needed to update after each createblog
  useEffect(() => {
    dispatch(initializeAllUsers());
  }, []);

  const users = useSelector((state) => state.users);
  console.log("users in users", users);

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
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
