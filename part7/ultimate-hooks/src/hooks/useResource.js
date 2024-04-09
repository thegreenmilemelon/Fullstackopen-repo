import { useState, useEffect } from "react";
import axios from "axios";

const useResource = (baseURL) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setResources(response.data);
    });
  }, [baseURL]);

  const create = (resource) => {
    axios
      .post(baseURL, resource)
      .then((response) => setResources([...resources, response.data]));
  };

  const service = {
    create,
  };

  return [resources, service];
};

export default useResource;
