import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState, useEffect } from "react";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [availableGenres, setAvailableGenres] = useState([]);

  useEffect(() => {
    if (result.data) {
      const genres = new Set();
      result.data.allBooks.forEach((book) => {
        book.genres.forEach((genre) => genres.add(genre));
      });
      setAvailableGenres(Array.from(genres));
    }
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  if (result.error) {
    return <div>Error: {result.error.message}</div>;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    setGenre(selectedGenre);

    if (selectedGenre) {
      const filtered = books.filter((book) =>
        book.genres.includes(selectedGenre)
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  };

  const booksToDisplay = genre ? filteredBooks : books;

  return (
    <div>
      <h2>books</h2>
      <div>
        Filter by genre:
        <select value={genre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {availableGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {booksToDisplay.map((book) => (
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

export default Books;
