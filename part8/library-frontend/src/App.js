import { useSubscription, useApolloClient } from "@apollo/client";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      alert(subscriptionData);
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && (
          <button onClick={() => setPage("recommend")}>recommend</button>
        )}
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <div></div>
      <Authors show={page === "authors"} userLoggedIn={!!token} />
      <Books show={page === "books"} />
      {token ? (
        <>
          <NewBook show={page === "add"} setPage={setPage} />
          <Recommend show={page === "recommend"} />
        </>
      ) : (
        <LoginForm
          setPage={setPage}
          show={page === "login"}
          setToken={setToken}
        />
      )}
    </div>
  );
};

export default App;
