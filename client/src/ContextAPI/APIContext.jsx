import { useContext, createContext } from "react";
import axios from "axios";
const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const restAPI = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true,
  });

  return (
    <ApiContext.Provider value={{ restAPI }}>{children}</ApiContext.Provider>
  );
};
export const useApi = () => {
  return useContext(ApiContext);
};

export { ApiProvider, ApiContext };
