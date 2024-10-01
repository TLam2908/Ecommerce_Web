import AUTH_API from "@/config/apiClient";

export const login = async (data) => {
  AUTH_API.post("auth/login", data);
};
