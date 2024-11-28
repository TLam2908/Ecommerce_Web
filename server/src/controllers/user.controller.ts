import { NOT_FOUND, OK } from "../constants/http";
import catchErrors from "../utils/catchError";
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  currentUser
} from "../services/user.service";

import { userSchema } from "../validation/user.validation";

export const createUserHandler = catchErrors(async (req, res) => {
  const request = userSchema.parse(req.body);
  const safeUser = await createUser(request);
  return res.status(OK).json(safeUser);
});

export const getUserByIdHandler = catchErrors(async (req, res) => {
  const { id } = req.params;
  const safeUser = await getUserById(id);
  return res.status(OK).json({
    data: safeUser,
  });
});

export const getUsersHandler = catchErrors(async (req, res) => {
  const safeUsers = await getUsers();
  return res.status(OK).json({
    data: safeUsers,
  });
});

export const updateUserHandler = catchErrors(async (req, res) => {
  const request = req.body;
  const { id } = req.params;

  const safeUser = await updateUser(id, request);
  return res.status(OK).json(safeUser);
});

export const deleteUserHandler = catchErrors(async (req, res) => {
  const { id } = req.params;

  const safeUser = await deleteUser(id);
  return res.status(OK).json(safeUser);
});

export const currentUserHandler = catchErrors(async (req, res) => {
    const id = req.userId;
    const safeUser = await currentUser(id);
    return res.status(OK).json({
      data: safeUser
    });
})