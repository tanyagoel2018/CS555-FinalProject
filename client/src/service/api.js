import axios from "axios";

let credentials = true
const restAPI = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true
});

const credentialsToggle = (state)=>{
    credentials = state;
}

export {restAPI, credentialsToggle}