import axios from "axios";

let credentials = true;
const restAPI = axios.create({
  baseURL: "http://localhost:4002",
  withCredentials: true,
});

const credentialsToggle = (state) => {
  credentials = state;
};

export { restAPI, credentialsToggle };
