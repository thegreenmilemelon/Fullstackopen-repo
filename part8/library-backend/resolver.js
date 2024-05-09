const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

let bookCache = null;

const resolvers = {
  Author: {
    bookCount: async (root) => {
      if (bookCache) {
        console.log("Book.count");
        return bookCache.filter((b) => b.author.toString() === root.id).length;
      }

      return Book.countDocuments({ author: root.id });
    },
  },
  Query: {
    authorCount: async () => await Author.collection.countDocuments(),
    bookCount: async () => await Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {};
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          filter.author = author._id;
        } else {
          return [];
        }
      }
      if (args.genre) {
        filter.genres = { $in: [args.genre] };
      }
      return await Book.find(filter).populate("author");
    },
    allAuthors: async (root, args, context, query) => {
      console.log("author.find");
      const fieldsNames = query.fieldNodes[0].selectionSet.selections.map(
        (f) => f.name.value
      );
      console.log(fieldsNames);
      if (fieldsNames.includes("bookCount")) {
        bookCache = await Book.find({});
      }
      return Author.find({});
    },
    me: async (root, args, context) => {
      if (!context.currentUser) {
        return null;
      }
      return context.currentUser;
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }

      try {
        let author = await Author.findOne({ name: args.author });

        if (!author) {
          author = new Author({ name: args.author });
          await author.save();
        }

        const lowercaseGenres = args.genres.map((genre) => genre.toLowerCase());
        const book = new Book({
          title: args.title,
          published: args.published,
          author: author._id,
          genres: lowercaseGenres,
        });

        const newBook = await book.save();
        const populatedBook = await newBook.populate("author");
        pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook });
        return populatedBook;
      } catch (error) {
        if (error.name === "ValidationError") {
          throw new GraphQLError(error.message, {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: Object.keys(error.errors),
              error,
            },
          });
        }
        throw new GraphQLError(error.message);
      }
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }
      try {
        const author = await Author.findOne({ name: args.name });
        if (!author) {
          throw new GraphQLError(`Author ${args.name} not found`, {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
            },
          });
        }
        author.born = args.setBornTo;
        const updatedAuthor = await author.save();
        return updatedAuthor;
      } catch (error) {
        if (error.name === "ValidationError") {
          throw new GraphQLError(error.message, {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: Object.keys(error.errors),
              error,
            },
          });
        }
      }
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      await user.save();
      return user;
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
          },
        });
      }
      if (args.password === "secret") {
        const userForToken = {
          username: user.username,
          id: user._id,
        };
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
      } else {
        throw new GraphQLError("Wrong password", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.password,
          },
        });
      }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
