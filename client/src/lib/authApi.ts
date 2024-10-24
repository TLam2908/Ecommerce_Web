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

// auth

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

// users

export const getUser = async () => AUTH_API.get("/user");

// billboards

export const getBillboards = async () => AUTH_API.get("/billboards");
export const getBillBoardById = async (id: string) => AUTH_API.get(`/billboards/${id}`);
export const addBillboard = async (data: { title: string, image_src: string}) => AUTH_API.post("/billboards", data);
export const updateBillboard = async (data: { title: string, image_src: string, id: string}) => AUTH_API.put(`/billboards/${data.id}`, data);  
export const deleteBillboard = async (id: string) => AUTH_API.delete(`/billboards/${id}`);
