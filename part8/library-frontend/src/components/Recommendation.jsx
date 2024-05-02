import { useQuery } from "@apollo/client";
import { ALL_BOOKS, GET_ME } from "../queries";

const RecommendedBooks = ({ show }) => {
  const user = useQuery(GET_ME);
  const { data, error, loading } = useQuery(ALL_BOOKS);

  if (!show) {
    return null;
  }

  if (loading || user.loading) {
    <div>fetching data</div>;
  }

  if (error || user.error) {
    <div>an error occurred</div>;
  }

  const me = user.data?.me;

  const favoriteBooks = me
    ? data.allBooks.filter((b) => b.genres.includes(me.favoriteGenre))
    : [];

  return (
    <div>
      <h2>Recommended Books</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
          {favoriteBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
              <td>{book.genres.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecommendedBooks;
