import { useState, useContext , createContext} from "react";
import axios from "axios";
const ApiContext = createContext();

const ApiProvider = ({children})=>{
    const [withCredentials, setWithCredentials] = useState(true);
    const restAPI = axios.create({
        baseURL: 'http://localhost:4000',
        withCredentials: withCredentials,
      });
    
    return( <ApiContext.Provider value={{restAPI, withCredentials, setWithCredentials}}>
        {children}
      </ApiContext.Provider>);
}
export const useApi= ()=>{
    return useContext(ApiContext);
}

export {ApiProvider, ApiContext};
