import axios from "axios";

const restAPI = axios.create({
    baseURL: "http://localhost:4000",
});


export {restAPI}