import axios from "axios";
import { queryClient } from "./QueryWrapper";

const options = {
  baseURL: 'http://localhost:4000',         
  withCredentials: true,
};

const AUTH_API = axios.create(options);
const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);


AUTH_API.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { config, response } = error
    const {status, data} = response;

    // try to refresh the access token behind the scenes

    if (status === 401 && data?.errorCode === "InvalidAccessToken") {
      try {
        await TokenRefreshClient.get("/auth/refresh");
        return TokenRefreshClient(config)
      } catch (error) {
        queryClient.clear()
        window.location.href="/auth/login"
      }
    } 

    return Promise.reject({status, ...data});
  }
);


export default AUTH_API;