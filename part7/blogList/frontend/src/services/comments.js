import axios from "axios";

const baseUrl = "/api/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const request = await axios.post(`${baseUrl}/${newObject.id}/comments`, {
    content: newObject.content,
  });
  return request.data;
};

export default { getAll, create };
