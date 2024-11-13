import catchErrors from "../utils/catchError";
import { verifyToken } from "../utils/jwt";
import { clearAuthCookies, setAuthCookies, getAccessTokenCookieOptions, getRefreshTokenCookieOptions } from "../utils/cookies";

import { createAccount, loginUser, refreshUserAccessToken, verifyEmail, sendPasswordResetEmail, resetPassword } from "../services/auth.service";
import { CREATED, OK, UNAUTHORIZED } from "../constants/http";

import { emailSchema, registerSchema, loginSchema, verificationCodeSchema, resetPasswordSchema } from "../validation/auth.validation";

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
    data: {
      message: "Login successful",
      role: safeUser.role
    }
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
    appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

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

export const sendPasswordResetHandler = catchErrors(async (req, res) => {
  const email = emailSchema.parse(req.body.email);

  await sendPasswordResetEmail(email);

  return res.status(OK).json({
    message: "Password reset email sent",
  })
})

export const resetPasswordHandler = catchErrors(async (req, res) => {
  const request = resetPasswordSchema.parse(req.body);
  console.log(request);
  await resetPassword(request);

  return clearAuthCookies(res).status(OK).json({
    message: "Password reset successful",
  })
})