import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState("");

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }
  const books =
    genre === "" || genre === "all genres"
      ? result.data.allBooks
      : result.data.allBooks.filter((b) => b.genres.includes(genre));
  const genres = result.data.allBooks
    .map((b) => b.genres)
    .flat()
    .reduce((acc, currentGenre) => {
      if (!acc.includes(currentGenre)) {
        acc.push(currentGenre);
      }
      return acc;
    }, [])
    .concat("all genres");

  return (
    <div>
      <h2>books</h2>
      {genre && genre !== "all genres" && (
        <p>
          in genre <b>{genre}</b>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => {
        return (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        );
      })}
    </div>
  );
};

export default Books;
