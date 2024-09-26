import catchErrors from "../utils/catchError";
import { verifyToken } from "../utils/jwt";
import { clearAuthCookies, setAuthCookies } from "../utils/cookies";

import { createAccount } from "../services/auth.service";
import { loginUser } from "../services/auth.service";
import { CREATED, OK } from "../constants/http";

import { registerSchema } from "../validation/auth.validation";
import { loginSchema } from "../validation/auth.validation";

import { PrismaClient } from "@prisma/client";
// if password and confirm password is not the same,
// zod will throw an error and catchErrors will catch it and pass it to the error handler middleware.

const prisma = new PrismaClient();

export const registerHandler = catchErrors(async (req, res) => {
  // validate request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // call service
  const { safeUser, accessToken, refreshToken } = await createAccount(request);

  // return response
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(safeUser);
});

export const loginHandler = catchErrors(async (req, res) => {
  // validate request
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  // call service
  const { safeUser, accessToken, refreshToken } = await loginUser(request);

  // return response
  return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
    message: "Login successful",
  });
});

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  // validate access token
  const { payload } = verifyToken(accessToken);
  if (payload) {
    // delete session
    await prisma.session.delete({
      where: {
        id: payload.sessionId,
      },
    });
  }
  return clearAuthCookies(res).status(OK).json({
    message: "Logout successful",
  });
});
