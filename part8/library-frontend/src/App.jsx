import { useState, useEffect } from "react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendation from "./components/Recommendation";

import { useApolloClient, useQuery, useSubscription } from "@apollo/client";

import { GET_ME, BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const [user, setUser] = useState(null);
  const { data } = useQuery(GET_ME);
  // console.log("User: ", data);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log("subscriptionData: ", subscriptionData);
      window.alert(`New book added: ${subscriptionData.data.bookAdded.title}`);
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useEffect(() => {
    const token = localStorage.getItem("phonenumbers-user-token");
    if (token) {
      setToken(token);
      // Fetch user data after login
      if (data?.me) {
        setUser(data);
      }
    }
  }, [token, data]);

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm setToken={setToken} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommendations")}>
          recommendation
        </button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
      <Recommendation show={page === "recommendations"} user={user} />
    </div>
  );
};

export default App;
