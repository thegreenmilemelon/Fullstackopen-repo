import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";
import { useState } from "react";
import Select from "react-select";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }
  const authors = result.data.allAuthors;
  const options = authors.map((a) => ({
    value: a.name,
    label: a.name,
  }));
  console.log("Authors result: ", result);

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

      <div>
        <h3>Set birthyear</h3>
        <BirthYear options={options} />
      </div>
    </div>
  );
};

const BirthYear = ({ options }) => {
  const [born, setBorn] = useState("");
  const [name, setName] = useState(null);
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log("Error: ", error);
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    updateAuthor({
      variables: { name: name.value, setBornTo: parseInt(born) },
    });
    setName("");
    setBorn("");
  };
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            value={name}
            onChange={(option) => setName(option)}
            options={options}
            defaultValue={name}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button>update author</button>
      </form>
    </div>
  );
};

export default Authors;
