import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const moment = require("moment");
import { APP_ORIGIN, JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import { CONFLICT, NOT_FOUND, TOO_MANY_REQUESTS, UNAUTHORIZED, INTERNAL_SERVER_ERROR } from "../constants/http";

import appAssert from "../utils/appAssert";
import { refreshTokenOptions, RefreshTokenPayload, verifyToken } from "../utils/jwt";
import { signToken } from "../utils/jwt";
import { hashValue, compareValue } from "../utils/bcrypt";
import { sendMail } from "../utils/sendMail";
import { getVerifyEmailTemplate, getPasswordResetTemplate } from "../utils/emailTemplates";


const prisma = new PrismaClient();

export type CreateAcountParams = {
  email: string;
  password: string;
  name: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAcountParams) => {
  // verify existing user does not exist
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  // if !existingUser false, throw error
  appAssert(!existingUser, CONFLICT, "Email already exists");

  // if (existingUser) {
  //   throw new Error("User already exists");
  // }

  // create user
  const hashedPassword = await hashValue(data.password);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
      role: "user",
      verified: false,
      createdAt: moment().toDate()
    },
  });

  const safeUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    verified: user.verified,
    createAt: user.createdAt,
  };

  // create verification code
  const verificationCode = await prisma.verificationCode.create({
    data: {
      user_id: user.id,
      type: "verify_email",
      createdAt: moment().toDate(),
      expiresAt: moment().add(24, "hours").toDate(), // 24 hours
    },
  });

  //send verification email

  const url = `${APP_ORIGIN}/email/verify/${verificationCode.id}`;

  try {
    const response = await sendMail({
      to: user.email,
      ...getVerifyEmailTemplate(url), // Ensure this returns the required fields like subject, text, html
    });
    console.log("Email sent successfully", response); // Handle success case
  } catch (error) {
    console.error(error); // Handle error case
  }
  

  // create session
  const session = await prisma.session.create({
    data: {
      user_id: user.id,
      userAgent: data.userAgent,
      createdAt: moment().toDate(),
      expiresAt: moment().add(30, "days").toDate(), // 30 days
    },
  });

  // sign access token and refresh token
  const refreshToken = signToken({sessionId: session.id}, refreshTokenOptions);

  const accessToken = signToken({
    sessionId: session.id,
    userId: user.id
  });

  // return user and tokens
  return {
    safeUser,
    accessToken,
    refreshToken,
  };
};

type LoginParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const loginUser = async ({
  email,
  password,
  userAgent,
}: LoginParams) => {
  // get user by email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  appAssert(user, UNAUTHORIZED, "Invalid email or password");

  // validate password
  const validPassword = await compareValue(password, user.password);
  appAssert(validPassword, UNAUTHORIZED, "Invalid password");

  // create session
  const userId = user.id;
  const session = await prisma.session.create({
    data: {
      user_id: userId,
      userAgent: userAgent,
      createdAt: moment().toDate(),
      expiresAt: moment().add(30, "days").toDate(), // 30 days
    },
  });

  const sessionInfo = {
    sessionId: session.id,
  };

  // sign access token and refresh token

  const refreshToken = signToken(sessionInfo, refreshTokenOptions);

  const accessToken = signToken({
    ...sessionInfo,
    userId: userId,
  });

  const safeUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    verified: user.verified,
  };

  // return user and tokens
  return {
    safeUser,
    accessToken,
    refreshToken,
  };
};


export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenOptions.secret
  })
  appAssert(payload, UNAUTHORIZED, "Invalid refresh token")

  const session = await prisma.session.findUnique({
    where: {
      id: payload.sessionId
    }
  })
  const now = Date.now()
  appAssert(session && session.expiresAt.getTime() > now, UNAUTHORIZED, "Session expired")

  // refresh session if it expires in next 24 hours
  const sessionNeedsRefresh = session.expiresAt.getTime() - now < 1000 * 60 * 60 * 24 // 24 hours
  if (sessionNeedsRefresh) {
    await prisma.session.update({
      where: {
        id: session.id
      },
      data: {
        expiresAt: moment().add(30, "days").toDate()
      }
    })
  }

  // sign new refresh token
  const newRefreshToken = sessionNeedsRefresh ? signToken({sessionId: session.id}, refreshTokenOptions) : undefined

  // sign new access token
  const accessToken = signToken({
    sessionId: session.id,
    userId: session.user_id
  })

  return {
    accessToken,
    newRefreshToken
  }
}

export const verifyEmail = async (code: string) => {
  // get the verification code
  const codeId = parseInt(code, 10)
  const validCode = await prisma.verificationCode.findUnique({
    where: {
      id: codeId,
      type: "verify_email",
      expiresAt: { gt: new Date() }
    }
  })

  appAssert(validCode, NOT_FOUND, "Invalid or expired verification code")

  // get user by id
  // update user verified to true
  const updatedUser = await prisma.user.update({
    where: {
      id: validCode.user_id
    },
    data: {
      verified: true
    }
  })

  appAssert(updatedUser, NOT_FOUND, "Failed to verify email")

    // delete verification code
  await prisma.verificationCode.delete({
    where: {
      id: validCode.id
    }
  })

  const safeUser = {
    id: updatedUser.id,
    email: updatedUser.email,
    name: updatedUser.name,
    verified: updatedUser.verified,
  }

  return {
    safeUser
  }
}

export const sendPasswordResetEmail = async (email: string) => {
  // get the user by email
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  appAssert(user, NOT_FOUND, "User not found")

  // check email rate limit

  const count = await prisma.verificationCode.count({
    where: {
      user_id: user.id,
      type: "password_reset",
      createdAt: { gt: moment().subtract(5, "minutes") }
    }
  })

  appAssert(count <= 1, TOO_MANY_REQUESTS, "Too many requests, try again later")

  // create verification code

  const expiresAt = moment().add(1, "hour").toDate()
  const verificationCode = await prisma.verificationCode.create({
    data: {
      user_id: user.id,
      type: "password_reset",
      createdAt: moment().toDate(),
      expiresAt
    }
  })

  // send email

  const url = `${APP_ORIGIN}/password/reset?code=${verificationCode.id}&exp=${expiresAt.getTime()}`

  const { data, error } = await sendMail({
    to: user.email,
    ...getPasswordResetTemplate(url)
  })

  appAssert(data?.id, INTERNAL_SERVER_ERROR, `${error?.name} - ${error?.message}`)

  // return success
  return {
    url,
    emailId: data.id
  }
}

type ResetPasswordParams = {
  password: string;
  verificationCode: string;
}

export const resetPassword = async ({password, verificationCode}: ResetPasswordParams) => {
  // get the verification code
  const codeId = parseInt(verificationCode, 10)
  const validCode = await prisma.verificationCode.findUnique({
    where: {
      id: codeId,
      type: "password_reset",
      expiresAt: { gt: new Date() }
    }
  })

  appAssert(validCode, NOT_FOUND, "Invalid or expired verification code")

  // update the user password

  const updatedUser = await prisma.user.update({
    where: {
      id: validCode.user_id
    },
    data: {
      password: await hashValue(password)
    }
  })

  appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to reset password")

  // delete the verification code
  await prisma.verificationCode.delete({
    where: {
      id: validCode.id
    }
  })

  // delete all session
  await prisma.session.deleteMany({
    where: {
      user_id: validCode.user_id
    }
  })

  const safeUser = {
    id: updatedUser.id,
    email: updatedUser.email,
    name: updatedUser.name,
    verified: updatedUser.verified,
  }

  return {
    safeUser
  }
}