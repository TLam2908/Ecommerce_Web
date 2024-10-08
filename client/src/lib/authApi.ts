import AUTH_API from "@/config/apiClient";

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export const login = async (data: LoginParams) => {
  return AUTH_API.post("/auth/login", data);
};

export const register = async (data: RegisterParams) => {
  return AUTH_API.post("/auth/register", data);
};

export const verifyEmail = async (id: string) => {
  return AUTH_API.get(`/auth/email/verify/${id}`);
}

export const sendPasswordResetEmail = async (email: string) => {
  return AUTH_API.post("/auth/password/forgot", { email });
}

// password forgot -> send password reset email

export const resetPassword = async (data: { password: string;  verificationCode: string }) => {
  return AUTH_API.post("/auth/password/reset", data);
}