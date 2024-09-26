import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const moment = require("moment-timezone");
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";

import appAssert from "../utils/appAssert";
import { refreshTokenOptions } from "../utils/jwt";
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
      createAt: moment().tz("Asia/Ho_Chi_Minh").toISOString(),
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
      expiresAt: moment().tz("Asia/Ho_Chi_Minh").add(24, "hours").toISOString(), // 24 hours
    },
  });

  // send verification email
  // create session
  const session = await prisma.session.create({
    data: {
      user_id: user.id,
      userAgent: data.userAgent,
      expiresAt: moment().tz("Asia/Ho_Chi_Minh").add(30, "days").toISOString(), // 30 days
    },
  });

  // sign access token and refresh token
  const refreshToken = signToken({sessionId: session.id}, refreshTokenOptions);

  const accessToken = signToken({
    sessionId: session.id,
    user_id: user.id,
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
      expiresAt: moment().tz("Asia/Ho_Chi_Minh").add(30, "days").toISOString(), // 30 days
    },
  });

  const sessionInfo = {
    sessionId: session.id,
  };

  // sign access token and refresh token

  const refreshToken = signToken(sessionInfo, refreshTokenOptions);

  const accessToken = signToken({
    ...sessionInfo,
    user_id: userId,
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
