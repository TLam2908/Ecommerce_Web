import catchErrors from "../utils/catchError";
import { verifyToken } from "../utils/jwt";
import { clearAuthCookies, setAuthCookies, getAccessTokenCookieOptions, getRefreshTokenCookieOptions } from "../utils/cookies";

import { createAccount, loginUser, refreshUserAccessToken, verifyEmail } from "../services/auth.service";
import { CREATED, OK, UNAUTHORIZED } from "../constants/http";

import { registerSchema } from "../validation/auth.validation";
import { loginSchema } from "../validation/auth.validation";
import { verificationCodeSchema } from "../validation/auth.validation";

import { PrismaClient } from "@prisma/client";
import appAssert from "../utils/appAssert";
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
  const accessToken = req.cookies.accessToken as string|undefined;
  // validate access token
  const { payload } = verifyToken(accessToken || "");
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

export const refreshHandler = catchErrors(async (req, res) => {
    const refreshToken = req.cookies.refreshToken as string|undefined;
    appAssert(refreshToken, UNAUTHORIZED, "Missting refresh token");

    const { accessToken, newRefreshToken } = await refreshUserAccessToken(refreshToken);

    if (newRefreshToken) {
        res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
    }
 
    return res.status(OK).cookie("accessToken", accessToken, getAccessTokenCookieOptions()).json({
        message: "Access token refreshed",
    })
});

export const verifyEmailHandler = catchErrors(async (req, res) => {
    const verificationCode = verificationCodeSchema.parse(req.params.code);

    await verifyEmail(verificationCode);

    return res.status(OK).json({
        message: "Email was successfully verified",
    })
})