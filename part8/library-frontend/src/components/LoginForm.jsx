/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN, GET_ME } from "../queries";

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useQuery(GET_ME);

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      //   setError(error.graphQLErrors[0].message);
      console.log("Error on login: ", error);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("phonenumbers-user-token", token);
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
    setUsername("");
    setPassword("");
    console.log("AFter login what is the user:", user);
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
