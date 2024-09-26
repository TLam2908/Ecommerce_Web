import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const moment = require("moment");
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import { CONFLICT, NOT_FOUND, UNAUTHORIZED } from "../constants/http";

import appAssert from "../utils/appAssert";
import { refreshTokenOptions, RefreshTokenPayload, verifyToken } from "../utils/jwt";
import { signToken } from "../utils/jwt";
import { hashValue, compareValue } from "../utils/bcrypt";

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
      createAt: moment().format()
    },
  });

  const safeUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    verified: user.verified,
    createAt: user.createAt,
  };

  // create verification code
  const verificationCode = await prisma.verificationCode.create({
    data: {
      user_id: user.id,
      type: "verify_email",
      createdAt: moment().format(),
      expiresAt: moment().add(24, "hours").format(), // 24 hours
    },
  });

  // send verification email
  // create session
  const session = await prisma.session.create({
    data: {
      user_id: user.id,
      userAgent: data.userAgent,
      createdAt: moment().format(),
      expiresAt: moment().add(30, "days").format(), // 30 days
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
      createdAt: moment().format(),
      expiresAt: moment().add(30, "days").format(), // 30 days
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
        expiresAt: moment().add(30, "days").format()
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