import { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import Select from "react-select";

const Authors = (props) => {
  const resultAuthors = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  if (!props.show) {
    return null;
  }

  if (resultAuthors.loading) {
    return <div>loading...</div>;
  }

  const submit = (event) => {
    event.preventDefault();
    editAuthor({
      variables: { name, setBornTo: Number(born) },
    });
    setName("");
    setBorn("");
  };

  const authors = resultAuthors.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          {/* name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          /> */}
          <Select
            defaultValue={name}
            onChange={({ value }) => setName(value)}
            options={authors.map((a) => ({ value: a.name, label: a.name }))}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
