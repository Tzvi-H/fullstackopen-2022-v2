import { useQuery } from "@apollo/client";
import { RECOMMEND, ME } from "../queries";

const Recommend = (props) => {
  const result = useQuery(RECOMMEND);
  const resultMe = useQuery(ME);

  if (!props.show) {
    return null;
  }

  if (result.loading || resultMe.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.favoriteBooks;
  const me = resultMe.data.me;

  return (
    <div>
      <h2>books</h2>
      <p>
        books in your favorite genre <b>{me.favouriteGenre}</b>
      </p>
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
    </div>
  );
};

export default Recommend;
