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
};
export const sendPasswordResetEmail = async (email: string) => {
  return AUTH_API.post("/auth/password/forgot", { email });
};
// password forgot -> send password reset email
export const resetPassword = async (data: {
  password: string;
  verificationCode: string;
}) => {
  return AUTH_API.post("/auth/password/reset", data);
};

// users
interface UserParam {
  email: string;
  password: string;
  name: string;
  address: string;
  phone_number: string;
  image_src: string;
}

export const getUser = async () => AUTH_API.get("/users/me");
export const getUsers = async () => AUTH_API.get("/users");
export const getUserById = async (id: string) => AUTH_API.get(`/users/${id}`);
export const updateUser = async (data: { id: string } & UserParam) =>
  AUTH_API.put(`/users/${data.id}`, data);
export const deleteUser = async (id: string) => AUTH_API.delete(`/users/${id}`);
export const addUser = async (data: UserParam) => AUTH_API.post("/users", data);

// billboards
export const getBillboards = async () => AUTH_API.get("/billboards");
export const getBillBoardById = async (id: string) =>
  AUTH_API.get(`/billboards/${id}`);
export const addBillboard = async (data: {
  title: string;
  image_src: string;
}) => AUTH_API.post("/billboards", data);
export const updateBillboard = async (data: {
  title: string;
  image_src: string;
  id: string;
}) => AUTH_API.put(`/billboards/${data.id}`, data);
export const deleteBillboard = async (id: string) =>
  AUTH_API.delete(`/billboards/${id}`);

// categories
interface CategoryParam {
  name: string;
  description: string;
  code: string;
  billboard_title: string;
}

export const getCategories = async () => AUTH_API.get("/categories");
export const getCategoryById = async (id: string) =>
  AUTH_API.get(`/categories/${id}`);
export const createCategory = async (data: CategoryParam) =>
  AUTH_API.post("/categories", data);
export const updateCategory = async (data: { id: string } & CategoryParam) =>
  AUTH_API.put(`/categories/${data.id}`, data);
export const deleteCategory = async (id: string) =>
  AUTH_API.delete(`/categories/${id}`);

// manufacturers
interface ManufacturerParam {
  name: string;
  country: string;
  type_of_product: string;
  abbreviation: string;
}

export const getManufacturers = async () => AUTH_API.get("/manufacturers");
export const getManufacturerById = async (id: string) =>
  AUTH_API.get(`/manufacturers/${id}`);
export const createManufacturer = async (data: ManufacturerParam) =>
  AUTH_API.post("/manufacturers", data);
export const updateManufacturer = async (
  data: { id: string } & ManufacturerParam
) => AUTH_API.put(`/manufacturers/${data.id}`, data);
export const deleteManufacturer = async (id: string) =>
  AUTH_API.delete(`/manufacturers/${id}`);

// models

interface ModelParam {
  name: string;
  make: string;
  year: string;
}

export const getModels = async () => AUTH_API.get("/models");
export const getModelById = async (id: string) => AUTH_API.get(`/models/${id}`);
export const createModel = async (data: ModelParam) =>
  AUTH_API.post("/models", data);
export const updateModel = async (data: { id: string } & ModelParam) =>
  AUTH_API.put(`/models/${data.id}`, data);
export const deleteModel = async (id: string) =>
  AUTH_API.delete(`/models/${id}`);

// autoparts
interface AutopartParam {
  name: string;
  description: string;
  price: string;
  oem_number: string;
  category_id: string;
  manufacturer_id: string;
  model_id: string[];
  images: string[];
}

export const getAutoparts = async () => AUTH_API.get("/autoparts");
export const getAutopartById = async (id: string) =>
  AUTH_API.get(`/autoparts/${id}`);
export const createAutopart = async (data: AutopartParam) =>
  AUTH_API.post("/autoparts", data);
export const updateAutopart = async (data: { id: string } & AutopartParam) =>
  AUTH_API.put(`/autoparts/${data.id}`, data);
export const deleteAutopart = async (id: string) =>
  AUTH_API.delete(`/autoparts/${id}`);
