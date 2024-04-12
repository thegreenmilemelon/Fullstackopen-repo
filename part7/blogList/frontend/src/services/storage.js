const saveUser = (user) => {
  localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
};

const loadUser = () => {
  const user = localStorage.getItem("loggedBlogAppUser");
  return user ? JSON.parse(user) : null;
};

const me = () => {
  const user = loadUser();
  return user ? user.username : null;
};

const clearUser = () => {
  localStorage.removeItem("loggedBlogAppUser");
};

export default { saveUser, loadUser, me, clearUser };
