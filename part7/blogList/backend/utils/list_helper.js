const _ = require("lodash");

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (max, blog) => {
    return max.likes > blog.likes ? max : blog;
  };

  const result = blogs.reduce(reducer, blogs[0]);
  return {
    title: result.title,
    author: result.author,
    likes: result.likes,
  };
};

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, "author");
  const mostAuthor = _.maxBy(_.keys(authors), (key) => authors[key]);
  return {
    author: mostAuthor,
    blogs: authors[mostAuthor],
  };
};

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, "author");
  const likes = _.mapValues(authors, (blog) => _.sumBy(blog, "likes"));
  const mostLikes = _.maxBy(_.keys(likes), (key) => likes[key]);
  return {
    author: mostLikes,
    likes: likes[mostLikes],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
