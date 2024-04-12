import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/userReducer";
import storage from "../services/storage";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    const user = {
      username: event.target.Username.value,
      password: event.target.Password.value,
    };
    dispatch(login(user));
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" name="Username" data-testid="username" />
        </div>
        <div>
          password
          <input type="password" name="Password" data-testid="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
