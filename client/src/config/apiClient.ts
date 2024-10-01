import axios from "axios";

const options = {
  baseURL: process.env.BACKEND_URL,
  withCredentials: true,
};

const AUTH_API = axios.create(options);

AUTH_API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const {status, data} = error.response;
    return Promise.reject({status, ...data});
  }
);


export default AUTH_API;