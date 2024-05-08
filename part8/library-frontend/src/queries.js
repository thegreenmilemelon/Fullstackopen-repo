import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $authorName: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $authorName
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      genres
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const GET_ME = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription BookAdded {
    bookAdded {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`;
